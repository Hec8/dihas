"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoMdShare } from "react-icons/io";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Image from "next/image";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const carouselRef = useRef(null);

  const images = [
    "/assets/dp/Loading Page.png",
    "/assets/dp/Login.png",
    "/assets/dp/Onboarding (1).png",
    "/assets/dp/Onboarding.png",
    "/assets/dp/buisnes image.png",
  ];

  const products = [
    {
      title: "Auto Car",
      description: "Une application de réservation de get house et de chambre d&apos;hôtel.",
      image: "/assets/dp/Auto care.png",
    },
    {
      title: "Fitness",
      description: "Application de suivi de santé.",
      image: "/assets/dp/fitness.png",
    },
    {
      title: "Trootroo",
      description: "Suivi de vos performances sportives et programmes personnalisés.",
      image: "/assets/dp/trotro1.png",
    },
    {
      title: "Wakati",
      description: "Apprentissage en ligne avec des vidéos, quiz, et badges.",
      image: "/assets/dp/wakati.png",
    },
    {
      title: "Booking",
      description: "Boutique écoresponsable pour produits bio.",
      image: "/assets/dp/High-Fidelity (Home).png",
    },
    {
      title: "Clinico",
      description: "Boutique écoresponsable pour produits bio.",
      image: "/assets/dp/Clinico.png",
    },
    {
      title: "Business Plan",
      description: "Boutique écoresponsable pour produits bio.",
      image: "/assets/dp/buisnes image.png",
    },
    {
      title: "e-Vignette",
      description: "Boutique écoresponsable pour produits bio.",
      image: "/assets/dp/Welce Screen-1.png",
    },
    {
      title: "Chantier+",
      description: "Boutique écoresponsable pour produits bio.",
      image: "/assets/dp/HomePage (1).jpg",
    },
    {
      title: "RéseauPro",
      description: "Boutique écoresponsable pour produits bio.",
      image: "/assets/dp/WELCOME.png",
    },
    {
      title: "Booking",
      description: "Boutique écoresponsable pour produits bio.",
      image: "/assets/dp/Hotel.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.7;

      carouselRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>

      {/* Première section avant images */}
      <div className="md:pt-40 md:pl-20 pt-28 pl-8 pr-8 flex md:gap-96">
        <div className="lg:w-1/2 w-3/4">
          <h1 className="font-bold text-left text-4xl text-blue-500 md:text-5xl lg:text-7xl pb-10">
            Business plan
          </h1>

          <p className="pb-10">Une application web et mobile de création de  Business plan moderne,
            stucturer et adapter aux exigences du marché.</p>

          {/* Trois icônes */}
          <div className="flex md:gap-4 pb-6 text-gray-700">
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Localisation</h1>
              <p className="text-xs">Internationnale</p>
            </div>
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Type</h1>
              <p className="text-xs">SAAS</p>
            </div>
            <div className="flex flex-col px-4 ">
              <h1 className="font-bold text-sm text-center">Industrie</h1>
              <p className="text-xs">Technologie</p>
            </div>
          </div>
          <div className="flex md:gap-4 pb-6 text-gray-700">
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Monétisation</h1>
              <p className="text-xs">Abonnements,services et formations</p>
            </div>
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Bénéfice estimé</h1>
              <p className="text-xs">à determiner</p>
            </div>
            <div className="flex flex-col px-6">
              <h1 className="font-bold text-sm text-center">CA estimé</h1>
              <p className="text-xs">à determiner</p>
            </div>
          </div>
          {/* Boutons */}
          <div className="flex flex-wrap pt-4 gap-4">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 w-36 lg:w-40 px-4 py-2 font-bold text-white rounded-lg transition text-center"
            >
              Acheter
            </Link>

            <div className="flex items-center space-x-2 text-orange-500">
              <IoMdShare size={20} />
              <span className="text-sm font-medium">Partager</span>
            </div>

            <div className="flex items-center space-x-2 text-orange-500">
              <MdOutlineBookmarkAdd size={20} />
              <span className="text-sm font-medium">Ajouter à la liste de souhaits</span>
            </div>
          </div>
        </div>

        {/* Logo application */}
        <div className="w-1/4">
          <Image src="/assets/dp/Business 1.png" alt=""
            width={200}
            height={100} />
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto mt-10">
        {/* Flèches de navigation */}
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => scroll("left")} className="p-2 bg-gray-200 rounded-full">
            <ChevronLeft size={30} />
          </button>
          <button onClick={() => scroll("right")} className="p-2 bg-gray-200 rounded-full">
            <ChevronRight size={30} />
          </button>
        </div>

        {/* Liste des images */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide space-x-2"
        >
          {images.map((src, index) => (
            <div key={index} className="relative w-64 h-96 flex-shrink-0 snap-center">
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                width={256}
                height={384}
                className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                onClick={() => setSelectedImage(src)}
              />
            </div>
          ))}
        </div>

        {/* Modale d'affichage de l'image */}
        {selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="relative bg-white p-2 rounded-lg shadow-lg max-w-3xl">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full"
              >
                <X size={24} />
              </button>
              <Image
                src={selectedImage}
                alt="Image sélectionnée"
                width={600}
                height={800}
                className="max-w-[90%] max-h-[80vh] object-contain mx-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
      {/* Section À propos */}
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-2">Pourquoi acheter Business plan?</h2>
        <p className="text-justify text-sm sm:text-base leading-relaxed">
          Lancer une entreprise est une aventure passionnante, mais elle nécessite une préparation rigoureuse.
          C&apos;est là que Business Plan intervient : une application conçue pour vous guider pas à pas dans la
          création d&apos;un business plan structuré et efficace.

          Que vous soyez entrepreneur, indépendant, startup ou chef d&apos;entreprise, notre outil vous permet de
          transformer vos idées en projet concret. Grâce à une interface intuitive et des modèles personnalisables,
          vous pouvez rédiger un business plan adapté à votre secteur d&apos;activité, tout en suivant les bonnes pratiques
          du marché. </p><br /><br />
        <h2 className="text-2xl font-semibold mb-2">Principales fonctionnalités</h2>
        <div className="mt-6 max-w-3xl mx-auto text-justify text-sm sm:text-base leading-relaxed">
          Avec Business Plan, vous bénéficiez de plusieurs fonctionnalités clés : <br />
          <p><span className="font-semibold">🧭 Interface guidée :</span> Structuration simple et intuitive des sections.</p>
          <p className="mt-3"><span className="font-semibold">📄 Modèles personnalisables :</span> Modèles préconçus facilement adaptables selon les préférences de l&apos;utilisateur.</p>
          <p className="mt-3"><span className="font-semibold">💡 Assistance IA :</span> Conseils contextuels pour améliorer le contenu en temps réel.</p>
          <p className="mt-3"><span className="font-semibold">🖊️ Éditeur en ligne :</span> Interface d&apos;édition avec prévisualisation directe du rendu final.</p>
          <p className="mt-3"><span className="font-semibold">📤 Export multi-formats :</span> Possibilité de télécharger en PDF, Word et autres formats populaires.</p>
          <p className="mt-3"><span className="font-semibold">👀 Visualisation en temps réel :</span> Aperçu instantané des modifications appliquées.</p>
          <p className="mt-3"><span className="font-semibold">🕓 Historique des versions :</span> Système de versioning pour revenir aux anciennes modifications.</p>
          <p className="mt-3"><span className="font-semibold">🎨 Personnalisation du design :</span> Choix de thèmes, couleurs et typographies pour un rendu professionnel.</p>
          <p className="mt-3"><span className="font-semibold">🆓 Accès gratuit :</span> Utilisation libre avec des fonctionnalités de base limitées.</p>
          <p className="mt-3"><span className="font-semibold"> 📅Calcul financières automatisés:</span> Gestion automatique des prévisions financières, y compris des bilans des flux de tresorerie et des tableux de rentabilités .</p>
          <p className="mt-3"><span className="font-semibold"> ⭐Collaboration en équipe:</span> Fonction permettant à plusieurs utilisateurs de travailler ensemble sur un même busness plan en tant réel.</p>
          <p className="mt-3"><span className="font-semibold">📄  Conseil d&apos;expert:</span> Accès à des conseils d&apos;experts sur chaque section de businness plan(juridique, maketing, financier etc ..,).</p>
          <p className="mt-3"><span className="font-semibold">💎 Abonnement premium :</span> Déblocage d&apos;options avancées pour une expérience complète.</p>
        </div> <br />
        <h2 className="text-2xl font-semibold mb-2">Modèle Économique </h2>
        <div className="mt-6 max-w-3xl mx-auto text-sm sm:text-base text-justify leading-relaxed">
          <p className="mt-3"><span className="font-semibold "> 💎Abonnement : .</span> Modèle de base gratuit avec une version prénium payante</p>

          <p className="mt-3"><span className="font-semibold mb-2" >⚡Prestations:</span> Offrir des services supplémentaires tels que des section de mentorâts ou des conseils d&apos;experts.
          </p>
          <p className="mt-3"><span className="font-semibold mb-2" >🛍️ Offre de formation: </span> Proposer des cours en ligne pour apprendre à rédiger un businness plan plus approfondit.
          </p>
        </div><br />
        <h2 className="text-2xl font-semibold mb-2">Prévisions de Revenus :</h2>
        <div className="mt-6 max-w-3xl mx-auto text-sm sm:text-base text-justify leading-relaxed">
          <p className="mt-3"><span className="font-semibold "> 📅Année 1 :</span>  300 000 € de revenus estimés
            (principalement issu des abonnements prénium).
          </p>
          <p className="mt-3"><span className="font-semibold mb-2" >📅Année 2 :</span>600 000 € de revenus
            (grâce à une base d&apos;utilisateurs croissante et à l&apos;ajout de services prénium . ).
          </p>
        </div>
        <p className="text-sm sm:text-base text-justify leading-relaxed mt-2">Plus 1 milloin d&apos;entreprise sont créé dans le monde par jour.Ce qui représente un large marché d&apos;opportunité pour le développement
          d&apos;un  basé sur une application tel que businness plan. Investir dans cette application, c&apos;est
          choisir l&apos;innovation, la proximité, et le potentiel de croissance sur un marché en constante évolution.
          Saisissez cette opportunité unique de créer un startup idéal à un projet solide, prêt à impacter le monde de l&apos;entrepreunariat.
        </p>
        {/*bouton acheter et recommander  */}
        <div className="flex pt-10 pb-10 place-content-between">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 w-36 lg:w-40 px-4 py-2 border border-orange-500 font-bold text-white rounded-lg bg-orange-500 transition"
          >
            Acheter
          </Link>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Découvrez Business Plan!",
                  text: "Voici une opportunité de Business plan pour toi!",
                  url: window.location.href, // L'URL actuelle
                }).catch((error) => console.log("Erreur de partage :", error));
              } else {
                alert("Le partage n'est pas supporté sur cet appareil.");
              }
            }}
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 w-36 lg:w-40 px-4 py-2 border border-orange-500 font-bold text-white rounded-lg bg-orange-500 transition"
          >
            Recommander
          </button>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold mt-4">Date de mise à jour</h2>
        <p className="text-sm sm:text-base">13 mars 2025</p>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">#1 top des applications gratuites-communication</span>
          <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">Communication</span>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold mt-6">Sécurité des données</h2>
        <p className="text-sm sm:text-base leading-relaxed">
          La sécurité, c&apos;est d&apos;abord comprendre comment les développeurs collectent et partagent vos données. Les pratiques concernant leur
          confidentialité et leur protection peuvent varier selon votre utilisation, votre région et votre âge. Le développeur a fourni ces
          informations et peut les modifier ultérieurement.
        </p>

        <Card className="p-4 mt-4 bg-gray-100 border border-gray-300">
          <ul className="space-y-2 text-sm sm:text-base">
            <li><strong>Aucune donnée partagée avec des tiers</strong></li>
            <li><Link href="/contact" className="text-blue-600">En savoir plus</Link> sur la manière dont les développeurs déclarent le partage</li>
            <li><strong>Cette application peut recueillir ces types de données :</strong> Position, Informations personnelles et 5 autres</li>
            <li>Les données sont chiffrées lors de leur transfert</li>
            <li>Vous pouvez demander la suppression des données</li>
          </ul>
        </Card>
      </div>
      {/* Section défilante produits */}
      <div className="h-screen border border border-red-500 border-gray-100 bg-green-50 rounded-xl overflow-hidden transition-all duration-700 ease-in-out bg-white relative">
        {products.map((product, index) => (
          <div
            key={index}
            className={`h-screen w-full absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center h-full">
              <div className="md:w-1/2 px-8 md:px-20">
                <h1 className="font-bold text-left text-4xl text-green-700 md:text-5xl lg:text-7xl pb-4">
                  {product.title}
                </h1>
                <p className="pb-10">{product.description}</p>
                {/* Trois icônes */}
                <div className="flex md:gap-4 pb-6 text-gray-700">
                  <div className="flex flex-col px-6 border-r border-gray-300">
                    <h1 className="font-bold text-sm text-center">Localisation</h1>
                    <p className="text-xs">Internationnale</p>
                  </div>
                  <div className="flex flex-col px-6 border-r border-gray-300">
                    <h1 className="font-bold text-sm text-center">Type</h1>
                    <p className="text-xs">SAAS</p>
                  </div>
                  <div className="flex flex-col px-4 ">
                    <h1 className="font-bold text-sm text-center">Industrie</h1>
                    <p className="text-xs">Technologie</p>
                  </div>
                </div>
                <div className="flex md:gap-4 pb-6 text-gray-700">
                  <div className="flex flex-col px-6 border-r border-gray-300">
                    <h1 className="font-bold text-sm text-center">Monétisation</h1>
                    <p className="text-xs">Abonnements,services et formations</p>
                  </div>
                  <div className="flex flex-col px-6 border-r border-gray-300">
                    <h1 className="font-bold text-sm text-center">Bénéfice estimé</h1>
                    <p className="text-xs">à determiner</p>
                  </div>
                  <div className="flex flex-col px-6">
                    <h1 className="font-bold text-sm text-center">CA estimé</h1>
                    <p className="text-xs">à determiner</p>
                  </div>
                </div>
                {/* Boutons */}
                <div className="flex flex-wrap pt-4 gap-4">
                  <Link
                    href="/contact"
                    className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 w-36 lg:w-40 px-4 py-2 font-bold text-white rounded-lg bg-orange-500 transition"
                  >
                    Acheter
                  </Link>

                  <div className="flex items-center space-x-2 text-orange-500">
                    <IoMdShare size={20} />
                    <span className="text-sm font-medium">Partager</span>
                  </div>

                  <div className="flex items-center space-x-2 text-orange-500">
                    <MdOutlineBookmarkAdd size={20} />
                    <span className="text-sm font-medium">Ajouter à la liste de souhaits</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 w-36 sm:pt-8 flex flex-col items-center justify-center relative">
                <Image
                  src={product.image}
                  alt={`Image ${product.title}`}
                  className="lg:w-52 rounded-3xl"
                  width={400}
                  height={200}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;