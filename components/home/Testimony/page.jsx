'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Testimony() {
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirection] = useState('right');

    const testimonials = [
        {
            id: 1,
            name: "SPACEBOOST",
            role: "Romaric KOUNDE, utilisateur",
            image: "/assets/Romaric.jpeg",
            content: "Grâce à Diha's, SPACEBOOST est devenue une plateforme incontournable pour les campagnes publicitaires basées sur l'influence. Leur expertise a permis de mobiliser efficacement les influenceurs et de maximiser l'impact de nos campagnes marketing"
        },
        {
            id: 2,
            name: "Académie Internationale de Freelancing (AIF)",
            role: "Sabine MoFOA, utilisatrice",
            image: "/assets/Sabine.jpeg",
            content: "Diha's a joué un rôle clé dans le développement d'AIF. Grâce à leur expertise, notre plateforme de formation offre désormais une expérience utilisateur optimisée, aidant les jeunes à découvrir leur voie et à atteindre leurs objectifs professionnels"
        }
    ];

    const nextPage = () => {
        setSlideDirection('left');
        setCurrentPage((prev) => (prev + 1) % testimonials.length);
    };

    const prevPage = () => {
        setSlideDirection('right');
        setCurrentPage((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-8 sm:py-12 md:py-16 bg-[#0F6B42] overflow-hidden">
            <div className="w-[94%] max-w-[1200px] mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-3 md:mb-4">Attestations</h2>
                <p className="text-sm sm:text-base md:text-xl text-center text-white mb-12 md:mb-16 max-w-[800px] mx-auto">
                    Découvre les témoignages authentiques de ceux qui nous font confiance et partage leur
                    expérience avec nos services au quotidien
                </p>

                <div className="flex justify-center relative mt-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`bg-white rounded-3xl p-4 sm:p-6 md:p-8 w-[90%] sm:w-[450px] md:w-[500px] absolute transition-all duration-700 transform mt-6
                                ${index === currentPage ? 'opacity-100 translate-x-0' :
                                    slideDirection === 'left' ? 'opacity-0 translate-x-full' : 'opacity-0 -translate-x-full'}`}
                        >
                            <div className="absolute -top-3 -left-3">
                                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" className="sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]">
                                    <path d="M12 25H6.5C5.67157 25 5 24.3284 5 23.5V18C5 11.3726 10.3726 6 17 6H18.5C19.3284 6 20 6.67157 20 7.5V8C20 8.82843 19.3284 9.5 18.5 9.5H17C12.3056 9.5 8.5 13.3056 8.5 18V18.5C8.5 19.3284 9.17157 20 10 20H12C13.6569 20 15 21.3431 15 23V32C15 33.6569 13.6569 35 12 35H3C1.34315 35 0 33.6569 0 32V23C0 21.3431 1.34315 20 3 20H12Z" fill="#FF9F1C" />
                                </svg>
                            </div>
                            <div className="absolute -top-3 -right-3 transform rotate-90">
                                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" className="sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]">
                                    <path d="M12 25H6.5C5.67157 25 5 24.3284 5 23.5V18C5 11.3726 10.3726 6 17 6H18.5C19.3284 6 20 6.67157 20 7.5V8C20 8.82843 19.3284 9.5 18.5 9.5H17C12.3056 9.5 8.5 13.3056 8.5 18V18.5C8.5 19.3284 9.17157 20 10 20H12C13.6569 20 15 21.3431 15 23V32C15 33.6569 13.6569 35 12 35H3C1.34315 35 0 33.6569 0 32V23C0 21.3431 1.34315 20 3 20H12Z" fill="#FF9F1C" />
                                </svg>
                            </div>
                            <div className="absolute -bottom-3 -left-3 transform -rotate-90">
                                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" className="sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]">
                                    <path d="M12 25H6.5C5.67157 25 5 24.3284 5 23.5V18C5 11.3726 10.3726 6 17 6H18.5C19.3284 6 20 6.67157 20 7.5V8C20 8.82843 19.3284 9.5 18.5 9.5H17C12.3056 9.5 8.5 13.3056 8.5 18V18.5C8.5 19.3284 9.17157 20 10 20H12C13.6569 20 15 21.3431 15 23V32C15 33.6569 13.6569 35 12 35H3C1.34315 35 0 33.6569 0 32V23C0 21.3431 1.34315 20 3 20H12Z" fill="#FF9F1C" />
                                </svg>
                            </div>
                            <div className="absolute -bottom-3 -right-3 transform rotate-180">
                                <svg width="30" height="30" viewBox="0 0 40 40" fill="none" className="sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]">
                                    <path d="M12 25H6.5C5.67157 25 5 24.3284 5 23.5V18C5 11.3726 10.3726 6 17 6H18.5C19.3284 6 20 6.67157 20 7.5V8C20 8.82843 19.3284 9.5 18.5 9.5H17C12.3056 9.5 8.5 13.3056 8.5 18V18.5C8.5 19.3284 9.17157 20 10 20H12C13.6569 20 15 21.3431 15 23V32C15 33.6569 13.6569 35 12 35H3C1.34315 35 0 33.6569 0 32V23C0 21.3431 1.34315 20 3 20H12Z" fill="#FF9F1C" />
                                </svg>
                            </div>
                            <div className="absolute -top-12 sm:-top-14 md:-top-16 left-1/2 transform -translate-x-1/2">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={96}
                                    height={96}
                                    className="rounded-full border-4 border-white object-cover w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] md:w-[128px] md:h-[128px]"
                                    priority
                                />
                            </div>
                            <div className="mt-12 sm:mt-14 md:mt-16 text-center">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 line-clamp-1">{testimonial.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 line-clamp-1">{testimonial.role}</p>
                            </div>
                            <div className="relative">
                                <span className="absolute -top-4 -left-2 text-3xl sm:text-4xl md:text-6xl text-[#0F6B42] opacity-20">"</span>
                                <p className="text-sm sm:text-base text-gray-700 text-center relative z-10 px-2 sm:px-4">
                                    {testimonial.content}
                                </p>
                                <span className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 -right-2 text-3xl sm:text-4xl md:text-6xl text-[#0F6B42] opacity-20 transform rotate-180">"</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center mt-[300px] sm:mt-[350px] md:mt-[400px] gap-4">
                    <button
                        onClick={prevPage}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-green-700 flex items-center justify-center bg-white hover:bg-white/10 transition-all duration-300 transform active:scale-90"
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-green-800"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        onClick={nextPage}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-green-700 flex items-center justify-center bg-white hover:bg-white/10 transition-all duration-300 transform active:scale-90"
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-green-800"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideInLeft {
                    from {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }

                @keyframes slideOutLeft {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(-100%);
                        opacity: 0;
                    }
                }

                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .line-clamp-5 {
                    display: -webkit-box;
                    -webkit-line-clamp: 5;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .line-clamp-6 {
                    display: -webkit-box;
                    -webkit-line-clamp: 6;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
}
