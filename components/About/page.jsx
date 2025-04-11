'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        {
            number: 7,
            label: "Année d'expérience"
        },
        {
            number: 24,
            label: "Membres de l'équipe"
        },
        {
            number: 104,
            label: "Clients Satisfaits"
        },
        {
            number: 231,
            label: "Projets complets"
        }
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="bg-green-700 py-16" ref={ref}>
            <div className="container mx-auto px-4">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index} 
                            className="relative"
                            variants={itemVariants}
                        >
                            {index < stats.length - 1 && (
                                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-white/30"></div>
                            )}
                            <div className="text-4xl font-bold mb-2">
                                {isInView && (
                                    <CountUp
                                        end={stat.number}
                                        duration={2}
                                        suffix="+"
                                        separator=","
                                    />
                                )}
                            </div>
                            <div className="text-lg">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
