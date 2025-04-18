'use client';

export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden relative">
                {/* Partie verte décorative à droite - masquée sur très petit écran */}
                <div className="absolute right-0 top-0 bottom-0 hidden sm:block w-1/4 md:w-1/3 bg-green-800 rounded-l-[80px]"></div>

                {/* Contenu principal */}
                <div className="relative z-10 p-4 sm:p-8 md:p-12 w-full sm:w-3/4 md:w-2/3">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Contactez-nous</h1>

                    <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base text-justify">
                        Nous comprenons qu'acheter ou faire une commande d'une application n'est pas chose aisée. Pour toutes questions ou besoins d'aide, n'hésitez pas à nous contacter
                    </p>

                    <form className="space-y-6 md:space-y-8">
                        <div>
                            <input
                                type="text"
                                placeholder="Name *"
                                className="w-full px-4 sm:px-6 py-4 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 text-base md:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 sm:px-6 py-4 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 text-base md:text-sm"
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                placeholder="Phone number *"
                                className="w-full px-4 sm:px-6 py-4 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 text-base md:text-sm"
                                required
                            />
                        </div>

                        <div>
                            <textarea
                                placeholder="Votre message"
                                rows="6"
                                className="w-full px-4 sm:px-6 py-4 md:py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-800 resize-none text-base md:text-sm"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-800 text-white py-4 md:py-3 rounded-lg transition-colors duration-300 text-base md:text-sm hover:bg-green-700"
                        >
                            SEND
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
