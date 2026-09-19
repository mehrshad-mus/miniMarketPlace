import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["t3.storage.dev"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
