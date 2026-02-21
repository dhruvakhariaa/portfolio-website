'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    details?: {
        overview: string;
        problem?: string;
        features?: { title: string; description: string }[];
        stack?: { category: string; items: string[] }[];
    };
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
    fillHeight?: boolean;
}

export default function ProjectCard({ project, index = 0, fillHeight = false }: ProjectCardProps) {
    const cardRef = useRef<HTMLElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
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

    // 3D Tilt Effect + Custom Cursor
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const card = cardRef.current;
            const wrapper = wrapperRef.current;
            const glare = glareRef.current;
            const cursor = cursorRef.current;
            if (!card || !wrapper) return;

            const rect = card.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            if (glare) {
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;
            }

            // Cursor uses raw viewport coords — unaffected by any transforms
            if (cursor) {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
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

    // Track last known mouse position for scroll-based unhover
    const lastMousePos = useRef<{ x: number; y: number } | null>(null);

    const handleMouseMoveCapture = useCallback((e: React.MouseEvent) => {
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    }, []);

    // On scroll, check if mouse is still over the card — if not, unhover
    useEffect(() => {
        const onScroll = () => {
            if (!isHovered || !wrapperRef.current || !lastMousePos.current) return;
            const rect = wrapperRef.current.getBoundingClientRect();
            const { x, y } = lastMousePos.current;
            if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                handleMouseLeave();
                lastMousePos.current = null;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHovered, handleMouseLeave]);

    const projectNumber = (index + 1).toString().padStart(2, '0');

    return (
        <div
            ref={wrapperRef}
            className="relative"
            style={{ cursor: 'none', ...(fillHeight ? { flex: 1, display: 'flex', flexDirection: 'column' as const } : {}) }}
            onMouseMove={handleMouseMove}
            onMouseMoveCapture={handleMouseMoveCapture}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Custom "View Project" cursor — outside overflow-hidden */}
            <div
                ref={cursorRef}
                className="pointer-events-none fixed"
                style={{
                    zIndex: 9999,
                    opacity: isHovered ? 1 : 0,
                    transform: 'translate(-50%, -50%)',
                    transition: 'opacity 0.3s ease',
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="cursors/view-project.svg"
                    alt=""
                    width={182}
                    height={49}
                    style={{ pointerEvents: 'none' }}
                />
            </div>

            <article
                ref={cardRef}
                className="project-card group relative overflow-hidden rounded-2xl"
                style={{
                    willChange: 'transform',
                    transformStyle: 'preserve-3d',
                    ...(fillHeight ? { flex: 1 } : {}),
                }}
            >
                <Link
                    href={`/projects/${project.id}`}
                    className="absolute inset-0 z-20"
                    style={{ cursor: 'none' }}
                    aria-label={`View ${project.title} project details`}
                />

                {/* Card Inner — full bleed image */}
                <div
                    className="relative w-full overflow-hidden"
                    style={{
                        height: fillHeight ? '100%' : 'clamp(340px, 28vw + 60px, 480px)',
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
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={() => setImageError(true)}
                        />
                    )}

                    {/* Permanent gradient scrim */}
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
                            style={{ fontSize: 'clamp(4rem, 6vw, 8rem)' }}
                        >
                            {projectNumber}
                        </span>
                    </div>

                    {/* Bottom content overlay — 24px padding */}
                    <div className="absolute bottom-0 left-0 right-0 z-[5]" style={{ padding: '24px' }}>
                        <div>
                            {/* Year label */}
                            <span className="inline-block text-[10px] sm:text-xs text-[var(--color-primary)] font-mono tracking-widest uppercase mb-2">
                                {project.year}
                            </span>

                            <h3
                                className="font-bold text-white leading-tight transition-all duration-500"
                                style={{
                                    fontSize: 'clamp(1.4rem, 1.1rem + 1.5vw, 2.25rem)',
                                    marginBottom: '16px',
                                }}
                            >
                                {project.title}
                            </h3>

                            <p
                                className="text-white/50 leading-relaxed line-clamp-2 transition-all duration-500"
                                style={{ fontSize: '0.875rem' }}
                            >
                                {project.description}
                            </p>

                            {/* Tech stack labels — 8px gap, themed styling */}
                            <div
                                className="flex flex-wrap transition-all duration-500"
                                style={{
                                    gap: '8px',
                                    marginTop: '16px',
                                    opacity: isHovered ? 1 : 0,
                                    transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                                }}
                            >
                                {project.tags.slice(0, 4).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full font-medium"
                                        style={{
                                            padding: '4px 12px',
                                            fontSize: '0.75rem',
                                            background: 'rgba(var(--color-primary-rgb, 255,73,37), 0.12)',
                                            color: 'var(--color-primary)',
                                            border: '1px solid rgba(var(--color-primary-rgb, 255,73,37), 0.25)',
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
                    </div>
                </div>
            </article>
        </div>
    );
}

// Export the Project type for use in other components
export type { Project };
