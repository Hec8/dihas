'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Pencil, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';

export default function ProductList() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data.data);
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors du chargement des produits:', error);
            toast.error('Erreur lors du chargement des produits');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return;

        try {
            await axios.delete(`/api/products/${id}`);
            toast.success('Produit supprimé avec succès');
            fetchProducts();
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            toast.error('Erreur lors de la suppression du produit');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy', { locale: fr });
    };

    const getStatusBadge = (isPublished) => {
        return (
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
                {isPublished ? 'Publié' : 'Brouillon'}
            </span>
        );
    };

    return (
        <>
            <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Liste des produits</h2>
                        <button
                            onClick={() => router.push('/product-manage/create')}
                            className="px-6 py-3 bg-green-800 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Ajouter un produit
                        </button>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {loading ? (
                            <div className="p-6 text-center">Chargement des produits...</div>
                        ) : products.length === 0 ? (
                            <div className="p-6 text-center">Aucun produit disponible</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de création</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.homepage_image && (
                                                        <img
                                                            src={product.homepage_image}
                                                            alt={product.title}
                                                            className="h-12 w-12 rounded-md object-cover"
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                    <div className="text-sm text-gray-500 line-clamp-2">{product.short_description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{product.type || 'N/A'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(product.is_published)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(product.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <Link
                                                            href={`/product-manage/${product.slug || product.id}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-green-600 hover:text-green-800 p-1.5 rounded-full hover:bg-green-50"
                                                            title="Voir le produit"
                                                        >
                                                            <Eye className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            href={`/product-manage/edit/${product.id}`}
                                                            className="text-yellow-600 hover:text-yellow-800 p-1.5 rounded-full hover:bg-yellow-50"
                                                            title="Modifier"
                                                        >
                                                            <Pencil className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="text-red-600 hover:text-red-800 p-1.5 rounded-full hover:bg-red-50"
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
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
