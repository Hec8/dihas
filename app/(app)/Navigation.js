'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import { ChevronDown, LayoutDashboard, FileText, Users, Code, Briefcase, DollarSign } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const Navigation = ({ user }) => {
    const pathname = usePathname()
    const { logout } = useAuth()
    const [openMenu, setOpenMenu] = useState(null)

    const isContentCreator = user?.role === 'createur_contenu'
    const isSuperAdmin = user?.role === 'super_admin'

    const isActive = (path) => pathname === path

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu)
    }

    // Icônes correspondantes à chaque menu
    const menuIcons = {
        dashboard: <LayoutDashboard className="w-5 h-5 flex-shrink-0" />,
        marketing: <FileText className="w-5 h-5 flex-shrink-0" />,
        projet: <Briefcase className="w-5 h-5 flex-shrink-0" />,
        crm: <Users className="w-5 h-5 flex-shrink-0" />,
        dev: <Code className="w-5 h-5 flex-shrink-0" />,
        rh: <Users className="w-5 h-5 flex-shrink-0" />,
        finance: <DollarSign className="w-5 h-5 flex-shrink-0" />
    }

    return (
        <div className="min-h-screen w-64 bg-green-700 text-white flex flex-col py-6">
            {/* Logo */}
            <div className="px-6 mb-8 ml-6">
                <Image
                    src="/assets/logo-blanc.png"
                    alt="Logo dashboard"
                    width={150}
                    height={50}
                    priority
                />
            </div>
            <br />
            <br />

            {/* Menu Items */}
            <div className="flex-1 px-4 space-y-1 overflow-y-auto">
                {/* Dashboard */}
                <Link 
                    href={isContentCreator ? "/content-creator-dashboard" : "/dashboard"} 
                    className="block"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all ${isActive(isContentCreator ? '/content-creator-dashboard' : '/dashboard') ? 'bg-white text-green-700' : 'text-white hover:bg-white/20'}`}
                    >
                        {menuIcons.dashboard}
                        <span className="ml-3 whitespace-nowrap">Dashboard</span>
                    </motion.div>
                </Link>

                {/* Marketing & Contenu */}
                <div className="mb-1">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleMenu('marketing')}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all ${openMenu === 'marketing' ? 'bg-white text-green-700' : 'text-white hover:bg-white/20'}`}
                    >
                        <div className="flex items-center">
                            {menuIcons.marketing}
                            <span className="ml-3 whitespace-nowrap">Marketing Contenu</span>
                        </div>
                        <motion.div
                            animate={{ rotate: openMenu === 'marketing' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-5 h-5" />
                        </motion.div>
                    </motion.button>

                    <AnimatePresence>
                        {openMenu === 'marketing' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-1 ml-8 space-y-1 overflow-hidden"
                            >   
                                {/* Liens accessibles uniquement aux administrateurs */}
                                {!isContentCreator && (
                                    <>
                                        <Link href="/dashboard-contenu" className={`block px-4 py-2 rounded-md transition-all ${isActive('/dashboard-contenu') ? 'bg-white/20 font-medium' : 'text-white/80 hover:text-white'}`}>
                                            Dashboard Contenu
                                        </Link>
                                        <Link href="/newsletter" className={`block px-4 py-2 rounded-md transition-all ${isActive('/newsletter') ? 'bg-white/20 font-medium' : 'text-white/80 hover:text-white'}`}>
                                            Abonnés
                                        </Link>
                                        <Link href="/contact-manage" className={`block px-4 py-2 rounded-md transition-all ${isActive('/contact-manage') ? 'bg-white/20 font-medium' : 'text-white/80 hover:text-white'}`}>
                                            Messages
                                        </Link>
                                        <Link href="/service-manage" className={`block px-4 py-2 rounded-md transition-all ${isActive('/service-manage') ? 'bg-white/20 font-medium' : 'text-white/80 hover:text-white'}`}>
                                            Services
                                        </Link>
                                        <Link href="/product-manage" className={`block px-4 py-2 rounded-md transition-all ${isActive('/product-manage') ? 'bg-white/20 font-medium' : 'text-white/80 hover:text-white'}`}>
                                            Diha&apos;s Products
                                        </Link>
                                        {isSuperAdmin && (
                                            <Link href="/employees" className={`block px-4 py-2 rounded-md transition-all ${isActive('/employees') ? 'bg-white/20 font-medium' : 'text-white/80 hover:text-white'}`}>
                                                Employees
                                            </Link>
                                        )}
                                    </>
                                )}
                                {/* Liens accessibles aux créateurs de contenu */}
                                <Link href="/blog-manage" className={`block px-4 py-2 rounded-md transition-all ${isActive('/blog-manage') ? 'bg-white/20 font-medium' : 'text-white/80 hover:text-white'}`}>
                                    Gestion des articles
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Autres menus - uniquement pour les administrateurs */}
                {!isContentCreator && [
                    { id: 'projet', name: 'Gestion de projet', icon: menuIcons.projet },
                    { id: 'crm', name: 'CRM Gestion Client', icon: menuIcons.crm },
                    { id: 'dev', name: 'Développement IT', icon: menuIcons.dev },
                    { id: 'rh', name: 'RH Recrutement', icon: menuIcons.rh },
                    { id: 'finance', name: 'Gestion finance', icon: menuIcons.finance }
                ].map((menu) => (
                    <div key={menu.id} className="mb-1">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleMenu(menu.id)}
                            className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all ${openMenu === menu.id ? 'bg-white text-green-700' : 'text-white hover:bg-white/20'}`}
                        >
                            <div className="flex items-center">
                                {menu.icon}
                                <span className="ml-3 whitespace-nowrap">{menu.name}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: openMenu === menu.id ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-5 h-5" />
                            </motion.div>
                        </motion.button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Navigation