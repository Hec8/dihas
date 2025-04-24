'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { DropdownButton } from '@/components/DropdownLink'
import { ChevronDown, FolderCog, User } from 'lucide-react'
import Image from 'next/image'

const Navigation = ({ user }) => {
    const pathname = usePathname()
    const { logout } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [PdropdownOpen, setPDropdownOpen] = useState(false)

    const isContentCreator = user?.role === 'createur_contenu';
    const isSuperAdmin = user?.role === 'super_admin';

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

            {/* Dropdown Gestion du contenu */}
            <div className="w-11/12">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-between w-full bg-white text-green-700 px-4 py-3 rounded-lg font-semibold  mb-4"
                >
                    <span className="flex items-center gap-2">
                        <FolderCog className="w-5 h-5" />
                        Administration
                    </span>
                    <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Links */}
                {dropdownOpen && (
                    <div className="bg-white text-green-700 rounded-lg shadow w-full space-y-2 py-2 px-4">
                        <Link href={isContentCreator ? "/content-creator-dashboard" : "/dashboard"} className="block hover:underline">
                            Dashboard
                        </Link>
                        <Link href="/blog-manage" className="block hover:underline">Articles</Link>

                        {!isContentCreator && (
                            <>
                                <Link href="/newsletter" className="block hover:underline">Abonnés</Link>
                                <Link href="/contact-manage" className="block hover:underline">Messages</Link>
                                {isSuperAdmin && (
                                    <Link href="/employees" className="block hover:underline">Employees</Link>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
            <br />

            {/* Dropdown Profil */}
            <div className="w-11/12">
                <button
                    onClick={() => setPDropdownOpen(!PdropdownOpen)}
                    className="flex items-center justify-between w-full bg-white  text-green-700 px-4 py-3 rounded-lg font-semibold shadow mb-4"
                >
                    <span className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Profil
                    </span>
                    <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Links */}
                {PdropdownOpen && (
                    <div className="text-green-700 bg-white rounded-lg shadow w-full space-y-2 py-2 px-4">
                        {/* Logout (optionnel à ajouter ici ou ailleurs) */}
                        <button onClick={logout} className="mt-auto mb-24 font-bold text-center text-xl text-red-600 hover:underline">Se déconnecter</button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Navigation
