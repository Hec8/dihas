'use client';

import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import Image from 'next/image';

const BlogStats = ({ role = 'createur_contenu' }) => {
    const [stats, setStats] = useState({
        validated: 0,
        pending: 0,
        rejected: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/blog/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des statistiques:', error);
            }
        };

        fetchStats();
    }, []);

    const statsConfig = {
        super_admin: [
            {
                label: 'Articles validés',
                value: stats.validated,
                image: '/assets/iconv.png',
                bg: 'bg-green-600'
            },
            {
                label: 'Articles en attente',
                value: stats.pending,
                image: '/assets/icona.png',
                bg: 'bg-yellow-500'
            },
            {
                label: 'Articles renvoyés',
                value: stats.rejected,
                image: '/assets/icond.png',
                bg: 'bg-red-600'
            },
            {
                label: 'Articles en ligne',
                value: stats.validated,
                image: '/assets/iconv.png',
                bg: 'bg-green-600'
            }
        ],
        createur_contenu: [
            {
                label: 'Articles publiés',
                value: stats.validated,
                image: '/assets/iconv.png',
                bg: 'bg-green-600'
            },
            {
                label: 'Articles en révision',
                value: stats.pending,
                image: '/assets/icona.png',
                bg: 'bg-yellow-500'
            },
            {
                label: 'Articles à réécrire',
                value: stats.rejected,
                image: '/assets/icond.png',
                bg: 'bg-red-600'
            },
            {
                label: 'Articles en ligne',
                value: stats.validated,
                image: '/assets/iconv.png',
                bg: 'bg-green-600'
            }
        ]
    };

    const currentStats = statsConfig[role] || statsConfig.createur_contenu;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {currentStats.map((stat, index) => (
                <div
                key={index}
                className="flex items-center gap-4 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                >
                <div className="w-16 h-16 bg-green-100 flex items-center justify-center rounded-full shadow-inner">
                    <Image
                    src={stat.image}
                    alt={stat.label}
                    width={40}
                    height={40}
                    className="object-contain"
                    />
                </div>
                <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-green-800">{stat.value}</p>
                </div>
                </div>
            ))}
        </div>

    );
};

export default BlogStats;
