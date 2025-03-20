/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.aeronyx.network'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.aeronyx.network/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
