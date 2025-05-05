'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast, { Toaster } from 'react-hot-toast';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';

export default function BlogList() {
    const { user } = useAuth();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data } = await axios.get('/api/services/all');
            setServices(data['Liste des services']);
            setLoading(false);
        } catch (error) {
            toast.error('Erreur lors du chargement des services');
            setLoading(false);
        }
    };

    const handleDelete = async (services) => {
        if (!confirm('Voulez-vous vraiment supprimer ce service ?')) return;

        try {
            await axios.delete(`/api/services/${services}`);
            toast.success('Service supprimé avec succès');
            fetchServices();
        } catch (error) {
            toast.error('Erreur lors de la suppression');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: fr });
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        {/* Bouton affiché seulement si l'utilisateur n'est PAS createur_contenu */}
                        {user?.role !== 'createur_contenu' && (
                            <button className='text-green-600 border border-green-600 bg-transparent px-6 py-4 rounded-xl hover:bg-green-600 hover:text-white'>
                                Confirmation des services
                            </button>
                        )}

                        <button
                            onClick={() => router.push('/service-manage/create')}
                            className="px-6 py-4 bg-green-700 text-white rounded-xl hover:bg-green-700 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Ajouter un service
                        </button>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {loading ? (
                            <div className="p-6 text-center">Chargement...</div>
                        ) : services.length === 0 ? (
                            <div className="p-6 text-center">Aucun service disponible</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-black tracking-wider">Icon</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-black tracking-wider">Titre</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-black tracking-wider">Contenu</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-black tracking-wider">Statut</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-black tracking-wider">Date de création</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-black tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {services.map((service) => (
                                            <tr key={service.id} className="hover:bg-white">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {service.icon && (
                                                        <img
                                                            src={`http://localhost:8000${service.icon}`}
                                                            alt={service.title}
                                                            className="h-12 w-12 rounded-md object-fill"
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{service.content}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${service.is_active === true
                                                            ? 'bg-green-100 text-green-800'
                                                            : service.is_active === false
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-gray-100 text-blue-800'
                                                            }`}>
                                                            {service.is_active === true ? 'Actif' : service.is_active === false ? 'Inactif' : 'En cours'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {formatDate(service.created_at)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-4">
                                                        <Link
                                                            href={`/service-manage/${service.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center px-2 py-2 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-green-700 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                            title="Voir le service"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </Link>
                                                        <Link
                                                            href={`/service-manage/edit/${service.id}`}
                                                            className="inline-block text-white bg-yellow-500 px-2 py-1.5 rounded-lg hover:text-green-800"
                                                            title="Éditer"
                                                        >
                                                            <Pencil />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(service.id)}
                                                            className="text-white hover:text-red-800 inline-flex items-center px-2 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-s bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                            title="Supprimer"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}