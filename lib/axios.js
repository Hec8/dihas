import Axios from 'axios'

// Instance Axios par défaut pour les requêtes publiques
const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://negative-honor-hec8-2159b031.koyeb.app',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN'
})

// Intercepteur pour gérer les requêtes d'authentification
axios.interceptors.request.use(async (config) => {
    // Pour toutes les requêtes non-GET qui nécessitent une authentification
    if (config.method !== 'get' && (config.url?.includes('/login') || config.url?.includes('/register'))) {
        try {
            await axios.get('/sanctum/csrf-cookie')
        } catch (error) {
            console.error('Erreur lors de la récupération du cookie CSRF:', error)
        }
    }
    return config
})

export default axios
