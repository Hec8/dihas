'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Header from '@/app/(app)/Header';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export default function BlogList({ user }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const { data } = await axios.get('/api/blogs');
            setArticles(data['Liste des articles']);
            setLoading(false);
        } catch (error) {
            toast.error('Erreur lors du chargement des articles');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return;

        try {
            await axios.delete(`/api/blog/delete/${id}`);
            toast.success('Article supprimé avec succès');
            fetchArticles();
        } catch (error) {
            toast.error('Erreur lors de la suppression');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: fr });
    };

    const handleValidate = async (id) => {
        try {
            await axios.put(`/api/blog/validate/${id}`, { statut: 'validé' });
            toast.success('Article validé');
            fetchArticles();
        } catch (error) {
            toast.error('Erreur lors de la validation');
        }
    };

    const handleReject = async (id, note) => {
        const rejectionNote = prompt('Note de correction:', '');
        if (rejectionNote) {
            try {
                await axios.put(`/api/blog/validate/${id}`, {
                    statut: 'renvoyé',
                    note: rejectionNote
                });
                toast.success('Article renvoyé avec notes');
                fetchArticles();
            } catch (error) {
                toast.error('Erreur lors du rejet');
            }
        }
    };

    return (
        <>
            <Header title="Gestion des articles" />
            <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Liste des articles</h2>
                        <button
                            onClick={() => router.push('/blog-manage/create')}
                            className="px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Créer un article
                        </button>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {loading ? (
                            <div className="p-6 text-center">Chargement...</div>
                        ) : articles.length === 0 ? (
                            <div className="p-6 text-center">Aucun article disponible</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auteur</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {articles.map((article) => (
                                            <tr key={article.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {article.image && (
                                                        <img
                                                            src={`http://localhost:8000${article.image}`}
                                                            alt={article.titre}
                                                            className="h-12 w-12 rounded-md object-cover"
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{article.titre}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-2">{article.resume}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{article.writer}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${article.statut === 'validé'
                                                            ? 'bg-green-100 text-green-800'
                                                            : article.statut === 'renvoyé'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-gray-100 text-blue-800'
                                                            }`}>
                                                            {article.statut === 'en_cours' ? 'En cours' : article.statut}
                                                        </span>

                                                        {article.statut === 'renvoyé' && article.note && (
                                                            <span className="text-xs text-red-500 whitespace-normal max-w-[150px] truncate" title={article.note}>
                                                                {article.note}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {formatDate(article.created_at)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-4">
                                                        <Link
                                                            href={`/blog-manage/${article.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                            title="Voir l'article"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </Link>
                                                        <Link
                                                            href={`/blog-manage/edit/${article.id}`}
                                                            passHref
                                                            legacyBehavior
                                                        >
                                                            <a className="inline-block text-green-600 bg-gray-300 px-3 py-1.5 rounded hover:text-green-800" title="Éditer">
                                                                <Pencil />
                                                            </a>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(article.id)}
                                                            className="text-white hover:text-red-800 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-s bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                            title="Supprimer"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                        {user?.role === 'super_admin' && article.statut !== 'validé' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleValidate(article.id)}
                                                                    className="text-white bg-green-600 hover:bg-green-700 ..."
                                                                >
                                                                    Valider
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(article.id)}
                                                                    className="text-white bg-yellow-500 hover:bg-yellow-600 ..."
                                                                >
                                                                    Renvoyer
                                                                </button>
                                                            </>
                                                        )}
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