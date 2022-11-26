/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    // hostname: "localhost",
    hostname: "res.cloudinary.com",
    // domains: ["localhost"],
    domains: ["money-and-other-things.herokuapp.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
