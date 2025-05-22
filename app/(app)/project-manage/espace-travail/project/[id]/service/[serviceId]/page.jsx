"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

const PRIORITES = ["Basse", "Moyenne", "Urgente"];
const STATUTS = ["En attente", "En cours", "Terminé"];

// Color mapping for consistent UI
const COLOR_MAPPING = {
  statut: {
    "Terminé": { bg: "bg-green-100", text: "text-green-700", hover: "hover:bg-green-200" },
    "En cours": { bg: "bg-blue-100", text: "text-blue-700", hover: "hover:bg-blue-200" },
    "En attente": { bg: "bg-yellow-100", text: "text-yellow-700", hover: "hover:bg-yellow-200" },
  },
  priorite: {
    "Urgente": { bg: "bg-red-100", text: "text-red-700", hover: "hover:bg-red-200" },
    "Moyenne": { bg: "bg-yellow-100", text: "text-yellow-700", hover: "hover:bg-yellow-200" },
    "Basse": { bg: "bg-green-100", text: "text-green-700", hover: "hover:bg-green-200" },
  }
};

// Status Badge Component
const StatusBadge = ({ type, value }) => {
  const colors = COLOR_MAPPING[type][value];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${colors.bg} ${colors.text}`}>
      {value === "Urgente" ? "Urgente" : value}
    </span>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
      <div ref={modalRef} className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default function ServiceDetail() {
  // State management
  const [editId, setEditId] = useState(null);
  const [editObjectif, setEditObjectif] = useState({});
  const [nouvelleRemarque, setNouvelleRemarque] = useState({});
  const [nouvelleTache, setNouvelleTache] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showObjectifModal, setShowObjectifModal] = useState(false);
  const { serviceId } = useParams();

  // Sample data for objectives
  const [objectifs, setObjectifs] = useState([
    {
      id: 1,
      serviceId: serviceId,
      titre: "Développement API",
      membre: "Jean Dupont",
      remarques: ["Prioritaire pour la release Q2.", "Prévoir tests unitaires."],
      echeance: "2025-06-15",
      priorite: "Urgente",
      statut: "En cours",
      taches: [
        { id: 1, titre: "Initialisation du repo", statut: "Terminé", priorite: "Moyenne" },
        { id: 2, titre: "Création des endpoints", statut: "En attente", priorite: "Urgente" }
      ]
    },
    {
      id: 2,
      serviceId: serviceId,
      titre: "Refonte UI",
      membre: "Paul Martin",
      remarques: ["Respecter la nouvelle charte graphique."],
      echeance: "2025-07-01",
      priorite: "Moyenne",
      statut: "En attente",
      taches: [
        { id: 1, titre: "Maquettage Figma", statut: "En cours", priorite: "Basse" }
      ]
    },
    {
      id: 3,
      serviceId: serviceId,
      titre: "Développement Frontend",
      membre: "Jean Dupont",
      remarques: ["Utiliser React et Material UI."],
      echeance: "2025-08-01",
      priorite: "Urgente",
      statut: "En cours",
      taches: [
        { id: 1, titre: "Création des composants", statut: "En cours", priorite: "Moyenne" },
        { id: 2, titre: "Intégration des APIs", statut: "En attente", priorite: "Urgente" }
      ]
    }
  ]);

  const [nouvelObjectif, setNouvelObjectif] = useState({
    titre: "",
    membre: "",
    remarques: [],
    echeance: "",
    priorite: PRIORITES[0],
    statut: STATUTS[0],
    serviceId: serviceId,
    taches: []
  });

  const [nouvelleTachePriorite, setNouvelleTachePriorite] = useState(PRIORITES[0]);

  // State for new task in modal
  const [nouvelleTacheModal, setNouvelleTacheModal] = useState({ titre: '', priorite: PRIORITES[0] });

  // Reset form
  const resetForm = () => {
    setNouvelObjectif({
      titre: "",
      membre: "",
      remarques: [],
      echeance: "",
      priorite: PRIORITES[0],
      statut: STATUTS[0],
      serviceId: serviceId,
      taches: []
    });
    setNouvelleTacheModal({ titre: '', priorite: PRIORITES[0] });
  };

  // Add new remark
  const handleAjoutRemarque = (objectifId, remarque) => {
    if (!remarque.trim()) return;
    setObjectifs(prev => prev.map(obj =>
      obj.id === objectifId
        ? { ...obj, remarques: [...obj.remarques, remarque] }
        : obj
    ));
    setNouvelleRemarque({ ...nouvelleRemarque, [objectifId]: "" });
  };

  // Add new task to existing objective
  const handleAjoutTache = (objectifId, e) => {
    e.preventDefault();
    if (!nouvelleTache.trim()) return;
    setObjectifs(prev => prev.map(obj =>
      obj.id === objectifId
        ? { ...obj, taches: [...obj.taches, { id: Date.now(), titre: nouvelleTache, statut: "En attente", priorite: nouvelleTachePriorite }] }
        : obj
    ));
    setNouvelleTache("");
    setNouvelleTachePriorite(PRIORITES[0]);
  };

  // Add new objective
  const handleAjoutObjectif = (e) => {
    e.preventDefault();
    if (!nouvelObjectif.titre.trim()) return;

    setObjectifs([
      ...objectifs,
      {
        id: Date.now(),
        serviceId: serviceId,
        ...nouvelObjectif,
        taches: []
      }
    ]);

    resetForm();
    setShowObjectifModal(false);
  };

  // Delete objective
  const handleSupprimerObjectif = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet objectif ?")) {
      setObjectifs(prev => prev.filter(obj => obj.id !== id));
    }
  };

  // Edit objective
  const handleEditObjectif = (obj) => {
    setEditId(obj.id);
    setEditObjectif({ ...obj });
  };

  // Save edited objective
  const handleSauvegarderEdit = (id) => {
    setObjectifs(prev => prev.map(obj => 
      obj.id === id ? { ...editObjectif, id, taches: obj.taches } : obj
    ));
    setEditId(null);
    setEditObjectif({});
  };

  // Cancel edit
  const handleAnnulerEdit = () => {
    setEditId(null);
    setEditObjectif({});
  };

  // Toggle task panel
  const toggleTaskPanel = (objectifId) => {
    setOpenDropdown(openDropdown === objectifId ? null : objectifId);
  };

  // Change task status
  const handleChangeStatutTache = (objectifId, tacheId, newStatut) => {
    setObjectifs(prev => prev.map(obj =>
      obj.id === objectifId
        ? { ...obj, taches: obj.taches.map(t => t.id === tacheId ? { ...t, statut: newStatut } : t) }
        : obj
    ));
  };

  // Change objective status
  const handleChangeStatutObjectif = (objectifId, newStatut) => {
    setObjectifs(prev => prev.map(obj =>
      obj.id === objectifId ? { ...obj, statut: newStatut } : obj
    ));
  };

  // Delete task
  const handleSupprimerTache = (objectifId, tacheId) => {
    setObjectifs(prev => prev.map(obj =>
      obj.id === objectifId
        ? { ...obj, taches: obj.taches.filter(t => t.id !== tacheId) }
        : obj
    ));
  };

  // Delete remark
  const handleSupprimerRemarque = (objectifId, index) => {
    setObjectifs(prev => prev.map(obj =>
      obj.id === objectifId
        ? { ...obj, remarques: obj.remarques.filter((_, i) => i !== index) }
        : obj
    ));
  };

  // Add new task to the new objective in modal
  const handleAjoutTacheModal = (e) => {
    e.preventDefault();
    if (!nouvelleTacheModal.titre.trim()) return;
    setNouvelObjectif(prev => ({
      ...prev,
      taches: [...prev.taches, { id: Date.now(), titre: nouvelleTacheModal.titre, statut: "En attente", priorite: nouvelleTacheModal.priorite }]
    }));
    setNouvelleTacheModal({ titre: '', priorite: PRIORITES[0] });
  };

  const handleEditObjectifChange = (e, champ) => {
    setEditObjectif(prev => ({ ...prev, [champ]: e.target.value }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <div className="p-6">
        {/* En-tête de la section Objectifs */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Objectifs</h2>
          <button
            onClick={() => setShowObjectifModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nouvel objectif
          </button>
        </div>

        {/* Liste des objectifs */}
        <div className="space-y-4">
          {objectifs.map((objectif) => (
            <div
              key={objectif.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Header de la carte objectif */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-green-700">{objectif.titre}</h3>
                  <h1 className="text-xl font-bold text-gray-900 mt-1">{objectif.membre}</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusBadge type="priorite" value={objectif.priorite} />
                  <select
                    value={objectif.statut}
                    onChange={(e) => handleChangeStatutObjectif(objectif.id, e.target.value)}
                    className="px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap focus:outline-none"
                    style={{ backgroundColor: COLOR_MAPPING.statut[objectif.statut].bg, color: COLOR_MAPPING.statut[objectif.statut].text }}
                  >
                     {STATUTS.map((statut) => (
                       <option key={statut} value={statut}>{statut}</option>
                     ))}
                  </select>
                </div>
              </div>

              {/* Informations clés structurées */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                 <div className="text-gray-700 font-semibold">
                   Échéance : {new Date(objectif.echeance).toLocaleDateString()}
                 </div>
                 {/* Ajoutez d'autres infos clés ici si nécessaire */}
              </div>

              {/* Remarques repliables */}
              <details className="mt-4">
                <summary className="text-sm font-medium text-gray-700 cursor-pointer">Remarques ({objectif.remarques.length})</summary>
                <div className="mt-2 pl-4 space-y-2 border-l-2 border-gray-200">
                  {objectif.remarques.map((remarque, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">{remarque}</p>
                      <button
                        onClick={() => handleSupprimerRemarque(objectif.id, index)}
                        className="text-red-600 hover:text-red-800 text-xs ml-2"
                        title="Supprimer la remarque"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 4a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                   <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={nouvelleRemarque[objectif.id] || ""}
                      onChange={(e) => setNouvelleRemarque({ ...nouvelleRemarque, [objectif.id]: e.target.value })}
                      placeholder="Ajouter une remarque..."
                      className="flex-1 text-sm rounded-md border-gray-300 focus:border-green-700 focus:ring-green-700"
                    />
                    <button
                      onClick={() => handleAjoutRemarque(objectif.id, nouvelleRemarque[objectif.id])}
                      className="px-3 py-1 text-sm text-green-700 hover:text-green-800 font-medium flex items-center gap-1"
                      title="Ajouter la remarque"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                       </svg>
                      Ajouter
                    </button>
                  </div>
                </div>
              </details>

              {/* Tâches repliables */}
              <details className="mt-4">
                 <summary className="text-sm font-medium text-gray-700 cursor-pointer">Tâches ({objectif.taches.length})</summary>
                 <div className="mt-2 pl-4 space-y-2 border-l-2 border-gray-200">
                   <ul className="space-y-2">
                     {objectif.taches.map((tache) => (
                       <li key={tache.id} className="flex items-center justify-between">
                         <span className="text-sm text-gray-600">{tache.titre}</span>
                         <div className="flex items-center space-x-2"> { /* Statut et action sur la même ligne */}
                            <StatusBadge type="statut" value={tache.statut} /> { /* Seulement le statut */}
                            {tache.statut !== 'Terminé' && (
                              <button
                                onClick={() => handleChangeStatutTache(objectif.id, tache.id, 'Terminé')}
                                className="px-2 py-0.5 text-xs text-green-700 border border-green-700 rounded hover:bg-green-700 hover:text-white transition-colors"
                                title="Marquer comme terminé"
                              >
                                Terminer
                              </button>
                            )}
                            {/* Add task edit/delete actions here */}
                             <button
                                onClick={() => handleSupprimerTache(objectif.id, tache.id)}
                                className="text-red-600 hover:text-red-800 text-xs ml-2"
                                title="Supprimer la tâche"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2 4a1 1 0 100 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                                </svg>
                              </button>
                         </div>
                       </li>
                     ))}
                   </ul>
                   <form onSubmit={(e) => handleAjoutTache(objectif.id, e)} className="mt-2 flex gap-2 items-center">
                      <input
                        type="text"
                        value={nouvelleTache}
                        onChange={(e) => setNouvelleTache(e.target.value)}
                        placeholder="Ajouter une tâche..."
                        className="flex-1 text-sm rounded-md border-gray-300 focus:border-green-700 focus:ring-green-700"
                        required
                      />
                      <select
                        value={nouvelleTachePriorite}
                        onChange={(e) => setNouvelleTachePriorite(e.target.value)}
                        className="text-sm rounded-md border-gray-300 focus:border-green-700 focus:ring-green-700"
                      >
                         {PRIORITES.map((priorite) => (
                           <option key={priorite} value={priorite}>{priorite}</option>
                         ))}
                      </select>
                      <button
                        type="submit"
                        className="px-3 py-1 text-sm text-green-700 hover:text-green-800 font-medium flex items-center gap-1"
                        title="Ajouter la tâche"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                         </svg>
                        Ajouter
                      </button>
                    </form>
                 </div>
              </details>


              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEditObjectif(objectif)}
                  className="px-3 py-1 text-sm text-green-700 hover:text-green-800 font-medium"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleSupprimerObjectif(objectif.id)}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal d'ajout d'objectif */}
        <Modal
          isOpen={showObjectifModal}
          onClose={() => {
            setShowObjectifModal(false);
            resetForm();
          }}
          title="Nouvel objectif"
        >
          <form onSubmit={handleAjoutObjectif} className="space-y-4 max-h-[80vh] overflow-y-auto px-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Objectif <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nouvelObjectif.titre}
                onChange={(e) => setNouvelObjectif({ ...nouvelObjectif, titre: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                required
                maxLength={100}
                placeholder="Maximum 100 caractères"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Membre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nouvelObjectif.membre}
                onChange={(e) => setNouvelObjectif({ ...nouvelObjectif, membre: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                required
                placeholder="Nom Prénom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Remarques</label>
              <textarea
                value={nouvelObjectif.remarques.join('\n')}
                onChange={(e) => setNouvelObjectif({ ...nouvelObjectif, remarques: e.target.value.split('\n').filter(r => r.trim()) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                rows="4"
                placeholder="Une remarque par ligne"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Échéance <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={nouvelObjectif.echeance}
                onChange={(e) => setNouvelObjectif({ ...nouvelObjectif, echeance: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priorité <span className="text-red-500">*</span>
              </label>
              <select
                value={nouvelObjectif.priorite}
                onChange={(e) => setNouvelObjectif({ ...nouvelObjectif, priorite: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                required
              >
                {PRIORITES.map((priorite) => (
                  <option key={priorite} value={priorite}>
                    {priorite}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Statut <span className="text-red-500">*</span>
              </label>
              <select
                value={nouvelObjectif.statut}
                onChange={(e) => setNouvelObjectif({ ...nouvelObjectif, statut: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                required
              >
                {STATUTS.map((statut) => (
                  <option key={statut} value={statut}>
                    {statut}
                  </option>
                ))}
              </select>
            </div>

            {/* Section Ajouter des tâches dans le modal */}
            <div className="mt-4 border-t pt-4 border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Ajouter des tâches initiales</h4>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={nouvelleTacheModal.titre}
                  onChange={(e) => setNouvelleTacheModal({ ...nouvelleTacheModal, titre: e.target.value })}
                  placeholder="Titre de la tâche..."
                  className="flex-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                  required
                />
                 <select
                  value={nouvelleTacheModal.priorite}
                  onChange={(e) => setNouvelleTacheModal({ ...nouvelleTacheModal, priorite: e.target.value })}
                  className="text-sm rounded-md border-gray-300 shadow-sm focus:border-green-700 focus:ring-green-700"
                >
                   {PRIORITES.map((priorite) => (
                     <option key={priorite} value={priorite}>{priorite}</option>
                   ))}
                </select>
                <button
                  type="button"
                  onClick={handleAjoutTacheModal}
                  className="px-3 py-1 text-sm text-green-700 hover:text-green-800 font-medium"
                >
                  Ajouter
                </button>
              </div>
              <ul className="mt-4 space-y-2">
                {nouvelObjectif.taches.map((tache, index) => (
                  <li key={index} className="text-sm text-gray-600 flex justify-between items-center">
                    <span>{tache.titre}</span>
                    <div className="flex items-center space-x-2">
                      <StatusBadge type="priorite" value={tache.priorite} />
                      <StatusBadge type="statut" value={tache.statut} />
                      {/* Option to remove task before adding objective */}
                      <button
                         onClick={() => setNouvelObjectif(prev => ({ ...prev, taches: prev.taches.filter((_, i) => i !== index) }))}
                         className="text-red-600 hover:text-red-800 text-xs"
                         title="Retirer cette tâche"
                      >
                         (Retirer)
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-4 sticky bottom-0 bg-white border-t border-gray-200 mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowObjectifModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Ajouter
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}