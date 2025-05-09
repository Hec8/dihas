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
// axios.interceptors.request.use(async config => {
//     // Utiliser l'API route de Next.js pour les routes d'authentification
//     if (config.url === '/login') {
//         config.url = '/api/login'
//     } else if (config.url === '/logout') {
//         config.url = '/api/logout'
//     } else if (config.url === '/sanctum/csrf-cookie') {
//         config.url = '/api/sanctum/csrf-cookie'
//     }

//     // Vérifier si nous avons besoin d'obtenir le cookie CSRF
//     if (!document.cookie.includes('XSRF-TOKEN') && 
//         !config.url.includes('/api/sanctum/csrf-cookie')) {
//         await axios.get('/api/sanctum/csrf-cookie')
//     }

//     return config
// })

export default axios