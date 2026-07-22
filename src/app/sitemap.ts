import type { MetadataRoute } from "next";
import { guideSummaries } from "@/content/guides/registry";
import { siteContent } from "@/data/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/library", "/hackathon", "/sponsor", "/get-involved"];
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteContent.brand.siteUrl}${route}`,
    lastModified: new Date("2026-07-22"),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
  const guideRoutes: MetadataRoute.Sitemap = guideSummaries.map((guide) => ({
    url: `${siteContent.brand.siteUrl}/library/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticRoutes, ...guideRoutes];
}
