'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    company: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "Dhruv transformed our outdated platform into a modern, user-friendly application. His technical expertise and attention to detail exceeded our expectations.",
        author: "Sarah Chen",
        role: "CTO",
        company: "TechStartup Inc.",
    },
    {
        id: 2,
        quote: "Working with Dhruv was a game-changer for our business. He delivered a robust e-commerce solution that increased our online sales by 150%.",
        author: "Michael Rodriguez",
        role: "Founder",
        company: "RetailHub",
    },
    {
        id: 3,
        quote: "Exceptional communication and technical skills. Dhruv not only built what we asked for but also suggested improvements that made the final product even better.",
        author: "Emily Watson",
        role: "Product Manager",
        company: "InnovateCo",
    },
    {
        id: 4,
        quote: "Dhruv's expertise in both frontend and backend development made our project seamless. He's our go-to developer for all future projects.",
        author: "David Kim",
        role: "CEO",
        company: "Digital Solutions",
    },
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    useGSAP(() => {
        if (!sectionRef.current) return;

        gsap.fromTo(
            '.testimonials-header',
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

        gsap.fromTo(
            '.testimonial-card',
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            }
        );
    }, []);

    const current = testimonials[currentIndex];

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="section"
            aria-label="Client testimonials"
        >
            <div className="container">
                {/* Section Header */}
                <div className="testimonials-header text-center" style={{ marginBottom: 'clamp(32px, 4vw, 32px)' }}>
                    <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-primary)] mb-4">
                        Testimonials
                    </span>
                    <h2
                        className="font-black text-[var(--color-text)] leading-[0.95]"
                        style={{ fontSize: 'clamp(2.5rem, 2rem + 3vw, 5rem)' }}
                    >
                        What Clients Say
                    </h2>
                </div>

                {/* Testimonial Card — centered with quote marks at card corners */}
                <div style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', position: 'relative' }}>

                    {/* Card wrapper — relative so quotes can position at its corners */}
                    <div style={{ position: 'relative' }}>

                        {/* Opening quote mark — top-left corner of the card */}
                        <div
                            className="pointer-events-none select-none font-serif"
                            style={{
                                position: 'absolute',
                                top: '-30px',
                                left: '-10px',
                                fontSize: '120px',
                                lineHeight: 1,
                                color: 'var(--color-primary)',
                                opacity: 0.8,
                                zIndex: 20,
                            }}
                        >
                            &ldquo;
                        </div>

                        {/* Closing quote mark — bottom-right corner of the card */}
                        <div
                            className="pointer-events-none select-none font-serif"
                            style={{
                                position: 'absolute',
                                bottom: '-90px',
                                right: '-10px',
                                fontSize: '120px',
                                lineHeight: 1,
                                color: 'var(--color-primary)',
                                opacity: 0.8,
                                zIndex: 20,
                            }}
                        >
                            &rdquo;
                        </div>

                        {/* Card */}
                        <div
                            className="testimonial-card relative overflow-hidden rounded-2xl"
                            style={{
                                background: 'linear-gradient(135deg, var(--surface-4) 0%, var(--surface-2) 100%)',
                                border: '1px solid var(--line-8)',
                                padding: 'clamp(32px, 5vw, 64px)',
                            }}
                            role="region"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {/* Quote */}
                            <blockquote
                                className="relative z-10 text-[var(--color-text)] leading-relaxed font-light"
                                style={{
                                    fontSize: 'clamp(1.125rem, 1rem + 0.8vw, 1.5rem)',
                                    marginBottom: '40px',
                                }}
                            >
                                {current.quote}
                            </blockquote>

                            {/* Separator */}
                            <div
                                className="relative z-10"
                                style={{
                                    width: '48px',
                                    height: '2px',
                                    background: 'var(--color-primary)',
                                    marginBottom: '24px',
                                    opacity: 0.6,
                                }}
                            />

                            {/* Author */}
                            <div className="relative z-10 flex items-center gap-4">
                                <div
                                    className="flex items-center justify-center rounded-full font-bold text-sm"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        background: '#555555',
                                        color: '#fff',
                                    }}
                                >
                                    {current.author.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <cite className="not-italic font-semibold text-[var(--color-text)] block text-base">
                                        {current.author}
                                    </cite>
                                    <span className="text-sm text-[var(--color-text-muted)]">
                                        {current.role} at {current.company}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Left arrow — on the side of the card */}
                    <button
                        onClick={goToPrev}
                        className="transition-all duration-300"
                        style={{
                            position: 'absolute',
                            left: '-80px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            zIndex: 10,
                            opacity: 0.5,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
                        aria-label="Previous testimonial"
                    >
                        <svg style={{ width: '40px', height: '40px', color: 'var(--color-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right arrow — on the side of the card */}
                    <button
                        onClick={goToNext}
                        className="transition-all duration-300"
                        style={{
                            position: 'absolute',
                            right: '-80px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            zIndex: 10,
                            opacity: 0.5,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
                        aria-label="Next testimonial"
                    >
                        <svg style={{ width: '40px', height: '40px', color: 'var(--color-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Carousel dots — centered below the card */}
                    <div className="flex items-center justify-center gap-2" style={{ marginTop: '24px' }}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                role="tab"
                                aria-selected={index === currentIndex}
                                aria-label={`Go to testimonial ${index + 1}`}
                                onClick={() => goToSlide(index)}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    width: index === currentIndex ? '24px' : '8px',
                                    height: '8px',
                                    background: index === currentIndex ? 'var(--color-primary)' : 'var(--line-15)',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
