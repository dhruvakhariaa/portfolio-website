import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";
import { absoluteUrl, siteConfig } from "@/lib/site";
import ProjectDetailClient from "./ProjectDetailClient";

type ProjectPageProps = {
    params: Promise<{ id: string }>;
};

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        return {
            title: "Project Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = `${project.title} Case Study`;
    const description = `${project.description} Built with ${project.tags.slice(0, 4).join(", ")}.`;
    const canonicalPath = `/projects/${project.id}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalPath,
        },
        keywords: [project.title, ...project.tags, "case study", "portfolio project"],
        openGraph: {
            title: `${title} | ${siteConfig.name}`,
            description,
            url: absoluteUrl(canonicalPath),
            type: "article",
            images: [
                {
                    url: project.image,
                    width: 1200,
                    height: 630,
                    alt: `${project.title} project screenshot`,
                },
            ],
        },
        twitter: {
            title: `${title} | ${siteConfig.name}`,
            description,
            images: [project.image],
        },
    };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    const projectJsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        image: absoluteUrl(project.image),
        url: absoluteUrl(`/projects/${project.id}`),
        dateCreated: project.year,
        creator: {
            "@type": "Person",
            name: siteConfig.name,
            url: siteConfig.url,
        },
        keywords: project.tags.join(", "),
        codeRepository: project.github,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
            />
            <ProjectDetailClient project={project} />
        </>
    );
}
