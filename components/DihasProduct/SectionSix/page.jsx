"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import axios from '@/lib/axios';

const SectionSix = () => {
  const router = useRouter();


  return (
    <div id="sectionsix" className="lg:pl-20 lg:pr-20 p-4">
      <div className="lg:flex-row flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 lg:grid-cols-2 gap-6 lg:gap-32">

          {/* Produits dynamiques
          {dynamicProducts.map((product, index) => (
            <div key={`dynamic-${index}`} className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col h-[600px]">
              <div className="h-[300px] relative overflow-hidden">
                <Image
                  src={product.image || '/assets/default-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-green-800 lg:text-lg text-center text-sm font-bold mb-4">{product.name}</h2>
                  <p className="text-sm lg:text-lg text-center leading-relaxed lg:leading-relaxed">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => router.push(`liens/produit/${product.slug || product.id}`)}
                    className="w-36 lg:w-2/3 px-4 py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                  >
                    Voir plus
                  </button>
                </div>
              </div>
            </div>
          ))} */}

          {/* Produit statique existant - Réseau Pro */}
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col h-[600px]">
            <div className="h-[300px] relative overflow-hidden">
              <Image
                src="/assets/dp/Mockup dash 4.jpg"
                alt="Application Tranoo"
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="flex flex-col flex-grow p-4 lg:p-8 justify-between">
              <div>
                <h2 className="text-green-800 lg:text-lg text-center text-sm font-bold mb-4">Business Plan : Application web et mobile prête à vendre</h2>
                <p className="text-sm lg:text-lg text-center leading-relaxed lg:leading-relaxed">
                  Une application web et mobile de création de Business plan moderne,
                  stucturer et adapter aux exigences du marché.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("liens/produit/businessplan")}
                  className="w-36 lg:w-2/3 px-4 py-2 border font-bold border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>

          {/* Deuxième bloc vignette */}
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col h-[600px]">
            <div className="h-[300px] relative overflow-hidden">
              <Image
                src="/assets/dp/Mockup dash 1.jpg"
                alt="Application Tranoo"
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="flex flex-col flex-grow p-4 lg:p-8 justify-between">
              <div>
                <h2 className="text-green-800 lg:text-lg text-center text-sm font-bold mb-4">e-Vignette : Application web et mobile prête à vendre</h2>
                <p className="text-sm lg:text-lg text-center leading-relaxed lg:leading-relaxed">
                  Une application web et mobile de gestion de vignette permettant l&apos;emission,
                  la verification ,le suivi et le renouvellement des vignettes pour divers produits et services.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("liens/produit/evignette")}
                  className="w-36 lg:w-2/3 px-4 py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:pt-10 pt-6 lg:flex-row flex flex-col justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 lg:grid-cols-2 gap-6  lg:gap-32">

          {/* Premier bloc  chantier*/}
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col h-[600px]">
            <div className="h-[300px] relative overflow-hidden">
              <Image
                src="/assets/dp/Mockup dash-5.jpg"
                alt="Application"
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="flex flex-col flex-grow p-4 lg:p-8 justify-between">
              <div>
                <h2 className="text-green-800 lg:text-lg text-center text-sm font-bold mb-4">Chantier+ : Application web et mobile prête à vendre</h2>
                <p className="text-sm lg:text-lg text-center leading-relaxed lg:leading-relaxed">
                  Chantier+ est une application numérique qui vise à révolutionner
                  la manière dont les projets de construction sont gérés.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("liens/produit/Chantier+")}
                  className="w-36 lg:w-2/3 px-4 py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>

          {/* Deuxième bloc Réseau */}
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col h-[600px]">
            <div className="h-[300px] relative overflow-hidden">
              <Image
                src="/assets/dp/Mockup dash 3.jpg"
                alt="Application Tranoo"
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="flex flex-col flex-grow p-4 lg:p-8 justify-between">
              <div>
                <h2 className="text-green-800 lg:text-lg text-center text-sm font-bold mb-4">Réseau Pro : Application web et mobile prête à vendre</h2>
                <p className="text-sm lg:text-lg text-center leading-relaxed lg:leading-relaxed">
                  Une application web et mobile de chat en ligne favorisant la collaboration, les échanges
                  entre les entrepreneurs.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("liens/produit/reseaupro")}
                  className="w-36 lg:w-2/3 px-4 py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:pt-10 pt-6 lg:flex-row flex flex-col justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 lg:grid-cols-2 gap-6  lg:gap-32">

          {/* Premier bloc  aut car*/}
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col h-[600px]">
            <div className="h-[300px] relative overflow-hidden flex items-center justify-center bg-gray-50">
              <Image
                src="/assets/dp/Auto care.png"
                alt="Application"
                width={250}
                height={250}
                className="object-contain"
                style={{ maxHeight: '100%' }}
              />
            </div>
            <div className="flex flex-col flex-grow p-4 lg:p-8 justify-between">
              <div>
                <h2 className="text-green-800 lg:text-lg text-center text-sm font-bold mb-4">Auto car : Application web et mobile prête à vendre</h2>
                <p className="text-sm lg:text-lg text-center leading-relaxed lg:leading-relaxed">
                  Une application mobile de vente de vehicule d&apos;occasion et des pièces détachés.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("liens/produit/autocar")}
                  className="w-36 lg:w-2/3 px-4 py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>

          {/* Deuxième bloc Fitness */}
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col h-[600px]">
            <div className="h-[300px] relative overflow-hidden flex items-center justify-center bg-gray-50">
              <Image
                src="/assets/dp/fit.png"
                alt="Application Tranoo"
                width={500}
                height={300}
                className="object-contain"
                style={{ maxHeight: '100%' }}
              />
            </div>
            <div className="flex flex-col flex-grow p-4 lg:p-8 justify-between">
              <div>
                <h2 className="text-green-800 lg:text-lg text-center text-sm font-bold mb-4">Fitness : Application web et mobile prête à vendre</h2>
                <p className="text-sm lg:text-lg text-center leading-relaxed lg:leading-relaxed">
                  Obtenez fitness et communiquez plus facilement avec vos proches,amis et partenaires d&apos;affaires
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("liens/produit/fitness")}
                  className="w-36 lg:w-2/3 px-4 py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:pt-10 pt-6 lg:flex-row flex flex-col justify-center items-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 lg:grid-cols-2 gap-6  lg:gap-32">

          {/* Premier bloc  trootroo*/}
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col h-[600px]">
            <div className="h-[300px] relative overflow-hidden">
              <Image
                src="/assets/dp/Mockup trotro.png"
                alt="Application"
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="flex flex-col flex-grow p-4 lg:p-8 justify-between">
              <div>
                <h2 className="text-green-800 lg:text-lg text-center text-sm font-bold mb-4">Trootroo : Application web et mobile prête à vendre</h2>
                <p className="text-sm lg:text-lg text-center leading-relaxed lg:leading-relaxed">
                  Achetez votre application pour collaborer avec les entrepreneurs pour vos travaux de construction .
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("liens/produit/Trootroo")}
                  className="w-36 lg:w-2/3 px-4 py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>

          {/* Deuxième bloc wakati */}
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl flex flex-col h-[600px]">
            <div className="h-[300px] relative overflow-hidden">
              <Image
                src="/assets/dp/Mockup wakashi.png"
                alt="Application"
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="flex flex-col flex-grow p-4 lg:p-8 justify-between">
              <div>
                <h2 className="text-green-800 lg:text-lg text-center text-sm font-bold mb-4">Wakati: Application web et mobile prête à vendre</h2>
                <p className="text-sm lg:text-lg text-center leading-relaxed lg:leading-relaxed">
                  Obtenez wakati et communiquez plus facilement avec vos proches,amis et partenaires d&apos;affaires
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("liens/produit/wakati")}
                  className="w-36 lg:w-2/3 px-4 py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition"
                >
                  Voir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSix;
