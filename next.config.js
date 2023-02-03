/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  env: {
    title: "MY WEBSITE",
    mongoUser: "nextjs-user",
    mongoPass: "9gUGaiTKckA4auWN",
    connectionString:
      "mongodb+srv://nextjs-user:9gUGaiTKckA4auWN@mcluster.7kxtv.mongodb.net/nextjs-db?retryWrites=true&w=majority",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
