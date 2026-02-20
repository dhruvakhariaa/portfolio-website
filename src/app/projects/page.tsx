'use client';

import { useRef } from 'react';
import { ProjectCard } from '@/components';
import { projects } from '@/data/projects';
import { useGSAP, gsap } from '../../hooks/useGSAP';

export default function ProjectsPage() {
    const pageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!pageRef.current) return;

        gsap.fromTo(
            '.page-header',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
            }
        );
    }, []);

    return (
        <div ref={pageRef} className="pt-24 lg:pt-32">
            {/* Page Header */}
            <section className="page-header section" style={{ paddingBottom: 0 }}>
                <div className="container">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[var(--font-size-sm)] uppercase tracking-widest text-[var(--color-primary)]">
                                Projects
                            </span>
                            <div className="w-12 h-[1px] bg-[var(--color-border)]" />
                        </div>
                        <h1 className="text-[var(--font-size-4xl)] lg:text-[var(--font-size-5xl)] font-bold mb-6">
                            My Work
                        </h1>
                        <p className="text-[var(--font-size-lg)] text-[var(--color-text-secondary)] max-w-2xl">
                            A collection of projects that showcase my expertise in building exceptional digital products. Each project represents a unique challenge and solution.
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section" style={{ paddingTop: '64px' }}>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
