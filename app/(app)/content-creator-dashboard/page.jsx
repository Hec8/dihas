'use client';

import Header from '@/app/(app)/Header';
import BlogStats from '@/components/BlogStats';
import { useAuth } from '@/hooks/auth';

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <>
            <Header title="Tableau de bord - Créateur de contenu" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistiques des articles</h2>
                        <BlogStats role="createur_contenu" />
                    </div>
                </div>
            </div>
        </>
    );
}
