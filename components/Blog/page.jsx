'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Newsletter from '@/components/Newsletter/page';

export default function Blog() {
    const [searchQuery, setSearchQuery] = useState('');

    const blogPosts = [
        {
            id: 1,
            title: 'La Transformation Digitale',
            description: 'Levier pour l\'innovation et l\'efficacité des entreprises',
            image: '/assets/transformation_digitale.png',
            date: '2024/02/20',
            author: 'admin@diha.tech'
        },
        {
            id: 2,
            title: 'Tendances du marché',
            description: 'Évolution et innovations dans le secteur du...',
            image: '/assets/Tendances.png',
            date: '2024/02/20',
            author: 'admin@diha.tech'
        },
        {
            id: 3,
            title: 'Stratégies marketing digital',
            description: 'Les meilleures pratiques pour une stratégie fiscale',
            image: '/assets/marketing.png',
            date: '2024/02/20',
            author: 'admin@diha.tech'
        },
        {
            id: 4,
            title: 'Stratégies marketing digital',
            description: 'Les meilleures pratiques pour une stratégie fiscale',
            image: '/assets/marketing.png',
            date: '2024/02/20',
            author: 'admin@diha.tech'
        },
        {
            id: 5,
            title: 'Stratégies marketing digital',
            description: 'Les meilleures pratiques pour une stratégie fiscale',
            image: '/assets/blog6.png',
            date: '2024/02/20',
            author: 'admin@diha.tech'
        },
        {
            id: 6,
            title: 'Stratégies marketing digital',
            description: 'Les meilleures pratiques pour une stratégie fiscale',
            image: '/assets/notre_mission.png',
        },
        {
            id: 7,
            title: 'Stratégies marketing digital',
            description: 'Les meilleures pratiques pour une stratégie fiscale',
            image: '/assets/blog7.png',
        },
        {
            id: 8,
            title: 'Stratégies marketing digital',
            description: 'Les meilleures pratiques pour une stratégie fiscale',
            image: '/assets/blog8.png',
        }
    ];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <main className="min-h-screen bg-[#E5F2EC]">
            {/* Hero Section */}
            <section className="relative bg-green-800 text-white py-16 mt-16 overflow-hidden">
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
                        <div className="w-full md:w-1/2 mb-6 md:mb-0 ml-8">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                                Tout ce que vous avez <br />
                                toujours voulu savoir <br />
                                sur les activités <br />
                                de Diha&apos;s
                            </h1><br />
                            <p className="text-sm mb-6 text-white max-w-md">
                                Ressources pour les entrepreneurs qui vendent,
                                achètent et développent des entreprises en ligne.
                            </p><br />
                            <div className="relative max-w-md mr-8">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    placeholder="Rechercher..."
                                    className="w-full px-6 py-3 rounded bg-transparent border-2 border-white text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
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
                            <div className="relative w-full md:w-[80%] h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-white">
                                <Image
                                    src="/assets/Axelle2.png"
                                    alt="Blog Hero"
                                    fill
                                    className="object-contain md:object-contain rounded-md"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="text-2xl font-bold mb-12 border-l-4 border-[#FFA500] pl-4 mx-4">Dernières nouvelles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                        {blogPosts
                            .filter(post =>
                                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                post.description.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((post) => (
                                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                                    <div className="relative h-48">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-lg mb-3">{post.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <span>Publié le : {post.date}</span>
                                            <span>{post.author}</span>
                                        </div>
                                        <button className="w-full bg-[#FFA500] text-white px-4 py-2 rounded-full text-sm hover:bg-[#FF8C00] transition-colors">
                                            Lire plus
                                        </button>
                                    </div>
                                </div>
                            ))}
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