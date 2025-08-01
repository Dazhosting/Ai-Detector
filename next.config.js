/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: false // bisa dihapus kalau tidak perlu
  }
};

module.exports = nextConfig;
