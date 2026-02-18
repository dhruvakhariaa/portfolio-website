'use client';

import { useRef, useState, useCallback } from 'react';
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
    featured?: boolean;
}

export default function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
    const cardRef = useRef<HTMLElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const rafRef = useRef<number>(0);

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

    // 3D Tilt Effect
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const card = cardRef.current;
            const glare = glareRef.current;
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate tilt (max ±8 degrees)
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Move glare to follow cursor
            if (glare) {
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;
            }
        });
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        setIsHovered(false);
        const card = cardRef.current;
        if (card) {
            card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            setTimeout(() => {
                if (card) card.style.transition = '';
            }, 500);
        }
        if (glareRef.current) {
            glareRef.current.style.background = 'transparent';
        }
    }, []);

    const projectNumber = (index + 1).toString().padStart(2, '0');

    return (
        <article
            ref={cardRef}
            className="project-card group relative overflow-hidden rounded-2xl cursor-pointer"
            style={{
                willChange: 'transform',
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={`/projects/${project.id}`}
                className="absolute inset-0 z-20"
                aria-label={`View ${project.title} project details`}
            />

            {/* Card Inner — full bleed image */}
            <div
                className="relative w-full overflow-hidden"
                style={{
                    height: featured ? 'clamp(420px, 40vw + 60px, 640px)' : 'clamp(320px, 25vw + 60px, 440px)',
                }}
            >
                {/* Background Image */}
                {imageError ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center">
                        <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white/5 uppercase tracking-widest text-center px-8">
                            {project.title}
                        </span>
                    </div>
                ) : (
                    <Image
                        src={project.image}
                        alt={`${project.title} project screenshot`}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                        onError={() => setImageError(true)}
                    />
                )}

                {/* Permanent gradient scrim — heavier at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                {/* Cursor-following glare overlay */}
                <div
                    ref={glareRef}
                    className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }}
                />

                {/* Glowing border on hover */}
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-all duration-500"
                    style={{
                        boxShadow: isHovered
                            ? '0 0 30px rgba(255,73,37,0.15), inset 0 0 0 1px rgba(255,73,37,0.3)'
                            : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                    }}
                />

                {/* Large faded project number watermark */}
                <div className="absolute top-6 left-8 sm:top-8 sm:left-10 z-[5] pointer-events-none select-none">
                    <span
                        className="font-black text-white/[0.04] leading-none"
                        style={{ fontSize: featured ? 'clamp(6rem, 8vw, 12rem)' : 'clamp(4rem, 6vw, 8rem)' }}
                    >
                        {projectNumber}
                    </span>
                </div>

                {/* Bottom content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 z-[5]">
                    <div className="flex items-end justify-between gap-6">
                        {/* Left — Title + Description */}
                        <div className="flex-1 min-w-0">
                            {/* Year label */}
                            <span className="inline-block text-[10px] sm:text-xs text-[var(--color-primary)] font-mono tracking-widest uppercase mb-2">
                                {project.year}
                            </span>

                            <h3
                                className="font-bold text-white leading-tight mb-2 transition-all duration-500"
                                style={{
                                    fontSize: featured
                                        ? 'clamp(1.75rem, 1.4rem + 1.8vw, 3rem)'
                                        : 'clamp(1.25rem, 1rem + 1.2vw, 2rem)',
                                }}
                            >
                                {project.title}
                            </h3>

                            <p
                                className="text-white/50 leading-relaxed line-clamp-2 transition-all duration-500"
                                style={{
                                    fontSize: featured ? 'clamp(0.85rem, 0.8rem + 0.3vw, 1rem)' : '0.85rem',
                                    maxHeight: isHovered ? '3em' : '3em',
                                }}
                            >
                                {project.description}
                            </p>

                            {/* Tech stack badges — animate in on hover */}
                            <div
                                className="flex flex-wrap gap-2 mt-4 transition-all duration-500"
                                style={{
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                                }}
                            >
                                {project.tags.slice(0, featured ? 5 : 3).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 text-[11px] sm:text-xs bg-white/10 backdrop-blur-sm text-white/80 rounded-full border border-white/10 font-mono"
                                        style={{
                                            transitionDelay: `${i * 60}ms`,
                                            opacity: isHovered ? 1 : 0,
                                            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                                            transition: 'opacity 0.4s, transform 0.4s',
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right — Arrow CTA */}
                        <div
                            className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 backdrop-blur-sm"
                            style={{
                                opacity: isHovered ? 1 : 0,
                                transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(16px) scale(0.8)',
                                background: isHovered ? 'rgba(255,73,37,0.15)' : 'transparent',
                                borderColor: isHovered ? 'rgba(255,73,37,0.4)' : 'rgba(255,255,255,0.2)',
                            }}
                        >
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

// Export the Project type for use in other components
export type { Project };
