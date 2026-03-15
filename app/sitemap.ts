import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://banco-watertank.co.tz",
      lastModified: new Date("2026-03-15"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
