import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "user-images.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "cdn.substack.com" },
      { protocol: "https", hostname: "substack.com" },
      { protocol: "https", hostname: "instagram.com" },
      { protocol: "https", hostname: "www.instagram.com" },
      { protocol: "https", hostname: "tiktok.com" },
      { protocol: "https", hostname: "www.tiktok.com" }
    ],
  },
};

export default nextConfig;
