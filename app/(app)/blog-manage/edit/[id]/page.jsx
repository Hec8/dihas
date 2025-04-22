'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter, useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Header from '@/app/(app)/Header';

export default function EditBlog() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        titre: '',
        contenu: '',
        writer: '',
        resume: '',
        image: null
    });
    const [currentImage, setCurrentImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            setFormData({
                titre: data.article.titre,
                contenu: data.article.contenu,
                writer: data.article.writer,
                resume: data.article.resume,
                image: null
            });
            setCurrentImage(data.article.image);
        } catch (error) {
            toast.error('Erreur lors du chargement de l\'article');
            router.push('/blog');
        }
    };

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
            formDataToSend.append('titre', formData.titre);
            formDataToSend.append('contenu', formData.contenu);
            formDataToSend.append('writer', formData.writer);
            formDataToSend.append('resume', formData.resume);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const { data } = await axios.post(`/api/blog/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(data.message);
            router.push('/blog');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header title="Éditer l'article" />
            <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Les champs du formulaire (similaires à CreateBlog) */}
                                {/* ... */}

                                {currentImage && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Image actuelle</label>
                                        <img
                                            src={currentImage}
                                            alt="Current"
                                            className="mt-2 h-40 object-cover rounded-md"
                                        />
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => router.push('/blog')}
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