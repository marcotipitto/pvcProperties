import axiosService from 'services/AxiosService';
import { extractApiErrors } from './index';
const { pvcAxios } = axiosService;

export const createBooking = booking => {
    return pvcAxios.post('/bookings', booking)
        .then(res => res.data)
        .catch(error => Promise.reject(extractApiErrors(error.response || {})));
}

export const getBookings = rentalId => {
    return pvcAxios.get(`/bookings?rental=${rentalId}`)
        .then(res => res.data);
}

export const fetchUserBookings = () => dispatch => {
    dispatch({ type: 'REQUEST_DATA', resource: 'manage-bookings' });
    return pvcAxios.get('/bookings/me')
        .then(res => res.data)
        .then(bookings => {
            dispatch({
                type: 'REQUEST_DATA_COMPLETE',
                data: bookings,
                resource: 'manage-bookings'
            })
        })
}

export const fetchReceivedBookings = () => dispatch => {
    dispatch({ type: 'REQUEST_DATA', resource: 'recieved-bookings' });
    return pvcAxios.get('/bookings/recieved')
        .then(res => res.data)
        .then(bookings => {
            dispatch({
                type: 'REQUEST_DATA_COMPLETE',
                data: bookings,
                resource: 'recieved-bookings'
            })
        })
}

export const deleteBooking = bookingId => dispatch => {
    return pvcAxios.delete(`/bookings/${bookingId}`)
        .then(res => res.data)
        .then(({ id }) => {
            dispatch({
                type: 'DELETE_RESOURCE',
                id,
                resource: 'manage-bookings'
            })
        })
        .catch(error => {
            dispatch({
                type: 'REQUEST_ERROR',
                errors: extractApiErrors(error.response || []),
                resource: 'manage-bookings'
            })
        })
} 