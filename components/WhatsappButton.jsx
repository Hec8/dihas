// components/WhatsAppButton.jsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const WhatsAppButton = () => {
    return (
        <Link
            href="https://wa.me/22994975451"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50 animate-bounce-smooth hover:scale-110 transition-transform duration-300"
        >
            <Image
                src="/assets/wflottant.png"
                alt="WhatsApp"
                width={48}
                height={48}
            />
        </Link>
    );
};

export default WhatsAppButton;
