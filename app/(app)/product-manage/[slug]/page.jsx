'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function ProductPreview() {
    const { slug } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/slug/${slug}`);
                setProduct(data.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Erreur lors du chargement du produit');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Produit non trouvé</p>
            </div>
        );
    }

    // Fonction pour afficher l'image principale ou une image par défaut
    const getMainImageUrl = () => {
        if (product.homepage_image) {
            // Vérifier si c'est déjà une URL complète ou un chemin relatif
            if (typeof product.homepage_image === 'string' && 
                (product.homepage_image.startsWith('https') || product.homepage_image.startsWith('/'))) {
                return product.homepage_image;
            }
            // Si c'est un objet avec une propriété url
            if (product.homepage_image.url) {
                return product.homepage_image.url;
            }
        }
        return '/images/placeholder-product.jpg';
    };

    // Fonction pour afficher les images secondaires
    const getDetailImages = () => {
        if (!product.detail_images || product.detail_images.length === 0) return [];
        // S'assurer que chaque élément a une propriété url
        return product.detail_images.map(img => ({
            url: typeof img === 'string' ? img : (img.url || '')
        }));
    };

    const detailImages = getDetailImages();

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center text-green-800 hover:text-green-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Retour
                </button>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6 bg-gray-50">
                        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {product.short_description}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            {/* Image principale */}
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Image principale</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <div className="relative h-64 w-full">
                                        <Image
                                            src={getMainImageUrl()}
                                            alt={product.title}
                                            fill
                                            className="object-cover rounded-md"
                                            priority
                                        />
                                    </div>
                                </dd>
                            </div>

                            {/* Images détaillées */}
                            {detailImages.length > 0 && (
                                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Images supplémentaires</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {detailImages.map((img, index) => (
                                                <div key={index} className="relative h-40 w-full">
                                                    <Image
                                                        src={img.url}
                                                        alt={`${product.title} - Détail ${index + 1}`}
                                                        fill
                                                        className="object-cover rounded-md cursor-pointer hover:opacity-75 transition-opacity"
                                                        onClick={() => setCurrentImageIndex(index)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </dd>
                                </div>
                            )}

                            {/* Détails du produit */}
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Description complète</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" 
                                    dangerouslySetInnerHTML={{ __html: product.long_description }}>
                                </dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Localisation</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.location}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Type</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.type}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Secteur d'activité</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.industry}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Modèle économique</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.monetization}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Bénéfice estimé</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.estimated_profit}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Revenu estimé</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.estimated_revenue}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Pourquoi acheter ?</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.why_buy}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Fonctionnalités principales</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.main_features}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Fonctionnalités administrateur</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.admin_features}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Modèle économique</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.economic_model}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Sécurité des données</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{product.data_security}</dd>
                            </div>

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Statut</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {product.is_published ? 'Publié' : 'Brouillon'}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => router.push('/product-manage')}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Retour à la liste
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push(`/product-manage/edit/${product.id}`)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-800 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    );
}
