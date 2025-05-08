'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function DonutCharts() {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const chartInstances = useRef([]);

    useEffect(() => {
        // Nettoyage des anciens charts
        chartInstances.current.forEach(chart => chart?.destroy());
        chartInstances.current = [];

        // Configuration commune
        const chartConfig = {
            type: 'doughnut',
            options: {
                responsive: false, // Désactive le redimensionnement automatique
                maintainAspectRatio: false, // Permet des dimensions personnalisées
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: { size: 12 }
                        }
                    }
                },
                animation: false // Désactive toutes les animations
            }
        };

        // Création des charts seulement si les refs sont disponibles
        if (chartRef1.current && chartRef2.current) {
            const ctx1 = chartRef1.current.getContext('2d');
            const ctx2 = chartRef2.current.getContext('2d');

            // Premier diagramme
            const chart1 = new Chart(ctx1, {
                ...chartConfig,
                data: {
                    labels: ['Clients', 'Autres', 'Leads'],
                    datasets: [{
                        data: [55, 25, 20],
                        backgroundColor: ['#10B981', '#FCD34D', '#60A5FA'],
                        borderWidth: 0
                    }]
                }
            });

            // Deuxième diagramme
            const chart2 = new Chart(ctx2, {
                ...chartConfig,
                data: {
                    labels: ['Nouveaux', 'Existants', 'Potentiels'],
                    datasets: [{
                        data: [55, 25, 20],
                        backgroundColor: ['#10B981', '#FFA07A', '#60A5FA'],
                        borderWidth: 0
                    }]
                }
            });

            chartInstances.current.push(chart1, chart2);
        }

        return () => {
            chartInstances.current.forEach(chart => chart?.destroy());
        };
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center p-4">
            {/* Premier diagramme - Taille fixe */}
            <div className="relative w-[300px] h-[300px] bg-white p-4 rounded-xl shadow-sm">
                <canvas
                    ref={chartRef1}
                    width={300}
                    height={300}
                    className="absolute inset-0 w-full h-full"
                />
            </div>

            {/* Deuxième diagramme - Taille fixe */}
            <div className="relative w-[300px] h-[300px] bg-white p-4 rounded-xl shadow-sm">
                <canvas
                    ref={chartRef2}
                    width={300}
                    height={300}
                    className="absolute inset-0 w-full h-full"
                />
            </div>
        </div>
    );
}