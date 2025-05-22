'use client';

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {/* Example de carte avec animation */}
            {[
                {
                    title: 'Articles',
                    value: '40,689',
                    change: '↑ 0.5%',
                    description: 'Up from yesterday',
                    iconColor: 'bg-green-100',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                        </svg>
                    ),
                    textColor: 'text-green-500'
                },
                {
                    title: 'Produits',
                    value: '10293',
                    change: '↑ 1.3%',
                    description: 'Up from past week',
                    iconColor: 'bg-yellow-100',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    ),
                    textColor: 'text-green-500'
                },
                {
                    title: 'En attente',
                    value: '$89,000',
                    change: '↓ 4.3%',
                    description: 'Down from yesterday',
                    iconColor: 'bg-green-100',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    textColor: 'text-red-500'
                },
                {
                    title: 'Campagnes',
                    value: '2040',
                    change: '↑ 1.8%',
                    description: 'Up from yesterday',
                    iconColor: 'bg-red-100',
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                    ),
                    textColor: 'text-green-500'
                }
            ].map((card, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm transition-transform duration-300 ease-in-out hover:shadow-md hover:-translate-y-1"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">{card.title}</p>
                            <h3 className="text-2xl font-bold">{card.value}</h3>
                            <p className={`text-sm ${card.textColor}`}>
                                <span className="font-medium">{card.change}</span> {card.description}
                            </p>
                        </div>
                        <div className={`${card.iconColor} p-3 rounded-full transition duration-300`}>
                            {card.icon}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
