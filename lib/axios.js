import Axios from 'axios'

// Instance Axios par défaut pour les requêtes publiques
const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://negative-honor-hec8-2159b031.koyeb.app',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials: false // Désactivé par défaut pour les requêtes publiques
})

// Instance Axios pour les requêtes authentifiées
const authAxios = Axios.create({
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
authAxios.interceptors.request.use(async (config) => {
    // Pour toutes les requêtes POST, PUT, PATCH, DELETE
    if (config.method && ['post', 'put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
        try {
            // Vérifier si nous avons déjà le cookie XSRF-TOKEN
            const cookies = document.cookie.split(';');
            const hasXsrfToken = cookies.some(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
            
            // Si nous n'avons pas le cookie, le récupérer
            if (!hasXsrfToken) {
                await axios.get('/sanctum/csrf-cookie');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du cookie CSRF:', error);
        }
    }
    return config
})

export default axios
