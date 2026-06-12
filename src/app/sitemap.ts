import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = ["", "/projects", "/contact"].map((route) => ({
        url: absoluteUrl(route || "/"),
        lastModified: new Date(),
        changeFrequency: route === "" ? "monthly" : "weekly",
        priority: route === "" ? 1 : 0.8,
    })) satisfies MetadataRoute.Sitemap;

    const projectRoutes = projects.map((project) => ({
        url: absoluteUrl(`/projects/${project.id}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    })) satisfies MetadataRoute.Sitemap;

    return [...staticRoutes, ...projectRoutes];
}
