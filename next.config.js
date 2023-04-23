/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
