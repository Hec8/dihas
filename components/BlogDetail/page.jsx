import Link from "next/link";
import Image from "next/image";
import { Share2 } from "lucide-react";

export default function BlogSuite() {
    return (
        <div className="mt-14">
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Breadcrumb - Responsive */}
                <div className="text-sm md:text-xl mb-4 md:mb-6 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                    <Link href="/"><span className="text-green-800 font-semibold">Accueil</span></Link> »
                    <Link href="/blog"><span className=" text-green-800 font-semibold"> Blog</span></Link> »
                    <span className="text-black font-semibold"> Stratégie marketing digitale : comment la planifier pour un impact durable</span>
                </div>

                {/* Image principale - Responsive */}
                <div className="w-full h-48 md:min-h-[500px] relative mb-6 md:mb-8 rounded-lg overflow-hidden">
                    <Image
                        src="/assets/blogsuitebg.png"
                        alt="Image d'illustration"
                        fill
                        className="object-cover md:object-cover"
                        priority
                    />
                </div>

                {/* Structure en colonnes - Responsive */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Colonne gauche : Table des matières - Mobile en premier */}
                    <aside className="lg:w-1/4 order-1 lg:order-none">
                        <div className="lg:sticky lg:top-4 bg-blue-50 p-4 rounded-lg shadow-md border-l-4 border-[#FFA500]">
                            <h2 className="font-bold text-lg mb-4 border-b-2 border-[#FFA500] pb-2 uppercase">TABLE DES MATIERES</h2>
                            <ul className="space-y-3 text-sm">
                                {/* Liens table des matières*/}
                                <Link href="#Qualite">
                                    <li className="hover:text-orange-500 cursor-pointer flex items-start">
                                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                                        <span>Pourquoi la qualité visuelle est cruciale dans une stratégie marketing</span>
                                    </li>
                                </Link>
                                <Link href="#Role">
                                    <li className="hover:text-orange-500 cursor-pointer flex items-start">
                                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                                        <span>Le rôle du contenu animé et interactif dans une stratégie efficace</span>
                                    </li>
                                </Link>
                                <Link href="#Aspects">
                                    <li className="hover:text-orange-500 cursor-pointer flex items-start">
                                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                                        <span>Aspects techniques à considérer pour une stratégie performante</span>
                                    </li>
                                </Link>
                                <Link href="#Cout">
                                    <li className="hover:text-orange-500 cursor-pointer flex items-start">
                                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                                        <span>Coût d'une stratégie marketing digitale visuellement percutante</span>
                                    </li>
                                </Link>
                            </ul>
                            <div className="mt-6">
                                <h3 className="font-semibold mb-3 text-center md:text-left">Partager cet article</h3>
                                <div className="flex gap-4 justify-center md:justify-start">
                                    {/* Icônes de partage */}
                                    {/* Facebook */}
                                    <a href="#" className="hover:opacity-80 transition-opacity">
                                        <Image
                                            src="/assets/fb.png"
                                            alt="Partager sur Facebook"
                                            width={32}
                                            height={32}
                                        />
                                    </a>

                                    {/* Insta */}
                                    <a href="#" className="hover:opacity-80 transition-opacity">
                                        <Image
                                            src="/assets/Insta.png"
                                            alt="Partager sur Twitter"
                                            width={32}
                                            height={32}
                                        />
                                    </a>

                                    {/* LinkedIn */}
                                    <a href="#" className="hover:opacity-80 transition-opacity">
                                        <Image
                                            src="/assets/LkIn.png"
                                            alt="Partager sur LinkedIn"
                                            width={32}
                                            height={32}
                                        />
                                    </a>

                                    {/* Whatsapp */}
                                    <a href="#" className="hover:opacity-80 transition-opacity">
                                        <Image
                                            src="/assets/wa.png"
                                            alt="Partager sur WhatsApp"
                                            width={32}
                                            height={32}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Colonne centrale : Contenu article - Priorité sur mobile */}
                    <article className="lg:w-2/4 order-3 lg:order-none leading-relaxed text-justify">
                        {/* Contenu de l'article */}
                        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
                            Stratégie marketing digitale : comment la planifier pour un impact durable
                        </h1>
                        <div className="text-sm text-gray-600 flex flex-wrap items-center gap-2 mb-6">
                            <span>👤 Par <strong>Ilham AMADOU</strong></span>
                            <span>📅 <strong>Publié le :</strong> 11 avril 2025</span>
                            <span>🕓 <strong>Modifié le :</strong> 11 avril 2025</span>
                        </div>

                        {/* Contenu*/}
                        <p className="lead">
                            Les stratégies de marketing numérique connaissent une croissance fulgurante, avec des millions d'entreprises qui misent désormais sur le numérique pour atteindre leur public. Les campagnes bien intégrées et fluides sont un excellent moyen d'attirer l'attention. Mais attention : la fluidité seule ne suffit pas à conquérir les cœurs. L'impact durable vient d'une stratégie bien pensée, visuellement cohérente et orientée vers l'utilisateur.
                        </p>

                        <p>
                            Une stratégie numérique mal conçue peut rebuter les prospects, même si votre offre est excellente. La première impression visuelle de votre site, de vos contenus ou de votre message est cruciale. Une stratégie digitale au design attrayant et aux messages bien animés capte l'attention et incite à l'engagement. Des visuels percutants, des messages cohérents et des expériences interactives soulignent un lien fort avec la marque. Une stratégie visuelle et fonctionnelle se distingue dans un marché numérique saturé.
                        </p>

                        <p>
                            Mais que se passe-t-il lorsque la stratégie est brouillonne ou visuellement décevante ? L'intérêt s'effondre avant même que le prospect ne découvre votre offre. C'est ici que le design, la cohérence et l'animation entrent en jeu. Plongeons dans cet article pour comprendre comment bâtir une stratégie marketing digitale durable, et pourquoi les visuels et l'expérience utilisateur sont essentiels à long terme.
                        </p>

                        <h2 className="font-bold text-xl mb-6 mt-6" id="Qualite">Pourquoi la qualité visuelle est cruciale dans une stratégie marketing digitale</h2>

                        <p>
                            Dans le monde numérique, la première impression compte plus que jamais. Investir dans une identité visuelle forte et cohérente est toujours une décision stratégique. Une campagne au design générique aura du mal à capter l'attention, tandis qu'un univers de marque travaillé fidélise l'audience.
                        </p>

                        <p>
                            Voici pourquoi l'aspect visuel est capital dans la planification de votre stratégie marketing digitale :
                        </p>

                        <ul className="mt-4 mb-3">
                            <li><strong>Capturer l'attention dès le premier regard :</strong> Un visuel percutant peut arrêter un scroll en quelques secondes.</li>
                            <li><strong>Interface utilisateur claire et conviviale :</strong> Des pages web épurées, des messages bien hiérarchisés, un parcours fluide incitant à l'exploration.</li>
                            <li><strong>Renforcement de l'identité de marque :</strong> Des visuels uniques rendent votre marque mémorable et lui donnent une forte personnalité.</li>
                            <li><strong>Engagement accru du public :</strong> Des contenus visuellement engageants (vidéos, animations, carrousels) incitant aux partages et interactions.</li>
                            <li><strong>Renforcement de la crédibilité :</strong> Une présence visuelle professionnelle inspire confiance et sérieux.</li>
                        </ul>

                        <h2 className="font-bold text-xl mb-6 mt-6" id="Role">Le rôle du contenu animé et interactif dans une stratégie efficace</h2>

                        <p>
                            Une stratégie de contenu ne se limite pas à des textes bien écrits. Elle inclut également la manière dont les messages sont animés, présentés et vécus par l'utilisateur. L'animation joue un rôle crucial pour transformer une simple information en expérience mémorable.
                        </p>

                        <h3 className="mt-2 font-semibold">Transitions fluides pour un parcours utilisateur naturel</h3>
                        <p>
                            Un site ou une page de campagne doit guider l'utilisateur de manière intuitive. Les micro-animations, les transitions douces entre les sections et les effets de survol facilitent la lecture et dynamisent le parcours. Cela crée une expérience fluide et agréable.
                        </p>

                        <h3 className="mt-2 font-semibold">Effets visuels pour renforcer les messages clés</h3>
                        <p>
                            Une offre spéciale, une nouveauté ou un appel à l'action doit se démarquer. Un effet de zoom, de flash discret ou de mouvement directionnel attire l'œil là où il faut. Ces petits effets donnent de l'impact à vos messages.
                        </p>

                        <h3 className="mt-2 font-semibold">Engagement par l'interactivité</h3>
                        <p>
                            Des interfaces statiques rebutent. Des éléments interactifs - quiz, sliders, boutons dynamiques - permettent au public de vivre l'expérience de marque. Ils transforment les simples visiteurs en utilisateurs actifs, voire en ambassadeurs.
                        </p>

                        <h2 className="font-bold text-xl mb-6 mt-6" id="Aspects">Aspects techniques à considérer pour une stratégie performante</h2>

                        <p>
                            Même la plus belle stratégie numérique peut échouer si elle est techniquement bancale. La performance, l'accessibilité et la compatibilité sont essentielles pour offrir une expérience optimale.
                        </p>

                        <ul>
                            <li><strong>Optimisation multisupport :</strong> Votre stratégie doit être pensée pour tous les supports : mobile, tablette, ordinateur de bureau.</li>
                            <li><strong>Performance et rapidité d'affichage :</strong> Les utilisateurs n'attendent pas. Un site lent fait fuir.</li>
                            <li><strong>Compatibilité avec divers navigateurs et systèmes :</strong> Une expérience cohérente sur Chrome, Safari, Firefox et sur Android comme iOS est indispensable.</li>
                            <li><strong>Équilibre entre esthétique et efficacité :</strong> Un design complexe ne doit pas nuire à la lisibilité ni à la conversion.</li>
                            <li><strong>Gestion des ressources :</strong> Des animations mal optimisées peuvent surcharger le navigateur ou l'appareil.</li>
                        </ul>

                        <h2>Tendances visuelles et stratégiques en marketing digital</h2>

                        <p>
                            Les tendances en marketing digital évoluent vite. Voici quelques-unes des tendances actuelles qui renforcent l'impact et la durabilité des stratégies digitales :
                        </p>

                        <ul>
                            <li><strong>Micro-interactions animées :</strong> Des animations discrètes lors d'un clic, d'un défilement ou d'un survol améliorent l'interaction.</li>
                            <li><strong>Design minimaliste et storytelling visuel :</strong> Un design épuré mettant en valeur les messages clés.</li>
                            <li><strong>Vidéo courte et immersive :</strong> Le format vidéo explose sur toutes les plateformes.</li>
                            <li><strong>Personnalisation des contenus :</strong> Les contenus personnalisés augmentent considérablement l'engagement.</li>
                            <li><strong>Utilisation de l'intelligence artificielle :</strong> Pour ajuster les visuels selon le public cible.</li>
                        </ul>

                        <h2 className="mb-6 mt-6 text-xl font-semibold" id="Cout">Coût d'une stratégie marketing digitale visuellement percutante</h2>

                        <p>
                            Le budget d'une stratégie numérique peut varier de 5 000 € à plus de 100 000 €, selon la complexité, le niveau de personnalisation et les supports utilisés. Une stratégie avec des visuels basiques coûte moins cher, mais son impact peut être limité.
                        </p>

                        <p>
                            Investir dans des visuels puissants, du contenu animé, un UX design réfléchi et une compatibilité multi-support représente un coût, mais aussi un levier de retour sur investissement. Chaque choix graphique ou interactif influence la performance globale de votre stratégie.
                        </p>

                        <div className="p-6 rounded-lg my-8">
                            <h3 className="md:text-xl font-bold mb-4">Comment DIHA'S conçoit des stratégies numériques visuelles et performantes</h3>
                            <p>
                                Chez DIHA'S, nous comprenons que la réussite d'une stratégie numérique ne repose pas uniquement sur les mots, mais sur l'expérience globale. C'est pourquoi nous combinons design, animation, storytelling et technologie pour créer des campagnes engageantes et durables.
                            </p>
                            <p className="mt-4">
                                Nos experts UX/UI, nos développeurs front-end et nos spécialistes en marketing travaillent main dans la main pour offrir des expériences fluides, intuitives et esthétiques. Chaque landing page, chaque animation ou visuel est pensé pour servir un objectif précis : capter, convaincre, fidéliser.
                            </p>
                        </div>

                        <h2 className="font-semibold text-xl mb-4">Conclusion</h2>

                        <p>
                            Une stratégie marketing digitale bien planifiée, visuellement soignée et techniquement solide peut transformer un simple message en expérience engageante et mémorable. Le design, l'interactivité et l'animation ne sont pas de simples embellissements, mais des outils stratégiques pour renforcer votre marque et fidéliser votre public.
                        </p>

                        <p>
                            Les entreprises qui réussissent leur transition numérique s'appuient sur des stratégies esthétiques, cohérentes et orientées utilisateur. Avec l'accompagnement de DIHA'S, construisez une stratégie digitale qui allie performance, créativité et durabilité.
                        </p>
                        {/* Navigation entre articles - Responsive */}
                        <div className="flex flex-row sm:flex-row justify-between items-center mt-12 border-t pt-6 gap-4">
                            <button className="text-black hover:text-orange-500 flex items-center order-1 sm:order-none">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="sm:inline">Article précédent</span>
                            </button>

                            <button className="text-black hover:text-orange-500 flex items-center order-2 sm:order-none">
                                <span className="sm:inline">Article suivant</span>
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </article>

                    {/* Colonne droite - DESKTOP ONLY (bloc d'aide) */}
                    <aside className="lg:w-1/4 order-2 lg:order-none hidden lg:block">
                        <div className="sticky top-4 space-y-6">
                            {/* Barre de recherche */}
                            <div className="relative max-w-md">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="w-full px-6 py-3 rounded-2xl bg-transparent border-2 text-black placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Bloc d'aide - DESKTOP */}
                            <div className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
                                <h3 className="font-bold mb-4 text-md">
                                    Avez-vous besoin d'aide avec les services de développement d'applications et de sites Web ?
                                </h3>
                                <div className="flex justify-between gap-3">
                                    <button className="bg-green-600 text-white font-bold px-5 py-2 rounded">
                                        Oui
                                    </button>
                                    <button className="border border-gray-400 text-black font-bold px-5 py-2 rounded">
                                        Non
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
                <div className="bg-[#1A5276] from-blue-50 to-blue-100 rounded-xl p-6 md:p-12 my-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Partie texte */}
                        <div className="md:w-1/2">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                                Avez-vous besoin d'aide pour votre projet de développement d'applications ou de développement web ou mobile ?
                            </h3><br />
                            <p className="text-white mb-6">
                                Laissez nos développeurs vous aider à en faire une réalité.
                            </p><br />
                            <button className="bg-[#FFA500] hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                                Contactez-Nous Maintenant
                            </button><br />
                        </div>

                        {/* Espace réservé pour l'image (à droite) */}
                        <div className="md:w-1/2 hidden md:block">
                            {/* L'image sera ajoutée ici ultérieurement */}
                            <div className="bg-gray-200 rounded-lg h-96 w-full flex items-center justify-center text-black">
                                Image à venir
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}