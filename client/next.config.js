/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    hostname: "localhost",
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
