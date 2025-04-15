'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef } from 'react'

const ServicesContent = () => {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
        stiffness: 100,
        damping: 30
    })

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const cardVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    }

    const imageSlideIn = {
        initial: { x: -100, opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 20
            }
        }
    }

    const floatingAnimation = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <div className="w-full bg-white">
            {/* Hero Section */}
            <motion.section
                className="relative w-full h-[550px] mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Image de fond avec dégradé */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-[1]" />
                    <Image
                        src="/assets/notre_mission.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Contenu */}
                <div className="relative h-full container mx-auto px-4 flex items-center">
                    {/* Texte */}
                    <motion.div
                        className="max-w-xl text-white z-[2] mt-[-50px] md:mt-0"
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-4 md:mb-8"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            Nos Services
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl opacity-90 leading-relaxed"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 0.9 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Associez-vous à nous pour des solutions web et mobiles sur mesure, alliant design, performance et technologies pour propulser votre activité.
                        </motion.p>
                    </motion.div>

                    {/* Images superposées - Masquées sur mobile */}
                    <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 z-[2]"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div
                            className="relative w-[100px] md:w-[120px] h-[180px] md:h-[220px] rounded-xl overflow-hidden shadow-lg"
                            variants={imageSlideIn}
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            animate={floatingAnimation.animate}
                        >
                            <Image
                                src="/assets/service1.png"
                                alt="Mobile App 1"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            className="relative w-[140px] md:w-[160px] h-[240px] md:h-[280px] rounded-xl overflow-hidden shadow-lg z-20"
                            variants={imageSlideIn}
                            whileHover={{ scale: 1.1 }}
                            animate={floatingAnimation.animate}
                            transition={{ delay: 0.2 }}
                        >
                            <Image
                                src="/assets/service2.png"
                                alt="Desktop App"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            className="relative w-[100px] md:w-[120px] h-[180px] md:h-[220px] rounded-xl overflow-hidden shadow-lg"
                            variants={imageSlideIn}
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            animate={floatingAnimation.animate}
                            transition={{ delay: 0.4 }}
                        >
                            <Image
                                src="/assets/service3.png"
                                alt="Mobile App 2"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Courbe décorative */}
                <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden z-[3]">
                    <svg
                        viewBox="0 0 1440 100"
                        className="w-full h-auto"
                        preserveAspectRatio="none"
                        style={{ display: 'block' }}
                    >
                        <path
                            fill="#ffffff"
                            d="M0,0 C360,100 1080,100 1440,0 L1440,100 L0,100 Z"
                        />
                    </svg>
                </div>
            </motion.section>

            {/* Services Disponibles Section */}
            <motion.section
                className="py-12 md:py-16 bg-[#f0f7f0]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center"
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-4">Services Disponibles</h2>
                        <p className="text-gray-600 text-center mb-8 md:mb-12 max-w-3xl mx-auto text-base md:text-lg">
                            Chez DIHA'S, nous concevons des applications web et mobiles sur mesure, en créant des solutions numériques innovantes et adaptées aux besoins spécifiques de chaque client.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {/* Service Web */}
                        <motion.div
                            className="bg-green-600 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group flex flex-col items-center text-center"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                className="w-16 md:w-20 h-16 md:h-20 bg-white rounded-xl flex items-center justify-center mb-4 md:mb-6"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Image
                                    src="/assets/web.png"
                                    alt="Web Development"
                                    width={40}
                                    height={40}
                                    className="md:w-12 md:h-12"
                                />
                            </motion.div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Développement Web</h3>
                            <p className="text-white opacity-90 text-sm md:text-base mb-4 md:mb-6">
                                Des solutions web modernes, performantes et évolutives, pour une présence en ligne moderne et sécurisée.
                            </p>
                        </motion.div>

                        {/* Service Mobile */}
                        <motion.div
                            className="bg-[#FFA500] p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group flex flex-col items-center text-center"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                className="w-16 md:w-20 h-16 md:h-20 bg-white rounded-xl flex items-center justify-center mb-4 md:mb-6"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Image
                                    src="/assets/mobile.png"
                                    alt="Mobile Development"
                                    width={40}
                                    height={40}
                                    className="md:w-12 md:h-12"
                                />
                            </motion.div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Développement mobile</h3>
                            <p className="text-white opacity-90 text-sm md:text-base mb-4 md:mb-6">
                                Applications mobiles natives et hybrides, pour des solutions rapides et fiables chez vous.
                            </p>
                        </motion.div>

                        {/* Service Design */}
                        <motion.div
                            className="bg-[#1A5276] p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group flex flex-col items-center text-center"
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                        >
                            <motion.div
                                className="w-16 md:w-20 h-16 md:h-20 bg-white rounded-xl flex items-center justify-center mb-4 md:mb-6"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                            >
                                <Image
                                    src="/assets/design.png"
                                    alt="UI/UX Design"
                                    width={40}
                                    height={40}
                                    className="md:w-12 md:h-12"
                                />
                            </motion.div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Design UI/UX et d'Identité de marque</h3>
                            <p className="text-white opacity-90 text-sm md:text-base mb-4 md:mb-6">
                                Des interfaces modernes, intuitives et responsives pour une expérience utilisateur fluide et impactante.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Procedures de developpement*/}
            <section className="py-12 md:py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Procédure de développement à grande échelle</h2>
                        <p className="text-gray-600 text-center mb-8 md:mb-16 max-w-3xl mx-auto text-base md:text-lg">
                            Notre procédure de développement repose sur une approche agile, garantissant des solutions flexibles, rapides et parfaitement adaptées aux besoins de nos clients.
                        </p>
                    </div>

                    {/* Steps 1-3: Images on left, Numbers and Text on right */}
                    <div className="max-w-4xl mx-auto mb-8 md:mb-16">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left Column: Stacked Images */}
                            <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
                                <div className="absolute top-0 left-0 w-[250px] md:w-[300px] h-[200px] md:h-[250px] rounded-xl overflow-hidden shadow-xl transform -rotate-6">
                                    <Image
                                        src="/assets/planning.png"
                                        alt="Planning"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute top-32 md:top-40 left-8 md:left-12 w-[250px] md:w-[300px] h-[200px] md:h-[250px] rounded-xl overflow-hidden shadow-xl transform rotate-6 z-10">
                                    <Image
                                        src="/assets/conception_front.png"
                                        alt="Conception"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Right Column: Numbers and Text with Dashed Line */}
                            <div className="w-full md:w-1/2 relative">
                                <div className="absolute left-8 top-0 h-[calc(100%-2rem)] border-l-2 border-dashed border-green-600"></div>

                                {/* Étape 1 */}
                                <div className="relative flex items-start gap-4 md:gap-6 mb-8 md:mb-16">
                                    <div className="flex-shrink-0 z-10">
                                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-green-600 flex items-center justify-center">
                                            <span className="text-green-600 font-bold text-sm md:text-base">01</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold mb-2">Découverte et planification</h3>
                                        <p className="text-gray-700 text-sm md:text-base">
                                            Nous commençons chaque projet web par une phase de découverte et de planification, pour aligner nos solutions sur vos objectifs et votre public cible.
                                        </p>
                                    </div>
                                </div>

                                {/* Étape 2 */}
                                <div className="relative flex items-start gap-4 md:gap-6 mb-8 md:mb-16">
                                    <div className="flex-shrink-0 z-10">
                                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-green-600 flex items-center justify-center">
                                            <span className="text-green-600 font-bold text-sm md:text-base">02</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold mb-2">Conception et prototypage</h3>
                                        <p className="text-gray-700 text-sm md:text-base">
                                            En tant qu'experts du web, nous concevons des solutions sur mesure, alliant design attractif et expérience utilisateur, en accord avec votre identité de marque.
                                        </p>
                                    </div>
                                </div>

                                {/* Étape 3 */}
                                <div className="relative flex items-start gap-4 md:gap-6">
                                    <div className="flex-shrink-0 z-10">
                                        <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-green-600 flex items-center justify-center">
                                            <span className="text-green-600 font-bold text-sm md:text-base">03</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold mb-2">Développement front-end</h3>
                                        <p className="text-gray-700 text-sm md:text-base">
                                            Grâce aux dernières technologies, nous créons des sites web réactifs et interactifs, optimisés pour la performance et une excellente expérience utilisateur.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Steps 4-6: Numbers and Text on left, Images on right */}
                    <section className="relative w-full bg-[#f0f7f0] overflow-x-hidden">
                        <div className="container mx-auto px-4 py-8 md:py-16">
                            <div className="max-w-4xl mx-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left Column: Numbers and Text with Dashed Line */}
                                    <div className="relative order-2 md:order-1">
                                        <div className="absolute left-8 top-0 h-[calc(100%-2rem)] border-l-2 border-dashed border-green-600"></div>

                                        {/* Étape 4 */}
                                        <div className="relative flex items-start gap-4 md:gap-6 mb-8 md:mb-16">
                                            <div className="flex-shrink-0 z-10">
                                                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-green-600 flex items-center justify-center">
                                                    <span className="text-green-600 font-bold text-sm md:text-base">04</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg md:text-xl font-bold mb-2">Développement back-end</h3>
                                                <p className="text-gray-700 text-sm md:text-base pr-4">
                                                    Nous développons des back-ends solides et sécurisés, capables de gérer des fonctionnalités complexes et des données avec fluidité.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Étape 5 */}
                                        <div className="relative flex items-start gap-4 md:gap-6 mb-8 md:mb-16">
                                            <div className="flex-shrink-0 z-10">
                                                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-green-600 flex items-center justify-center">
                                                    <span className="text-green-600 font-bold text-sm md:text-base">05</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg md:text-xl font-bold mb-2">Assurance qualité et tests</h3>
                                                <p className="text-gray-700 text-sm md:text-base pr-4">
                                                    Nos processus rigoureux d'assurance qualité garantissent que votre site respecte les plus hauts standards de performance, de sécurité et de convivialité.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Étape 6 */}
                                        <div className="relative flex items-start gap-4 md:gap-6">
                                            <div className="flex-shrink-0 z-10">
                                                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-2 border-green-600 flex items-center justify-center">
                                                    <span className="text-green-600 font-bold text-sm md:text-base">06</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg md:text-xl font-bold mb-2">Déploiement et maintenance</h3>
                                                <p className="text-gray-700 text-sm md:text-base pr-4">
                                                    Après le déploiement, nous assurons une maintenance continue pour garder votre site à jour, sécurisé et optimisé pour un succès durable.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Stacked Images */}
                                    <div className="relative order-1 md:order-2 h-[300px] md:h-[500px]">
                                        <div className="absolute top-0 left-0 md:left-auto md:right-0 w-[200px] md:w-[300px] h-[180px] md:h-[250px] rounded-xl overflow-hidden shadow-xl transform rotate-6">
                                            <Image
                                                src="/assets/backend.png"
                                                alt="Back-end"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="absolute top-24 md:top-40 left-8 md:left-auto md:right-8 w-[200px] md:w-[300px] h-[180px] md:h-[250px] rounded-xl overflow-hidden shadow-xl transform -rotate-6 z-10">
                                            <Image
                                                src="/assets/assurance_deploiement.png"
                                                alt="Assurance qualité"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}

