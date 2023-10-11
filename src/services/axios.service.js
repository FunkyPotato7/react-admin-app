import axios from 'axios';

import { baseURL } from '../configs/urls.js';
import { AuthService } from './auth.service.js';

const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use(async (config) => {
     const { access_token } = JSON.parse(localStorage.getItem('@@auth0spajs@@::xIeH01yhw3qsa7gwDbGsVm4l7iprxrrT::http://localhost:5000/::openid profile email')).body;
    // const access_token = await AuthService.getToken();

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
        return Promise.reject(error);
    });

export {
    axiosService,
}