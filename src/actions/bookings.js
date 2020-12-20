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