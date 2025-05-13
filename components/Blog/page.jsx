'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Newsletter from '@/components/home/Newsletter/page';
import axios from '@/lib/axios';

export default function Blog() {
    const [searchQuery, setSearchQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('/api/blogs/guest');
                if (response.data && response.data.blogs) {
                    setArticles(response.data.blogs);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des articles:', error);
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

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredArticles = articles.filter(article =>
        article.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.resume.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#E5F2EC]">
            {/* Hero Section */}
            <section className="relative bg-green-800 text-white py-12 mt-6 overflow-hidden">
                {/* Animation de fond */}
                <div className="area absolute inset-0">
                    <ul className="circles">
                        {[...Array(10)].map((_, index) => (
                            <li key={index}></li>
                        ))}
                    </ul>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between md:gap-2">
                        {/* Partie gauche avec le texte */}
                        <div className="w-full md:w-1/2 md:mb-6 ml-8">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                                Tout ce que vous avez <br />
                                toujours voulu savoir <br />
                                sur les activités <br />
                                de Diha&apos;s
                            </h1><br />
                            <p className="text-lg mb-6 text-white max-w-md">
                                Ressources pour les entrepreneurs qui vendent,
                                achètent et développent des entreprises en ligne.
                            </p><br />
                            <div className="relative max-w-md mr-8">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Rechercher..."
                                    className="w-full px-6 py-3 rounded bg-transparent border-2 border-white/70 text-white placeholder-white/70 focus:outline-none focus:border-white focus:ring-0 transition-colors duration-300"
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Partie droite pour l'image */}
                        <div className="w-full md:w-1/2 relative">
                            <div className="relative w-full h-[400px] md:h-[600px] z-10 translate-x-4 md:translate-x-8 translate-y-6">
                                <Image
                                    src="/assets/Axelle2.png"
                                    alt="Blog Hero"
                                    fill
                                    className="object-contain"
                                    priority
                                    style={{ objectPosition: 'bottom right' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vague décorative en bas */}
                <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 z-20">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="absolute bottom-0 w-full h-full"
                    >
                        <path
                            d="M0,40 
                              C300,100 400,10 600,80 
                              C800,150 1000,20 1200,70 
                              L1200,120 L0,120 Z"
                            className="fill-[#E5F2EC]"
                        />
                    </svg>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-2xl font-bold mb-12 border-l-4 border-[#FFA500] pl-4 mx-4">Dernières nouvelles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
                        {loading ? (
                            // Afficher des cartes de chargement
                            [...Array(4)].map((_, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                                    <div className="relative h-48 bg-gray-200"></div>
                                    <div className="p-6">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                                        </div>
                                        <div className="h-8 bg-gray-200 rounded-full w-full"></div>
                                    </div>
                                </div>
                            ))
                        ) : filteredArticles.length > 0 ? (
                            filteredArticles.map((article) => (
                                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 hover:shadow-xl">
                                    <div className="relative h-[180px] sm:h-[200px] w-full overflow-hidden">
                                        <Image 
                                            src={article.image ? 
                                                (article.image.startsWith('http://') || article.image.startsWith('https://') ? 
                                                    article.image.replace('http://', 'https://') : 
                                                    article.image.startsWith('/') ?
                                                        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://dihas-back.onrender.com'}${article.image}` :
                                                        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://dihas-back.onrender.com'}/images/blogs/${article.image}`
                                                ) : 
                                                '/assets/default-blog.png'
                                            }
                                            alt={article.titre}
                                            fill
                                            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 25vw"
                                            className="object-cover"
                                            priority
                                            onError={(e) => {
                                                console.error('Erreur de chargement image:', article.image);
                                                e.target.src = '/assets/default-blog.png';
                                            }}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-lg mb-3">{article.titre}</h3>
                                        <p className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-1 text-gray-600">{article.resume}</p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span>Publié le : {formatDate(article.created_at)}</span>
                                            <span>{article.writer || 'Admin'}</span>
                                        </div>
                                        <Link href={`/blog/${article.slug}`}>
                                            <button className="w-full bg-[#FFA500] text-white px-4 py-2 rounded-full text-sm hover:bg-[#FF8C00] transition-colors">
                                                Lire plus
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                Aucun article ne correspond à votre recherche
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <Newsletter />

            <style jsx global>{`
                .area {
                    width: 100%;
                    height: 100%;
                }

                .circles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                }

                .circles li {
                    position: absolute;
                    display: block;
                    list-style: none;
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.2);
                    animation: animate 25s linear infinite;
                    bottom: -150px;
                }

                .circles li:nth-child(1) {
                    left: 25%;
                    width: 80px;
                    height: 80px;
                    animation-delay: 0s;
                    animation-duration: 20s;
                    border-radius: 50%;
                }

                .circles li:nth-child(2) {
                    left: 10%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 2s;
                    animation-duration: 12s;
                }

                .circles li:nth-child(3) {
                    left: 70%;
                    width: 40px;
                    height: 40px;
                    animation-delay: 4s;
                    animation-duration: 18s;
                    border-radius: 50%;
                }

                .circles li:nth-child(4) {
                    left: 40%;
                    width: 60px;
                    height: 60px;
                    animation-delay: 0s;
                    animation-duration: 15s;
                }

                .circles li:nth-child(5) {
                    left: 65%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 0s;
                    animation-duration: 14s;
                    border-radius: 50%;
                }

                .circles li:nth-child(6) {
                    left: 75%;
                    width: 110px;
                    height: 110px;
                    animation-delay: 3s;
                    animation-duration: 22s;
                }

                .circles li:nth-child(7) {
                    left: 35%;
                    width: 150px;
                    height: 150px;
                    animation-delay: 7s;
                    animation-duration: 25s;
                    border-radius: 50%;
                }

                .circles li:nth-child(8) {
                    left: 50%;
                    width: 25px;
                    height: 25px;
                    animation-delay: 15s;
                    animation-duration: 17s;
                }

                .circles li:nth-child(9) {
                    left: 20%;
                    width: 15px;
                    height: 15px;
                    animation-delay: 2s;
                    animation-duration: 19s;
                    border-radius: 50%;
                }

                .circles li:nth-child(10) {
                    left: 85%;
                    width: 150px;
                    height: 150px;
                    animation-delay: 0s;
                    animation-duration: 21s;
                }

                @keyframes animate {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                        border-radius: 0;
                    }
                    100% {
                        transform: translateY(-1000px) rotate(720deg);
                        opacity: 0;
                        border-radius: 50%;
                    }
                }
            `}</style>
        </main>
    );
}