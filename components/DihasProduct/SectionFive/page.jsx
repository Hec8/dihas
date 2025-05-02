"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SectionFive = () => {
  const router = useRouter();

  return (
    <div id="solutions-pretes-section" className="lg:pl-20 lg:pr-20 p-4">
      <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] rounded-2xl p-6 mb-8">
        <h1 className="text-3xl sm:text-2xl font-bold text-center">Applications prêtes pour la vente</h1>
      </div>
      <div className="lg:pt-10 lg:flex-row flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 lg:grid-cols-2 gap-6 lg:gap-32">
          {/* Premier bloc  */}
          <div className="bg-white shadow-[8px_8px_15px_rgba(0,0,0,0.2)] 
                                rounded-2xl flex flex-col items-center gap-2 lg:gap-6 lg:gap-12 w-full lg:w-full lg:max-w-lg">
            <div className="relative flex-shrink-0 lg:flex-shrink-0">
              <Image
                src="/assets/dp/MockuP reservation.jpg"
                alt="Application Tranoo"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>

            <div className="w-full justify-center items-center pb-8 flex flex-col gap-4 gap-1">
              <h2 className="text-green-800 lg:text-lg text-center lg:w-2/3 text-sm font-bold">Booking : Application web et mobile prête à vendre</h2>
              <p className="text-sm w-40 lg:w-2/3 text-center lg:text-lg leading-relaxed lg:leading-relaxed">
                Booking est une plateforme simple et rapide de réservation de gest house et de chambre d&apos;hôtel adaptée aux besoins des voyageurs.</p>

              <button
                onClick={() => router.push("/booking")}
                className="w-36 lg:w-2/3 lg:px-6 lg:py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition mt-auto"
              >
                Voir plus
              </button>
            </div>
          </div>

          {/* Deuxième bloc clinico */}
          <div className="bg-white  shadow-[8px_8px_15px_rgba(0,0,0,0.2)] 
                                rounded-2xl  flex flex-col items-center gap-2 lg:gap-6 lg:gap-12 w-full lg:w-full lg:max-w-lg">
            <div className="relative  flex-shrink-0 lg:flex-shrink-0">
              <Image
                src="/assets/dp/Mockup dash 2.jpg"
                alt="Application Tranoo"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>

            <div className="  w-full justify-center items-center pb-8  flex flex-col gap-4 gap-1 ">
              <h2 className=" text-green-800 lg:text-lg text-center lg:w-2/3 text-sm font-bold">Clinico : Application web et mobile prête à vendre</h2>
              <p className="text-sm w-40 lg:w-2/3 text-center lg:text-lg leading-relaxed lg:leading-relaxed">
                Une application de gestion complet de clinique médicale, qui vous permet de gérer vos patients, vos rendez-vous et vos factures en toute simplicité.</p>

              <button
                onClick={() => router.push("/clinico")}
                className="w-36 lg:w-2/3 lg:px-6 lg:py-2 border border-orange-500 font-bold text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition mt-auto"
              >
                Voir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFive;
