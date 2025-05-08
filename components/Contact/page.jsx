'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Obtenir le cookie CSRF
            await axios.get('/sanctum/csrf-cookie');

            // 2. Envoyer les données du formulaire
            const { data } = await axios.post('/api/contact/create', formData);

            toast.success(data.message || "Message envoyé avec succès !");

            // Réinitialiser le formulaire
            setFormData({
                name: '',
                email: '',
                telephone: '',
                message: ''
            });

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message ||
                    "Erreur lors de l'envoi du message";
                toast.error(errorMessage);
            } else {
                toast.error("Erreur de connexion au serveur");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <Toaster position="top-right" />

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                {/* Partie verte décorative à droite avec animation */}
                <div className="absolute right-0 top-0 bottom-0 hidden sm:block w-1/4 md:w-1/3 bg-green-800 rounded-l-[80px] overflow-hidden">
                    {/* Ajout de l'animation des cercles/carrés */}
                    <div className="area w-full h-full">
                        <ul className="circles">
                            {[...Array(10)].map((_, index) => (
                                <li key={index}></li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="relative z-10 p-4 sm:p-8 md:p-12 w-full sm:w-3/4 md:w-2/3">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Contactez-nous</h1>

                    <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base text-justify">
                        Nous comprenons qu'acheter ou faire une commande d'une application n'est pas chose aisée. Pour toutes questions ou besoins d'aide, n'hésitez pas à nous contacter
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nom "
                                className="w-full px-4 sm:px-6 py-4 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 text-base md:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email "
                                className="w-full px-4 sm:px-6 py-4 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 text-base md:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                placeholder="Téléphone "
                                className="w-full px-4 sm:px-6 py-4 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 text-base md:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Votre message "
                                rows="6"
                                className="w-full px-4 sm:px-6 py-4 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 resize-none text-base md:text-sm"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-green-800 text-white py-4 md:py-3 rounded-lg transition-colors duration-300 text-base md:text-sm hover:bg-green-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Envoi en cours...' : 'ENVOYER'}
                        </button>
                    </form>

                    {/* Informations de contact */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-12 mt-8 md:mt-12">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <img src="/assets/phone.png" alt="Phone" className="w-6 h-6 opacity-70" />
                                <div>
                                    <div className="text-sm font-medium text-gray-600">TÉLÉPHONE</div>
                                    <a href="tel:+22994975451" className="hover:text-green-800">+229 94 97 54 51</a>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <img src="/assets/mail.png" alt="Email" className="w-6 h-6 opacity-70" />
                                <div>
                                    <div className="text-sm font-medium text-gray-600">EMAIL</div>
                                    <a href="mailto:contact@dihas.tech" className="hover:text-green-800">contact@dihas.tech</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ajout des styles CSS pour l'animation */}
            <style jsx global>{`
                .area {
                    /* Styles de base pour la zone d'animation */
                    position: relative; /* Important pour le positionnement absolu des enfants */
                }
                .circles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden; /* Masque les éléments qui sortent */
                    margin: 0;
                    padding: 0;
                    pointer-events: none; /* Empêche l'interaction avec les carrés */
                }
                .circles li {
                    position: absolute;
                    display: block;
                    list-style: none;
                    width: 20px;
                    height: 20px;
                    /* Couleur légèrement plus claire que le fond vert pour visibilité */
                    background: rgba(255, 255, 255, 0.15);
                    animation: animate 25s linear infinite;
                    bottom: -150px; /* Commence en dehors de l'écran */
                }
                /* Styles pour les différentes tailles et délais d'animation */
                .circles li:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 0s; animation-duration: 20s; border-radius: 50%; }
                .circles li:nth-child(2) { left: 10%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
                .circles li:nth-child(3) { left: 70%; width: 40px; height: 40px; animation-delay: 4s; animation-duration: 18s; border-radius: 50%; }
                .circles li:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 15s; border-radius: 50%; }
                .circles li:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
                .circles li:nth-child(6) { left: 75%; width: 110px; height: 110px; animation-delay: 3s; border-radius: 50%; }
                .circles li:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; border-radius: 50%; }
                .circles li:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
                .circles li:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; border-radius: 50%; }
                .circles li:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 11s; }

                @keyframes animate {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                        border-radius: 0; /* Carré au début */
                    }
                    100% {
                        transform: translateY(-1000px) rotate(720deg); /* Monte et tourne */
                        opacity: 0;
                        border-radius: 50%; /* Devient un cercle à la fin */
                    }
                }
            `}</style>
        </div>
    );
}