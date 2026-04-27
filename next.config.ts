import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  redirects: async () => [
    { source: "/vendas", destination: "/", permanent: false },
  ],
};

export default nextConfig;
