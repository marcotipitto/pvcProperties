import axios from 'axios';

class AxiosService {
    axiosInstance = null;

    constructor() {
        this.initInstance();
    }

    initInstance() {
        this.axiosInstance = axios.create({
            baseURL: '/api/v1',
            timeout: 60000
        });

        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('pvc_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        });
    }

    get pvcAxios() {
        return this.axiosInstance;
    }
}

export default new AxiosService();