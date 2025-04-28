'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { ChevronDown, FolderCog } from 'lucide-react'
import Image from 'next/image'

const Navigation = ({ user }) => {
    const pathname = usePathname()
    const router = useRouter()
    const { logout } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [PdropdownOpen, setPDropdownOpen] = useState(false)

    const isContentCreator = user?.role === 'createur_contenu';
    const isSuperAdmin = user?.role === 'super_admin';

    const isActive = (path) => pathname === path;

    return (
        <div className="min-h-screen w-64 bg-green-700 text-white flex flex-col items-center py-6">
            {/* Logo */}
            <Image
                src="/assets/logo-blanc.png"  // Notez le slash au début pour un chemin absolu
                alt="Logo dashboard"
                width={150}  // Spécifiez une largeur appropriée
                height={50}  // Spécifiez une hauteur appropriée
            // Vous pouvez aussi ajouter d'autres props optionnelles :
            // priority={true} // Si c'est une image importante (LCP)
            // className="..." // Pour le styling
            />
            <br />
            <br />

            {/* Dashboard */}
            <div className="w-11/12">
                <Link href={isContentCreator ? "/content-creator-dashboard" : "/dashboard"} className="block">
                    <button 
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold mb-2 transition-all duration-200 ease-in-out
                        ${isActive(isContentCreator ? '/content-creator-dashboard' : '/dashboard')
                            ? 'bg-white text-green-700 shadow-lg transform scale-105'
                            : 'bg-transparent text-white hover:bg-white/20 hover:transform hover:translate-x-1'}`}
                    >
                        <span className="flex items-center gap-3">
                            <FolderCog className={`w-5 h-5 transition-transform duration-200 ${isActive(isContentCreator ? '/content-creator-dashboard' : '/dashboard') ? 'rotate-0' : '-rotate-12'}`} />
                            Dashboard
                        </span>
                    </button>
                </Link>

                {/* Dropdown Gestion du contenu */}
            <div className="w-11/12">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold mb-2 transition-all duration-200 ease-in-out
                        ${dropdownOpen ? 'bg-white text-green-700 shadow-lg' : 'bg-transparent text-white hover:bg-white/20'}`}
                >
                    <span className="flex items-center gap-3">
                        <FolderCog className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen ? 'rotate-0' : '-rotate-12'}`} />
                        Gestion Contenu
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Links */}
                {dropdownOpen && (
                    <div className="bg-white/10 backdrop-blur-sm text-white rounded-lg shadow-lg w-full space-y-1 py-2 px-2 transition-all duration-200 animate-fadeIn">
                        <Link href="/blog-manage" className={`block px-4 py-2 rounded-md transition-all duration-200 ${isActive('/blog-manage') ? 'bg-white text-green-700 shadow-md transform scale-105' : 'hover:bg-white/10 hover:transform hover:translate-x-1'}`}>
                            Articles
                        </Link>

                        {!isContentCreator && (
                            <>
                                <Link href="/newsletter" className={`block px-4 py-2 rounded-md transition-all duration-200 ${isActive('/newsletter') ? 'bg-white text-green-700 shadow-md transform scale-105' : 'hover:bg-white/10 hover:transform hover:translate-x-1'}`}>
                                    Abonnés
                                </Link>
                                <Link href="/contact-manage" className={`block px-4 py-2 rounded-md transition-all duration-200 ${isActive('/contact-manage') ? 'bg-white text-green-700 shadow-md transform scale-105' : 'hover:bg-white/10 hover:transform hover:translate-x-1'}`}>
                                    Messages
                                </Link>
                                {isSuperAdmin && (
                                    <Link href="/employees" className={`block px-4 py-2 rounded-md transition-all duration-200 ${isActive('/employees') ? 'bg-white text-green-700 shadow-md transform scale-105' : 'hover:bg-white/10 hover:transform hover:translate-x-1'}`}>
                                        Employees
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

                {/* Gestion de projet */}
                <div className="mb-2">
                    <button
                        onClick={() => setPDropdownOpen(!PdropdownOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold text-white hover:bg-white/20 transition-all duration-200"
                    >
                        <span className="flex items-center gap-3">
                            <FolderCog className="w-5 h-5" />
                            Gestion projet
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${PdropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* CRM & Gestion Client */}
                <div className="mb-2">
                    <button
                        onClick={() => setPDropdownOpen(!PdropdownOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold text-white hover:bg-white/20 transition-all duration-200"
                    >
                        <span className="flex items-center gap-3">
                            <FolderCog className="w-5 h-5" />
                            CRM Gestion Client
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${PdropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Développement IT */}
                <div className="mb-2">
                    <button
                        onClick={() => setPDropdownOpen(!PdropdownOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold text-white hover:bg-white/20 transition-all duration-200"
                    >
                        <span className="flex items-center gap-3">
                            <FolderCog className="w-5 h-5" />
                            Développement IT
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${PdropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* RH & Recrutement */}
                <div className="mb-2">
                    <button
                        onClick={() => setPDropdownOpen(!PdropdownOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold text-white hover:bg-white/20 transition-all duration-200"
                    >
                        <span className="flex items-center gap-3">
                            <FolderCog className="w-5 h-5" />
                            RH Recrutement
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${PdropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {/* Gestion finance */}
                <div className="mb-2">
                    <button
                        onClick={() => setPDropdownOpen(!PdropdownOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold text-white hover:bg-white/20 transition-all duration-200"
                    >
                        <span className="flex items-center gap-3">
                            <FolderCog className="w-5 h-5" />
                            Gestion finance
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${PdropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            
        </div>
    )
}

export default Navigation
