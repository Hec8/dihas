'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from '@/lib/axios';
import Image from 'next/image';

export default function Services() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dynamicServices, setDynamicServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const defaultServices = [
        {
            title: "Développement Web",
            content: "Solutions web sur mesure",
            icon: "/assets/web.png"
        },
        {
            title: "Développement Mobile",
            content: "Applications iOS et Android",
            icon: "/assets/mobile.png"
        },
        {
            title: "Design UI/UX",
            content: "Interfaces utilisateur optimisées",
            icon: "/assets/design.png"
        }
    ];

    const industries = [
        { icon: "🏭", name: "Industrie technologique", isEmoji: true },
        { icon: "/assets/aliment.png", name: "Industrie alimentaire", isEmoji: false },
        { icon: "/assets/finance.png", name: "Industrie financière", isEmoji: false },
        { icon: "/assets/aliment.png", name: "Industrie d'assurance", isEmoji: false },
        { icon: "🚗", name: "Industrie de transport", isEmoji: true },
        { icon: "/assets/sante.png", name: "Industrie de santé, beauté", isEmoji: false },
        { icon: "/assets/educ.png", name: "Industrie de logistique", isEmoji: false },
        { icon: "/assets/educ.png", name: "Industrie d'éducation", isEmoji: false },
        { icon: "/assets/industrie.png", name: "Industrie de commerce en ligne", isEmoji: false },
    ];

    const duplicatedIndustries = [...industries, ...industries];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % industries.length);
        }, 3000);

        const fetchServices = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get('/api/services');
                if (response.status === 200) {
                    if (response.data.data && response.data.data.length > 0) {
                        setDynamicServices(response.data.data);
                    } else {
                        setError("Aucun service disponible pour le moment :)");
                    }
                } else {
                    setError("Aucun service disponible pour le moment :)");
                }
            } catch (error) {
                console.error('Erreur API:', error);
                setError("Échec du chargement.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
        return () => clearInterval(timer);
    }, [industries.length]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.8
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.3
            }
        }
    };

    const IndustryIcon = ({ industry }) => {
        if (industry.isEmoji) {
            return <span className="text-2xl">{industry.icon}</span>;
        }
        return (
            <div className="w-8 h-8 relative">
                <Image
                    src={industry.icon}
                    alt={industry.name}
                    fill
                    className="object-contain"
                />
            </div>
        );
    };

    const ServiceCard = ({ service, index }) => (
        <motion.div
            key={`service-${index}`}
            className="bg-white rounded-lg p-6 md:p-8 text-center shadow-lg w-full max-w-sm mx-auto"
            variants={cardVariants}
            whileHover="hover"
        >
            <motion.div
                className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
                {service.icon && (
                    <div className="relative w-full h-full">
                        <Image
                        src={service.icon.startsWith('http')
                            ? service.icon.replace('http://', 'https://')
                            : `${process.env.NEXT_PUBLIC_API_URL}${service.icon}`
                        }
                        alt={service.title}
                        width={100}
                        height={100}
                        className="object-contain"
                        onError={(e) => {
                            e.currentTarget.src = '/default-service.png';
                        }}
                        />
                    </div>
                )}
            </motion.div>
            <h3 className="text-xl font-bold text-green-800 mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.content}</p>
            <motion.button
                className="bg-[#FFA500] text-white px-6 py-2 rounded-full hover:bg-[#FF8C00] transition-colors mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            // onClick={() => router.push(`/services/${service.slug}`)}
            >
                En savoir plus
            </motion.button>
        </motion.div>
    );

    return (
        <section className="py-16 px-4 bg-[#E5F2EC]">
            {/* Titre */}
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Nos services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Explorez nos solutions soigneusement conçues pour répondre à vos besoins spécifiques
                    et vous accompagner efficacement dans vos projets
                </p>
            </div>

            {/* Cartes de services */}
            <div className="container mx-auto px-4">
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFA500]"></div>
                    </div>
                ) : error && (
                    <div className="text-center text-orange-600 py-4 mb-8">
                        {error}
                    </div>
                )}

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {(dynamicServices).map((service, index) => (
                        <ServiceCard key={`service-card-${index}`} service={service} index={index} />
                    ))}
                </motion.div>
            </div>

            {/* Industries d'intervention */}
            <div className="text-center mt-20 mb-8">
                <h3 className="text-2xl font-bold mb-4">Nos industries d'interventions</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Nous proposons des services spécialisés et adaptés à chaque type d'intervention,
                    afin de garantir des solutions efficaces et ciblées selon vos besoins
                </p>
            </div>

            {/* Animation industries */}
            <div className="flex flex-col gap-4 md:gap-8">
                {/* Ligne vers la droite */}
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex gap-2 md:gap-4 py-2 md:py-4"
                        animate={{ x: ["-100%", "0%"] }}
                        transition={{
                            x: { duration: 15, repeat: Infinity, ease: "linear" }
                        }}
                    >
                        {duplicatedIndustries.map((industry, index) => (
                            <div
                                key={`right-${index}`}
                                className="flex-shrink-0 bg-white border-2 border-green-800 px-3 md:px-6 py-2 md:py-3 rounded-full shadow-md flex items-center gap-2 whitespace-nowrap text-sm md:text-base"
                            >
                                <IndustryIcon industry={industry} />
                                <span className="text-green-800 font-medium">{industry.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Ligne vers la gauche */}
                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex gap-2 md:gap-4 py-2 md:py-4"
                        animate={{ x: ["0%", "-100%"] }}
                        transition={{
                            x: { duration: 15, repeat: Infinity, ease: "linear" }
                        }}
                    >
                        {duplicatedIndustries.map((industry, index) => (
                            <div
                                key={`left-${index}`}
                                className="flex-shrink-0 bg-white border-2 border-green-800 px-3 md:px-6 py-2 md:py-3 rounded-full shadow-md flex items-center gap-2 whitespace-nowrap text-sm md:text-base"
                            >
                                <IndustryIcon industry={industry} />
                                <span className="text-green-800 font-medium">{industry.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}