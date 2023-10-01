const baseURL = import.meta.env.VITE_API_URL;

const urls = {
    getAll: '/shops',
    getById: (id) => `/shops/${id}`,
    getFiles: (id) => `/shops/${id}/files`,
    getFile: (id) => `/shops/${id}/file`,
    updateFile: (id) => `/shops/${id}/file`,
    addSnippets: (id) => `/shops/${id}/addSnippets`,
    removeSnippets: (id) => `/shops/${id}/removeSnippets`,
    enable: (id) => `/shops/${id}/enable`,
    disable: (id) => `/shops/${id}/disable`,
}

export {
    baseURL,
    urls,
}