'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Header from '@/app/(app)/Header';

export default function CreateProduct() {
    const [formData, setFormData] = useState({
        title: '',
        short_description: '',
        long_description: '',
        location: '',
        type: '',
        industry: '',
        monetization: '',
        estimated_profit: '',
        estimated_revenue: '',
        why_buy: '',
        main_features: '',
        admin_features: '',
        economic_model: '',
        data_security: '',
        is_published: true,
        homepage_image: null,
        logo: null,
        detail_images: []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e, field) => {
        if (field === 'detail_images') {
            setFormData(prev => ({
                ...prev,
                detail_images: Array.from(e.target.files)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: e.target.files[0]
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            
            // Ajouter les champs textuels
            Object.keys(formData).forEach(key => {
                if (key !== 'homepage_image' && key !== 'logo' && key !== 'detail_images') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Ajouter les images
            if (formData.homepage_image) {
                formDataToSend.append('homepage_image', formData.homepage_image);
            }
            if (formData.logo) {
                formDataToSend.append('logo', formData.logo);
            }
            if (formData.detail_images.length > 0) {
                formData.detail_images.forEach((file, index) => {
                    formDataToSend.append(`detail_images[${index}]`, file);
                });
            }

            await axios.post('/api/products', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Produit créé avec succès');
            router.push('/product-manage');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de la création');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header title="Créer un produit" />
            <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Images */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Image principale *
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageChange(e, 'homepage_image')}
                                            className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-green-50 file:text-green-800
                                            hover:file:bg-green-100"
                                            accept="image/*"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Logo
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageChange(e, 'logo')}
                                            className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-green-50 file:text-green-800
                                            hover:file:bg-green-100"
                                            accept="image/*"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Images maquettes
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleImageChange(e, 'detail_images')}
                                            multiple
                                            className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-green-50 file:text-green-800
                                            hover:file:bg-green-100"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>

                                {/* Informations de base */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            Localisation
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Descriptions */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description courte
                                        </label>
                                        <textarea
                                            name="short_description"
                                            value={formData.short_description}
                                            onChange={handleChange}
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description longue
                                        </label>
                                        <textarea
                                            name="long_description"
                                            value={formData.long_description}
                                            onChange={handleChange}
                                            rows="6"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Caractéristiques */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Type
                                        </label>
                                        <input
                                            type="text"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Industrie
                                        </label>
                                        <input
                                            type="text"
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Informations économiques */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Modèle de monétisation
                                        </label>
                                        <input
                                            type="text"
                                            name="monetization"
                                            value={formData.monetization}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Profit estimé
                                        </label>
                                        <input
                                            type="text"
                                            name="estimated_profit"
                                            value={formData.estimated_profit}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Revenu estimé
                                        </label>
                                        <input
                                            type="text"
                                            name="estimated_revenue"
                                            value={formData.estimated_revenue}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Caractéristiques détaillées */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Pourquoi acheter
                                        </label>
                                        <textarea
                                            name="why_buy"
                                            value={formData.why_buy}
                                            onChange={handleChange}
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Fonctionnalités principales
                                        </label>
                                        <textarea
                                            name="main_features"
                                            value={formData.main_features}
                                            onChange={handleChange}
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Fonctionnalités admin
                                        </label>
                                        <textarea
                                            name="admin_features"
                                            value={formData.admin_features}
                                            onChange={handleChange}
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Modèle économique
                                        </label>
                                        <textarea
                                            name="economic_model"
                                            value={formData.economic_model}
                                            onChange={handleChange}
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Sécurité des données
                                        </label>
                                        <textarea
                                            name="data_security"
                                            value={formData.data_security}
                                            onChange={handleChange}
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_published"
                                        checked={formData.is_published}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-green-800 focus:ring-green-800 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">
                                        Publier le produit
                                    </label>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/product-manage')}
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
