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
    // Um endereco so para o Google: o apex e o dominio antigo caem no www,
    // preservando o caminho. Sem isso o mesmo site responde em tres URLs.
    ...["teammanager.tech", "teammanager.arltech.emp.br"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://www.teammanager.tech/:path*",
      permanent: true,
    })),
  ],
};

export default nextConfig;
