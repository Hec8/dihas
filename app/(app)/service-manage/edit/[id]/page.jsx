'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth'; // Importez votre hook useAuth
import toast, { Toaster } from 'react-hot-toast';

export default function EditService() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        is_active: true,
        icon: null
    });
    const [currentIcon, setCurrentIcon] = useState('');
    const [iconPreview, setIconPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const params = useParams();
    const { user } = useAuth();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`/api/services/${params.id}`); // Utilisation de params.id
                const service = response.data;
                setFormData({
                    title: service.title,
                    content: service.content,
                    is_active: service.is_active,
                    icon: null,
                });
                if (service.icon) {
                    setCurrentIcon(`http://localhost:8000${service.icon}`);
                }
            } catch (error) {
                toast.error('Erreur lors du chargement du service');
                router.push('/service-manage');
            }
        };

        if (params.id) { // Vérification que l'ID existe
            fetchService();
        }
    }, [params.id, router]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            setFormData(prev => ({
                ...prev,
                [name]: file
            }));

            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setIconPreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setIconPreview(currentIcon);
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('content', formData.content);
            submitData.append('is_active', formData.is_active ? '1' : '0');

            if (formData.icon && formData.icon instanceof File) {
                submitData.append('icon', formData.icon);
            }

            // Utilisez PUT avec _method pour Laravel
            const response = await axios.post(`/api/services/${params.id}`, submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-HTTP-Method-Override': 'PUT' // Alternative à _method
                }
            });

            toast.success('Service modifié avec succès');
            router.push('/service-manage');
        } catch (error) {
            console.error('Erreur détaillée:', error.response?.data);
            toast.error(error.response?.data?.message || 'Erreur lors de la modification');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Titre *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Contenu *
                                    </label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        rows="6"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Icône du service (optionnel)
                                    </label>
                                    <input
                                        type="file"
                                        name="icon"
                                        onChange={handleChange}
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-green-50 file:text-green-700
                                            hover:file:bg-green-100"
                                    />
                                    {(iconPreview || currentIcon) && (
                                        <div className="mt-2">
                                            <img
                                                src={iconPreview || currentIcon}
                                                alt="Icône du service"
                                                className="w-24 h-24 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Afficher la checkbox uniquement pour les super admins */}
                                {user?.role === 'super_admin' && (
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            checked={formData.is_active}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-green-800 focus:ring-green-800 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">
                                            Service actif
                                        </label>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/service-manage')}
                                        className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 