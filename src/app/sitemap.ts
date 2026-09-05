import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://www.teammanager.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: SITE_URL, lastModified: agora, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/diagnostico`,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
