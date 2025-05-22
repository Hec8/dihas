'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Image from 'next/image';
import { useAuth } from '@/hooks/auth';

export default function BlogArticle() {
    const { slug } = useParams();
    const router = useRouter();
    const { user } = useAuth({ middleware: 'auth' });
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (!user) return; // Attendre que l'utilisateur soit chargé
                const { data } = await axios.get(`/api/blog/preview/${slug}`);
                setArticle(data.article);
            } catch (error) {
                console.error('Erreur complète:', error);
                toast.error(error.response?.data?.message || "Article non trouvé");
                if (error.response?.status === 401) {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchArticle();
    }, [slug, user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: fr });
    };

    // Fonction pour formater le contenu avec des sauts de ligne
    const formatContent = (content) => {
        if (!content) return '';
        return content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
                {paragraph}
            </p>
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Article non trouvé</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />

            {/* Header avec bouton retour */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <button
                        onClick={() => router.push('/blog-manage')}
                        className="flex items-center text-green-800 hover:text-green-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Retour
                    </button>
                </div>
            </header>

            {/* Contenu de l'article */}
            <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <article className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {/* Image de l'article - Version URL externe uniquement */}
                        {article.image && (
                            <div className="relative h-64 md:h-96 w-full">
                                <Image
                                    src={article.image}
                                    alt={article.titre || "Image d'illustration"}
                                      fill
                                    className="object-cover"
                                    priority
                                    unoptimized={true}
                                    onError={(e) => {
                                        e.currentTarget.src = '/assets/default-blog.png';
                                    }}
                                />
                            </div>
                        )}
                    {/* Entête de l'article */}
                    <div className="px-6 py-4">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{article.titre}</h1>
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <span>Par {article.writer}</span>
                            <span className="mx-2">•</span>
                            <span>{formatDate(article.created_at)}</span>
                        </div>
                        <p className="text-lg text-gray-600 mb-6">{article.resume}</p>
                    </div>

                    <div
                        className="px-6 pb-8 text-justify"
                        dangerouslySetInnerHTML={{ __html: article.contenu }}
                    ></div>

                </article>
            </main>
        </div>
    );
}