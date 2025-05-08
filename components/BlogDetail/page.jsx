'use client';

import Link from "next/link";
import Image from "next/image";
import { Share2 } from "lucide-react";
import '@/styles/article.css';

export default function BlogDetail({ article, loading }) {
    const currentUrl = typeof window !== "undefined" ? window.location.href : '';

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
        instagram: `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`,
      };
    function formatTextAsHTML(text) {
        return (
            '<p>' +
            text
                .trim()
                .replace(/\n{2,}/g, '</p><p>')  // double retour = nouveau paragraphe
                .replace(/\n/g, '<br/>')        // simple retour = saut de ligne
                + '</p>'
        );
    }
    

    if (loading) {
        return (
            <div className="mt-14">
                <main className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
                    <div className="h-6 bg-gray-200 w-3/4 mb-4"></div>
                    <div className="w-full h-48 md:min-h-[500px] bg-gray-200 mb-6 md:mb-8 rounded-lg"></div>
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 w-1/2"></div>
                        <div className="h-4 bg-gray-200 w-1/4"></div>
                        <div className="h-4 bg-gray-200 w-full"></div>
                        <div className="h-4 bg-gray-200 w-full"></div>
                    </div>
                </main>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="mt-14">
                <main className="container mx-auto px-4 py-8 max-w-6xl">
                    <div className="text-center py-8">
                        <h2 className="text-2xl font-bold text-gray-800">Article non trouvé</h2>
                        <p className="mt-4 text-gray-600">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
                        <Link href="/blog">
                            <button className="mt-6 px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Retour aux articles
                            </button>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="mt-14">
            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Breadcrumb - Responsive */}
                <div className="text-sm md:text-xl mb-4 md:mb-6 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                    <Link href="/"><span className="text-green-800 font-semibold">Accueil</span></Link> »
                    <Link href="/blog"><span className=" text-green-800 font-semibold"> Blog</span></Link> »
                    <span className="text-black font-semibold"> {article.titre}</span>
                </div>

                {/* Image principale - Responsive */}
                <div className="w-full h-48 md:min-h-[500px] relative mb-6 md:mb-8 rounded-lg overflow-hidden">
                    <Image
                        src={article.image || '/assets/default-blog.png'}
                        alt="Image d'illustration"
                        fill
                        className="object-cover md:object-cover"
                        priority
                    />
                </div>

                {/* Structure en trois colonnes - Responsive */}
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Colonne gauche : Détails - Mobile en premier */}
                    <aside className="lg:w-1/4 order-1 lg:order-none">
                        <div className="lg:sticky lg:top-4 bg-green-200 p-4 rounded-lg shadow-md border-l-4 border-[#FFA500]">
                            <h2 className="font-bold text-lg mb-4 border-b-2 border-[#FFA500] pb-2 uppercase">DÉTAILS DE L'ARTICLE</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                                    <span>Publié le : {new Date(article.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                                    <span>Auteur : {article.writer || 'Admin'}</span>
                                </div>
                                <div className="flex items-start">
                                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2"></span>
                                    <span>Catégorie : {article.categorie || 'Non catégorisé'}</span>
                                </div>
                            </div>
                            <div className="mt-6">
                            <h3 className="font-semibold mb-3">Partager cet article</h3>
                            <div className="flex gap-4">
                                {/* Facebook */}
                                <a aria-label="Partager sur Facebook" href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <Image 
                                    src="/assets/fb.png" 
                                    alt="Partager sur Facebook"
                                    width={32}
                                    height={32}
                                />
                                </a>
                                
                                {/* Instagram */}
                                <a aria-label="Partager sur Instagram" href={shareLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <Image 
                                    src="/assets/insta.png" 
                                    alt="Partager sur Instagram"
                                    width={32}
                                    height={32}
                                />
                                </a>
                                
                                {/* LinkedIn */}
                                <a aria-label="Partager sur LinkedIn" href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                                <Image 
                                    src="/assets/LkIn.png" 
                                    alt="Partager sur LinkedIn"
                                    width={32}
                                    height={32}
                                />
                                </a>
                                
                                {/* Autres réseaux si besoin */}
                                <a aria-label="Partager sur WhatsApp" href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
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

                    {/* Colonne centrale : Contenu principal */}
                    <article className="lg:w-2/4 order-2">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">{article.titre}</h1>

                        <div className="text-sm text-gray-600 flex flex-wrap items-center gap-2 mb-6">
                            <span>👤 Par <strong>{article.writer || 'Admin'}</strong></span>
                            <span>📅 <strong>Publié le : </strong>{new Date(article.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span>🕓 <strong>Modifié le : </strong>{new Date(article.updated_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>

                        {/* Contenu de l'article */}
                        <div 
                            className="prose prose-sm sm:prose lg:prose-lg max-w-none mt-8 mb-12
                                    prose-headings:text-gray-800 prose-headings:font-bold
                                    prose-p:text-justify prose-p:mb-4 prose-p:leading-relaxed
                                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-gray-900 prose-strong:font-bold
                                    prose-em:text-gray-800 prose-em:italic
                                    prose-ul:list-disc prose-ul:pl-6
                                    prose-ol:list-decimal prose-ol:pl-6
                                    prose-li:my-2
                                    prose-blockquote:border-l-4 prose-blockquote:border-gray-300
                                    prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
                                    prose-img:rounded-lg prose-img:shadow-md"
                        >
                            {article.contenu ? (
                                <div
                                dangerouslySetInnerHTML={{
                                    __html: formatTextAsHTML(article.contenu)
                                  }}
                                  className="article-content text-justify"
                                />
                            ) : (
                                <p className="text-gray-500 italic text-center py-4">
                                    Le contenu de cet article n'est pas disponible.
                                </p>
                            )}
                        </div>


                        {/* Navigation entre articles - Responsive */}
                        <div className="flex flex-row sm:flex-row justify-between items-center mt-12 border-t pt-6 gap-4">
                            <button className="text-black hover:text-orange-500 flex items-center order-1 sm:order-none">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Article précédent
                            </button>
                            <button className="text-black hover:text-orange-500 flex items-center order-2 sm:order-none">
                                Article suivant
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </article>

                    {/* Colonne droite : Aide */}
                <aside className="lg:w-1/4 order-3 lg:block">
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

                    {/* Bloc d'aide - Déplacé à l'intérieur du div sticky */}
                    <div className="bg-green-200 p-4 rounded-lg shadow-md text-center">
                    <h3 className="font-bold mb-4 text-md">
                        Avez-vous besoin d'aide avec les services de développement d'applications et de sites Web ?
                    </h3>
                    <div className="flex justify-between gap-3">
                        <Link href="/contact">
                        <button className="bg-green-300 text-black font-bold px-5 py-2 rounded transition-colors">
                            Oui
                        </button>
                        </Link>
                        <button className="border border-gray-400 text-black font-bold px-5 py-2 rounded hover:bg-gray-200 transition-colors">
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
                            <button
                                onClick={() => window.location.href = '/contact'}
                                className="bg-[#FFA500] hover:bg-orange-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
                            >
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