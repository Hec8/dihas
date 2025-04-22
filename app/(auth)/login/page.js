'use client'

import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    }, [router.reset, errors.length])

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
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
                        className="ml-3 px-4 py-2 bg-green-800 text-white rounded-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-opacity-50 transition-colors"
                    >
                        Se connecter
                    </button>
                </div>
            </form>
        </>
    )
}

export default Login
