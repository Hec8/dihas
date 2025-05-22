"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
import { UserSquare, Package, LineChart, TimerReset, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  {
    label: 'Projets',
    value: '40,689',
    icon: <UserSquare className="w-6 h-6 text-green-700" />,
    iconBg: 'bg-green-100',
    trend: { value: '+8.5%', text: 'Up from yesterday', color: 'text-green-600', icon: <ArrowUpRight className="w-4 h-4 inline mr-1" /> },
  },
  {
    label: 'En attente',
    value: '10,293',
    icon: <Package className="w-6 h-6 text-yellow-700" />,
    iconBg: 'bg-yellow-100',
    trend: { value: '+1.3%', text: 'Up from past week', color: 'text-green-600', icon: <ArrowUpRight className="w-4 h-4 inline mr-1" /> },
  },
  {
    label: 'En cours',
    value: '8,900',
    icon: <LineChart className="w-6 h-6 text-blue-700" />,
    iconBg: 'bg-blue-100',
    trend: { value: '-4.3%', text: 'Down from yesterday', color: 'text-red-500', icon: <ArrowDownRight className="w-4 h-4 inline mr-1" /> },
  },
  {
    label: 'Terminé',
    value: '2,040',
    icon: <TimerReset className="w-6 h-6 text-green-700" />,
    iconBg: 'bg-green-100',
    trend: { value: '+1.8%', text: 'Up from yesterday', color: 'text-green-600', icon: <ArrowUpRight className="w-4 h-4 inline mr-1" /> },
  },
];

const projects = [
  {
    photo: "/assets/avatar-orange.png",
    name: "Diha's",
    collaborator: "collaborator@gmail.com",
    echeance: "14 Fév 2023",
    priorite: "Basse",
    statut: "En attente",
  },
  {
    photo: "/assets/avatar-orange.png",
    name: "Diha's",
    collaborator: "collaborator@gmail.com",
    echeance: "14 Fév 2023",
    priorite: "Moyenne",
    statut: "En cours",
  },
  {
    photo: "/assets/avatar-orange.png",
    name: "Diha's",
    collaborator: "collaborator@gmail.com",
    echeance: "14 Fév 2023",
    priorite: "Urgente",
    statut: "Terminé",
  },
  // Ajoutez d'autres projets fictifs si besoin
];

const prioriteColors = {
  "Basse": "bg-green-100 text-green-700",
  "Moyenne": "bg-yellow-100 text-yellow-700",
  "Urgente": "bg-red-100 text-red-700",
};

const statutColors = {
  "En attente": "bg-gray-100 text-gray-700",
  "En cours": "bg-blue-100 text-blue-700",
  "Terminé": "bg-green-100 text-green-700",
};



export default function ProjectManage() {
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between min-h-[140px] relative">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500 font-medium mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              </div>
              <div className={`absolute right-5 top-5 rounded-full p-2 ${stat.iconBg} flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-center mt-6">
              <span className={`mr-2 font-semibold text-sm flex items-center ${stat.trend.color}`}>{stat.trend.icon}{stat.trend.value}</span>
              <span className="text-xs text-gray-500">{stat.trend.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Nos projets */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Nos projets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-green-50 text-left">
                <th className="py-2 px-3 font-semibold">Photo</th>
                <th className="py-2 px-3 font-semibold">Projets</th>
                <th className="py-2 px-3 font-semibold">Collaborateur</th>
                <th className="py-2 px-3 font-semibold">Échéance</th>
                <th className="py-2 px-3 font-semibold">Priorité</th>
                <th className="py-2 px-3 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-2 px-3">
                    <Image src={proj.photo} alt="avatar" width={32} height={32} className="rounded-full" />
                  </td>
                  <td className="py-2 px-3">{proj.name}</td>
                  <td className="py-2 px-3">{proj.collaborator}</td>
                  <td className="py-2 px-3">{proj.echeance}</td>
                  <td className="py-2 px-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${prioriteColors[proj.priorite]}`}>{proj.priorite}</span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statutColors[proj.statut]}`}>{proj.statut}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Récemment consulté */}
      <div>
        <h2 className="text-lg font-bold mb-4">Récemment consulté</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col">
              <div className="bg-yellow-400 h-32 rounded mb-4"></div>
              <div className="flex items-center mt-auto">
                <span className="inline-block bg-black text-white rounded p-1 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="7" width="18" height="13" rx="2"/><rect x="7" y="3" width="10" height="4" rx="1"/></svg>
                </span>
                <div>
                  <div className="font-semibold"> {i === 1 ? "Clinico" : "Trootroo"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 