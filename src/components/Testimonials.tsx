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
                <div className="testimonials-header text-center mb-16 lg:mb-20">
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

                {/* Testimonial Card */}
                <div style={{ maxWidth: '800px', marginLeft: 'center', marginRight: 'center' }}>
                    <div
                        className="testimonial-card relative overflow-hidden rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: 'clamp(32px, 5vw, 64px)',
                        }}
                        role="region"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {/* Large decorative quote mark */}
                        <div
                            className="absolute pointer-events-none select-none font-serif leading-none text-[var(--color-primary)]"
                            style={{
                                fontSize: 'clamp(120px, 15vw, 200px)',
                                top: '-20px',
                                left: '24px',
                                opacity: 0.08,
                            }}
                        >
                            &ldquo;
                        </div>

                        {/* Subtle glow in top-right corner */}
                        <div
                            className="absolute pointer-events-none"
                            style={{
                                width: '300px',
                                height: '300px',
                                top: '-100px',
                                right: '-100px',
                                background: 'radial-gradient(circle, rgba(255,73,37,0.06) 0%, transparent 70%)',
                            }}
                        />

                        {/* Quote */}
                        <blockquote
                            className="relative z-10 text-[var(--color-text)] leading-relaxed font-light"
                            style={{
                                fontSize: 'clamp(1.125rem, 1rem + 0.8vw, 1.5rem)',
                                marginBottom: '40px',
                            }}
                        >
                            &ldquo;{current.quote}&rdquo;
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
                                    background: 'linear-gradient(135deg, var(--color-primary), #ff7b5e)',
                                    color: '#000',
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

                    {/* Navigation dots + arrows */}
                    <div className="flex items-center justify-center gap-6 mt-10">
                        <button
                            onClick={goToPrev}
                            className="p-2.5 rounded-full transition-all duration-300 hover:bg-white/5"
                            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                            aria-label="Previous testimonial"
                        >
                            <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
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
                                        background: index === currentIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)',
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={goToNext}
                            className="p-2.5 rounded-full transition-all duration-300 hover:bg-white/5"
                            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                            aria-label="Next testimonial"
                        >
                            <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
