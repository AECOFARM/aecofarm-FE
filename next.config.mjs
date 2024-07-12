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
};

export default nextConfig;
