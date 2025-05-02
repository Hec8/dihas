"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";  

const Section_Ten = () => {
  const router = useRouter(); // ✅ Déplacement ici

  return (
    <div className="lg:p-20  w-full  p-10">
    <div className='  lg:flex-row md:flex-row p-10 lg:gap-40 gap-10 flex flex-col  rounded-2xl shadow-xl bg-gradient-to-r from-lime-200 via-lime-100 to-emerald-100 transition duration-300 group-hover:opacity-0'>
      <div className="justify-center md:w-2/5 flex items-center  ">
        <Image className='lg:w-[700px] md:w-[220px] w-[300px]  rounded-3xl'
          src="/assets/dp/image 3.png"
          alt="Logo Diha"
          width={450}
          height={0}
        />
      </div>
      <div className=' flex flex-col md:w-3/5 lg:gap-16 gap-6 justify-center'>
        <p className='lg:text-3xl  text-xl text-stone-950 font-bold '>Obtenez des applications en 
        marque blanche avec Complète Précision et capacité de personnalisation à 100% </p>
        
        <div className="flex justify-center w-full">
          <button 
            onClick={() => router.push("/connexion")} 
            className="relative text-stone-50 md:w-72 lg:text-xl w-60 text-md lg:py-4 rounded-lg font-bold transition duration-300 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-amber-400 transition duration-300 group-hover:opacity-0"></span>
            <span className="absolute inset-0 bg-amber-500 opacity-0 transition duration-300 group-hover:opacity-100"></span>
            <span className="relative block">Commandez maintenant →</span>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Section_Ten;