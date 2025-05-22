'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Industries() {
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
        <section className="py-6 px-4 bg-[#E5F2EC]">

            {/* Industries d'intervention */}
            <div className="text-center mt-20 mb-8">
                <h3 className="text-2xl font-bold mb-4">Nos industries d'interventions</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    Nous proposons des services spécialisés et adaptés à chaque type d'intervention,
                    afin de garantir des solutions efficaces et ciblées selon tes besoins
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