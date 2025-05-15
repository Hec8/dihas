'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";

export default function Products() {
    const [currentPage, setCurrentPage] = useState(0);
    const [visibleCards, setVisibleCards] = useState([]);
    const productsPerPage = 3;
    const router = useRouter();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const products = [
        {
            id: 1,
            title: "Chantier+ : Application web et mobile prête à vendre",
            description: "Acheter votre application pour collaborer avec les entrepreneurs pour vos travaux de construction",
            image: "/assets/BTP.png",
            link: "liens/produit/Chantier+",
        },
        {
            id: 2,
            title: "RéseauPro : Application web et mobile prête à vendre",
            description: "Obtenez, Réseautez et communiquez plus facilement avec vos proches, amis et partenaires d'affaires",
            image: "/assets/Reseau_pro.png",
            link: "liens/produit/reseaupro",
        },
        {
            id: 3,
            title: "e-Vignette : Application web et mobile prête à vendre",
            description: "Obtenez Cliniq+ et facilitez la gestion des cliniques des médecins et des patients avec des fonctionnalités avancées",
            image: "/assets/e_vignette.png",
            link: "liens/produit/evignette",
        }
    ];

    const totalPages = Math.ceil(products.length / productsPerPage);
    const startIndex = currentPage * productsPerPage;
    const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <motion.section
            className="py-16 bg-[#f0f7f0]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div
                className="container mx-auto px-4"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-4xl font-bold text-center mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Nos produits
                </motion.h2>
                <motion.p
                    className="text-xl text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Découvrez notre gamme de produits innovants conçus pour répondre à vos besoins
                </motion.p>

                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {displayedProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="relative h-[250px] w-full overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-2"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    quality={100}
                                    priority
                                    style={{
                                        objectFit: 'contain',
                                        padding: '8px'
                                    }}
                                />
                            </div>
                            <motion.div
                                className="p-6"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                <button
                                    className="w-full py-2 px-4 border-2 border-[#0F6B42] text-[#0F6B42] rounded-lg hover:bg-[#FF9F1C] hover:text-white hover:border-transparent transition-all duration-300"
                                    onClick={() => window.open(product.link, '_blank')}
                                >
                                    Voir plus
                                </button>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="flex justify-center items-center mt-12 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <button
                        onClick={prevPage}
                        className="w-12 h-12 rounded-full border border-[#0F6B42] flex items-center justify-center group hover:bg-[#0F6B42] transition-all duration-300 bg-white"
                    >
                        <svg
                            className="w-6 h-6 text-[#0F6B42] group-hover:text-white transition-colors"
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
                        className="w-12 h-12 rounded-full border border-[#0F6B42] flex items-center justify-center group hover:bg-[#0F6B42] transition-all duration-300 bg-white"
                    >
                        <svg
                            className="w-6 h-6 text-[#0F6B42] group-hover:text-white transition-colors"
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
                </motion.div>
            </motion.div>
        </motion.section>
    );
}
