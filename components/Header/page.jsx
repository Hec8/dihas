'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getLinkStyles = (path) => {
        const active = pathname === path;
        if (active) {
            return isScrolled
                ? 'bg-[#FFA500] text-white h-full flex items-center px-4'
                : 'bg-[#FFA500] text-green-800 h-full flex items-center px-4';
        }
        return isScrolled
            ? 'text-gray-800 hover:text-yellow-500 h-full flex items-center px-4'
            : 'text-white hover:text-yellow-500 h-full flex items-center px-4';
    };

    return (
        <>
            <style jsx global>{`
            .shadow-bottom-nav {
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
        `}</style>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white shadow-md shadow-bottom-nav'
                : 'bg-green-800 shadow-bottom-nav'
                }`}>
                <nav className="container mx-auto px-2">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            {isScrolled ? (
                                <Link href="/">
                                    <Image
                                        src="/assets/logo.png"
                                        alt="Diha's tech"
                                        width={100}
                                        height={40}
                                        className="mr-4"
                                    />
                                </Link>
                            ) : (
                                <Link href="/">
                                    <Image
                                        src="/assets/dihas.png"
                                        alt="Diha's tech"
                                        width={100}
                                        height={40}
                                        className="mr-4"
                                    />
                                </Link>
                            )}
                        </div>

                        {/* Menu Desktop - Inchangé */}
                        <div className="hidden md:flex h-full">
                            <Link href="https://dihas-product.vercel.app/" className={getLinkStyles('/products')}>
                                Diha's products
                            </Link>
                            <Link href="/about" className={getLinkStyles('/about')}>
                                À propos de nous
                            </Link>
                            <Link href="/services" className={getLinkStyles('/services')}>
                                Services
                            </Link>
                            <Link href="/projet" className={getLinkStyles('/projet')}>
                                Projets
                            </Link>
                            <Link href="/blog" className={getLinkStyles('/blog')}>
                                Blog
                            </Link>
                            <Link href="/contact" className={getLinkStyles('/contact')}>
                                Contact
                            </Link>
                        </div>

                        {/* Menu Mobile/Toggle */}
                        <div className="flex items-center ">
                            <button
                                className={`p-2 md:hidden ${isScrolled
                                    ? 'text-gray-800'
                                    : 'text-white'
                                    }`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                                </svg>
                            </button>
                            <Link href="/login" className={getLinkStyles('/login')}>
                                <button className={`${isScrolled ? 'text-gray-800 border-black hover:text-yellow-500' : 'text-white hover:bg-yellow-500 border px-3 py-2 rounded-xl'} md:mr-4`}>Connexion</button>
                            </Link>
                        </div>
                    </div>

                    {/* Menu Mobile - Apparaît seulement sur mobile */}
                    {isMenuOpen && (
                        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
                            <div className="flex flex-col py-2">
                                <Link
                                    href="https://dihas-product.vercel.app/"
                                    className={`px-4 py-2 ${pathname === '/products' ? 'bg-yellow-500 text-white' : 'text-gray-800'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Diha's products
                                </Link>
                                <Link
                                    href="/about"
                                    className={`px-4 py-2 ${pathname === '/about' ? 'bg-[#FFA500] text-white' : 'text-gray-800'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    À propos de nous
                                </Link>
                                <Link
                                    href="/services"
                                    className={`px-4 py-2 ${pathname === '/services' ? 'bg-yellow-500 text-white' : 'text-gray-800'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Services
                                </Link>
                                <Link
                                    href="/projet"
                                    className={`px-4 py-2 ${pathname === '/projet' ? 'bg-yellow-500 text-white' : 'text-gray-800'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Projets
                                </Link>
                                <Link
                                    href="/blog"
                                    className={`px-4 py-2 ${pathname === '/blog' ? 'bg-yellow-500 text-white' : 'text-gray-800'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/contact"
                                    className={`px-4 py-2 ${pathname === '/contact' ? 'bg-yellow-500 text-white' : 'text-gray-800'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
}