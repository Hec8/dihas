'use client';

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header/page'), { ssr: true });
const Hero = dynamic(() => import('../components/Hero/page'), { ssr: true });
const About = dynamic(() => import('../components/About/page'), { ssr: true });
const Goals = dynamic(() => import('../components/Goals/page'), { ssr: true });
const Services = dynamic(() => import('../components/Services/page'), { ssr: true });
const Products = dynamic(() => import('../components/Products/page'), { ssr: true });
const Projects = dynamic(() => import('../components/Projects/page'), { ssr: true });
const Blogs = dynamic(() => import('../components/Blogs/page'), { ssr: true });
const Testimony = dynamic(() => import('../components/Testimony/page'), { ssr: true });
const Newsletter = dynamic(() => import('../components/Newsletter/page'), { ssr: true });
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










