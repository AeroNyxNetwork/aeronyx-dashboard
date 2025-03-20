/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['xsstc.xyz'],
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
