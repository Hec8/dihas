'use client'

import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const Page = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState(null)

    return (
        <>
            <div className="mb-4 text-sm text-gray-600">
                Merci de vous être enregistré! Avant de commencer, pourriez-vous vérifier
                votre adresse e-mail en cliquant sur le lien que nous avons envoyé
                à votre adresse e-mail ? Si vous n&apos;avez pas reçu l&apos;email, nous serons ravis
                de vous envoyer un autre.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Un nouveau lien de vérification a été envoyé à l&apos;adresse e-mail
                    que vous avez fournie lors de votre enregistrement.
                </div>
            )}

            <div className="mt-4 flex items-center justify-between">
                <Button onClick={() => resendEmailVerification({ setStatus })}>
                    Envoyer un nouveau lien
                </Button>

                <button
                    type="button"
                    className="underline text-sm text-gray-600 hover:text-gray-900"
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}>
                    Logout
                </button>
            </div>
        </>
    )
}

export default Page
