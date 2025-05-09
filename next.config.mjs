/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://negative-honor-hec8-2159b031.koyeb.app/api/:path*',
      },
    ]
  },
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
}

export default nextConfig;