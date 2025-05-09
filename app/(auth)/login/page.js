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
            // 1. Obtenir le cookie CSRF directement du backend
            const csrfResponse = await fetch('https://negative-honor-hec8-2159b031.koyeb.app/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            
            // Vérifier si nous avons reçu les cookies
            const cookies = document.cookie
            console.log('Cookies après CSRF:', cookies)
            
            // Extraire le token XSRF-TOKEN des cookies
            const xsrfCookie = cookies.split(';').find(cookie => cookie.trim().startsWith('XSRF-TOKEN='))
            let xsrfToken = ''
            
            if (xsrfCookie) {
                xsrfToken = decodeURIComponent(xsrfCookie.split('=')[1])
                console.log('XSRF Token trouvé:', xsrfToken)
            } else {
                console.warn('XSRF Token non trouvé dans les cookies')
            }
            
            // 2. Effectuer le login directement sur le backend avec le token CSRF explicite
            const loginResponse = await fetch('https://negative-honor-hec8-2159b031.koyeb.app/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': xsrfToken
                },
                body: JSON.stringify({
                    email,
                    password,
                    remember: shouldRemember
                })
            })

            // Vérifier si la réponse de login est OK
            if (!loginResponse.ok) {
                const errorData = await loginResponse.json().catch(() => ({}))
                console.error('Erreur de login:', loginResponse.status, errorData)
                throw new Error(`Erreur de connexion: ${loginResponse.status}`)
            }

            // 3. Récupérer l'utilisateur
            const userResponse = await fetch('https://negative-honor-hec8-2159b031.koyeb.app/api/user', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': xsrfToken
                }
            })

            if (!userResponse.ok) {
                throw new Error(`Erreur lors de la récupération des données utilisateur: ${userResponse.status}`)
            }

            const user = await userResponse.json()

            // Redirection
            if (user?.role === 'super_admin') window.location.href = '/dashboard'
            else if (user?.role === 'createur_contenu') window.location.href = '/content-creator-dashboard'
            else window.location.href = '/'

        } catch (error) {
            console.error('Erreur de connexion:', error)
            
            // Gestion des erreurs spécifiques
            if (error.message?.includes('419')) {
                toast.error('Session expirée ou CSRF token invalide. Veuillez rafraîchir la page.')
                console.error('Erreur CSRF détectée. Vérifiez les cookies et les en-têtes.')
            } else if (error.message?.includes('422')) {
                // Erreur de validation
                toast.error('Données invalides. Vérifiez vos informations.')
                // Essayer de récupérer les erreurs de validation si possible
                try {
                    const errorData = JSON.parse(error.message.split('JSON: ')[1] || '{}')
                    if (errorData.errors) {
                        setErrors(errorData.errors)
                    }
                } catch (e) {
                    console.error('Impossible de parser les erreurs de validation:', e)
                }
            } else {
                toast.error(`Erreur de connexion: ${error.message || 'Veuillez réessayer.'}`)
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
