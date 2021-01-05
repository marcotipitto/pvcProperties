import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalize } from '../../helpers/functions';

const RentalAssets = ({rental}) =>
    <div className="rental-assets">
        <h3 className="title">Assets</h3>
        <div className="row">
            <div className="col-md-6">
                {rental.airCon && 
                    <span>
                        <FontAwesomeIcon icon="asterisk" /> Air Conditioning
                    </span>
                }
                {rental.heating &&
                    <span>
                        <FontAwesomeIcon icon="thermometer" /> Heating
                    </span>
                }
                {rental.refrigerator &&
                    <span>
                        <FontAwesomeIcon icon="snowflake" /> Refrigerator
                    </span>
                }
                {rental.dishwasher &&
                    <span>
                        <FontAwesomeIcon icon="wine-glass" /> Dishwasher
                    </span>
                }
                {rental.laundry &&
                    <span>
                        <FontAwesomeIcon icon="tshirt" /> Washer/Dryer: {capitalize(rental.laundry)}
                    </span>
                }
            </div>
            <div className="col-md-6">
                {rental.security &&
                    <span>
                        <FontAwesomeIcon icon="shield-alt" /> Security: {capitalize(rental.security)}
                    </span>                
                }
                <span>
                    <FontAwesomeIcon icon="bone" /> Pets: {rental.pets ? 'Permitted': 'Not Permitted'}
                </span>                
                <span>
                    <FontAwesomeIcon icon="smoking" /> Smoking: {rental.smoking ? 'Permitted': 'Not Permitted'}
                </span>
            </div>
        </div>
    </div>


export default RentalAssets;