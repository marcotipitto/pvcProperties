import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRentalById, updateRental } from 'actions';
import TomMap from 'components/map/TomMap';
import { capitalize } from 'helpers/functions';
import {
    EditableInput,
    EditableSelect,
    EditableTextArea,
    EditableImage,
    EditableAssets
} from 'components/editable';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RentalEdit extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.dispatch(fetchRentalById(id))
    }

    componentWillUnmount() {
        this.props.dispatch({ type: 'UNMOUNT_RENTAL' });
    }

    updateRental = (rentalData, onSuccess, onError) => {
        const { id } = this.props.match.params;
        this.props.dispatch(updateRental(id, rentalData))
            .then(() => {
                onSuccess();
            })
            .catch(errors => {
                const message = errors.length > 0 ? errors[0].detail : 'Ooops, something went wrong';
                toast.error(message, {
                    autoClose: 3000
                });
                onError();
            })
    }

    get location() {
        const { rental: { address, city } } = this.props;
        return address && city && address + ', ' + city
    }

    render() {
        const { rental, isFetching } = this.props;
        if (isFetching || !rental._id) { return null; }
        return (
            <section id="rentalEdit">
                <div className="upper-section">
                    <div className="row">
                        <div className="col-md-6">
                            <EditableImage
                                entity={rental}
                                field={'image'}
                                containerType={"block"}
                                className="rental-img mb-2"
                                transformView={image => image[0].url}
                                onUpdate={this.updateRental}
                            />
                        </div>
                        <div className="col-md-6">
                            <TomMap location={this.location} />
                        </div>
                    </div>
                </div>
                <div className="details-section">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="rental">
                                <EditableSelect
                                    entity={rental}
                                    field={'category'}
                                    options={['apartment', 'condo', 'house', 'townhouse']}
                                    onUpdate={this.updateRental}
                                    className={`rental-type type-${rental.category}`}
                                />
                                <br/>
                                <EditableInput
                                    entity={rental}
                                    field={'title'}
                                    className={'rental-title'}
                                    onUpdate={this.updateRental}
                                />
                                <EditableInput
                                    entity={rental}
                                    field={'address'}
                                    onUpdate={this.updateRental}
                                    className={'rental-city'}
                                    transformView={value => capitalize(value)}
                                />
                                <EditableInput
                                    entity={rental}
                                    field={'city'}
                                    onUpdate={this.updateRental}
                                    className={'rental-city'}
                                    transformView={value => capitalize(value)}
                                />
                                <EditableInput
                                    entity={rental}
                                    field={'zip'}
                                    onUpdate={this.updateRental}
                                    className={'rental-city'}
                                    transformView={value => capitalize(value)}
                                />
                                <div className="rental-room-info mb-1">
                                    <span>
                                        <FontAwesomeIcon icon="bed" />
                                        <EditableInput
                                            entity={rental}
                                            field={'bedrooms'}
                                            onUpdate={this.updateRental}
                                            containerType={"inline"}
                                            className={'mr-0 ml-2'}
                                        /> bedrooms
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon="bath" />
                                        <EditableInput
                                            entity={rental}
                                            field={'bathrooms'}
                                            onUpdate={this.updateRental}
                                            containerType={"inline"}
                                            className={'mr-0 ml-2'}
                                        /> bathrooms
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon="car" />
                                        <EditableInput
                                            entity={rental}
                                            field={'parkingSpots'}
                                            onUpdate={this.updateRental}
                                            containerType={"inline"}
                                            className={'mr-0 ml-2'}
                                        /> parking spots
                                    </span>
                                </div>
                                <div className="rental-room-info mb-1">
                                    <span>
                                        Floor:
                                        <EditableInput
                                            entity={rental}
                                            field={'floorNumber'}
                                            onUpdate={this.updateRental}
                                            containerType={"inline"}
                                            className={'mr-0 ml-2'}
                                        />
                                    </span>
                                    <span>
                                        Elevator:
                                        <EditableSelect
                                            entity={rental}
                                            field={'elevator'}
                                            options={['true', 'false']}
                                            onUpdate={this.updateRental}
                                            containerType={"inline"}
                                            className={'mr-0 ml-2'}
                                        />
                                    </span>
                                </div>
                                <EditableTextArea
                                    entity={rental}
                                    field={'description'}
                                    onUpdate={this.updateRental}
                                    className={'rental-description'}
                                    rows={5}
                                    cols={60}
                                />
                                <h5>
                                    Price: $ 
                                    <EditableInput
                                        entity={rental}
                                        field={'price'}
                                        onUpdate={this.updateRental}
                                        containerType={"inline"}
                                        className={'mr-0 ml-2'}
                                    /> per month <br/>
                                    Term:
                                    <EditableSelect
                                        entity={rental}
                                        field={'leaseTerm'}
                                        options={['12 Month', 'Month to Month']}
                                        onUpdate={this.updateRental}
                                        containerType={"inline"}
                                    />
                                </h5>
                                <hr />
                                <EditableAssets rental={rental} onUpdate={this.updateRental} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ rental, auth: { isAuth } }) =>
    ({ rental: rental.item, isFetching: rental.isFetching, isAuth: isAuth })

const RentalEditWithRouterAndCheck = withRouter(RentalEdit);
export default connect(mapStateToProps)(RentalEditWithRouterAndCheck); 