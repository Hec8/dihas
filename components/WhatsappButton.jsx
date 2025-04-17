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
        >
            <Image
                src="/assets/wflottant.png"
                alt="WhatsApp"
                width={48}
                height={48}
                className="fixed bottom-5 right-5 z-50 animate-pulse hover:scale-110 transition-transform duration-75"
            />
        </Link>
    );
};

export default WhatsAppButton;
