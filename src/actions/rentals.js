import axiosService from 'services/AxiosService';
import { extractApiErrors } from './index';
const { pvcAxios } = axiosService;

export const verifyRentalOwner = (rentalId) => {
    return pvcAxios.get(`/rentals/${rentalId}/verify-user`);
}

export const fetchRentals = (location) => dispatch => {
    dispatch({ type: 'REQUEST_DATA', resource: 'rentals' });
    const query = location ? `/rentals?city=${location}` : '/rentals';
    pvcAxios.get(query).then(res => {
        const rentals = res.data;
        dispatch({ type: 'REQUEST_DATA_COMPLETE', resource: 'rentals' });
        dispatch({
            type: 'FETCH_RENTALS',
            rentals
        });
    });
};

export const fetchUserRentals = () => dispatch => {
    dispatch({ type: 'REQUEST_DATA', resource: 'manage-rentals' });
    return pvcAxios.get('/rentals/me')
        .then(res => res.data)
        .then(rentals => {
            dispatch({
                type: 'REQUEST_DATA_COMPLETE',
                data: rentals,
                resource: 'manage-rentals'
            });
        });
};

export const fetchRentalById = rentalId => async dispatch => {
    dispatch({ type: 'REQUEST_DATA', resource: 'rental' });
    const res = await pvcAxios.get(`rentals/${rentalId}`);
    dispatch({ type: 'REQUEST_DATA_COMPLETE', resource: 'rental' });
    dispatch({
        type: 'FETCH_RENTAL_BY_ID',
        rental: res.data
    });
}

export const createRental = rental => {
    return pvcAxios.post('/rentals', rental);
}

export const updateRental = (id, rentalData) => dispatch => {
    return pvcAxios.patch(`/rentals/${id}`, rentalData)
        .then(res => res.data)
        .then(updatedRental =>
            dispatch({
                type: 'UPDATE_RENTAL_SUCCESS',
                rental: updatedRental
            })
        )
        .catch(error => Promise.reject(extractApiErrors(error.response || [])));
}

export const deleteRental = rentalId => dispatch => {
    return pvcAxios.delete(`/rentals/${rentalId}`)
        .then(res => res.data)
        .then(({ id }) => {
            dispatch({
                type: 'DELETE_RESOURCE',
                id,
                resource: 'manage-rentals'
            })
        })
        .catch(error => {
            dispatch({
                type: 'REQUEST_ERROR',
                errors: extractApiErrors(error.response || []),
                resource: 'manage-rentals'
            })
        })
} 