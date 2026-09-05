import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://www.teammanager.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/preview-pdf", "/b", "/v2"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