// Fonctions utilitaires pour le texte des étapes
const getStepTitle = (step) => {
    const titles = {
        1: "Découverte et planification",
        2: "Conception et prototypage",
        3: "Développement front-end",
        4: "Développement back-end",
        5: "Assurance qualité et tests",
        6: "Déploiement et maintenance"
    }
    return titles[step]
}

const getStepDescription = (step) => {
    const descriptions = {
        1: "Nous commençons chaque projet web par une phase de découverte et de planification, pour aligner nos solutions sur vos objectifs et votre public cible.",
        2: "En tant qu'experts du web, nous concevons des solutions sur mesure, alliant design attractif et expérience utilisateur, en accord avec votre identité de marque.",
        3: "Grâce aux dernières technologies, nous créons des sites web réactifs et interactifs, optimisés pour la performance et une excellente expérience utilisateur.",
        4: "Nous développons des back-ends solides et sécurisés, capables de gérer des fonctionnalités complexes et des données avec fluidité.",
        5: "Nos processus rigoureux d'assurance qualité garantissent que votre site respecte les plus hauts standards de performance, de sécurité et de convivialité.",
        6: "Après le déploiement, nous assurons une maintenance continue pour garder votre site à jour, sécurisé et optimisé pour un succès durable."
    }
    return descriptions[step]
}

export default ServicesContent