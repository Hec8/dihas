'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

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
                icon: <CheckCircle className="w-6 h-6 text-white" />,
                bg: 'bg-green-600'
            },
            {
                label: 'Articles en attente',
                value: stats.pending,
                icon: <FileText className="w-6 h-6 text-white" />,
                bg: 'bg-yellow-500'
            },
            {
                label: 'Articles renvoyés',
                value: stats.rejected,
                icon: <AlertCircle className="w-6 h-6 text-white" />,
                bg: 'bg-red-600'
            }
        ],
        createur_contenu: [
            {
                label: 'Articles publiés',
                value: stats.validated,
                icon: <CheckCircle className="w-6 h-6 text-white" />,
                bg: 'bg-green-600'
            },
            {
                label: 'Articles en révision',
                value: stats.pending,
                icon: <FileText className="w-6 h-6 text-white" />,
                bg: 'bg-yellow-500'
            },
            {
                label: 'Articles à réécrire',
                value: stats.rejected,
                icon: <AlertCircle className="w-6 h-6 text-white" />,
                bg: 'bg-red-600'
            }
        ]
    };

    const currentStats = statsConfig[role] || statsConfig.createur_contenu;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentStats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white p-5 rounded-xl shadow">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-full ${stat.bg}`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-blue-900">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogStats;
