'use client';

import BlogStats from '@/components/BlogStats';
import TableStats from '@/components/TableStats';
import { useAuth } from '@/hooks/auth';

export default function Dashboard() {
    const { user } = useAuth({ middleware: 'auth' });

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {user?.role === 'super_admin' && (
                    <div className="mb-8">
                        <BlogStats/>
                        <br/>
                        <br/>
                        <TableStats/>
                    </div>
                )}
            </div>
        </div>
    );
}



