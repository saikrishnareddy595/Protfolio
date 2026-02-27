import type { MetadataRoute } from "next";
import { projectSlugs } from "@/config/projects";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/resume", "/contact"];

  const staticEntries = pages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date()
  }));

  const projectEntries = projectSlugs.map((slug) => ({
    url: `${siteConfig.url}/projects/${slug}`,
    lastModified: new Date()
  }));

  return [...staticEntries, ...projectEntries];
}
