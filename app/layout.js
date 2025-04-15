import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: "Diha's - Solutions Innovantes",
    description: 'Votre partenaire de confiance pour des solutions technologiques innovantes',
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/assets/favicon.ico', type: 'image/png' },
        ],
        shortcut: ['/shortcut-icon.png'],
        apple: [
            { url: '/apple-icon.png' },
            { url: '/assets/favicon.ico', sizes: '180x180', type: 'image/png' },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body className={poppins.className}>{children}</body>
        </html>
    );
}
