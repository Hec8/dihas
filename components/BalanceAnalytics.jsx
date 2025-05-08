'use client';

import { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Jan', expense: 20, income: 24 },
    { name: 'Feb', expense: 45, income: 35 },
    { name: 'Mar', expense: 85, income: 50 },
    { name: 'Apr', expense: 65, income: 40 },
    { name: 'May', expense: 15, income: 5 },
    { name: 'Jun', expense: 35, income: 25 },
    { name: 'Jul', expense: 65, income: 55 },
    { name: 'Aug', expense: 45, income: 40 },
    { name: 'Sep', expense: 25, income: 15 },
    { name: 'Oct', expense: 35, income: 25 },
    { name: 'Nov', expense: 85, income: 90 },
    { name: 'Dec', expense: 65, income: 45 }
];

export default function BalanceAnalytics() {
    const [period, setPeriod] = useState('Month');
    const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);
    const totalIncome = data.reduce((sum, item) => sum + item.income, 0);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Balance Analytics</h2>
                    <div className="flex gap-6 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <span className="text-sm text-gray-600">Expense</span>
                            <span className="text-sm font-semibold">{totalExpense}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <span className="text-sm text-gray-600">Income</span>
                            <span className="text-sm font-semibold">{totalIncome}</span>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="appearance-none bg-white border border-purple-100 rounded-lg px-4 py-2 pr-8 text-purple-600 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                        <option>Week</option>
                        <option>Month</option>
                        <option>Year</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-600">
                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stackId="1"
                            stroke="#FBBF24"
                            fill="#FDE68A"
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stackId="1"
                            stroke="#F87171"
                            fill="#FCA5A5"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
