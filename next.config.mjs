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
        destination: 'https://port-0-aecofarm-lyhj20nc49bb1c32.sel5.cloudtype.app/:path*',
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
