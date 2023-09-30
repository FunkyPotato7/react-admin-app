import axios from 'axios';

import { baseURL } from '../configs/urls.js';

const axiosService = axios.create({baseURL})

export {
    axiosService,
}