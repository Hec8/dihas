'use client';

export default function Hero() {
    return (
        <section className="bg-green-800 text-white py-16 mt-16">
            {/* Animation de fond */}
            <div className="area absolute inset-0">
                <ul className="circles">
                    {[...Array(10)].map((_, index) => (
                        <li key={index}></li>
                    ))}
                </ul>
            </div>
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Partie gauche avec le texte */}
                    <div className="w-full md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                            Entreprise de conception, <br />
                            de développement <br />
                            de vente d'application <br />
                            SaaS et de logiciel de <br />
                            gestion
                        </h1><br />
                        <p className="text-sm mb-8 text-white max-w-md">
                            De l'idée de développement de marque nous concevons
                            et développons des applications
                        </p><br />
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-green-700 text-white px-6 py-3 rounded flex items-center justify-center">
                                <img src="/assets/Vector.png" alt="Vector" className="h-5 w-5 mr-2" />
                                Contactez-nous
                            </button>
                            <button className="bg-[#FFA500] text-white px-6 py-3 rounded flex items-center justify-center">
                                <img src="/assets/basket.png" alt="Vector" className="h-5 w-5 mr-2" />
                                Commander
                            </button>
                        </div>
                    </div>

                    {/* Partie droite pour la vidéo */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-video rounded-md overflow-hidden">
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
            <style jsx global>{`
                .area {
                    width: 100%;
                    height: 100%;
                }

                .circles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    margin: 0;
                    padding: 0;
                }

                .circles li {
                    position: absolute;
                    display: block;
                    list-style: none;
                    width: 20px;
                    height: 20px;
                    background: rgba(255, 255, 255, 0.2);
                    animation: animate 25s linear infinite;
                    bottom: -150px;
                }

                .circles li:nth-child(1) {
                    left: 25%;
                    width: 80px;
                    height: 80px;
                    animation-delay: 0s;
                    animation-duration: 20s;
                    border-radius: 50%;
                }

                .circles li:nth-child(2) {
                    left: 10%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 2s;
                    animation-duration: 12s;
                }

                .circles li:nth-child(3) {
                    left: 70%;
                    width: 40px;
                    height: 40px;
                    animation-delay: 4s;
                    animation-duration: 18s;
                    border-radius: 50%;
                }

                .circles li:nth-child(4) {
                    left: 40%;
                    width: 60px;
                    height: 60px;
                    animation-delay: 0s;
                    animation-duration: 15s;
                }

                .circles li:nth-child(5) {
                    left: 65%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 0s;
                    animation-duration: 14s;
                    border-radius: 50%;
                }

                .circles li:nth-child(6) {
                    left: 75%;
                    width: 110px;
                    height: 110px;
                    animation-delay: 3s;
                    animation-duration: 22s;
                }

                .circles li:nth-child(7) {
                    left: 35%;
                    width: 150px;
                    height: 150px;
                    animation-delay: 7s;
                    animation-duration: 25s;
                    border-radius: 50%;
                }

                .circles li:nth-child(8) {
                    left: 50%;
                    width: 25px;
                    height: 25px;
                    animation-delay: 15s;
                    animation-duration: 17s;
                }

                .circles li:nth-child(9) {
                    left: 20%;
                    width: 15px;
                    height: 15px;
                    animation-delay: 2s;
                    animation-duration: 19s;
                    border-radius: 50%;
                }

                .circles li:nth-child(10) {
                    left: 85%;
                    width: 150px;
                    height: 150px;
                    animation-delay: 0s;
                    animation-duration: 21s;
                }

                @keyframes animate {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                        border-radius: 0;
                    }
                    100% {
                        transform: translateY(-1000px) rotate(720deg);
                        opacity: 0;
                        border-radius: 50%;
                    }
                }
            `}</style>
        </section>
    );
}
