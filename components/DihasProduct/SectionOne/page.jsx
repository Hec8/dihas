"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const SectionOne = () => {
  const router = useRouter();
  return (
    <div className="mt-16">
      <section className="flex flex-col  p-6 md:p-20 gap-6 items-center lg:flex-row  lg:gap-10 ">
        <div className="lg:w-2/5 flex lg:items-start items-center  flex-col gap-8 ">
          <h1 className="text-center  lg:text-left font-bold text-xl lg:text-5xl text-stone-950 relative mb-10">
            Applications prêtes à l&apos;emploi en vente
          </h1>
          <p className=" relative text-justify text-sm lg:text-lg  ">
            Diha&apos;s se propose d&apos;accélérer votre activité en ligne. Faites de
            l&apos;économie de temps et d&apos;argent en optant pour nos solutions
            digitales prêtes à l&apos;emploi et personnalisables. <br />
            Commencez ici et maintenant!
          </p>
          <button
            onClick={() => router.push("/sectionsix")}
            className="relative text-stone-50 text-md  lg:text-xl w-60 lg:w-72 py-1 lg:py-4 rounded-lg font-bold transition duration-300 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-700 to-green-800 transition duration-300 group-hover:opacity-0"></span>
            <span className="absolute inset-0 bg-amber-500 opacity-0 transition duration-300 group-hover:opacity-100"></span>
            <span className="relative text-center">
              Commandez maintenant →
            </span>
          </button>
        </div>
        <Image
          className="lg:w-3/5"
          src="/Image/Accueil.png"
          alt="Logo Diha"
          width={500}
          height={500}
        />
      </section>
      <hr className=" w-2/3 relative left-10 lg:" />
      <div className="grid grid-cols-6 lg:border-0 bg-green-100 w-full shadow-lg  shadow-stone-200 lg:rounded-lg items-center gap-4 p-6">
        {[
          "React colored.png",
          "Js colored.png",
          "Css colored.png",
          "Html colored.png",
          "Flutter colored.png",
          "Laravel color.png",
        ].map((icon, index) => (
          <div
            key={index}
            className="flex justify-center transition-transform duration-300 hover:scale-110"
          >
            <Image
              className="filter transition duration-300 hover:grayscale-0 opacity-50 hover:opacity-100  grayscale"
              src={`/Image/${icon}`}
              alt={`Logo ${icon.split(" ")[0]}`}
              width={70} // Augmente la taille
              height={70}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionOne;
