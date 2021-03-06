import axiosService from 'services/AxiosService';
import { extractApiErrors } from './index';
const { pvcAxios } = axiosService;

export const registerUser = registerData => {
    return pvcAxios
        .post(`/users/register`, registerData)
        .catch(error => Promise.reject(extractApiErrors(error.response || [])));
}

export const loginUser = loginData => {
    return pvcAxios
        .post(`/users/login`, loginData)
        .then(res => res.data)
        .catch(error => Promise.reject(extractApiErrors(error.response || [])));
}

export const userAuthenticated = decodedToken => {
    return {
        type: 'USER_AUTHENTICATED',
        username: decodedToken.username || ''
    }
}