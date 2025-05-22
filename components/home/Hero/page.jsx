'use client';

import Link from 'next/link';

export default function Hero() {
    return (
        <section className="bg-green-800 text-white py-16 mt-12">
            {/* Animation de fond */}
            <div className="area absolute inset-0">
                <ul className="circles">
                    {[...Array(10)].map((_, index) => (
                        <li key={index}></li>
                    ))}
                </ul>
            </div>
            <div className="container mx-auto px-2 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Partie gauche avec le texte */}
                    <div className="w-full md:w-1/2 mb-10 md:mb-0 ml-12">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                            Obtiens la version 1.0 <br />  
                            de ton application<br /> 
                            en seulement <span className='text-white' style={{ textDecoration: 'wavy underline orange 4px', textUnderlineOffset: '4px' }}>30 jours</span>
                        </h1><br />
                        <p className="text-sm mb-3 font-semibold text-white max-w-md">
                           Pour une startup qui grandit, tout commence ici
                        </p>
                        
                        <div className="mb-4 max-w-md">
                            <ul className="space-y-2">
                                <li className="flex items-center text-xs text-gray-200">
                                    <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Interface moderne et intuitive
                                </li>
                                <li className="flex items-center text-xs text-gray-200">
                                    <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Expérience utilisateur fluide
                                </li>
                                <li className="flex items-center text-xs text-gray-200">
                                    <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Développement traditionnel
                                </li>
                                <li className="flex items-center text-xs text-gray-200">
                                    <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Conception à moindre coût
                                </li>
                                <li className="flex items-center text-xs text-gray-200">
                                    <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Landing page offertes
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mr-10">
                            <Link
                                href="/contact"
                                className="bg-[#FFA500] text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            >
                                Appel pour commencer
                            </Link>
                        </div>
                    </div>

                    {/* Partie droite pour la vidéo */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-video rounded-md overflow-hidden">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover rounded-md"
                            >
                                <source src="/assets/video.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
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
        </section>
    );
}
