import React from 'react';
import { Link } from 'react-router-dom';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import PvcModal from 'components/shared/Modal';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { createBooking, getBookings } from 'actions';
import ApiErrors from 'components/forms/ApiErrors';
import { toast } from 'react-toastify';

 
const moment = extendMoment(Moment);

class BookingReserve extends React.Component {

    constructor() {
        super();
        this.dateRef = React.createRef();
        this.bookedOutDates = [];
        this.state = {
            proposedBooking: {
                guests: '',
                startDate: null,
                endDate: null
            }
        }
        this.errors = [];
    }

    async componentDidMount() {
        const { rental } = this.props;
        this.bookedOutDates = await getBookings(rental._id);
    }

    handleApply = (_, {startDate, endDate}) => {
        if (this.dateRef && this.dateRef.current) {
            this.dateRef.current.value = moment(startDate).format('YYYY/MM/DD') + ' to ' + moment(endDate).format('YYYY/MM/DD');
        }
        
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                startDate,
                endDate
            }
        });
    }

    processAdditionalData = () => {
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                nights: this.nights,
                price: this.price,
                rental: this.props.rental
            }
        });
    };

    checkInvalidDates = (date) => {
        let isBookedOut = false;
        isBookedOut = this.bookedOutDates.some(booking => 
            moment.range(booking.startDate, booking.endDate).contains(date)
        );
        return date < moment().add(-1, 'days') || isBookedOut;
    }

    handleGuestChange = (event) => {
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                guests: parseInt(event.target.value, 10)
            }
        });
    }

    resetData = () => {
        this.dateRef.current.value = ''
        this.setState({
            proposedBooking: {
                guests: '',
                startDate: null,
                endDate: null
            }
        });
        this.errors = [];
    }

    reserveRental = (closeCallBack) => {
        createBooking(this.state.proposedBooking)
            .then(newBooking => {
                this.bookedOutDates.push(newBooking);
                this.resetData();
                toast.success('Booking Created', {
                    autoClose: 3000
                })
                closeCallBack();
            })
            .catch((errors) => this.setState({errors}))
    }

    get isBookingValid() {
        const { startDate, endDate, guests} = this.state.proposedBooking;
        return startDate && endDate && guests;
    }

    get nights() {
        const { startDate, endDate } = this.state.proposedBooking;
        if (!startDate || !endDate) return null;
        const range = moment.range(startDate, endDate);
        return Array.from(range.by('days')).length - 1;
    }

    get price() {
        const { rental: { dailyPrice}} = this.props;
        return dailyPrice && this.nights * dailyPrice
    }

    get formattedDate() {
        return this.dateRef.current ? this.dateRef.current.value : '';
      }

    render() {
        const { rental, isAuth } = this.props;
        const { errors, proposedBooking: { nights, guests, price} } = this.state;
        return (
            <div className='booking'>
                <h3 className='booking-price'>$ {rental.dailyPrice} <span className='booking-per-night'>per night</span></h3>
                <hr></hr>
                { !isAuth &&
                    <Link to={{pathname: '/login'}} className="btn btn-pvc-main btn-block">Login to Book</Link>
                }
                { isAuth &&
                <>
                    <div className='form-group'>
                        <label htmlFor='dates'>Dates</label>
                        <DateRangePicker
                            initialSettings={{
                                opens: 'left',
                                containerStyles:{display: 'block'},
                                isInvalidDate: this.checkInvalidDates
                            }}
                            containerStyle={{display: 'block'}}
                            onApply={this.handleApply}
                            isInvalidDate={this.checkInvalidDates}
                        >
                            <input id="dates" type="text" className="form-control" ref={this.dateRef}></input>
                        </DateRangePicker>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='guests'>Guests</label>
                        <input
                            onChange={this.handleGuestChange}
                            value={this.state.proposedBooking.guests}
                            type='number'
                            className='form-control'
                            id='guests'
                            aria-describedby='guests'>
                        </input>
                    </div>
                    <PvcModal
                        title="Confirm Booking"
                        subtitle={this.formattedDate}
                        openBtn={
                            <button
                                onClick={this.processAdditionalData}
                                disabled={!this.isBookingValid}
                                className='btn btn-pvc-main btn-block'
                            >
                            Reserve place now
                            </button>
                        }
                        onConfirm={this.reserveRental}
                    >
                        <div className="mb-2">
                            <em>{nights}</em> Nights /
                            <em> ${rental.dailyPrice}</em> per Night
                            <p>Guests: <em>{guests}</em></p>
                            <p>Price: <em>${price}</em></p>
                            <p>Confirm booking for selected dates?</p>
                        </div>
                        <ApiErrors errors={errors} />
                    </PvcModal>
                </>
                }
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
                </p>
            </div>
        )
    }
}

export default BookingReserve;