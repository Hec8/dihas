'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function DonutCharts() {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const chartInstances = useRef([]);

    useEffect(() => {
        // Destroy previous charts if they exist
        chartInstances.current.forEach(chart => {
            if (chart) chart.destroy();
        });
        chartInstances.current = [];

        // First chart
        if (chartRef1.current) {
            const chart1 = new Chart(chartRef1.current, {
                type: 'doughnut',
                data: {
                    labels: ['Clients', 'Autres', 'Leads'],
                    datasets: [{
                        data: [55, 25, 20],
                        backgroundColor: [
                            '#10B981', // green for Clients
                            '#FCD34D', // yellow for Autres
                            '#60A5FA', // blue for Leads
                        ],
                        borderWidth: 0,
                        cutout: '75%'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        }
                    }
                }
            });
            chartInstances.current.push(chart1);
        }

        // Second chart
        if (chartRef2.current) {
            const chart2 = new Chart(chartRef2.current, {
                type: 'doughnut',
                data: {
                    labels: ['Leads', 'Leads', 'Leads'],
                    datasets: [{
                        data: [55, 25, 20],
                        backgroundColor: [
                            '#10B981', // green
                            '#FFA07A', // orange
                            '#60A5FA', // blue
                        ],
                        borderWidth: 0,
                        cutout: '75%'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                padding: 20
                            }
                        }
                    }
                }
            });
            chartInstances.current.push(chart2);
        }

        // Cleanup function
        return () => {
            chartInstances.current.forEach(chart => {
                if (chart) chart.destroy();
            });
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <canvas ref={chartRef1}></canvas>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <canvas ref={chartRef2}></canvas>
            </div>
        </div>
    );
}