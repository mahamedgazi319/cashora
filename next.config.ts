import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Future: enable i18n here
  // Future: add image domains for external reward providers
  images: {
    remotePatterns: [],
  },
  // Future: add security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;
