'use client';

import { useRef } from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { getFeaturedProjects } from '@/data/projects';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface WorkProps {
    showAll?: boolean;
}

export default function Work({ showAll = false }: WorkProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const projects = showAll ? getFeaturedProjects(6) : getFeaturedProjects(3);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Header animation
        gsap.fromTo(
            '.work-header',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="work"
            className="section"
            aria-label="Featured projects"
        >
            <div className="container">
                {/* Section Header */}
                <div className="work-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[var(--font-size-sm)] uppercase tracking-widest text-[var(--color-primary)]">
                                Work
                            </span>
                            <div className="w-12 h-[1px] bg-[var(--color-border)]" />
                            <span className="text-[var(--font-size-xs)] text-[var(--color-text-muted)]">04</span>
                        </div>
                        <h2 className="text-[var(--font-size-4xl)] lg:text-[var(--font-size-5xl)] font-bold">
                            Featured Projects
                        </h2>
                        <p className="mt-4 text-[var(--font-size-lg)] text-[var(--color-text-secondary)] max-w-2xl">
                            A selection of recent work showcasing my expertise in building exceptional digital products
                        </p>
                    </div>

                    {!showAll && (
                        <Link
                            href="/projects"
                            className="btn btn-outline self-start lg:self-auto"
                        >
                            View All Projects
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    )}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* CTA for homepage */}
                {!showAll && (
                    <div className="mt-16 text-center">
                        <p className="text-[var(--font-size-lg)] text-[var(--color-text-secondary)] mb-6">
                            Interested in working together?
                        </p>
                        <Link href="/contact" className="btn btn-primary">
                            Start a Project
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
