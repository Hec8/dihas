"use client";

import { useState, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus } from 'lucide-react';

import { projets } from '../../../projets.js';

export default function ProjetDetail({ params }) {
  // Affichage du nom du projet directement dans le composant

  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = use(params);
  const idNum = parseInt(id);
  let projet = (!isNaN(idNum) && projets[idNum]) ? projets[idNum] : null;

  // Affichage du nom du projet
  const nomProjet = searchParams.get('nom') || (projet ? projet.nom : 'Projet');

  // --- Affichage du nom en haut du composant ---
  // Place ceci dans le JSX principal :
  // <h1>{nomProjet}</h1>

  if (params) {
    params.nom = nomProjet;
  }
  // Vérifier si l'ID est valide et si les projets sont disponibles
  if (!projet) {
    return (
      <div className="min-h-screen bg-green-50 p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Projet non trouvé</h1>
        <button 
          onClick={() => router.push('/project-manage')}
          className="mt-4 bg-green-700 text-white py-2 px-6 rounded-md hover:bg-green-800 transition-colors"
        >
          Retour à la liste des projets
        </button>
      </div>
    );
  }

  const [showModal, setShowModal] = useState(false);
  const [nouveauService, setNouveauService] = useState({ nom: "", description: "" });

  // Services par défaut
  const services = [
    { id: "developpement", nom: "Développement", description: "Description du service Développement", couleur: "bg-green-600" },
    { id: "design", nom: "Design", description: "Description du service Design", couleur: "bg-yellow-500" }
  ];

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setNouveauService(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour sauvegarder le nouveau service (à implémenter)
    console.log("Nouveau service:", nouveauService);
    setShowModal(false);
    setNouveauService({ nom: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-900 mb-6">{nomProjet}</h1>
      {/* Infos projet (statut, priorité, échéance, description) */}
      <div className="mb-8">
        <div className="flex items-center mt-2">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-2">
            {projet.statut}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            projet.priorite === "Urgente" ? "bg-red-100 text-red-800" :
            projet.priorite === "Moyenne" ? "bg-yellow-100 text-yellow-800" :
            "bg-blue-100 text-blue-800"
          }`}>
            {projet.priorite}
          </div>
          <div className="ml-4 text-gray-600">
            Échéance: {projet.dateLimite}
          </div>
        </div>

      </div>

      {/* Section des services */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Ajouter un service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => router.push(`/project-manage/espace-travail/project/${idNum}/service/${service.id}`)}
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start mb-4">
                <div className={`w-16 h-16 rounded-md ${service.couleur} flex items-center justify-center text-white text-3xl font-bold`}>
                  D
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-black">{service.nom}</h3>
                  <p className="text-gray-600 mt-1 line-clamp-2">{service.description}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-green-700 hover:underline text-sm">Voir plus</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour ajouter un service */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-black">Ajouter un service</h2>
            
            {/* Nom du service */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Nom du service</label>
              <input
                type="text"
                name="nom"
                value={nouveauService.nom}
                onChange={handleServiceChange}
                placeholder="Ex: Marketing"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            
            {/* Description du service */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={nouveauService.description}
                onChange={handleServiceChange}
                placeholder="Description du service..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                rows="3"
              />
            </div>
            
            {/* Bouton Ajouter */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-green-700 text-white rounded-lg px-6 py-2 font-semibold flex items-center gap-2 hover:bg-green-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}