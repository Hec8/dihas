'use client';

export default function Hero() {
    return (
        <section className="bg-green-800 text-white py-16 mt-16">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Partie gauche avec le texte */}
                    <div className="w-full md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            Entreprise de conception, <br />
                            de développement <br />
                            de vente d'application <br />
                            SaaSet de logiciel de <br />
                            gestion
                        </h1><br />
                        <p className="text-sm mb-8 text-white max-w-md">
                            De l'idée de développement de marque nous concevrons 
                            et développons des applications
                        </p><br />
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-green-700 text-white px-6 py-3 rounded flex items-center justify-center">
                                <img src="/assets/Vector.png" alt="Vector" className="h-5 w-5 mr-2"/>
                                Contactez-nous
                            </button>
                            <button className="bg-[#FFA500] text-white px-6 py-3 rounded flex items-center justify-center">
                                <img src="/assets/basket.png" alt="Vector" className="h-5 w-5 mr-2"/>
                                Commander
                            </button>
                        </div>
                    </div>
                    
                    {/* Partie droite pour la vidéo */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-video bg-gray-300 bg-opacity-20 rounded-md overflow-hidden">
                            <video 
                                autoPlay 
                                loop 
                                muted 
                                playsInline
                                className="w-full h-full object-cover rounded-md"
                            >
                                <source src="/assets/video.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
