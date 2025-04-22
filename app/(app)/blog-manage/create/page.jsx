'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Header from '@/app/(app)/Header';

export default function CreateBlog() {
    const [formData, setFormData] = useState({
        image: null,
        titre: '',
        contenu: '',
        writer: '',
        resume: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.get('/sanctum/csrf-cookie');

            const formDataToSend = new FormData();
            formDataToSend.append('image', formData.image);
            formDataToSend.append('titre', formData.titre);
            formDataToSend.append('contenu', formData.contenu);
            formDataToSend.append('writer', formData.writer);
            formDataToSend.append('resume', formData.resume);

            const { data } = await axios.post('/api/blog/create', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(data.message);
            router.push('/blog-manage');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de la création');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header title="Créer un nouvel article" />
            <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Image *</label>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleImageChange}
                                            className="mt-1 block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-green-50 file:text-green-800
                                          hover:file:bg-green-100"
                                            accept="image/*"
                                            required
                                        /><br />
                                    </div>
                                    <label className="block text-sm font-medium text-gray-700">Titre *</label>
                                    <input
                                        type="text"
                                        name="titre"
                                        value={formData.titre}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Auteur *</label>
                                    <input
                                        type="text"
                                        name="writer"
                                        value={formData.writer}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Résumé *</label>
                                    <textarea
                                        name="resume"
                                        value={formData.resume}
                                        onChange={handleChange}
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contenu *</label>
                                    <textarea
                                        name="contenu"
                                        value={formData.contenu}
                                        onChange={handleChange}
                                        rows={10}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-800 focus:ring focus:ring-green-800 focus:ring-opacity-50"
                                        placeholder="Écrivez votre contenu ici... Utilisez des sauts de ligne pour séparer les paragraphes."
                                        required
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/blog-manage')}
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