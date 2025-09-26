import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(process.cwd()); // root, or "./src" if you use /src
    return config;
  },
};

export default nextConfig;
