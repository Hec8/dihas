'use client'

import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';

const ServicePreview = () => {
    const router = useRouter();
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const fetchService = async () => {
            try {
                const response = await axios.get(`/api/services/${slug}`);
                setService(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Erreur lors du chargement du service');
                console.error('Erreur:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchService();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
                    <p>{error}</p>
                    <button
                        onClick={() => router.back()}
                        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                    >
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md">
                    <p>Service non trouvé</p>
                    <button
                        onClick={() => router.push('/services')}
                        className="mt-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-sm"
                    >
                        Voir tous les services
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* En-tête avec bouton de retour */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">{service.title}</h1>
                        <button
                            onClick={() => router.back()}
                            className="text-white hover:text-blue-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                    </div>

                    {/* Contenu principal */}
                    <div className="p-6 md:p-8">
                        {/* Image du service */}
                        {service.icon && (
                            <div className="mb-8 flex justify-center">
                                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${service.icon}`}
                                        alt={service.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-opacity duration-300 hover:opacity-90"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/default-service.jpg';
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Statut du service */}
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-6 ${service.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {service.is_active ? 'Actif' : 'Inactif'}
                        </div>

                        {/* Contenu textuel */}
                        <div className="prose max-w-none">
                            <p className="text-gray-700 whitespace-pre-line">{service.content}</p>
                        </div>

                        {/* Métadonnées */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center text-sm text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Créé le: {new Date(service.created_at).toLocaleDateString()}
                            </div>
                            {service.updated_at && (
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Modifié le: {new Date(service.updated_at).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                        <button
                            onClick={() => router.push('/services')}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Retour à la liste
                        </button>
                        <button
                            onClick={() => router.push(`/services/${id}/edit`)}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Modifier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePreview;