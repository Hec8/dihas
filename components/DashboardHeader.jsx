'use client';

import { useState, useEffect } from 'react';
import { Bell, ChevronDown, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';

export default function DashboardHeader() {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const shouldHideSearchBar = (path) => {
        if (!path) return true;
        const hiddenPaths = ['/dashboard', '/dashboard-contenu', '/content-creator-dashboard'];
        return hiddenPaths.some(hiddenPath => path.startsWith(hiddenPath));
    };

    // Charger les notifications
    const fetchNotifications = async () => {
        try {
            const response = await axios.get('/api/notifications');
            setNotifications(response.data.notifications);
        } catch (error) {
            console.error('Erreur lors du chargement des notifications:', error);
        }
    };

    // Charger le nombre de notifications non lues
    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get('/api/notifications/unread-count');
            setUnreadCount(response.data.count);
        } catch (error) {
            console.error('Erreur lors du chargement du nombre de notifications:', error);
        }
    };

    // Marquer une notification comme lue
    const markAsRead = async (id) => {
        try {
            await axios.post(`/api/notifications/${id}/read`);
            await fetchUnreadCount();
            setNotifications(notifications.map(notif => 
                notif.id === id ? { ...notif, read_at: new Date().toISOString() } : notif
            ));
        } catch (error) {
            console.error('Erreur lors du marquage de la notification:', error);
        }
    };

    // Marquer toutes les notifications comme lues
    const markAllAsRead = async () => {
        try {
            await axios.post('/api/notifications/read-all');
            setNotifications(notifications.map(notif => ({ ...notif, read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Erreur lors du marquage des notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        fetchUnreadCount();
        // Rafraîchir les notifications toutes les minutes
        const interval = setInterval(() => {
            fetchNotifications();
            fetchUnreadCount();
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="mt-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 gap-6">
                    <h2 className='font-bold text-black text-3xl rounded-full'>
                        {pathname === '/blog-manage' && 'Gestion des articles'}
                        {pathname === '/newsletter' && 'Gestion des abonnés'}
                        {pathname === '/contact-manage' && 'Gestion des messages'}
                        {pathname === '/employees' && 'Gestion des employés'}
                        {pathname === '/service-manage' && 'Gestion des services'}
                        {pathname === '/product-manage' && 'Gestion des produits'}
                        {pathname === '/dashboard' && 'Dashboard'}
                        {pathname === '/content-creator-dashboard' && 'Dashboard'}
                        {pathname === '/profile' && 'Mon profil'}
                        {pathname === '/dashboard-contenu' && 'Statistiques Gestion de contenu'}
                    </h2>
                    {/* Barre de recherche */}
                    {!shouldHideSearchBar(pathname) && (
                            <div className="relative max-w-md">
                                {/* Votre code de barre de recherche */}
                                <div className="relative max-w-md">
                                <button 
                                    onClick={() => router.back()}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
                                >
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="w-full px-6 py-3 rounded-2xl bg-white border border-transparent text-black placeholder-black/70 focus:ring-transparent focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                            </div>
                        </div>
                    )}
                        <div className='flex justify-end items-center gap-2'>
                            {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 bg-white text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
                            >
                                <Bell className="w-6 h-6" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Menu des notifications */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-xs text-green-600 hover:text-green-800"
                                            >
                                                Tout marquer comme lu
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length > 0 ? (
                                            notifications.map((notification, index) => (
                                                <div
                                                    key={notification.id}
                                                    className={`p-4 border-b last:border-b-0 ${!notification.read_at ? 'bg-blue-50' : ''}`}
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <div className="font-semibold">{notification.data.title}</div>
                                                    <div className="text-sm text-gray-600">{notification.data.message}</div>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        {new Date(notification.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                                Aucune notification
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile menu */}
                        <div className="relative ml-3">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg p-1"
                            >
                                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                                    {user?.image_url ? (
                                        <Image
                                            src={user.image_url}
                                            alt={user.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <User className="w-full h-full p-1" />
                                    )}
                                </div>
                                <span className="text-sm font-medium">{user?.name}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Menu déroulant du profil */}
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        Mon Profil
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
