import WhatsAppButton from '@/components/WhatsappButton';
import './globals.css';

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
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
            </head>
            <body>
                {children}
                <WhatsAppButton />
            </body>
        </html>
    );
}
