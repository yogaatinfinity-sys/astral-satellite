import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["my-app.loca.lt", "192.168.29.46:3000", "192.168.29.46", "localhost:3000", "172.20.10.2:3000", "172.20.10.2"],
  experimental: {
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
export default nextConfig;

