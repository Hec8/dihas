import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    },
})

// Intercepteur pour obtenir le cookie CSRF avant chaque requête
axios.interceptors.request.use(async config => {
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await axios.get('/sanctum/csrf-cookie')
    }
    return config
})

export default axios