import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl, siteConfig } from "@/lib/site";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Explore full-stack, mobile, cloud, AI, and optimization projects by Dhruv Vakharia, including React, Next.js, Node.js, Python, AWS, and React Native work.",
    alternates: {
        canonical: "/projects",
    },
    openGraph: {
        title: `Projects | ${siteConfig.name}`,
        description:
            "A portfolio of full-stack, mobile, cloud, AI, and optimization projects by Dhruv Vakharia.",
        url: absoluteUrl("/projects"),
        images: [
            {
                url: projects[0].image,
                width: 1200,
                height: 630,
                alt: `${projects[0].title} project screenshot`,
            },
        ],
    },
    twitter: {
        title: `Projects | ${siteConfig.name}`,
        description:
            "A portfolio of full-stack, mobile, cloud, AI, and optimization projects by Dhruv Vakharia.",
        images: [projects[0].image],
    },
};

export default function ProjectsPage() {
    return <ProjectsClient />;
}
