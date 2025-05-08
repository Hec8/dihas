"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoMdShare } from "react-icons/io";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import Image from "next/image";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const Page = () => {
  const handleClick = () => {
    window.location.href = "/contact";
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const carouselRef = useRef(null);

  const images = [
    "/assets/dp/HomePage (1).jpg",
    "/assets/dp/Logi.png",
    "/assets/dp/Log (1).png",
    "/assets/dp/Expertise.png",
    "/assets/dp/Customer Space.png",
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
          <h1 className="font-bold text-left text-4xl text-red-600 md:text-5xl lg:text-7xl pb-10">
            Chantier+
          </h1>

          <p className="pb-10">Une application de création de Buisness plan.</p>

          {/* Trois icônes */}
          <div className="flex md:gap-4 pb-6 text-gray-700">
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Localisation</h1>
              <p className="text-xs">205 M avis</p>
            </div>
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Type</h1>
              <p className="text-xs">205 M avis</p>
            </div>
            <div className="flex flex-col px-4 ">
              <h1 className="font-bold text-sm text-center">Industrie</h1>
              <p className="text-xs">Téléchargements</p>
            </div>
          </div>
          <div className="flex md:gap-4 pb-6 text-gray-700">
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Monétisation</h1>
              <p className="text-xs">4 ans et plus</p>
            </div>
            <div className="flex flex-col px-6 border-r border-gray-300">
              <h1 className="font-bold text-sm text-center">Bénéfice estimé</h1>
              <p className="text-xs">4 ans et plus</p>
            </div>
            <div className="flex flex-col px-6">
              <h1 className="font-bold text-sm text-center">CA estimé</h1>
              <p className="text-xs">4 ans et plus</p>
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
          <Image src="/assets/dp/Logo_chantier.png" alt="Logo chantier+"
            width={200}
            height={120} />
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
        <h2 className="text-2xl font-semibold mb-2">Pourquoi choisir chantier+? </h2>
        <p className=" text-sm text-justify  sm:text-base leading-relaxed">
          Chantier+ est une application conçue pour simplifier la gestion des projets de construction et
          optimiser le travail des entrepreneurs. Elle offre une solution complète permettant de suivre
          l&apos;avancement des chantiers en temps réel, de gérer les équipes, de planifier les tâches et de
          contrôler les ressources de manière efficace.
          Grâce à une interface intuitive et des fonctionnalités adaptées aux besoins des professionnels
          du bâtiment, Chantier+ facilite la communication entre les équipes sur le terrain et les responsables en bureau.
          L&apos;application permet également d&apos;automatiser les rapports de chantier, de suivre les dépenses et de garantir
          un meilleur respect des délais et des budgets.
          Que vous soyez entrepreneur, chef de chantier ou artisan, Chantier+ vous accompagne au quotidien pour
          optimiser votre productivité et améliorer la rentabilité de vos projets.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Principaes fonctionnalités </h2>
        <div className="mt-6 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          <h3 className="text-lg font-bold mb-4"> Propriétaires</h3>
          <p><span className="font-semibold">🔍 Parcourir les prestataires et services :</span> Accès facile aux professionnels du BTP et à leurs services.</p>
          <p className="mt-3"><span className="font-semibold">📩 Demande de devis ou commande de service :</span> Envoi de demandes de services ou commandes directes en ligne.</p>
          <p className="mt-3"><span className="font-semibold">⏱️ Suivi en temps réel :</span> Visualisation de l&apos;avancement des projets à chaque étape.</p>
          <p className="mt-3"><span className="font-semibold">💳 Paiement sécurisé :</span> Paiement via carte bancaire, Mobile Money, ou autres options sûres.</p>
          <p className="mt-3"><span className="font-semibold">👤 Espace personnel :</span> Gestion de son profil, de ses commandes et historique de projets.</p>
          <p className="mt-3"><span className="font-semibold">📄 Suivi budgetaire:</span> Outils permettant de suivre les dépenses en temps réel et de comprarer les coups réels au prévisions. </p>
          <p className="mt-3"><span className="font-semibold">📈 Rapport détaillé:</span> Génération de rapport de performances,statistiques financières et état d&apos;avancement du chantier.</p>
          <h3 className="text-lg font-bold mt-6 mb-4">Entrepreneur en construction</h3>
          <p><span className="font-semibold">📝 Inscription pro :</span> Création rapide d&apos;un compte professionnel sécurisé.</p>
          <p className="mt-3"><span className="font-semibold">📄 Profil complet :</span> Informations, projets réalisés, certifications, etc.</p>
          <p className="mt-3"><span className="font-semibold">🏪 Boutique de services :</span> Ajout de prestations disponibles à la vente.</p>
          <p className="mt-3"><span className="font-semibold">📥  Réception et gestion des commandes
            :</span> Réception et gestion des demandes de clients.</p>
          <p className="mt-3"><span className="font-semibold">📊 Suivi de projet :</span> Mise à jour de l&apos;état des travaux pour chaque client.</p>
          <p className="mt-3"><span className="font-semibold">💬 Messagerie intégrée :</span> Communication directe avec les clients via une messagerie intégrée.</p>
          <p className="mt-3"><span className="font-semibold">⭐ Avis & évaluations :</span> Système de notation pour renforcer la crédibilité.</p>
          <p className="mt-3"><span className="font-semibold">📈 Rapport détaillé:</span> Génération de rapport de performances,statistiques financières et état d&apos;avancement du chantier.</p>
          <h3 className="text-lg font-bold mt-6 mb-4"> Administration</h3>
          <p><span className="font-semibold">✅ Validation des profils :</span> Contrôle et validation des comptes prestataires.</p>
          <p className="mt-3"><span className="font-semibold">🧾 Gestion des tâche :</span> Planification et suivi des étapes du chantier,gestion des délais et des ressources.</p>
          <p className="mt-3"><span className="font-semibold">🛰️ Supervision des projets :</span> Vue d&apos;ensemble sur tous les projets en cours.</p>
          <p className="mt-3"><span className="font-semibold">🛡️ Modération des contenus :</span> Vérification des descriptions, photos, messages, etc.</p>
          <p className="mt-3"><span className="font-semibold">📈 Statistiques :</span> Suivi global de la plateforme, taux d&apos;activité, performance des prestataires.</p>
          <p className="mt-3"><span className="font-semibold">📩 Alertes et Notifications:</span>Alertes pour le dépassement de budget,le retard dans le chantier et rappel de tâches importantes.</p>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Modèle Économique :</h2>
        <div className="mt-6 max-w-3xl mx-auto text-sm sm:text-base text-justify leading-relaxed mt-2">
          <p className="mt-3"><span className="font-semibold ">💰Commissions sur mise en relation :</span> Prendre une commission sur
            la transaction réalisée via la plateforme entre propriétaire et EC.
          </p>

          <p className="mt-3"><span className="font-semibold mb-2" >🌟Abonnements premium  :</span> Offrir une option d&apos;abonnement prénium pour accéder à des fonctionnalités avancer.
            (gestion du type chantier,rapport detaillés etc... ).
          </p>
          <p className="mt-3"><span className="font-semibold mb-2" >📢Publicité ciblée: </span> vente d&apos;espace publicitaire au fournisseur de materiel de construction et autresacteur du service. </p>
          <h2 className="text-2xl font-semibold mb-2">Prévisions de Revenus :</h2>
          <div className="mt-6 max-w-3xl mx-auto text-sm sm:text-base text-justify leading-relaxed mt-2">
            <p className="mt-3"><span className="font-semibold "> 📅Année 1 :</span>   30 000 € (principalement générés par des abonnements premium et des commissions sur les mises en relation).
            </p>
            <p className="mt-3"><span className="font-semibold mb-2" >📅Année 2 :</span> 100 000 € (augmentation du nombre d&apos;utilisateurs et de chantiers traités).
            </p>
            <p className="mt-3"><span className="font-semibold mb-2" >📅Année 3 :</span> 250 000 € (expansion et services supplémentaires).
            </p>
            <p className="text-sm sm:text-base text-justify leading-relaxed mt-2">chantier+ est une solution innovante pour résoudre les défis quotidiens des propriètaires et des professionnels dans le domaine de la construction. Grâce à une plateforme simple, accessible et efficace, cette application a un fort potentiel pour transformer la manière dont les chantiers sont gérés,
              tout en répondant à une demande croissante pour des solutions numériques dans le secteur de la construction.Acheter chantier+ vous donne entreprise rentable.</p>
          </div>
          {/*bouton acheter et recommander  */}

          <div className="flex pt-10 pb-10 place-content-between">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600  w-36 lg:w-40 px-4 py-2 border border-orange-500 font-bold text-white rounded-lg bg-orange-500 transition"
            >
              Acheter
            </Link>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Découvrez Chantier+!",
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
            <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">#1 top des applications gratuites-communication</span>
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
                      <p className="text-xs">205 M avis</p>
                    </div>
                    <div className="flex flex-col px-6 ">
                      <h1 className="font-bold text-sm text-center">Type</h1>
                      <p className="text-xs">205 M avis</p>
                    </div>
                    <div className="flex flex-col px-4 ">
                      <h1 className="font-bold text-sm text-center">Industrie</h1>
                      <p className="text-xs">Téléchargements</p>
                    </div>
                  </div>
                  <div className="flex md:gap-4 pb-6 text-gray-700">
                    <div className="flex flex-col px-6 ">
                      <h1 className="font-bold text-sm text-center">Monétisation</h1>
                      <p className="text-xs">4 ans et plus</p>
                    </div>
                    <div className="flex flex-col px-6 ">
                      <h1 className="font-bold text-sm text-center">Bénéfice estimé</h1>
                      <p className="text-xs">4 ans et plus</p>
                    </div>
                    <div className="flex flex-col px-6">
                      <h1 className="font-bold text-sm text-center">CA estimé</h1>
                      <p className="text-xs">4 ans et plus</p>
                    </div>
                  </div>
                  {/* Boutons */}
                  <div className="flex flex-wrap pt-4 gap-4">
                    <Link
                      href="/contact"
                      className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600  w-36 lg:w-40 px-4 py-2 font-bold text-white rounded-lg bg-orange-500 transition"
                    >
                      Acheter
                    </Link>

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
    </div>
  );
};

export default Page;

