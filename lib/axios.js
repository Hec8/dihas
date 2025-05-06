import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // https://negative-honor-hec8-2159b031.koyeb.app
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
    withCredentials: true,
})

// Intercepteur pour gérer le CSRF
axios.interceptors.request.use(config => {
    if (['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
        config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN')
    }
    return config
})

// Helper pour récupérer les cookies
function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export const fetchCsrfCookie = () => {
    return axios.get('/sanctum/csrf-cookie', {
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
    })
}

export default axios