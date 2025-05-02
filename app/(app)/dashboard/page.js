'use client';

import BlogStats from '@/components/BlogStats';
import BalanceAnalytics from '@/components/BalanceAnalytics';
import DashboardStats from '@/components/DashboardStats';
import DonutCharts from '@/components/DonutCharts';
import { useAuth } from '@/hooks/auth';
import TableStats from '@/components/TableStats';

export default function Dashboard() {
    const { user } = useAuth({ middleware: 'auth' });

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <DashboardStats />
                <DonutCharts />
                <DashboardStats />
                {user?.role === 'super_admin' && (
                    <div className="mb-8">
                        <BalanceAnalytics />
                    </div>
                )}
                <TableStats/>
            </div>
        </div>
    );
}
