import React from 'react';
import { capitalize } from '../../helpers/functions';
import RentalAssets from 'components/rental/RentalAssets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RentalInfo = ({rental}) =>
    <div className="rental">
        <h2 className={`type-${rental.category} rental-type `}>
            {rental.category}
        </h2>
        <h1 className="rental-title">{rental.title}</h1>
        <h2 className="rental-city">{capitalize(rental.address)}</h2>
        <h2 className="rental-city">{capitalize(rental.city) + ', ' + rental.zip}</h2>
        <br/>
        <div className="rental-room-info">
            <span><FontAwesomeIcon icon="bed" />{` ${rental.bedrooms} bedroom${rental.bedrooms > 1 ? 's' : ''},`}</span>
            <span><FontAwesomeIcon icon="bath" />{` ${rental.bathrooms} bathroom${rental.bathrooms > 1 ? 's' : ''},`}</span>
            <span><FontAwesomeIcon icon="car" />{` ${rental.parkingSpots} parking spot${rental.parkingSpots > 1 ? 's' : ''}`}</span>
        </div>
        <div className="rental-room-info">
            <span><i className="fa fa-building"></i>{`Floor number: ${rental.floorNumber},`}</span>
            <span><i className="fa fa-user"></i>{`Elevator: ${rental.elevator ? 'Yes' : 'No'}`}</span>
        </div>
        <p className="rental-description">
            {rental.description}
        </p>
        <h5>
            Price: {`$${rental.price} per month`} <br/>
            Term: {rental.leaseTerm}
        </h5>
        <hr />
        <RentalAssets rental={rental}/>
    </div>

export default RentalInfo