'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import DashboardHeader from '@/components/DashboardHeader'
import Loading from '@/app/(app)/Loading'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Barre latérale */}
            <Navigation user={user} />

            {/* Contenu principal */}
            <div className="flex-1">
                <DashboardHeader />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AppLayout
