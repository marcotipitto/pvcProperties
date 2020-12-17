import axiosService from 'services/AxiosService';
const { pvcAxios } = axiosService;

export const fetchRentals = () => dispatch => {
    pvcAxios.get('/rentals').then(res => {
        const rentals = res.data;
        dispatch({
            type: 'FETCH_RENTALS',
            rentals
        });
    });
}

export const fetchRentalById = rentalId => async dispatch => {
    dispatch({type: 'IS_FETCHING_RENTAL'})
    const res = await pvcAxios.get(`rentals/${rentalId}`)
    dispatch({
        type: 'FETCH_RENTAL_BY_ID',
        rental: res.data
    });
}

export const createRental = rental => {
    return pvcAxios.post('/rentals', rental);
}