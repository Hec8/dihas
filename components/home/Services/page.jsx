'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from '@/lib/axios';
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function Services() {
    const [dynamicServices, setDynamicServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get('/api/services');
                if (response.status === 200) {
                    if (response.data.data && response.data.data.length > 0) {
                        setDynamicServices(response.data.data);
                    } else {
                        setError("Nos services seront bientôt disponibles :)");
                    }
                } else {
                    setError("Nos services seront bientôt disponibles :)");
                }
            } catch (error) {
                console.error('Erreur API:', error);
                setError("Échec du chargement.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

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
                            src={service.icon}
                            alt={service.title}
                            width={100}
                            height={100}
                            className="object-contain"
                            onError={(e) => {
                                e.currentTarget.src = '/assets/default-service.png';
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
            onClick={() => router.push('/services')}
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
                    Explore nos solutions soigneusement conçues pour répondre à tes besoins spécifiques
                    et t'accompagner efficacement dans tes projets
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
        </section>
    );
}