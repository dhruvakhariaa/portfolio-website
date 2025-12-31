'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    github?: string;
    liveUrl?: string;
    year: string;
}

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const cardRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!cardRef.current) return;

        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                },
            }
        );
    }, [index]);

    return (
        <article
            ref={cardRef}
            className="group relative overflow-hidden rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] transition-all duration-500 hover:border-[var(--color-primary)]/30"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
                    {/* Top Gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/80 to-transparent" />

                    {/* Bottom Gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

                    {/* Center Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Link
                            href={`/projects/${project.id}`}
                            className="btn btn-primary transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100"
                            aria-label={`View ${project.title} project details`}
                        >
                            View Project
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
                        {/* Project Year */}
                        <span className="text-[var(--font-size-sm)] text-white/70 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                            {project.year}
                        </span>

                        {/* GitHub Link */}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-[var(--font-size-sm)] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:bg-white/20"
                                aria-label={`View ${project.title} source code on GitHub`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                <span>GitHub</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
                <h3 className="text-[var(--font-size-xl)] font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                    {project.title}
                </h3>
                <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] line-clamp-2 mb-4">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-[var(--font-size-xs)] bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="px-3 py-1 text-[var(--font-size-xs)] text-[var(--color-text-muted)]">
                            +{project.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}

// Export the Project type for use in other components
export type { Project };
