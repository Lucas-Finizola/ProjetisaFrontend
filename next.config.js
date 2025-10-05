/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], // Adicione o domínio do seu Strapi Cloudinary aqui, se estiver usando
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
