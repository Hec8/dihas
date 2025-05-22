import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        return axios
            .post('/login', props)
            .then(async () => {
                // Mutate doit être appelé pour mettre à jour les données utilisateur
                await mutate()
                // La redirection sera gérée par le composant qui utilise ce hook
                // en fonction des données utilisateur mises à jour
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        try {
            // Utiliser une requête avec des en-têtes spécifiques pour éviter la mise en cache
            await axios.post('/logout', {}, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            })
            
            // Mettre à jour l'état utilisateur
            await mutate(null, false)
            
            // Utiliser window.location.href pour une redirection complète 
            // qui contourne le système de routage de Next.js et évite la page de loading
            window.location.href = '/login'
        } catch (err) {
            console.error('Erreur lors de la déconnexion:', err)
            // Forcer la redirection même en cas d'erreur
            window.location.href = '/login'
        }
    }

    useEffect(() => {
        // Si l'utilisateur est un invité mais qu'il est authentifié, rediriger
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            // Redirection basée sur le rôle
            if (user.role === 'super_admin') {
                router.push('/dashboard')
            } else if (user.role === 'createur_contenu') {
                router.push('/content-creator-dashboard')
            } else {
                // Fallback vers la redirection par défaut
                router.push(redirectIfAuthenticated)
            }
        }

        // Vérification de l'email
        if (middleware === 'auth' && (user && !user.email_verified_at)) {
            router.push('/verify-email')
        }

        // Si l'email est vérifié et que l'utilisateur est sur la page de vérification
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        ) {
            // Redirection basée sur le rôle
            if (user.role === 'super_admin') {
                router.push('/dashboard')
            } else if (user.role === 'createur_contenu') {
                router.push('/content-creator-dashboard')
            } else {
                // Fallback vers la redirection par défaut
                router.push(redirectIfAuthenticated || '/')
            }
        }
        
        // Si l'authentification échoue, déconnexion
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}