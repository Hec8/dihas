'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/lib/axios';
import Header from '@/components/Header/page';
import BlogDetail from '@/components/BlogDetail/page';
import Footer from '@/components/Footer/page';

export default function BlogDetailPage() {
    const params = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/api/blog/guest/${params.slug}`);
                if (response.data && response.data.article) {
                    setArticle(response.data.article);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'article:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchArticle();
        }
    }, [params.slug]);

    return (
        <>
            <Header />
            <BlogDetail article={article} loading={loading} />
            <Footer />
        </>
    );
}
