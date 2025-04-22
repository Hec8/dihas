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
                {/* Partie verte décorative à droite - masquée sur très petit écran */}
                <div className="absolute right-0 top-0 bottom-0 hidden sm:block w-1/4 md:w-1/3 bg-green-800 rounded-l-[80px]"></div>

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
                                placeholder="Nom *"
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
                                placeholder="Email *"
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
                                placeholder="Téléphone *"
                                className="w-full px-4 sm:px-6 py-4 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 text-base md:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Votre message *"
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
                                    <div className="text-sm font-medium text-gray-600">PHONE</div>
                                    <div>03 5432 1234</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <img src="/assets/fax.png" alt="Fax" className="w-6 h-6 opacity-70" />
                                <div>
                                    <div className="text-sm font-medium text-gray-600">FAX</div>
                                    <div>03 5432 1234</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <img src="/assets/mail.png" alt="Email" className="w-6 h-6 opacity-70" />
                                <div>
                                    <div className="text-sm font-medium text-gray-600">EMAIL</div>
                                    <div>info@marcc.com.au</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}