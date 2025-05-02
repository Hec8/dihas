"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoMdShare } from "react-icons/io";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Image from "next/image";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const Page = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const carouselRef = useRef(null);

  const images = [
    "/assets/dp/WELCOME.png",
    "/assets/dp/BIENVENU.png",
    "/assets/dp/INSCRIPTION.png",
    "/assets/dp/PROFIL SETTINGS.png",
    "/assets/dp/PROFIL.png",
  ];
  const products = [
    {
      title: "Auto Car",
      description: "Une application de réservation de get house et de chambre d'hôtel.",
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

  // Fonction pour faire défiler le carrousel
  const scroll = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.7; // Défilement fluide

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
          <h1 className="font-bold text-left text-2xl text-amber-600 md:text-4xl lg:text-7xl pb-10">
            RéseauPro
          </h1>

          <p className="pb-10">Une application web et mobile de chat en ligne favorisant la  collaboration, les échanges
            entre les entrepreneurs .</p>

          {/* Trois icônes */}
          <div className="flex md:gap-4 pb-6 text-gray-700">
            <div className="flex flex-col px-6 ">
              <h1 className="font-bold text-sm text-center">Localisation</h1>
              <p className="text-xs">Internationnale</p>
            </div>
            <div className="flex flex-col px-6 ">
              <h1 className="font-bold text-sm text-center">Type</h1>
              <p className="text-xs">SAAS</p>
            </div>
            <div className="flex flex-col px-4 ">
              <h1 className="font-bold text-sm text-center">Industrie</h1>
              <p className="text-xs">Sociale</p>
            </div>
          </div>
          <div className="flex md:gap-4 pb-6 text-gray-700">
            <div className="flex flex-col px-6 ">
              <h1 className="font-bold text-sm text-center">Monétisation</h1>
              <p className="text-xs">Commission, abonnements et publicités</p>
            </div>
            <div className="flex flex-col px-6 ">
              <h1 className="font-bold text-sm text-center">Bénéfice estimé</h1>
              <p className="text-xs"> À determiner</p>
            </div>
            <div className="flex flex-col px-6">
              <h1 className="font-bold text-sm text-center">CA estimé</h1>
              <p className="text-xs">À determiner</p>
            </div>
          </div>
          {/* Boutons */}
          <div className="flex flex-wrap pt-4 gap-4">
            <button
              onClick={() => router.push("/contact")}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600  w-36 lg:w-40 px-4 py-2 font-bold text-white rounded-lg bg-orange-500 transition"
            >
              Acheter
            </button>

            <div className="flex items-center space-x-2 text-orange-500">
              <IoMdShare size={20} />
              <h1 className="text-sm font-medium">Partager</h1>
            </div>

            <div className="flex items-center space-x-2 text-orange-500">
              <MdOutlineBookmarkAdd size={20} />
              <h1 className="text-sm font-medium">Ajouter à la liste de souhaits</h1>
            </div>
          </div>
        </div>

        {/* Logo application */}
        <div className="w-1/4">
          <Image src="/assets/dp/Logo ORANGE.png" alt=""
            width={200}
            height={100} />
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
        <h2 className="text-2xl font-semibold mb-2">Pourquoi choisir réseau pro?</h2>
        <p className="text-justify  text-sm sm:text-base leading-relaxed">
          Réseau Pro est une application de chat conçue pour faciliter la communication instantanée entre professionnels et entreprises.
          Avec une interface intuitive et des fonctionnalités avancées, elle permet aux utilisateurs d&apos;échanger des messages, de partager des fichiers et de collaborer en temps réel,
          que ce soit pour des discussions individuelles ou en groupe.

          Pensée pour le monde du travail, Réseau Pro favorise le networking, la gestion des projets et l&apos;optimisation
          des échanges au sein des équipes.
          Que vous soyez entrepreneur, freelance ou salarié, cette application vous offre un environnement sécurisé
          et performant pour rester connecté avec vos collaborateurs et partenaires.
        </p>

        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Fonctionnalités principales</h1>

          <div className="mt-6 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            <p>
              <span className="font-semibold">💬 Messagerie instantanée :</span> Conversations privées et de groupe, avec possibilité de joindre des fichiers (documents, images, etc.).
            </p>
            <p className="mt-3">
              <span className="font-semibold">🏷️ Salons thématiques :</span> Espaces de discussion sur des sujets spécifiques (ex. financement, marketing, développement produit).
            </p>
            <p className="mt-3">
              <span className="font-semibold">🤝 Networking intelligent :</span> Suggestions de connexions basées sur le secteur d&apos;activité, les intérêts et les projets.
            </p>
            <p className="mt-3">
              <span className="font-semibold">📚 Partage de ressources :</span> Option pour partager des articles, vidéos, guides et autres ressources utiles, avec un système de vote.
            </p>
            <p className="mt-3">
              <span className="font-semibold">🎥 Événements en ligne :</span> Organisation de webinars, masterclass, et sessions de mentorat, avec un calendrier d&apos;événements à venir.
            </p>
            <p className="mt-3">
              <span className="font-semibold">📋 Outils de productivité :</span> Création et gestion de tâches pour les projets de groupe, avec intégration de Google Drive, Notion, etc.
            </p>
          </div>
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
        <h2 className="text-2xl font-semibold mb-2">Prévisions de Revenus :</h2>
        <div className="mt-6 max-w-3xl mx-auto text-sm sm:text-base text-justify leading-relaxed mt-2">
          <p className="mt-3"><span className="font-semibold "> 📅Année 1 :</span>  10 000 € de revenus estimés
          </p>
          <p className="mt-3"><span className="font-semibold mb-2" >📅Année 2 :</span> 80 000 € de revenus estimés
          </p>
          <p className="mt-3"><span className="font-semibold mb-2" >📅Année 3 :</span> 50 000 € de revenus estimés
          </p>
          <p className="text-sm sm:text-base text-justify leading-relaxed mt-2">RéseauPro est bien plus qu&apos;une application de messagerie : c&apos;est un outil conçu pour optimiser la communication professionnelle.
            Investissez dans une solution fiable, sécurisée et adaptée à vos besoins.
            👉 Contactez-nous dès maintenant pour obtenir votre version ou demander une démo.</p>
        </div>


        {/*bouton acheter et recommander  */}
        <div className="flex pt-10 pb-10 place-content-between">
          <button
            onClick={() => router.push("/contact")}
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600  w-36 lg:w-40 px-4 py-2 border border-orange-500 font-bold text-white rounded-lg bg-orange-500 transition"
          >
            Acheter
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Découvrez Réseau pro!",
                  text: "Voici une opportunité de Buisness pour toi!",
                  url: window.location.href, // L'URL actuelle
                }).catch((error) => console.log("Erreur de partage :", error));
              } else {
                alert("Le partage n'est pas supporté sur cet appareil.");
              }
            }}
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600  w-36 lg:w-40 px-4 py-2 border border-orange-500 font-bold text-white rounded-lg bg-orange-500 transition"
          >
            Recommander
          </button>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold mt-4">Date de mise à jour</h2>
        <p className="text-sm sm:text-base">13 mars 2025</p>

        <div className="flex  flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">#1 top des applications gratuites – communication</span>
          <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">Communication</span>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold mt-6">Sécurité des données</h2>
        <p className=" text-sm sm:text-base leading-relaxed">
          La sécurité, c&apos;est d&apos;abord comprendre comment les développeurs collectent et partagent vos données. Les pratiques concernant leur
          confidentialité et leur protection peuvent varier selon votre utilisation, votre région et votre âge. Le développeur a fourni ces
          informations et peut les modifier ultérieurement.
        </p>

        <Card className="p-4 mt-4 bg-gray-100 border border-gray-300">
          <ul className="space-y-2 text-sm sm:text-base">
            <li><strong>Aucune donnée partagée avec des tiers</strong></li>
            <li><a href="/contact" className="text-blue-600">En savoir plus</a> sur la manière dont les développeurs déclarent le partage</li>
            <li><strong>Cette appli peut recueillir ces types de données :</strong> Position, Informations personnelles et 5 autres</li>
            <li>Les données sont chiffrées lors de leur transfert</li>
            <li>Vous pouvez demander la suppression des données</li>
          </ul>
        </Card>
      </div>
      {/* Section défilante produits */}
      <div className="h-screen border border-gray-100 bg-green-50 rounded-xl overflow-hidden transition-all duration-700 ease-in-out bg-white relative">
        {products.map((product, index) => (
          <div
            key={index}
            className={`h-screen w-full absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <div className=" flex flex-col md:flex-row items-center justify-center h-full">
              <div className="md:w-1/2  px-8 md:px-20">
                <h1 className="font-bold text-left text-4xl text-green-700 md:text-5xl lg:text-7xl pb-4">
                  {product.title}
                </h1>
                <p className="pb-10">{product.description}</p>
                {/* Trois icônes */}
                <div className="flex md:gap-4 pb-6 text-gray-700">
                  <div className="flex flex-col px-6 ">
                    <h1 className="font-bold text-sm text-center">Localisation</h1>
                    <p className="text-xs">Internationnale</p>
                  </div>
                  <div className="flex flex-col px-6 ">
                    <h1 className="font-bold text-sm text-center">Type</h1>
                    <p className="text-xs">SAAS</p>
                  </div>
                  <div className="flex flex-col px-4 ">
                    <h1 className="font-bold text-sm text-center">Industrie</h1>
                    <p className="text-xs">Sociale</p>
                  </div>
                </div>
                <div className="flex md:gap-4 pb-6 text-gray-700">
                  <div className="flex flex-col px-6 ">
                    <h1 className="font-bold text-sm text-center">Monétisation</h1>
                    <p className="text-xs">Commission, abonnements et publicités</p>
                  </div>
                  <div className="flex flex-col px-6 ">
                    <h1 className="font-bold text-sm text-center">Bénéfice estimé</h1>
                    <p className="text-xs"> À determiner</p>
                  </div>
                  <div className="flex flex-col px-6">
                    <h1 className="font-bold text-sm text-center">CA estimé</h1>
                    <p className="text-xs">À determiner</p>
                  </div>
                </div>
                {/* Boutons */}
                <div className="flex flex-wrap pt-4 gap-4">
                  <button
                    onClick={() => router.push("/contact")}
                    className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600  w-36 lg:w-40 px-4 py-2 font-bold text-white rounded-lg bg-orange-500 transition"
                  >
                    Acheter
                  </button>

                  <div className="flex items-center space-x-2 text-orange-500">
                    <IoMdShare size={20} />
                    <h1 className="text-sm font-medium">Partager</h1>
                  </div>

                  <div className="flex items-center space-x-2 text-orange-500">
                    <MdOutlineBookmarkAdd size={20} />
                    <h1 className="text-sm font-medium">Ajouter à la liste de souhaits</h1>
                  </div>

                </div>
              </div>
              <div className="md:w-1/2 w-36 sm:pt-8 flex flex-col  items-center justify-center relative">
                <Image
                  src={product.image}
                  alt={`Image ${product.title}`}
                  className="lg:w-52  rounded-3xl"
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

