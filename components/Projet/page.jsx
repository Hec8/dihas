'use client';
import Image from 'next/image';
import About from '../About/page';
import { useInView } from 'react-intersection-observer';

export default function Projet() {

    const [solutionsRef, solutionsInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [technologiesRef, technologiesInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [projectsRef, projectsInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const projets = [
        {
            id: 1,
            title: 'Clinique de Renaissance Divine',
            image: '/assets/Clinique.png',
            technologies: ['ReactJS', 'NodeJS', 'AWS'],
            features: [
                'Accès facile aux services',
                'Gestion des rendez-vous en ligne',
                'Interface utilisateur intuitive',
                'Environnement de paiement sécurisé'
            ]
        },
        {
            id: 2,
            title: 'Yugu',
            image: '/assets/Yugu.png',
            technologies: ['ReactJS', 'NodeJS', 'AWS'],
            features: [
                'Accès facile aux produits',
                'Gestion des commandes en ligne',
                'Interface utilisateur intuitive',
                'Prise en charge de la livraison'
            ]
        },
        {
            id: 3,
            title: 'Académie Internationale De Freelancing (AFB)',
            image: '/assets/AFB.png',
            technologies: ['ReactJS', 'NodeJS', 'AWS'],
            features: [
                'Développement de compétences',
                'Accompagnement des apprenants',
                'Interface utilisateur intuitive',
                'Accès aux cours en présentiel'
            ]
        }
    ];

    const technologies = [
        {
            name: 'Wordpress',
            logo: '/assets/wordpress.png',
            description: 'Wordpress est un CMS (système de gestion de contenu). On l\'associe souvent à l\'idée d\'un service de blog, mais c\'est bien plus que cela !'
        },
        {
            name: 'Laravel',
            logo: '/assets/laravel.png',
            description: 'Laravel est un puissant framework PHP/MVC conçu pour les développeurs qui recherchent un boîte à outils simple et élégante pour créer des applications web complètes. Le framework Laravel a été créé par Taylor Otwell'
        },
        {
            name: 'Flutter',
            logo: '/assets/flutter.png',
            description: 'Flutter est un framework open-source créé par Google. Il permet de créer des applications mobiles multi-plateformes. Le framework Flutter a été créé par Google.'
        }
    ];

    const stats = [
        { value: '7+', label: 'Année d\'expérience' },
        { value: '24+', label: 'Membres de l\'équipe' },
        { value: '104+', label: 'Clients satisfaits' },
        { value: '231+', label: 'Projets complets' }
    ];

    return (
        <>
            <main className="min-h-screen bg-[#E5F2EC]">
                {/* Hero Section */}
                <section className="text-white py-16 mt-16 relative min-h-[600px]">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/assets/backproject.png"
                            alt="Background"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover md:object-fill"
                            quality={100}
                        />
                    </div>
                    <div className="container mx-auto px-6 relative z-10 mt-4">
                        <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto">
                            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-8 text-center md:text-left md:ml-20 animate-fadeIn">
                                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                                    Meilleure Entreprise De <br />
                                    Développement Web Et <br />
                                    Mobile
                                </h1>
                                <p className="text-lg mb-8 max-w-xl mx-auto md:mx-0">
                                    Nous sommes une entreprise de développement web et mobile reconnue mondialement. Notre équipe de designers primés et de développeurs experts fait de nous un interlocuteur unique pour des centaines de clients. Diha&apos;s s&apos;efforce d&apos;obtenir des résultats exceptionnels grâce à des données de qualité et un marketing intelligent. Nos utilisateurs bénéficient d&apos;excellentes solutions de développement avec WordPress, NextJS, ReactJS, Laravel, Flutter pour concrétiser leur idées
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 flex justify-center animate-fadeIn delay-100">
                                <div className="bg-white w-full md:w-96 p-6 rounded-lg shadow-lg md:mr-10 md:mb-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <h3 className="text-black font-bold">Obtenez Votre Consultation</h3><span className='text-[#FFA500] font-bold'>gratuite</span><br />
                                    </div>
                                    <ul className="space-y-4 mb-6">
                                        <li className="flex items-center gap-2">
                                            <Image src="/assets/certif.png" alt="check" width={20} height={20} />
                                            <span className="text-gray-600">Respect du calendrier du projet comme date de qualité</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Image src="/assets/certif.png" alt="check" width={20} height={20} />
                                            <span className="text-gray-600">Facilement accessible aux développeurs Web comme Mobile</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Image src="/assets/certif.png" alt="check" width={20} height={20} />
                                            <span className="text-gray-600">Rentable et flexible dans l&apos;embauche de développeurs Web</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Image src="/assets/certif.png" alt="check" width={20} height={20} />
                                            <span className="text-gray-600">Autorisation de code source sécurisé et complète</span>
                                        </li>
                                    </ul>
                                    <button className="w-full bg-[#FFA500] text-white py-3 rounded-lg hover:bg-[#FF8C00] transition-colors">
                                        Obtenez Une Consultation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Solutions Section */}
                <section className="py-16 px-6" ref={solutionsRef}>
                    <div className="container mx-auto">
                        <div className="relative overflow-hidden">
                            <div className={`absolute left-0 top-0 h-full w-[14.2857%] bg-[#FFA500] rounded-l-lg z-0 transition-all duration-1000 ${solutionsInView ? 'translate-x-0' : '-translate-x-full'}`}></div>
                            <div className="relative z-10 p-8 pl-[calc(14.2857%+2rem)]">
                                <h2 className={`text-2xl font-bold mb-4 transition-all duration-700 delay-300 ${solutionsInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                    Solutions De Développement Que Nous Proposons
                                </h2>
                                <p className={`text-lg transition-all duration-700 delay-500 ${solutionsInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                    Nous créons des solutions web et mobiles sur mesure, alliant stratégie, design et performance, adaptées aux besoins spécifiques de chaque projet.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12" ref={projectsRef}>
                    {projets.map((projet, index) => (
                        <div
                            key={projet.id}
                            className={`bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-500 delay-${index * 100} ${projectsInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                        >
                            <div className="relative h-48">
                                <Image
                                    src={projet.image}
                                    alt={projet.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-4">{projet.title}</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {projet.technologies.map((tech, index) => (
                                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <ul className="space-y-2">
                                    {projet.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="w-1 h-1 bg-[#FFA500] rounded-full"></span>
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Technologies Section */}
                <section className="py-16 px-6 bg-white" ref={technologiesRef}>
                    <div className="container mx-auto">
                        <div className="relative overflow-hidden">
                            <div className={`absolute left-0 top-0 h-full w-[14.2857%] bg-[#FFA500] rounded-l-lg z-0 transition-all duration-1000 ${technologiesInView ? 'translate-x-0' : '-translate-x-full'}`}></div>
                            <div className="relative z-10 p-8 pl-[calc(14.2857%+2rem)]">
                                <h2 className={`text-2xl font-bold transition-all duration-700 delay-300 ${technologiesInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                    Nous Travaillons Sur Des Plateformes De Développement
                                </h2>
                                <h3 className={`text-xl font-bold text-green-800 transition-all duration-700 delay-400 ${technologiesInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                    Performantes et Performantes
                                </h3>
                                <p className={`mt-4 transition-all duration-700 delay-500 ${technologiesInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                                    Sans une agence de développement expérimentée, votre présence en ligne est menacée.Nous garantissons une expérience fluide sur toutes les plateformes.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                            {technologies.map((tech, index) => (
                                <div
                                    key={index}
                                    className={`bg-gray-200 p-6 rounded-lg transition-all duration-500 delay-${index * 100} ${technologiesInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <Image
                                            src={tech.logo}
                                            alt={tech.name}
                                            width={40}
                                            height={40}
                                        />
                                        <h3 className="text-xl font-bold">{tech.name}</h3>
                                    </div>
                                    <p className="text-gray-600">{tech.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="mb-20">
                    <About />
                </div>
            </main>
        </>
    );
}