import Axios from 'axios'

// Instance Axios par défaut pour les requêtes publiques
const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://negative-honor-hec8-2159b031.koyeb.app',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

// Intercepteur pour gérer les requêtes d'authentification
axios.interceptors.request.use(async (config) => {
    // Si c'est une requête d'authentification, obtenir d'abord le cookie CSRF
    if (config.url?.includes('/login') || config.url?.includes('/register')) {
        await axios.get('/sanctum/csrf-cookie')
    }
    return config
})

export default axios
