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

    // Auto-play testimonials
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
        // Resume autoplay after 10 seconds of inactivity
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

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="section bg-[var(--color-bg-secondary)]"
            aria-label="Client testimonials"
        >
            <div className="container">
                {/* Section Header */}
                <div className="testimonials-header text-center mb-12 lg:mb-16">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <span className="text-[var(--font-size-sm)] uppercase tracking-widest text-[var(--color-primary)]">
                            Testimonials
                        </span>
                    </div>
                    <h2 className="text-[var(--font-size-4xl)] lg:text-[var(--font-size-5xl)] font-bold">
                        What Clients Say
                    </h2>
                </div>

                {/* Testimonial Card */}
                <div className="max-w-4xl mx-auto">
                    <div
                        className="testimonial-card card p-8 lg:p-12 relative overflow-hidden"
                        role="region"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {/* Quote mark */}
                        <div className="absolute top-6 left-6 text-8xl text-[var(--color-primary)] opacity-20 font-serif leading-none">
                            &ldquo;
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                            <blockquote className="text-[var(--font-size-xl)] lg:text-[var(--font-size-2xl)] text-[var(--color-text)] leading-relaxed mb-8">
                                {testimonials[currentIndex].quote}
                            </blockquote>

                            <div className="flex items-center gap-4">
                                {/* Avatar placeholder */}
                                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-black font-bold">
                                    {testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <cite className="not-italic font-semibold text-[var(--color-text)]">
                                        {testimonials[currentIndex].author}
                                    </cite>
                                    <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
                                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-8">
                        {/* Prev Button */}
                        <button
                            onClick={goToPrev}
                            className="p-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    role="tab"
                                    aria-selected={index === currentIndex}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                    onClick={() => goToSlide(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-[var(--color-primary)] w-6'
                                            : 'bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={goToNext}
                            className="p-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                            aria-label="Next testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
