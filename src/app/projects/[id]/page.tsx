'use client';

import { useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectById, projects } from '@/data/projects';
import { useGSAP, gsap } from '../../../hooks/useGSAP';

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
            <section style={{ paddingTop: 'clamp(16px, 2vw, 32px)', paddingBottom: 0 }}>
                <div className="container">
                    {/* Back Link */}
                    <Link
                        href="/projects"
                        className="project-content inline-flex items-center gap-2 transition-colors"
                        style={{
                            fontSize: 'clamp(0.8rem, 0.75rem + 0.15vw, 0.9rem)',
                            color: 'var(--color-text-muted)',
                            marginBottom: '32px',
                            display: 'inline-flex',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Projects
                    </Link>

                    {/* Project Header */}
                    <div className="project-content" style={{ maxWidth: '720px', marginBottom: '28px' }}>
                        <span
                            style={{
                                fontSize: 'clamp(0.75rem, 0.7rem + 0.15vw, 0.85rem)',
                                color: 'var(--color-primary)',
                                display: 'block',
                                marginBottom: '12px',
                            }}
                        >
                            {project.year}
                        </span>
                        <h1
                            className="font-bold"
                            style={{
                                fontSize: 'clamp(1.75rem, 1.5rem + 1.5vw, 3rem)',
                                lineHeight: 1.15,
                                marginBottom: '14px',
                            }}
                        >
                            {project.title}
                        </h1>
                        <p
                            style={{
                                fontSize: 'clamp(0.95rem, 0.9rem + 0.2vw, 1.1rem)',
                                color: 'var(--color-text-secondary)',
                                lineHeight: 1.65,
                            }}
                        >
                            {project.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="project-content flex flex-wrap gap-3" style={{ marginBottom: '40px' }}>
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
            <section className="project-content container" style={{ marginBottom: 'clamp(32px, 4vw, 64px)' }}>
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
            <section
                style={{
                    background: 'var(--color-bg-secondary)',
                    paddingTop: 'clamp(40px, 5vw, 64px)',
                    paddingBottom: 'clamp(40px, 5vw, 64px)',
                }}
            >
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'clamp(32px, 4vw, 48px)' }}>
                        {/* Main Content */}
                        <div className="lg:col-span-8 project-content">
                            {project.details ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                    {/* Overview */}
                                    <div>
                                        <h2 className="font-bold" style={{ fontSize: 'clamp(1.1rem, 1rem + 0.4vw, 1.4rem)', marginBottom: '10px' }}>
                                            Overview
                                        </h2>
                                        <p style={{ fontSize: 'clamp(0.875rem, 0.85rem + 0.15vw, 1rem)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>
                                            {project.details.overview}
                                        </p>
                                    </div>

                                    {/* Problem */}
                                    {project.details.problem && (
                                        <div>
                                            <h2 className="font-bold" style={{ fontSize: 'clamp(1.1rem, 1rem + 0.4vw, 1.4rem)', marginBottom: '10px' }}>
                                                The Problem It Solves
                                            </h2>
                                            <p style={{ fontSize: 'clamp(0.875rem, 0.85rem + 0.15vw, 1rem)', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>
                                                {project.details.problem}
                                            </p>
                                        </div>
                                    )}

                                    {/* Features */}
                                    {project.details.features && project.details.features.length > 0 && (
                                        <div>
                                            <h2 className="font-bold" style={{ fontSize: 'clamp(1.1rem, 1rem + 0.4vw, 1.4rem)', marginBottom: '16px' }}>
                                                Key Features
                                            </h2>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {project.details.features.map((feature, i) => (
                                                    <div
                                                        key={i}
                                                        style={{
                                                            padding: '16px 20px',
                                                            background: 'rgba(255,255,255,0.03)',
                                                            border: '1px solid rgba(255,255,255,0.06)',
                                                            borderLeft: '3px solid var(--color-primary)',
                                                            borderRadius: '8px',
                                                        }}
                                                    >
                                                        <p className="font-semibold" style={{ fontSize: 'clamp(0.85rem, 0.8rem + 0.15vw, 0.95rem)', marginBottom: '4px' }}>
                                                            {feature.title}
                                                        </p>
                                                        <p style={{ fontSize: 'clamp(0.8rem, 0.75rem + 0.15vw, 0.9rem)', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                                                            {feature.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Stack */}
                                    {project.details.stack && project.details.stack.length > 0 && (
                                        <div>
                                            <h2 className="font-bold" style={{ fontSize: 'clamp(1.1rem, 1rem + 0.4vw, 1.4rem)', marginBottom: '16px' }}>
                                                Technical Stack
                                            </h2>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {project.details.stack.map((layer, i) => (
                                                    <div key={i} className="flex items-start gap-4">
                                                        <span
                                                            className="shrink-0 font-medium"
                                                            style={{
                                                                fontSize: 'clamp(0.75rem, 0.7rem + 0.1vw, 0.85rem)',
                                                                color: 'var(--color-primary)',
                                                                minWidth: '110px',
                                                                paddingTop: '2px',
                                                            }}
                                                        >
                                                            {layer.category}
                                                        </span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {layer.items.map((item, j) => (
                                                                <span
                                                                    key={j}
                                                                    style={{
                                                                        padding: '3px 10px',
                                                                        fontSize: 'clamp(0.75rem, 0.7rem + 0.1vw, 0.82rem)',
                                                                        background: 'rgba(255,255,255,0.05)',
                                                                        color: 'var(--color-text-secondary)',
                                                                        borderRadius: '999px',
                                                                    }}
                                                                >
                                                                    {item}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <h2 className="font-bold" style={{ fontSize: 'clamp(1.2rem, 1.1rem + 0.5vw, 1.5rem)', marginBottom: '16px' }}>
                                        About the Project
                                    </h2>
                                    <p style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.2vw, 1rem)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                                        {project.longDescription || project.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 project-content">
                            {/* Technologies */}
                            <div
                                style={{
                                    padding: 'clamp(20px, 3vw, 28px)',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '12px',
                                    marginBottom: '16px',
                                }}
                            >
                                <h3
                                    className="font-semibold"
                                    style={{ fontSize: 'clamp(0.95rem, 0.9rem + 0.15vw, 1.05rem)', marginBottom: '12px' }}
                                >
                                    Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                padding: '4px 12px',
                                                fontSize: 'clamp(0.75rem, 0.7rem + 0.15vw, 0.85rem)',
                                                background: 'rgba(255,255,255,0.05)',
                                                color: 'var(--color-text-secondary)',
                                                borderRadius: '999px',
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Year */}
                            <div
                                style={{
                                    padding: 'clamp(20px, 3vw, 28px)',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '12px',
                                }}
                            >
                                <h3
                                    className="font-semibold"
                                    style={{ fontSize: 'clamp(0.95rem, 0.9rem + 0.15vw, 1.05rem)', marginBottom: '8px' }}
                                >
                                    Year
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(0.85rem, 0.8rem + 0.15vw, 0.95rem)' }}>
                                    {project.year}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
                <section style={{ paddingTop: 'clamp(40px, 5vw, 64px)', paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
                    <div className="container">
                        <h2
                            className="font-bold"
                            style={{
                                fontSize: 'clamp(1.2rem, 1rem + 0.8vw, 1.75rem)',
                                marginBottom: 'clamp(24px, 3vw, 40px)',
                            }}
                        >
                            Other Projects
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedProjects.map((relatedProject) => (
                                <Link
                                    key={relatedProject.id}
                                    href={`/projects/${relatedProject.id}`}
                                    className="group overflow-hidden"
                                    style={{
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        background: 'rgba(255,255,255,0.02)',
                                    }}
                                >
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={relatedProject.image}
                                            alt={relatedProject.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-5">
                                            <h3
                                                className="font-bold text-white"
                                                style={{ fontSize: 'clamp(1rem, 0.9rem + 0.4vw, 1.25rem)' }}
                                            >
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
