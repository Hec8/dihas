'use client';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <>
            <footer className="bg-green-800 text-white px-4 sm:px-8 py-8 sm:py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

                    {/* Left Section - Logo and Description */}
                    <div className="order-1 sm:order-none">
                        <div className="mb-4">
                            <Image
                                src="/assets/dihas.png"
                                alt="Diha's tech"
                                width={100}
                                height={100}
                                className="mr-4"
                            />
                        </div>
                        <p className="text-sm text-gray-100 leading-relaxed">
                            DIHA'S est spécialisé dans le design et le développement des applications et des solutions numériques innovantes.
                            De l'idée de développement de marque, nous concevons et développons des applications.
                        </p>
                        <div className="flex space-x-6 mt-4 text-xl">
                            <a href="https://www.facebook.com/Dihas.tech" className="hover:text-yellow-500 transition-colors"><FaFacebookF /></a>
                            <a href="https://www.linkedin.com/company/105786573/admin/dashboard/" className="hover:text-yellow-500 transition-colors"><FaLinkedinIn /></a>
                            <a href="https://www.instagram.com/dihas.tech/" className="hover:text-yellow-500 transition-colors"><FaInstagram /></a>
                        </div>
                    </div>

                    {/* Pages Links */}
                    <div className="order-3 lg:order-none lg:ml-12">
                        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Pages</h3>
                        <ul className="space-y-4 sm:space-y-8 text-gray-200">
                            <li><Link href="https://dihas-product.vercel.app" className="hover:text-yellow-500 transition-colors block">Dihas Products</Link></li>
                            <li><Link href="/about" className="hover:text-yellow-500 transition-colors block">A propos de nous</Link></li>
                            <li><Link href="/services" className="hover:text-yellow-500 transition-colors block">Services</Link></li>
                            <li><Link href="/projet" className="hover:text-yellow-500 transition-colors block">Projets</Link></li>
                            <li><Link href="/blog" className="hover:text-yellow-500 transition-colors block">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-yellow-500 transition-colors block">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Service Links */}
                    <div className="order-4 lg:order-none">
                        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Services</h3>
                        <ul className="space-y-4 sm:space-y-8 text-gray-200">
                            <li className="hover:text-yellow-500 transition-colors block">Développement web</li>
                            <li className="hover:text-yellow-500 transition-colors block">Développement mobile</li>
                            <li className="hover:text-yellow-500 transition-colors block">UI/UX Design</li>
                        </ul>
                    </div>

                    {/* Google Maps */}
                    <div className="order-2 sm:order-none">
                        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Maps Location</h3>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.842223942767!2d-73.5714696844377!3d45.50014107910178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a4481681b21%3A0x5c27cb6812fdaf76!2sDowntown%20Montreal!5e0!3m2!1sen!2sca!4v1612316538454!5m2!1sen!2sca"
                                width="100%"
                                height="200"
                                allowFullScreen=""
                                loading="lazy"
                                className="rounded-lg w-full h-48 sm:h-40 lg:h-48"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </footer>

            <footer className="text-center p-4 sm:p-6 bg-black text-white text-sm sm:text-base">
                Copyright ©2025 Diha's | Designed by Diha's
            </footer>
        </>
    );
}