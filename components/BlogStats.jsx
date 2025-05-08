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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {currentStats.map((stat, index) => (
                <div key={index} className="flex w-45 h-50 items-center space-x-4 bg-white p-5 rounded-xl shadow">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-xl`}>
                        <Image
                            src={stat.image}
                            alt={stat.label}
                            width={50}
                            height={50}
                            className="text-white"
                        />
                    </div>
                    <div>
                        <p className="text-black text-sm font-semibold">{stat.label}</p>
                        <p className="text-2xl font-bold text-blue-900">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogStats;
