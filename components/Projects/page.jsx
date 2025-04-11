'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Projects() {
    const [currentPage, setCurrentPage] = useState(0);
    const projectsPerPage = 3;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            x: -50
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const projects = [
        {
            id: 1,
            title: "Clinique de Renaissance Divine",
            description: [
                "Accès facilité aux soins",
                "Gestion moderne des rendez-vous",
                "Suivi numérique des dossiers médicaux",
                "Communication améliorée patient-personnel"
            ],
            image: "/assets/Clinique.png",
            technologies: ["ReactJS", "NodeJS", "AWS"]
        },
        {
            id: 2,
            title: "Yugu",
            description: [
                "Jus frais et authentiques",
                "Saveurs exotiques variées",
                "Qualité et goût naturel",
                "Pour tous les moments de la journée"
            ],
            image: "/assets/Yugu.png",
            technologies: ["ReactJS", "NodeJS", "AWS"]
        },
        {
            id: 3,
            title: "Académie Freelancing Bénin (AFB)",
            description: [
                "Développement de compétences",
                "Accompagnement des jeunes",
                "Épanouissement professionnel",
                "Atteinte des objectifs personnels"
            ],
            image: "/assets/AFB.png",
            technologies: ["ReactJS", "NodeJS", "AWS"]
        }
    ];

    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const startIndex = currentPage * projectsPerPage;
    const displayedProjects = projects.slice(startIndex, startIndex + projectsPerPage);

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
                    Nos projets
                </motion.h2>
                <motion.p
                    className="text-xl text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Voyez comment nous donnons vie à vos idées en les transformant en projets concrets, innovants
                    et parfaitement adaptés à vos objectifs
                </motion.p>

                <motion.div
                    className="grid md:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {displayedProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="relative h-[250px] w-full overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <motion.div
                                className="p-6"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, i) => (
                                        <motion.span
                                            key={i}
                                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                                            whileHover={{
                                                backgroundColor: "#0F6B42",
                                                color: "white",
                                                scale: 1.05
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                                <ul className="space-y-2 mb-6">
                                    {project.description.map((item, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-center text-gray-600"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <div className="w-2 h-2 rounded-full bg-gray-600 mr-3 flex-shrink-0"></div>
                                            {item}
                                        </motion.li>
                                    ))}
                                </ul>
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
