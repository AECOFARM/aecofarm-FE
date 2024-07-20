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
        destination: 'https://port-0-aecofarm-be2-lytx9n86c2df9578.sel4.cloudtype.app/:path*',
      },
    ]
  },

};

export default nextConfig;
