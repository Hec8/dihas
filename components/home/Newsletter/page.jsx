'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import axios from '@/lib/axios';

export default function Newsletter() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState(''); // Changé de 'subscribers' à 'email' pour plus de clarté
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const handleSubscribe = async () => {
        if (!email) {
            toast.error("Veuillez entrer une adresse e-mail");
            return;
        }

        try {
            // Créer une instance Axios spécifique pour cette requête
            const instance = axios.create({
                baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://negative-honor-hec8-2159b031.koyeb.app',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                withCredentials: false
            });

            // Faire la requête sans CSRF token
            const { data } = await instance.post('/api/newsletter/subscribe', { email });
            
            toast.success(data.message || "Inscription réussie !");
            setEmail('');
        } catch (error) {
            console.error('Erreur détaillée:', error);
            const message = error.response?.data?.message || error.message || "Erreur lors de l'inscription";
            toast.error(message);
        }
    };

    return (
        <section ref={sectionRef} className="relative overflow-hidden px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" />

            <div className={`bg-[#0F6B42] rounded-3xl p-6 sm:p-8 md:p-12 my-8 sm:my-12 md:my-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                        <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                            <div className="relative w-full aspect-[5/4] max-w-lg mx-auto">
                                <Image
                                    src="/assets/newsletter.png"
                                    alt="Newsletter"
                                    fill
                                    className="rounded-2xl object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                        </div>

                        <div className={`w-full md:w-1/2 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                            <div className="space-y-4 sm:space-y-6">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center md:text-left">
                                    Abonnez-vous à notre <br className="hidden sm:block" />
                                    <span className="text-[#FFA500] text-3xl sm:text-4xl md:text-5xl">NEWSLETTER</span>
                                </h2>
                                <p className="text-white text-base sm:text-lg text-center md:text-left">
                                    Ne manquez aucune de nos nouvelles publications, projets et blogs !
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Laissez votre mail"
                                        className="flex-1 px-4 sm:px-6 py-3 rounded-lg bg-[#0A5835] text-white placeholder-gray-300 border border-transparent focus:border-white focus:outline-none text-base sm:text-lg"
                                    />
                                    <button
                                        onClick={handleSubscribe}
                                        className="px-6 sm:px-8 py-3 bg-[#FFA500] text-white font-semibold rounded-lg transform hover:bg-[#FF9F1C] active:bg-[#FFB52E] active:scale-95 transition-all duration-150 text-base sm:text-lg whitespace-nowrap"
                                    >
                                        S'abonner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}