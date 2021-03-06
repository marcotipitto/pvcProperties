import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRentalById } from 'actions';
import RentalInfo from 'components/rental/RentalInfo';
import TomMap from 'components/map/TomMap';
import RentalCarousel from 'components/rental/RentalCarousel';

class RentalDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.dispatch(fetchRentalById(id))
    }

    componentWillUnmount() {
        this.props.dispatch({type: 'UNMOUNT_RENTAL'});
    }

    get location() {
        const { rental: { address, city, zip } } = this.props;
        return address && city && zip && address + ', ' + city + ' ' + zip;
    }

    render() {
        const { rental, isFetching } = this.props;
        if (isFetching || !rental._id) { return null };
        return (
            <section id="rentalDetail">
                <div className="upper-section">
                    <div className="row">
                        <RentalCarousel images={rental.image} location={this.location}/>
                    </div>
                </div>

                <div className="details-section">
                    <div className="row">
                        <div className="col-md-6">
                            <RentalInfo rental={rental}/>
                        </div>
                        <div className="col-md-6">
                            <TomMap location={this.location}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = ({ rental, auth: { isAuth } }) => ({ rental: rental.item, isFetching: rental.isFetching, isAuth: isAuth })

const RentalDetailWithRouter = withRouter(RentalDetail)

export default connect(mapStateToProps)(RentalDetailWithRouter);