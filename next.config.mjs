/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
      return [
          {
              source: "/main",
              destination: "/intro",
              permanent: true,
          },
      ];
  },
};

export default nextConfig;
