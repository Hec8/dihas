"use client";

import { Plus, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const projets = [
  { 
    nom: "Tranoo", 
    priorite: "Basse",
    dateLimite: "03/05/25",
    description: "Description du projet Tranoo",
    logo: "/assets/avatar-orange.png",
    statut: "En attente"
  },
  { 
    nom: "SPACEBOOST", 
    priorite: "Moyenne",
    dateLimite: "15/06/25",
    description: "  Description du projet SPACEBOOST",
    logo: "/assets/avatar-blue.png",
    statut: "En cours"
  },
  { 
    nom: "Clinico", 
    priorite: "Urgente",
    dateLimite: "28/04/25",
    description: "Description du projet Clinico",
    logo: "/assets/avatar-green.png",
    statut: "Terminé"
  },
  { 
    nom: "Réseau Pro", 
    priorite: "Basse",
    dateLimite: "10/07/25",
    description: "Description du projet Réseau Pro",
    logo: "/assets/avatar-purple.png",
    statut: "En attente"
  },
];

export default function EspaceTravail() {
  const [showDescIdx, setShowDescIdx] = useState(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [dateLimite, setDateLimite] = useState("");
  const [statut, setStatut] = useState("En attente");
  const [priorite, setPriorite] = useState("Moyenne");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, tu pourras envoyer les données au backend plus tard
    // nom, description, dateLimite, statut, priorite, logo
    console.log({
      nom,
      description,
      dateLimite,
      statut,
      priorite,
      logo
    });
    
    setShowModal(false);
    setNom("");
    setDescription("");
    setDateLimite("");
    setStatut("En attente");
    setPriorite("Moyenne");
    setLogo(null);
    setLogoPreview("");
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      {/* Titre de la page (actuellement commenté) */}
      {/* <h1 className="text-3xl font-bold mb-8 text-black">Projets</h1> */}
      
      {/* Champ de recherche et bouton d'ajout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="w-full max-w-xs">
          <div className="bg-white rounded-xl flex items-center px-4 py-3 shadow">
            <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path strokeWidth="2" d="M21 21l-4-4" />
            </svg>
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 border-none focus:ring-0"
              style={{ boxShadow: 'none', border: 'none' }}
            />
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg font-semibold shadow hover:bg-green-800 transition-colors"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-5 h-5" />
          Ajouter un projet
        </button>
      </div>
      
      {/* Grille des projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projets.map((projet, idx) => {
          // Détermine la couleur de la priorité
          let prioriteColor = "text-green-700";
          if (projet.priorite === "Moyenne") prioriteColor = "text-yellow-700";
          if (projet.priorite === "Urgente") prioriteColor = "text-red-700";
          
          return (
            <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{projet.nom}</h3>
                <div className="w-16 h-16 bg-green-600 rounded-md flex items-center justify-center overflow-hidden">
                  {projet.logo ? (
                    <Image 
                      src={projet.logo} 
                      alt={`Logo ${projet.nom}`} 
                      width={64} 
                      height={64} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-green-600"></div>
                  )}
                </div>
              </div>
              
              <div className="mb-2">
                <span className={`font-medium ${prioriteColor}`}>Priorité : {projet.priorite}</span>
              </div>
              
              <div className="mb-4">
                <span className="text-gray-700">{projet.dateLimite}</span>
              </div>
              
              <p className="text-gray-600 mb-2 line-clamp-3">
                {projet.description.length > 80 ? `${projet.description.slice(0, 80)}...` : projet.description}
              </p>
              <button
                className="text-green-700 underline text-sm mb-4 self-start"
                onClick={() => setShowDescIdx(idx)}
                type="button"
              >
                Voir plus
              </button>
              {/* Modal de description complète */}
              {showDescIdx === idx && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
                    <button
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
                      onClick={() => setShowDescIdx(null)}
                    >
                      ×
                    </button>
                    <h3 className="text-xl font-bold mb-4">{projet.nom}</h3>
                    <p className="text-gray-700 mb-4 whitespace-pre-line">{projet.description}</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => router.push(`/project-manage/espace-travail/project/${idx}?nom=${encodeURIComponent(projet.nom)}`)}
                className="mt-auto bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors self-end"
              >
                Accéder
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Modal d'ajout de projet */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto py-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative mx-4 my-auto"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-black">Ajouter un projet</h2>
            
            {/* Nom du projet */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nom du projet</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Tranoo"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
                required
              />
            </div>
            
            {/* Description du projet */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Description du projet</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description du projet..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
                rows="3"
              />
            </div>
            
            {/* Date limite */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Date limite</label>
              <input
                type="date"
                value={dateLimite}
                onChange={(e) => setDateLimite(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
              />
            </div>

            
            {/* Statut */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Statut</label>
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
              >
                <option value="En attente">En attente</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
              </select>
            </div>
            
            {/* Priorité */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Priorité</label>
              <select
                value={priorite}
                onChange={(e) => setPriorite(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
              >
                <option value="Basse">Basse</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Urgente">Urgente</option>
              </select>
            </div>

            {/* Logo du projet */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Logo du projet</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                />
                <label 
                  htmlFor="logo-upload" 
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  Choisir un logo
                </label>
                {logoPreview && (
                  <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-300">
                    <img src={logoPreview} alt="Aperçu du logo" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
            
            {/* Bouton Ajouter */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="bg-green-700 text-white rounded-lg px-6 py-3 font-semibold flex items-center gap-2 hover:bg-green-800 transition-colors shadow"
              >
                <Plus className="w-5 h-5" />
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}