import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  redirects: async () => [
    { source: "/vendas", destination: "/", permanent: false },
  ],
};

export default nextConfig;
