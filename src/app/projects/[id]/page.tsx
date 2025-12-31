'use client';

import { useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectById, projects } from '@/data/projects';
import { useGSAP, gsap } from '@/hooks/useGSAP';

export default function ProjectDetailPage() {
    const params = useParams();
    const pageRef = useRef<HTMLDivElement>(null);

    const project = getProjectById(params.id as string);

    useGSAP(() => {
        if (!pageRef.current) return;

        gsap.fromTo(
            '.project-content',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
            }
        );
    }, []);

    if (!project) {
        notFound();
    }

    // Get related projects (excluding current)
    const relatedProjects = projects.filter(p => p.id !== project.id).slice(0, 2);

    return (
        <div ref={pageRef} className="pt-24 lg:pt-32">
            {/* Hero Section */}
            <section className="section pb-0">
                <div className="container">
                    {/* Back Link */}
                    <Link
                        href="/projects"
                        className="project-content inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Projects
                    </Link>

                    {/* Project Header */}
                    <div className="project-content max-w-4xl mb-12">
                        <span className="text-[var(--font-size-sm)] text-[var(--color-primary)] mb-4 block">
                            {project.year}
                        </span>
                        <h1 className="text-[var(--font-size-4xl)] lg:text-[var(--font-size-5xl)] font-bold mb-6">
                            {project.title}
                        </h1>
                        <p className="text-[var(--font-size-xl)] text-[var(--color-text-secondary)] leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="project-content flex flex-wrap gap-4 mb-12">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                View Source Code
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                View Live Site
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Project Image */}
            <section className="project-content container mb-16">
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </section>

            {/* Project Details */}
            <section className="section bg-[var(--color-bg-secondary)]">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8 project-content">
                            <h2 className="text-[var(--font-size-2xl)] font-bold mb-6">About the Project</h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-[var(--font-size-lg)] text-[var(--color-text-secondary)] leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <p className="text-[var(--font-size-base)] text-[var(--color-text-secondary)] leading-relaxed">
                                    This project showcases my ability to build full-stack applications with modern technologies.
                                    The development process involved careful planning, iterative design, and rigorous testing
                                    to ensure a high-quality final product that meets both technical requirements and user needs.
                                </p>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 project-content">
                            {/* Technologies */}
                            <div className="card p-6 mb-6">
                                <h3 className="text-[var(--font-size-lg)] font-semibold mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 text-[var(--font-size-sm)] bg-[var(--color-bg)] text-[var(--color-text-secondary)] rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Year */}
                            <div className="card p-6">
                                <h3 className="text-[var(--font-size-lg)] font-semibold mb-4">Year</h3>
                                <p className="text-[var(--color-text-secondary)]">{project.year}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section className="section">
                    <div className="container">
                        <h2 className="text-[var(--font-size-2xl)] lg:text-[var(--font-size-3xl)] font-bold mb-8">
                            Other Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedProjects.map((relatedProject) => (
                                <Link
                                    key={relatedProject.id}
                                    href={`/projects/${relatedProject.id}`}
                                    className="group card overflow-hidden"
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={relatedProject.image}
                                            alt={relatedProject.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-[var(--font-size-xl)] font-bold text-white">
                                                {relatedProject.title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
