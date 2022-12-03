/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    // hostname: "localhost",
    // hostname: "res.cloudinary.com",
    // domains: ["localhost"],
    domains: ["money-and-other-things.herokuapp.com", "res.cloudinary.com"],
  },
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer({});

module.exports = nextConfig;
// module.exports = withBundleAnalyzer(nextConfig);
