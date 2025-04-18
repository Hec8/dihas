'use client';

export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                {/* Partie verte décorative à droite */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-green-800 rounded-r-[80px]"></div>

                {/* Contenu principal - limité à la partie gauche */}
                <div className="relative z-10 p-8 md:p-12 w-2/3">
                    <h1 className="text-4xl font-bold mb-6">Contactez-nous</h1>

                    <p className="text-gray-600 mb-8">
                        Nous comprenons qu'acheter ou faire une commande d'une application n'est pas chose aisée. Pour toutes questions ou besoins d'aide, n'hésitez pas à nous contacter
                    </p>

                    <form className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Name *"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                placeholder="Phone number *"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                placeholder="Votre message"
                                rows="6"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-800 text-white py-3 rounded-lg transition-colors duration-300"
                        >
                            SEND
                        </button>
                    </form>

                    {/* Informations de contact */}
                    <div className="flex flex-wrap gap-12 mt-12">
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
