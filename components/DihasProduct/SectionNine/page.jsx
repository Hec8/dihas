"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

const faqData = [
  {
    question: "Pourquoi Diha's ?",
    answer: "Diha's aspire à vous offrir le meilleur du numérique en livrant des produits finement travaillés et peaufinés pour faire ressortir vos idéaux et vos valeurs. Plus qu'une simple entreprise de développement, c'est un compagnon dans votre marche sur la toile du numérique et le meilleur guide que vous puissiez avoir."
  },
  {
    question: "Comment se déroule le processus de commande ?",
    answer: "Le processus de commande commence par une prise de contact où nous discutons de vos besoins. Ensuite, nous définissons les spécifications et lançons le développement. Après validation et tests, nous livrons le produit final."
  },
  {
    question: "Qu'est-ce qui prouve que vous êtes les meilleurs ?",
    answer: "Nos clients satisfaits, notre expertise et notre engagement à fournir des solutions adaptées et innovantes sont nos meilleures preuves."
  },
  {
    question: "Quels sont les tarifs ?",
    answer: "Nos tarifs varient en fonction de la complexité du projet et des services demandés. Contactez-nous pour un devis personnalisé."
  }
];

const SectionNine = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-section" className="lg:h-auto p-6 sm:p-4">
      <div className="shadow-2xl rounded-xl max-w-5xl mx-auto p-8 bg-white border border-green-200">
        <div className="shadow-md rounded-lg mb-6 bg-green-100 p-4">
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            Questions les plus souvent posées sur nos produits et services
          </h1>
        </div>

        {faqData.map((item, index) => (
          <div key={index} className="shadow-md rounded-lg mb-6">
            {/* Question - Change de couleur si ouverte */}
            <div
              className={`p-4 flex justify-between items-center cursor-pointer rounded-t-lg transition-colors duration-300 ${openIndex === index ? "bg-green-100" : "bg-white"
                }`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center gap-2">
                <div className="min-w-[24px] flex items-center">
                  {openIndex === index && (
                    <Image
                      src="/Image/Round Minus icon.png"
                      alt="Round Minus"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  )}
                </div>
                <h1 className="font-bold text-base sm:text-lg">{item.question}</h1>
              </div>
              <div className="w-6 h-6 flex items-center justify-center">
                {openIndex === index ? (
                  <Minus size={24} className="text-green-500 w-6 h-6" />
                ) : (
                  <Plus size={24} className="w-6 h-6" />
                )}
              </div>
            </div>

            {/* Réponse */}
            {openIndex === index && (
              <div className="bg-green-100 p-4 rounded-b-lg">
                <p className="text-gray-500 text-sm sm:text-base">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionNine;
