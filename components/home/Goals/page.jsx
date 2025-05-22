'use client';
import { motion } from 'framer-motion';

export default function Goals() {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <section className="bg-[#E8F6F8] py-16 px-6 md:px-20 text-center">
            <motion.h2
                className="text-xl md:text-3xl font-semibold mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Que veux-tu faire ?
            </motion.h2>
            <motion.p
                className="text-black mb-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Choisis l'objectif qui te correspond le mieux
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bloc 1 */}
                <motion.div
                    className="bg-[#D6ECE2] rounded-2xl p-6 flex flex-col items-center justify-between"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                >
                    <h3 className="text-xl font-semibold mb-3">Acheter et Créer</h3>
                    <p className="text-black text-sm mb-6 max-w-xs">
                        Parcoure nos applications mobile/web de différente industries pour créer une entreprise en ligne en 30 jours
                    </p>
                    <motion.button
                        className="bg-[#c6e2d5] hover:bg-[#b2d6c8] text-green-800 font-medium px-10 py-4 rounded-full transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/dihas-product'}
                    >
                        Parcourir
                    </motion.button>
                    <motion.img
                        src="/assets/BTP.png"
                        alt="Achat création"
                        className="mt-6 max-h-60 object-contain"
                        whileHover={{ rotate: 5 }}
                    />
                </motion.div>

                {/* Bloc 2 */}
                <motion.div
                    className="bg-[#F2EBCF] rounded-2xl p-6 flex flex-col items-center justify-between"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-xl font-semibold mb-3">Commander des services</h3>
                    <p className="text-black text-sm mb-6 max-w-xs">
                        Besoins de logiciel de gestion d'une application Web ou Mobile, d'un site web ou de conception d'identité d'entreprise,
                        Nous sommes disponibles pour toutes vos commandes
                    </p>
                    <motion.button
                        className="bg-[#c6e2d5] hover:bg-[#b2d6c8] text-green-800 font-medium px-10 py-4 rounded-full transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/contact'}
                    >
                        Contactes-nous
                    </motion.button>
                    <motion.img
                        src="/assets/Reseau_pro.png"
                        alt="Service"
                        className="mt-6 max-h-60 object-contain"
                        whileHover={{ rotate: -5 }}
                    />
                </motion.div>
            </div>
        </section>
    );
}
