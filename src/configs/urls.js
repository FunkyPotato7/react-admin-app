const baseURL = 'http://localhost:5000/api/admin';

const urls = {
    getAll: '/shops',
    getById: (id) => `/shops/${id}`,
    getFiles: (id) => `/shops/${id}/files`,
    addSnippets: (id) => `/shops/${id}/addSnippets`,
    removeSnippets: (id) => `/shops/${id}/removeSnippets`,
    enable: (id) => `/shops/${id}/enable`,
    disable: (id) => `/shops/${id}/disable`,
}

export {
    baseURL,
    urls,
}