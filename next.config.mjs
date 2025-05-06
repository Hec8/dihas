/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",  // Toutes les routes /api/*
        destination: "https://negative-honor-hec8-2159b031.koyeb.app/api/:path*",  // Redirige vers Laravel
        credentials: 'include',
        headers: {
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'), // Fonction à implémenter
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'negative-honor-hec8-2159b031.koyeb.app',
        // Le port n'est pas nécessaire pour HTTPS (port 443 par défaut)
        pathname: '/images/**',
      },
      // Garde le pattern local pour le développement
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/images/**',
      }
    ],
  },
}

export default nextConfig;