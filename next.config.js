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
        destination: 'http://xsstc.xyz:8000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
