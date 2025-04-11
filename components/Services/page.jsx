'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Services() {
    const [currentIndex, setCurrentIndex] = useState(0);

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
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Développement Web */}
                    <motion.div
                        className="bg-white rounded-lg p-6 md:p-8 text-center shadow-lg w-full max-w-sm mx-auto"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <motion.div
                            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <Image
                                src="/assets/web.png"
                                alt="Développement Web"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </motion.div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Développement</h3>
                        <p className="text-gray-600 mb-4">Web</p>
                        <motion.button
                            className="bg-[#FFA500] text-white px-6 py-2 rounded-full hover:bg-[#FF8C00] transition-colors mt-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            En savoir plus
                        </motion.button>
                    </motion.div>

                    {/* Développement Mobile */}
                    <motion.div
                        className="bg-white rounded-lg p-6 md:p-8 text-center shadow-lg w-full max-w-sm mx-auto"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <motion.div
                            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            <Image
                                src="/assets/mobile.png"
                                alt="Développement Mobile"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </motion.div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Développement</h3>
                        <p className="text-gray-600 mb-4">Mobile</p>
                        <motion.button
                            className="bg-[#FFA500] text-white px-6 py-2 rounded-full hover:bg-[#FF8C00] transition-colors mt-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            En savoir plus
                        </motion.button>
                    </motion.div>

                    {/* Design */}
                    <motion.div
                        className="bg-white rounded-lg p-6 md:p-8 text-center shadow-lg w-full max-w-sm mx-auto"
                        variants={cardVariants}
                        whileHover="hover"
                    >
                        <motion.div
                            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1.8, duration: 0.5 }}
                        >
                            <Image
                                src="/assets/design.png"
                                alt="Design"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </motion.div>
                        <h3 className="text-xl font-bold text-green-800 mb-2">Design</h3>
                        <p className="text-gray-600 mb-4">UI, UX et Identité de marque</p>
                        <motion.button
                            className="bg-[#FFA500] text-white px-6 py-2 rounded-full hover:bg-[#FF8C00] transition-colors mt-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            En savoir plus
                        </motion.button>
                    </motion.div>
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
