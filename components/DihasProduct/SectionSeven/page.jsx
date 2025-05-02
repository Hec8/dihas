"use client";
import React from "react";
import { useRouter } from "next/navigation";  

const SectionSeven = () => {
  const router = useRouter(); // Déplacer useRouter ici

  return (
    <div className='lg:p-20   p-4'>
        <div className='lg:flex-row items-center justify-center  md:flex-row p-4  flex flex-col gap-6 lg:gap-20 inset-0 bg-green-700 transition rounded-2xl duration-300 group-hover:opacity-0'> 
        <div className="lg:flex-row lg:p-10 lg:justify-end">
          <video
            className="lg:w-[350px] md:w-[250px] md:h-[250px] w-[200px] h-[250px] lg:h-[375px] object-cover rounded-2xl shadow-lg"
            src="/Image/WhatsApp Vidéo 2025-02-19 à 13.06.59_e7274a93.mp4"
            controls
            autoPlay
            loop
            muted
          />
        </div>
                   
            <div className='lg:w-2/3 md:w-3/5 md:justify-center  lg:gap-20 gap-10 flex flex-col '>
                <div>
                  <p className='lg:text-3xl text-xl text-center text-stone-100  font-bold'>
                    Creez votre entreprise avec nos applications mobiles prêtes à l’emploi !  
                  </p>
                </div>
                
                <button  
                  onClick={() => router.push("/connexion")} 
                  className="relative text-stone-50 lg:text-xl lg:w-72 w-60  text-md lg:px-4 lg:py-4 md:px-4 lg:py-4 px-2 py-2 rounded-lg font-bold transition duration-300 overflow-hidden group mx-auto block sm:left-0">
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-amber-400 transition duration-300 group-hover:opacity-0"></span>
                  <span className="absolute inset-0 bg-amber-400 opacity-0 transition duration-300 group-hover:opacity-100"></span>
                  <span className="relative text-center block">Commandez maintenant →</span>
                </button>
            </div>
        </div>
    </div>
  );
};

export default SectionSeven;
