'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import axios from '@/lib/axios';
import Link from 'next/link';

export default function Blogs() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/blogs/guest');
                console.log('Response complète:', response);
                console.log('Response data:', response.data);
                
                if (response.data && response.data.blogs) {
                    console.log('Articles trouvés:', response.data.blogs);
                    // Log des URLs d'images
                    response.data.blogs.forEach(article => {
                        console.log(`Article ${article.id} - Image URL:`, article.image);
                    });
                    setArticles(response.data.blogs);
                } else {
                    console.log('Aucun article trouvé dans la réponse');
                    setArticles([]);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des articles:', error);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };



    // Simplifier la pagination pour le moment
    const displayedArticles = articles;

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <section className="w-full py-8 md:py-16 bg-[#f0f7f0] animate-fadeIn">
            <div className="w-[94%] max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 animate-slideDown">
                    Nos Blogs
                </h2>
                <p className="text-sm sm:text-base md:text-xl text-center mb-6 md:mb-8 animate-slideDown animation-delay-200 w-[90%] mx-auto">
                    Plonge dans nos blogs pour découvrir des sujets passionnants, des conseils
                    pratiques et les dernières tendances qui inspirent et informent
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto px-4">
                    {loading ? (
                        // Afficher 2 cartes de chargement
                        [...Array(2)].map((_, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="h-48 bg-gray-200" />
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            </motion.div>
                        ))
                    ) : articles.length > 0 ? (
                        articles.map((article, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -2 }}
                            >
                                {article.image && (
                                    <div className="relative h-[220px] sm:h-[250px] overflow-hidden">
                                        <Image
                                            src={article.image}
                                            alt={article.titre || "Image d'illustration"}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 25vw"
                                            unoptimized={true}
                                            priority={false}
                                            loading="lazy"
                                            onError={(e) => {
                                                console.error('Erreur de chargement image:', article.image);
                                                e.target.src = '/assets/default-blog.png';
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="p-4">
                                    <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">
                                        {article.titre}
                                    </h3>
                                    <p className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-1 text-gray-600">
                                        {article.resume}
                                    </p>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs sm:text-sm text-gray-500">Publié le : {formatDate(article.created_at)}</span>
                                        <span className="text-xs sm:text-sm text-gray-500 ml-2 truncate max-w-[120px]">
                                            {article.writer || 'Admin'}
                                        </span>
                                    </div>
                                    <Link href={`/blog/${article.slug}`}>
                                        <motion.button
                                            className="w-full py-2 px-3 sm:px-4 border-2 font-semibold border-[#0F6B42] text-[#0F6B42] rounded-lg hover:bg-[#FF9F1C] hover:text-white hover:border-transparent active:border-transparent active:bg-[#FF9F1C] active:text-white transition-all duration-300 text-xs sm:text-sm md:text-base"
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Lire plus
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-8 text-gray-500">
                            Aucun article disponible pour le moment
                        </div>
                    )}
                </div>

                {/* Pagination temporairement désactivée */}
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out forwards;
                }

                .animate-slideDown {
                    animation: slideDown 0.6s ease-out forwards;
                }

                .animation-delay-200 {
                    animation-delay: 200ms;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .break-words {
                    word-break: break-word;
                    hyphens: auto;
                }
            `}</style>
        </section>
    );
}
