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
    "/assets/dp/wakatti1.png",
    "/assets/dp/wakatti2.png",
    "/assets/dp/wakatti3.png",
    "/assets/dp/wakati4.png",
    "/assets/dp/wakati5.png",
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

      {/* Hero section */}
      <div className="md:pt-40 md:pl-20 pt-28 pl-8 pr-8 flex md:gap-96">
        <div className="lg:w-1/2 w-3/4">
          <h1 className="font-bold text-left text-4xl text-indigo-950 md:text-5xl lg:text-7xl pb-4">
            Wakati
          </h1>
          <p className="pb-10">Une application de réservation de get house et de chambre d&apos;hôtel.</p>

          {/* Infos et icônes */}
          <div className="flex md:gap-4 pb-6 text-gray-700">
            {["Localisation", "Type", "Industrie"].map((label, i) => (
              <div key={i} className={`flex flex-col px-6 ${i !== 2 && "border-r border-gray-300"}`}>
                <h1 className="font-bold text-sm text-center">{label}</h1>
                <p className="text-xs">205 M avis</p>
              </div>
            ))}
          </div>

          <div className="flex md:gap-4 pb-6 text-gray-700">
            {["Monétisation", "Bénéfice estimé", "CA estimé"].map((label, i) => (
              <div key={i} className={`flex flex-col px-6 ${i !== 2 && "border-r border-gray-300"}`}>
                <h1 className="font-bold text-sm text-center">{label}</h1>
                <p className="text-xs">4 ans et plus</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap pt-4 gap-4">
            <button
              onClick={() => router.push("/contact")}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 w-36 lg:w-40 px-4 py-2 font-bold text-white rounded-lg transition"
            >
              Acheter
            </button>
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

        {/* Logo */}
        <div className="w-1/4 flex justify-center items-start">
          <Image src="/assets/dp/WAKATTI.png" alt="Logo " width={200} height={200} />
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full max-w-4xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => scroll("left")} className="p-2 bg-gray-200 rounded-full">
            <ChevronLeft size={30} />
          </button>
          <button onClick={() => scroll("right")} className="p-2 bg-gray-200 rounded-full">
            <ChevronRight size={30} />
          </button>
        </div>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide space-x-2"
        >
          {images.map((src, index) => (
            <div key={index} className="relative w-64 h-96 flex-shrink-0 snap-center">
              <Image
                src={src}
                alt={`Image Booking ${index + 1}`}
                width={256}
                height={384}
                className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                onClick={() => setSelectedImage(src)}
              />
            </div>
          ))}
        </div>

        {/* Modal */}
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

      {/* À propos */}
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-2">À propos de l&apos;application →</h2>
        <p className=" text-sm sm:text-base text-justify leading-relaxed">
          Auto Car est bien plus qu&apos;une simple application de gestion automobile. Elle offre une plateforme complète
          pour tous les conducteurs, en combinant à la fois la gestion de l&apos;entretien de votre véhicule, ainsi que
          l&apos;achat et la vente de voitures et de pièces détachées. Grâce à Auto Car, vous pouvez non seulement suivre
          l&apos;état de votre véhicule, planifier des entretiens réguliers et recevoir des rappels pour les services nécessaires,
          mais aussi explorer un marché dynamique pour acheter ou vendre des voitures d&apos;occasion et des pièces
          détachées, qu&apos;elles soient neuves ou d&apos;occasion.
        </p>
        <p className=" text-sm sm:text-base text-justify leading-relaxed mt-2">
          Que vous cherchiez à améliorer votre véhicule ou à trouver une nouvelle voiture, Auto Car simplifie le
          processus en vous offrant des options directement depuis votre mobile. L&apos;application vous permet
          également de localiser des stations-service, de gérer vos documents
          et assurances, et d&apos;accéder à des conseils personnalisés pour prendre soin de votre voiture.
          Auto Car est l&apos;outil idéal pour tous les conducteurs, qu&apos;ils souhaitent entretenir,
          acheter ou vendre leur véhicule.
        </p>

        {/* Acheter + Recommander */}
        <div className="flex pt-10 pb-10 place-content-between">
          <button
            onClick={() => router.push("/contact")}
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 w-36 lg:w-40 px-4 py-2 font-bold text-white rounded-lg"
          >
            Acheter
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: "Découvrez Booking!",
                    text: "Voici une opportunité de Business pour toi.",
                    url: window.location.href,
                  })
                  .catch((error) => console.log("Erreur de partage :", error));
              } else {
                alert("Le partage n'est pas supporté sur cet appareil.");
              }
            }}
            className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-600 w-36 lg:w-40 px-4 py-2 font-bold text-white rounded-lg"
          >
            Recommander
          </button>
        </div>

        {/* Infos & Sécurité */}
        <h2 className="text-lg sm:text-xl font-semibold mt-4">Date de mise à jour</h2>
        <p className="text-sm sm:text-base">13 mars 2025</p>

        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">
            #1 top des applications gratuites – communication
          </span>
          <span className="px-3 py-1 bg-gray-200 rounded-full text-xs sm:text-sm">
            Communication
          </span>
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
            <li><a href="/contact" className="text-blue-600">En savoir plus</a></li>
            <li><strong>Données collectées :</strong> Position, Informations personnelles...</li>
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
