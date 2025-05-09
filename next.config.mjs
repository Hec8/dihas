/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'negative-honor-hec8-2159b031.koyeb.app', // Retirez le 'https://' ici
        pathname: '/images/**'
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://negative-honor-hec8-2159b031.koyeb.app/api/:path*',
      },
      // Ajoutez d'autres redirections si nécessaire
    ]
  }
}

export default nextConfig;