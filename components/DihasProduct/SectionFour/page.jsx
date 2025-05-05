"use client"; // Nécessaire pour utiliser `useRouter()`

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SectionThree = () => {
  const router = useRouter();

  return (
    <div className="lg:p-20 lg:pt-0 p-4 ">
      <div className="md:flex-row pb-6 flex flex-col gap-6 rounded-2xl bg-green-700 transition duration-300 group-hover:opacity-0">
        <div className="lg:w-2/3 md:w-3/5 flex flex-col lg:pl-12 gap-4 lg:gap-16 lg:p-10">
          <p className="lg:text-3xl w-full p-4 text-xl text-center text-stone-50 font-bold">
            Boostez exponentiellement la puissance digitale de votre entreprise
            avec nos produits prêts à l&apos;emploi!
          </p>

          <div className="flex justify-center w-full mt-auto">
            <button
              onClick={() => router.push("/contact")}
              className="relative mx-auto block justify-center items-center text-stone-50 text-md lg:text-xl w-60 py-2 lg:w-72 lg:px-4 lg:py-4 lg:rounded-2xl rounded-xl font-bold transition duration-300 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-amber-400 transition duration-300 group-hover:opacity-0"></span>
              <span className="absolute inset-0 bg-amber-500 opacity-0 transition duration-300 group-hover:opacity-100"></span>
              <span className="justify-center relative text-center block">
                Commandez maintenant →
              </span>
            </button>
          </div>
        </div>

        <div className="lg:w-80 md:w-2/5 justify-center flex items-center">
          <Image className='w-52 lg:w-[500px] md:w-[250px] rounded-3xl'
            src="/assets/dp/image 4 (2).png"
            alt="Logo Diha"
            width={400}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionThree;