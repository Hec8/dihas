'use client';

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Articles */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Articles</p>
                        <h3 className="text-2xl font-bold">40,689</h3>
                        <p className="text-sm text-green-500">
                            <span className="font-medium">↑ 0.5%</span> Up from yesterday
                        </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Produits */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Produits</p>
                        <h3 className="text-2xl font-bold">10293</h3>
                        <p className="text-sm text-green-500">
                            <span className="font-medium">↑ 1.3%</span> Up from past week
                        </p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* En attente */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">En attente</p>
                        <h3 className="text-2xl font-bold">$89,000</h3>
                        <p className="text-sm text-red-500">
                            <span className="font-medium">↓ 4.3%</span> Down from yesterday
                        </p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Campagnes */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">Campagnes</p>
                        <h3 className="text-2xl font-bold">2040</h3>
                        <p className="text-sm text-green-500">
                            <span className="font-medium">↑ 1.8%</span> Up from yesterday
                        </p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
