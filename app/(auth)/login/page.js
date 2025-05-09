'use client'

import { Suspense } from 'react'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import axios from '@/lib/axios' // <-- Ajouté
import toast from 'react-hot-toast' // <-- Ajouté

const Login = () => {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <LoginContent />
        </Suspense>
    )
}

const LoginContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const resetParam = searchParams?.get('reset')
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: user => {
            // Toujours retourner une string valide
            if (!user) return '/login';
            if (user?.role === 'super_admin') return '/dashboard';
            if (user?.role === 'createur_contenu') return '/content-creator-dashboard';
            return '/'; // Fallback par défaut
        },
    });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!router || !searchParams) return;

        if (resetParam && errors.length === 0) {
            setStatus(atob(resetParam))
        } else {
            setStatus(null)
        }
    }, [resetParam, errors.length, router, searchParams])

    if (!router || !searchParams) return <div>Chargement...</div>;

    const submitForm = async (event) => {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            // Configuration pour toutes les requêtes
            const baseURL = 'https://negative-honor-hec8-2159b031.koyeb.app'
            const baseHeaders = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }
            
            // 1. Obtenir le cookie CSRF directement du backend
            console.log('1. Demande du cookie CSRF...')
            await axios.get(`${baseURL}/sanctum/csrf-cookie`, {
                withCredentials: true,
                withXSRFToken: true
            })
            
            // Vérifier les cookies après la requête CSRF
            console.log('Cookies après CSRF:', document.cookie)
            
            // 2. Effectuer le login en utilisant axios avec la configuration CSRF
            console.log('2. Tentative de connexion...')
            const loginResponse = await axios.post(`${baseURL}/login`, {
                email,
                password,
                remember: shouldRemember
            }, {
                withCredentials: true,
                withXSRFToken: true,
                headers: baseHeaders
            })

            console.log('Login réussi:', loginResponse.status)
            
            // 3. Récupérer l'utilisateur
            console.log('3. Récupération des données utilisateur...')
            const userResponse = await axios.get(`${baseURL}/api/user`, {
                withCredentials: true,
                withXSRFToken: true,
                headers: baseHeaders
            })
            
            console.log('Utilisateur récupéré:', userResponse.status)
            const user = userResponse.data

            // Redirection
            if (user?.role === 'super_admin') window.location.href = '/dashboard'
            else if (user?.role === 'createur_contenu') window.location.href = '/content-creator-dashboard'
            else window.location.href = '/'

        } catch (error) {
            console.error('Erreur de connexion:', error)
            
            // Gestion des erreurs avec axios
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un code d'erreur
                console.error('Erreur de réponse:', error.response.status, error.response.data)
                
                if (error.response.status === 419) {
                    toast.error('Session expirée ou CSRF token invalide. Veuillez rafraîchir la page.')
                    console.log('Cookies actuels:', document.cookie)
                } else if (error.response.status === 422) {
                    toast.error('Données invalides. Vérifiez vos informations.')
                    if (error.response.data && error.response.data.errors) {
                        setErrors(error.response.data.errors)
                    }
                } else if (error.response.status === 401) {
                    toast.error('Identifiants incorrects. Veuillez réessayer.')
                } else {
                    toast.error(`Erreur de serveur: ${error.response.status}`)
                }
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                console.error('Erreur de requête:', error.request)
                toast.error('Aucune réponse du serveur. Vérifiez votre connexion internet.')
            } else {
                // Une erreur s'est produite lors de la configuration de la requête
                console.error('Erreur:', error.message)
                toast.error(`Erreur: ${error.message}`)
            }
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
            <h2 className='mt-1 mb-3 text-center font-bold text-2xl'>Connexion</h2>
            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email</Label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        className="block mt-1 w-full rounded-xl border-gray-300 focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                        onChange={event => setEmail(event.target.value)}
                        required
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <Label htmlFor="password">Mot de passe</Label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        className="block mt-1 w-full rounded-xl border-gray-300 focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                        onChange={event => setPassword(event.target.value)}
                        required
                    />

                    <InputError
                        messages={errors.password}
                        className="mt-2"
                    />
                </div>

                {/* Remember Me */}
                <div className="block mt-4">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-green-800 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Se souvenir de moi
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href="/forgot-password"
                        className="underline text-sm text-gray-600 hover:text-green-800">
                        Mot de passe oublié?
                    </Link>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ml-3 px-4 py-2 bg-green-800 text-white rounded-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50 transition-colors"
                    >
                        {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Login
