'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const AboutUsContent = () => {
    const [text, setText] = useState('')
    const fullText = "Nous contribuons à la transformation digitale en créant des solutions sur mesure pour optimiser les performances et valoriser chaque identité visuelle."

    useEffect(() => {
        let index = 0
        const timer = setInterval(() => {
            setText(fullText.slice(0, index))
            index++
            if (index > fullText.length) clearInterval(timer)
        }, 50)
        return () => clearInterval(timer)
    }, [])

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative h-[400px]">
                {/* Image d'arrière-plan avec effet d'opacité */}
                <div className="absolute inset-0 w-full h-full opacity-0 animate-fade-in">
                    <Image
                        src="/assets/hero-about.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-green-600/80" />
                </div>

                <div className="container mx-auto px-4 py-20 relative flex justify-between items-start">
                    {/* Contenu principal */}
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold text-white mb-4">À propos de nous</h1>
                        <p className="text-white text-lg typewriter-text">
                            {text}
                            <span className="animate-blink">|</span>
                        </p>
                    </div>

                    {/* Menu d'ancrage */}
                    <div className="bg-white rounded-lg p-6 shadow-lg w-[300px]">
                        <h3 className="text-xl font-semibold mb-4">Nos filtres</h3>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={() => scrollToSection('mission')}
                                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        🎯
                                    </span>
                                    Qui sommes-nous ?
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('objectifs')}
                                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        ✨
                                    </span>
                                    Nos Objectifs
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection('valeurs')}
                                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                        🌟
                                    </span>
                                    Nos valeurs
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section id="mission" className="py-16 bg-[#f0f7f0]">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-2 text-center">Notre <span className="text-green-600">Mission</span></h2>
                    <p className="text-gray-600 mb-8 text-center">
                        <strong>Concevoir</strong> des solutions digitales innovantes, alliant design, performance et identité de marque.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="relative">
                            {/* Image principale */}
                            <div className="relative h-[400px] rounded-lg overflow-hidden">
                                <Image
                                    src="/assets/notre_mission.png"
                                    alt="Notre mission"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Image du portable superposée */}
                            <div className="absolute -bottom-10 right-10 w-[150px] h-[200px]">
                                <Image
                                    src="/assets/notre_mission_2.png"
                                    alt="Application mobile"
                                    width={150}
                                    height={200}
                                    className="object-cover rounded-3xl border-2 border-orange-400"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <p className="text-gray-700 text-justify leading-relaxed">
                                DIHA'S est spécialisé dans la conception et le développement d'applications web et mobiles ainsi que de solutions numériques sur mesure. De l'idéation à la mise en ligne, nous accompagnons les entreprises dans la création d'expériences numériques innovantes et performantes.
                            </p>
                            <p className="text-gray-700 text-justify leading-relaxed">
                                Grâce à une approche centrée utilisateur et des technologies modernes, nous transformons les idées en produits numériques fonctionnels, durables et adaptés aux enjeux actuels.
                            </p>
                            <div className="flex items-center gap-4">
                                <button className="bg-[#FFA500] hover:bg-[#FF8533] transition-colors text-white px-6 py-3 rounded-lg flex items-center">
                                    Contactez-nous
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Objectifs Section */}
            <section id="objectifs" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-2 text-center">Nos <span className="text-green-600">Objectifs</span></h2>
                    <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                        Nos objectifs reflètent notre engagement à créer des solutions innovantes, durables et adaptées, tout en mettant l'accent sur l'intégrité et la qualité.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Liste des objectifs avec ligne pointillée */}
                        <div className="relative space-y-12 py-8">
                            {/* Ligne pointillée verticale */}
                            <div className="absolute left-6 top-8 bottom-8 border-l-2 border-dashed border-gray-300"></div>

                            {/* Objectif 1 */}
                            <div className="flex gap-8 items-start relative">
                                <Image
                                    src="/assets/conception.png"
                                    alt="Solution icon"
                                    width={48}
                                    height={48}
                                    className="z-10"
                                />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Concevoir des solutions sur mesure</h3>
                                    <p className="text-gray-600 text-justify">
                                        Créer des produits digitaux adaptés aux besoins spécifiques de chaque client.
                                    </p>
                                </div>
                            </div>

                            {/* Objectif 2 */}
                            <div className="flex gap-8 items-start relative">
                                <Image
                                    src="/assets/renforcer_identite.png"
                                    alt="Identity icon"
                                    width={48}
                                    height={48}
                                    className="z-10"
                                />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Renforcer l'identité visuelle</h3>
                                    <p className="text-gray-600 text-justify">
                                        Développer des marques fortes grâce à un design cohérent et impactant.
                                    </p>
                                </div>
                            </div>

                            {/* Objectif 3 */}
                            <div className="flex gap-8 items-start relative">
                                <Image
                                    src="/assets/priorise_experience.png"
                                    alt="User experience icon"
                                    width={48}
                                    height={48}
                                    className="z-10"
                                />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Prioriser l'expérience utilisateur</h3>
                                    <p className="text-gray-600 text-justify">
                                        Concevoir des interfaces intuitives, esthétiques et faciles à utiliser.
                                    </p>
                                </div>
                            </div>

                            {/* Objectif 4 */}
                            <div className="flex gap-8 items-start relative">
                                <Image
                                    src="/assets/innover.png"
                                    alt="Innovation icon"
                                    width={48}
                                    height={48}
                                    className="z-10"
                                />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Innover durablement</h3>
                                    <p className="text-gray-600 text-justify">
                                        Proposer des solutions digitales performantes et éco-responsables.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Images avec overlay et icônes */}
                        <div className="relative h-[600px] py-8">
                            <div className="absolute top-8 w-full h-[250px] group">
                                <Image
                                    src="/assets/objectif1.png"
                                    alt="Solutions"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <Image
                                        src="/assets/Solutions.png"
                                        alt="Solutions icon"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </div>

                            <div className="absolute top-[290px] w-full h-[270px] group">
                                <Image
                                    src="/assets/objectif2.png"
                                    alt="Innovation"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <Image
                                        src="/assets/innovation.png"
                                        alt="Innovation icon"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Valeurs Section avec effet de retournement et nouvelles icônes */}
            <section id="valeurs" className="py-16 bg-[#f0f7f0]">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-2 text-center">Nos <span className="text-green-600">Valeurs</span></h2>
                    <p className="text-gray-600 mb-12 text-center">
                        Nos valeurs forment l'essence de notre identité, guidant nos actions et décisions vers un avenir fondé sur l'intégrité, l'innovation et l'engagement.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Engagement",
                                color: "bg-green-600",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                        <path d="M12 1.5a.75.75 0 0 1 .75.75V7.5h-1.5V2.25A.75.75 0 0 1 12 1.5ZM11.25 7.5v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
                                    </svg>
                                ),
                                description: "Nous nous investissons pleinement pour garantir la réussite de chaque projet, dans le respect des délais et des objectifs du client."
                            },
                            {
                                title: "Innovation",
                                color: "bg-[#FFA500]",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                        <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 1 1 1.5 0v4.661c0 .326.277.585.6.544.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                                        <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clipRule="evenodd" />
                                    </svg>
                                ),
                                description: "Nous repoussons les limites du design en intégrant les dernières technologies pour offrir des expériences uniques et fonctionnelles."
                            },
                            {
                                title: "Intégrité",
                                color: "bg-[#1A5276]",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>
                                ),
                                description: "Notre engagement envers l'éthique guide nos choix, garantissant que nos créations respectent nos clients et partenaires."
                            },
                            {
                                title: "Excellence",
                                color: "bg-[#2E86C1]",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                ),
                                description: "Nous visons l'excellence dans chaque réalisation, en mettant l'accent sur la qualité, la performance et l'innovation."
                            }
                        ].map((valeur, index) => (
                            <div key={index} className="flip-card">
                                <div className="flip-card-inner">
                                    <div className={`flip-card-front ${valeur.color} text-white p-8 rounded-lg flex flex-col items-center justify-center`}>
                                        <div className="mb-6 text-white">
                                            {valeur.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-center">{valeur.title}</h3>
                                    </div>
                                    <div className={`flip-card-back ${valeur.color} text-white p-6 rounded-lg flex items-center justify-center`}>
                                        <p className="text-center text-sm leading-tight">{valeur.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fade-in {
                    animation: fade-in 2s ease-out forwards;
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                .animate-blink {
                    animation: blink 1s step-end infinite;
                }

                .flip-card {
                    perspective: 1000px;
                    height: 300px;
                }

                .flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    transition: transform 0.8s;
                    transform-style: preserve-3d;
                }

                .flip-card:hover .flip-card-inner {
                    transform: rotateY(180deg);
                }

                .flip-card-front,
                .flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .flip-card-back {
                    transform: rotateY(180deg);
                    padding: 1.5rem;
                }

                .flip-card-back p {
                    max-width: 100%;
                    overflow-wrap: break-word;
                    hyphens: auto;
                    text-align: justify;
                }
            `}</style>
        </div>
    )
}

export default AboutUsContent