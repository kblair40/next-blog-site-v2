/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    // hostname: "localhost",
    // hostname: "money-and-other-things.herokuapp.com",
    // domains: ["localhost"],
    domains: ["money-and-other-things.herokuapp.com"],
  },
};

module.exports = nextConfig;
