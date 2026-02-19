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
    const projects = showAll ? getFeaturedProjects(6) : getFeaturedProjects(4);

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

    // Split projects into two columns for staggered layout
    // Left: index 0, 2  |  Right: index 1, 3
    const leftCol = projects.filter((_, i) => i % 2 === 0);
    const rightCol = projects.filter((_, i) => i % 2 === 1);

    return (
        <section
            ref={sectionRef}
            id="work"
            className="section"
            aria-label="Featured projects"
        >
            <div className="container">
                {/* Section Header — button aligned inline with heading */}
                <div className="work-header flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6" style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }}>
                    <div>
                        <h2 className="font-black uppercase leading-[0.95] text-[var(--color-text)]" style={{ fontSize: 'clamp(3rem, 2.5rem + 4vw, 7rem)' }}>
                            LATEST WORK
                            <sup className="text-base sm:text-lg text-[var(--color-text-muted)] ml-2 font-normal normal-case">
                                ({projects.length.toString().padStart(2, '0')})
                            </sup>
                        </h2>
                    </div>

                    {!showAll && (
                        <Link
                            href="/projects"
                            className="btn btn-secondary self-start lg:self-auto"
                        >
                            View All Projects
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    )}
                </div>

                {/* Staggered 2-Column Grid — right column offset, 4th card fills to align */}
                <div className="hidden lg:grid grid-cols-2 gap-8">
                    {/* Left column — cards 1, 3 */}
                    <div className="flex flex-col gap-8">
                        {leftCol.map((project) => {
                            const originalIdx = projects.indexOf(project);
                            return (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={originalIdx}
                                />
                            );
                        })}
                    </div>

                    {/* Right column — offset 80px, last card fills remaining height */}
                    <div className="flex flex-col gap-8" style={{ marginTop: '80px' }}>
                        {rightCol.map((project, colIdx) => {
                            const originalIdx = projects.indexOf(project);
                            const isLast = colIdx === rightCol.length - 1;
                            return (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={originalIdx}
                                    fillHeight={isLast}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Mobile: single column, no stagger */}
                <div className="flex flex-col gap-6 lg:hidden">
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
