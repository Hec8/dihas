import React from "react";
import Image from "next/image";

const SectionThree = () => {
  return (
    <div id="about-section" className=" lg:w-full  p-4 lg:p-20">
      <div className=" lg:flex-row md:flex-row  items-center flex justify-center flex-col gap-6  border-2 lg:border-4 lg:gap-12 lg:p-8 border-dashed ">
        <Image
          className="rounded-2xl md:w-2/5 lg:w-1/3 w-56 p-4"
          src="/assets/dp/image2.png"
          alt="Logo Diha"
          width={2400}
          height={2000}
        />
        <div className=" lg:w-2/3 md:w-3/5 lg:text-rigth ">
          <h1 className=" font-bold text-center lg:text-4xl text-xl text-stone-950 ">
            {" "}
            <span className="text-amber-500">Diha's</span> : Société de
            développement de solutions digitales adaptatives.
          </h1>
          <p className="lg:text-xl p-4 text-sm text-justify ">
            Chez DIHA&apos;S, nous sommes spécialisés dans le marketing digital
            et le développement de solutions numériques innovantes. Forts de
            notre expertise accumulée au fil des ans, nous accompagnons nos
            clients dans leur transformation digitale en leur offrant des
            stratégies sur mesure. Que ce soit pour améliorer leur visibilité en
            ligne ou optimiser leurs performances commerciales, notre équipe
            d&apos;experts s&apos;engage à fournir des résultats tangibles et à
            dépasser vos attentes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
