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
    "/assets/dp/Auto care.png",
    "/assets/dp/iPhone 16 Plus - 1.png",
    "/assets/dp/iPhone 16 Plus - 1.png",
    "/assets/dp/iPhone 16 Plus - 1.png",
    "/assets/dp/iPhone 16 Plus - 1.png",
  ];

  const products = [
    {
      title: "Auto Car",
      description: "Une application de vente de véhicules d&apos;occasion et de pièces détachées.",
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
      image: "/assets/dp/fitness.png",
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
      title: "Buisness Plan",
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
          <h1 className="font-bold text-left text-4xl text-green-700 md:text-5xl lg:text-7xl pb-10">
            Auto Car
          </h1>

          <p className="pb-10">Une application mobile de vente de vehicule d&apos;occasion et des pièces détachés.</p>

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
              <p className="text-xs">Automobile</p>
            </div>
          </div>
          <div className="flex md:gap-4 pb-6 text-gray-700">
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Monétisation</h1>
              <p className="text-xs">Commission, abonnements et publicités</p>
            </div>
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Bénéfice estimé</h1>
              <p className="text-xs">A determiner</p>
            </div>
            <div className="flex flex-col px-6">
              <h1 className="font-bold text-sm text-center">CA estimé</h1>
              <p className="text-xs">A determiner</p>
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
          <Image src="/assets/dp/logo_autocar.png" alt="Logo Auto Car"
            width={400}
            height={200} />
        </div>
      </div>

      {/* Carrousel d'images */}
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
        <h2 className="text-2xl font-semibold mb-2">Pourquoi acheter auto car?</h2>
        <p className="text-justify text-sm sm:text-base leading-relaxed">
          Aujourd&apos;hui, vendre ou acheter une voiture ou une pièce détachée, c&apos;est encore un parcours du
          combattant : des plateformes vieillissantes, des arnaques fréquentes, une navigation peu mobile-friendly,
          et une vraie galère pour trouver des pièces compatibles.
          Autocar est une application mobile simple, rapide et sécurisée pour vendre ou acheter des
          véhicules d&apos;occasion et des pièces détachées, pour un particulier ou un professionnel.
          <br />
          <br />
        </p>
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Fonctionnalités principales</h1>

          <h2 className="text-2xl font-semibold mt-6 mb-2">🚗 Achat & Vente de Voitures</h2>
          <p><span className="font-semibold">👤 Profils utilisateurs :</span> Création de profils pour les vendeurs et les acheteurs.</p>
          <p className="mt-2"><span className="font-semibold">📸 Annonces détaillées :</span> Système d'annonces avec photos, vidéos, prix et détails (marque, modèle, année, kilométrage).</p>
          <p className="mt-2"><span className="font-semibold">🔍 Recherche avancée :</span> Filtres par prix, marque, modèle, localisation.</p>
          <p className="mt-2"><span className="font-semibold">💬 Chat intégré :</span> Système de messagerie entre acheteurs et vendeurs.</p>
          <p className="mt-2"><span className="font-semibold">🔔 Notifications push :</span> Alertes pour les nouveaux messages ou les validations de vente.</p>
          <p className="mt-2"><span className="font-semibold">⭐ Favoris :</span> Ajout d&apos;annonces aux favoris pour les retrouver facilement.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">🔧 Achat de Pièces Détachées</h2>
          <p><span className="font-semibold">📂 Catégories organisées :</span> Classement par moteur, freinage, pneus, etc.</p>
          <p className="mt-2"><span className="font-semibold">🎯 Filtres intelligents :</span> Recherche de pièces compatibles selon le véhicule.</p>

          <h1 className="text-3xl font-bold text-center mt-12 mb-6">Fonctionnalités Administrateur</h1>

          <p><span className="font-semibold">📊 Tableau de bord :</span> Interface pour gérer les utilisateurs et les annonces.</p>
          <p className="mt-2"><span className="font-semibold">🛡️ Modération :</span> Validation et contrôle des contenus publiés.</p>
          <p className="mt-2"><span className="font-semibold">💰 Paiements et litiges :</span> Gestion des transactions et résolution de conflits.</p>
          <p className="mt-2"><span className="font-semibold">📈 Statistiques :</span> Suivi des annonces, transactions et utilisateurs actifs.</p>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Modèle Économique</h1>

          <div className="mt-6 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            <p>
              <span className="font-semibold">💡 Freemium :</span> Accès gratuit aux fonctionnalités de base telles que le chat, les forums, et les profils utilisateurs.
            </p>
            <p className="mt-3">
              <span className="font-semibold">💎 Premium :</span> Accès aux outils avancés, match-making professionnel, événements privés et support prioritaire.
            </p>
            <p className="mt-3">
              <span className="font-semibold">🛍️ Marketplace :</span> Prise de commission sur les services entre membres de la plateforme.
            </p>
            <p className="mt-3">
              <span className="font-semibold">📢 Publicité ciblée :</span> Vente d&apos;espaces publicitaires sur la plateforme, avec ciblage selon les intérêts et profils des utilisateurs.
            </p>
          </div>
        </div>


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
                  title: "Découvrez AutoCar!",
                  text: "Voici une opportunité de Buisness pour toi!",
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
          <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">#1 top des applications gratuites – communication</span>
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
            <li><strong>Cette appli peut recueillir ces types de données :</strong> Position, Informations personnelles et 5 autres</li>
            <li>Les données sont chiffrées lors de leur transfert</li>
            <li>Vous pouvez demander la suppression des données</li>
          </ul>
        </Card>
      </div>
      {/* Section défilante produits */}
      <div className="h-screen border border-gray-100 rounded-xl overflow-hidden transition-all duration-700 ease-in-out bg-white relative">
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
                    <p className="text-xs">Automobile</p>
                  </div>
                </div>
                <div className="flex md:gap-4 pb-6 text-gray-700">
                  <div className="flex flex-col px-6 border-r border-gray-300">
                    <h1 className="font-bold text-sm text-center">Monétisation</h1>
                    <p className="text-xs">Commission, abonnements et publicités</p>
                  </div>
                  <div className="flex flex-col px-6 border-r border-gray-300">
                    <h1 className="font-bold text-sm text-center">Bénéfice estimé</h1>
                    <p className="text-xs">A determiner</p>
                  </div>
                  <div className="flex flex-col px-6">
                    <h1 className="font-bold text-sm text-center">CA estimé</h1>
                    <p className="text-xs">A determiner</p>
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
