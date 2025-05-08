'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter, useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';

export default function EditProduct() {
    const { id } = useParams();
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
        is_published: true,
        homepage_image: null,
        logo: null,
        detail_images: [],
        features: []
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
            const files = Array.from(e.target.files);
            if (files.length > 5) {
                toast.error('Vous ne pouvez pas télécharger plus de 5 images de détail');
                return;
            }
            setFormData(prev => ({
                ...prev,
                detail_images: files
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: e.target.files[0]
            }));
        }
    };

    const handleFeatureChange = (index, value) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((feature, i) => 
                i === index ? { ...feature, value } : feature
            )
        }));
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, { type: '', label: '', value: '' }]
        }));
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();
            
            Object.keys(formData).forEach(key => {
                if (key !== 'homepage_image' && key !== 'logo' && key !== 'detail_images' && key !== 'features') {
                    formDataToSend.append(key, formData[key]);
                }
            });

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

            formData.features.forEach(feature => {
                if (feature.type && feature.value) {
                    formDataToSend.append(feature.type, feature.value);
                }
            });

            await axios.put(`/api/products/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Produit mis à jour avec succès');
            router.push('/product-manage');
        } catch (error) {
            toast.error('Erreur lors de la mise à jour');
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
                                {/* Images */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Image principale
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
                                            Images de détail (max 5)
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
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-medium text-gray-900">Caractéristiques détaillées</h3>
                                        <button
                                            type="button"
                                            onClick={addFeature}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-800"
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Ajouter une caractéristique
                                        </button>
                                    </div>
                                    {formData.features.map((feature, index) => (
                                        <div key={index} className="flex gap-4 items-start">
                                            <div className="flex-1">
                                                <select
                                                    value={feature.type}
                                                    onChange={(e) => {
                                                        const newFeatures = [...formData.features];
                                                        newFeatures[index] = {
                                                            ...feature,
                                                            type: e.target.value,
                                                            label: e.target.options[e.target.selectedIndex].text
                                                        };
                                                        setFormData(prev => ({ ...prev, features: newFeatures }));
                                                    }}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                                >
                                                    <option value="">Sélectionner un type</option>
                                                    <option value="why_buy">Pourquoi acheter</option>
                                                    <option value="main_features">Fonctionnalités principales</option>
                                                    <option value="admin_features">Fonctionnalités admin</option>
                                                    <option value="economic_model">Modèle économique</option>
                                                    <option value="data_security">Sécurité des données</option>
                                                </select>
                                            </div>
                                            <div className="flex-[2]">
                                                <textarea
                                                    value={feature.value}
                                                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                    rows="3"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                                    placeholder="Description de la caractéristique"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(index)}
                                                className="mt-1 inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ))}
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