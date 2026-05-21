import type { MetadataRoute } from "next";
import { siteContent } from "@/data/siteContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/library", "/hackathon", "/sponsor", "/get-involved"];

  return routes.map((route) => ({
    url: `${siteContent.brand.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}

