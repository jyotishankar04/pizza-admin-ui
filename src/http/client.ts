import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
})

api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            const headers  = {...originalRequest.headers}
            await api.post('/auth/refresh')
            return api.request({...originalRequest, headers})
        } catch (err) {
            console.log(err)
            return Promise.reject(err)
        }
    }
    return Promise.reject(error)
})