'use client';

import { useRouter } from 'next/navigation';

export default function ServiceList({ user }) {
    const router = useRouter();

    return (
        <>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Liste des services</h2>
                        <button
                            onClick={() => router.push('/service-manage/create')}
                            className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Créer un service
                        </button>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-center">Aucun service disponible</div>
                    </div>
                </div>
            </div>
        </>
    );
} 