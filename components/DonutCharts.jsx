'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function DonutCharts() {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const chartInstances = useRef([]);

    useEffect(() => {
        chartInstances.current.forEach(chart => chart?.destroy());
        chartInstances.current = [];

        const chartConfig = {
            type: 'doughnut',
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        };

        if (chartRef1.current && chartRef2.current) {
            const ctx1 = chartRef1.current.getContext('2d');
            const ctx2 = chartRef2.current.getContext('2d');

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
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start p-4">
            <div className="w-full md:w-1/2 h-[220px] bg-white p-4 rounded-xl shadow-sm">
                <canvas ref={chartRef1} className="w-full h-full" />
            </div>

            <div className="w-full md:w-1/2 h-[220px] bg-white p-4 rounded-xl shadow-sm">
                <canvas ref={chartRef2} className="w-full h-full" />
            </div>
        </div>
    );
}
