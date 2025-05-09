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
        source: '/sanctum/csrf-cookie',
        destination: 'https://negative-honor-hec8-2159b031.koyeb.app/sanctum/csrf-cookie',
      },
      {
        source: '/api/:path*',
        destination: 'https://negative-honor-hec8-2159b031.koyeb.app/api/:path*',
      },
      {
        source: '/login',
        destination: 'https://negative-honor-hec8-2159b031.koyeb.app/login',
      },
      {
        source: '/logout',
        destination: 'https://negative-honor-hec8-2159b031.koyeb.app/logout',
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://dihas.vercel.app'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
    ]
  }
}

export default nextConfig;