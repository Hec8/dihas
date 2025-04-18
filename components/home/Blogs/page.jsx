'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Blogs() {
    const [currentPage, setCurrentPage] = useState(0);
    const [visibleCards, setVisibleCards] = useState([]);
    const cardsRef = useRef([]);
    const blogsPerPage = 4;

    const blogs = [
        {
            id: 1,
            title: "La Transformation Digitale",
            description: "Levier pour l'innovation et l'efficacité des entreprises",
            image: "/assets/transformation_digitale.png",
            date: "2025/05/10",
        },
        {
            id: 2,
            title: "Tendances du marché",
            description: "Prévisions et innovations dans le secteur du...",
            image: "/assets/Tendances.png",
            date: "2025/05/08",
        },
        {
            id: 3,
            title: "Stratégies marketing digital",
            description: "Les meilleures pratiques pour une stratégie réussie",
            image: "/assets/marketing.png",
            date: "2025/05/12",
        },
        {
            id: 4,
            title: "Stratégies marketing digital",
            description: "Les meilleures pratiques pour une stratégie réussie",
            image: "/assets/marketing.png",
            date: "2025/05/12",
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cardId = entry.target.getAttribute('data-id');
                        setVisibleCards((prev) => [...prev, cardId]);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px'
            }
        );

        cardsRef.current.forEach((card) => {
            if (card) {
                observer.observe(card);
            }
        });

        return () => {
            cardsRef.current.forEach((card) => {
                if (card) {
                    observer.unobserve(card);
                }
            });
        };
    }, [currentPage]);

    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const startIndex = currentPage * blogsPerPage;
    const displayedBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

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
                    Plongez dans nos blogs pour découvrir des sujets passionnants, des conseils
                    pratiques et les dernières tendances qui inspirent et informent
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
                    {displayedBlogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                            data-id={blog.id}
                            className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-700 opacity-0 translate-y-20 hover:shadow-xl ${visibleCards.includes(blog.id.toString()) ? 'opacity-100 translate-y-0' : ''
                                }`}
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative h-[180px] sm:h-[200px] w-full overflow-hidden">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 25vw"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">
                                    {blog.title}
                                </h3>
                                <p className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 text-gray-600">
                                    {blog.description}
                                </p>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs sm:text-sm text-gray-500">Publié le :</span>
                                    <span className="text-xs sm:text-sm text-gray-500 ml-2 truncate max-w-[120px]">
                                        {blog.date}
                                    </span>
                                </div>
                                <motion.button
                                    className="w-full py-2 px-3 sm:px-4 border-2 font-semibold border-[#0F6B42] text-[#0F6B42] rounded-lg hover:bg-[#FF9F1C] hover:text-white hover:border-transparent active:border-transparent active:bg-[#FF9F1C] active:text-white transition-all duration-300 text-xs sm:text-sm md:text-base"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Lire plus
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center items-center mt-12 sm:mt-16 md:mt-24 lg:mt-32">
                    <motion.button
                        onClick={prevPage}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0F6B42] flex items-center justify-center group hover:bg-[#0F6B42] transition-all duration-300 bg-white mr-4"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#0F6B42] group-hover:text-white transition-colors"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </motion.button>
                    <motion.button
                        onClick={nextPage}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0F6B42] flex items-center justify-center group hover:bg-[#0F6B42] transition-all duration-300 bg-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#0F6B42] group-hover:text-white transition-colors"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </motion.button>
                </div>
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
