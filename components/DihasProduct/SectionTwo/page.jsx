import React from "react";
import Image from "next/image";

const SectionTwo = () => {
  return (
    <div className="  lg:p-20 lg:pb-0 p-4 flex flex-col lg:flex-row gap-6 lg:gap-20  justify-center items-center">

      <div className=" flex flex-col lg:w-2/3  gap-6 md:flex-row md:gap-28 lg:gap-20 ">
        {/* Carte 1 */}
        <div className="  h-48 w-60  lg:w-1/2 lg:h-72 p-4 lg:p-10 border-2 lg:border-4 border-dashed text-left flex flex-col gap-4 items-start">
          <Image
            className=" w-10 h-10 lg:w-20 lg:h-20"
            src="/assets/dp/Delivery icon.png"
            alt="Logo Diha"
            width={30}
            height={30}
          />
          <h1 className="lg:text-4xl text-2xl text-green-700 font-bold lg:mt-2">
            +20
          </h1>
          <h2 className="lg:text-lg text-sm font-bold mt-2">
            Applications de <br /> livraisons
          </h2>
        </div>

        {/* Carte 2 */}
        <div className=" h-48 w-60  lg:w-1/2 lg:h-72 p-4 lg:p-10 border-2 lg:border-4 border-dashed  text-left flex flex-col gap-4 items-start">
          <Image
            className="w-10 h-10 lg:w-20 lg:h-20"
            src="/assets/dp/Health icon.png"
            alt="Logo Diha"
            width={30}
            height={30}
          />
          <h1 className="lg:text-4xl text-2xl text-green-700 font-bold lg:mt-2">
            +20
          </h1>
          <h2 className="lg:text-lg text-sm lg:mr-20 font-bold mt-2">
            Applications dans la santé
          </h2>
        </div>
      </div>

      {/* Carte 3 */}
      <div className="h-48 w-60  lg:w-1/3 lg:h-72 p-4 lg:p-10 border-2 lg:border-4 border-dashed text-left flex flex-col gap-4 items-start">
        <Image
          className="w-10 h-10 lg:w-20 lg:h-20"
          src="/assets/dp/Car icon.png"
          alt="Logo Diha"
          width={30}
          height={30}
        />
        <h1 className="lg:text-4xl text-2xl text-green-700 font-bold lg:mt-2">
          +20
        </h1>
        <h2 className="lg:text-lg  text-sm font-bold mt-2">
          Applications de transports
        </h2>
      </div>
    </div>
  );
};

export default SectionTwo;
