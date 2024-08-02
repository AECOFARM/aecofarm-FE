/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/', 
        destination: '/intro',
        permanent: true
      }
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://3.34.145.189:8080/:path*',
      },
    ];
  },

  experimental: {
    forceSwcTransforms: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['aecofarm.s3.ap-northeast-2.amazonaws.com'],
  },
};

export default nextConfig;
