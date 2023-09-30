import { axiosService } from './axios.service.js';

import { urls } from '../configs/urls.js';

const ShopService = {
    getAll: () => axiosService.get(urls.getAll),
    getById: (id) => axiosService.get(urls.getById(id)),
    getFiles: (id) => axiosService.get(urls.getFiles(id)),
    addSnippets: (id) => axiosService.post(urls.addSnippets(id)),
    removeSnippets: (id) => axiosService.post(urls.removeSnippets(id)),
    enable: (id) => axiosService.post(urls.enable(id)),
    disable: (id) => axiosService.post(urls.disable(id)),
}

export {
    ShopService,
}