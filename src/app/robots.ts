import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://teammanager.arltech.emp.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/preview-pdf", "/b"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
