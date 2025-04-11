'use client';

import Image from 'next/image';

export default function Contact() {
    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white rounded-xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold mb-6 text-[#0F6B42]">Contactez-nous</h2>
                        <p className="text-gray-600 mb-8">
                            Une question ? Un projet ? N'hésitez pas à nous contacter
                        </p>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F6B42] focus:border-transparent"
                                    placeholder="Votre nom"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F6B42] focus:border-transparent"
                                    placeholder="votre@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F6B42] focus:border-transparent"
                                    placeholder="Votre message"
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                Envoyer le message
                            </button>
                        </form>
                    </div>
                    <div className="relative rounded-xl overflow-hidden h-[500px]">
                        <Image
                            src="/assets/map_contact.png"
                            alt="Carte de localisation"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
