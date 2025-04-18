'use client';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header/page'), { ssr: true });
const Hero = dynamic(() => import('../components/home/Hero/page'), { ssr: true });
const About = dynamic(() => import('../components/home/About/page'), { ssr: true });
const Goals = dynamic(() => import('../components/home/Goals/page'), { ssr: true });
const Services = dynamic(() => import('../components/home/Services/page'), { ssr: true });
const Products = dynamic(() => import('../components/home/Products/page'), { ssr: true });
const Projects = dynamic(() => import('../components/Projects/page'), { ssr: true });
const Blogs = dynamic(() => import('../components/home/Blogs/page'), { ssr: true });
const Testimony = dynamic(() => import('../components/home/Testimony/page'), { ssr: true });
const Newsletter = dynamic(() => import('../components/home/Newsletter/page'), { ssr: true });
const Footer = dynamic(() => import('../components/Footer/page'), { ssr: true });

export default function Page() {
    return (
        <main className="min-h-screen">
            <Header />
            <Hero />
            <About />
            <Goals />
            <Services />
            <Products />
            <Projects />
            <Blogs />
            <Testimony />
            <Newsletter />
            <Footer />
        </main>
    )
}










