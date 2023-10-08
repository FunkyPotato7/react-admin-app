import axios from 'axios';

import { baseURL } from '../configs/urls.js';
import { AuthService } from './auth.service.js';

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use(async (config) => {
    const access_token = await AuthService.getToken();

    if (access_token) {
        config.headers.authorization = `Bearer ${access_token}`;
    }

    return config
});

axiosService.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {

        if (error.response?.status === 403 || 401) {
            await AuthService.logout();
            return Promise.reject(error);
        }
        return Promise.reject(error);
    });

export {
    axiosService,
}