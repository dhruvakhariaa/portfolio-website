'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface ProcessStep {
    number: string;
    title: string;
    description: string;
}

const processSteps: ProcessStep[] = [
    {
        number: '01',
        title: 'Discovery',
        description: 'Understanding your vision, goals, and requirements through in-depth discussions and research to lay a solid foundation.',
    },
    {
        number: '02',
        title: 'Strategy',
        description: 'Developing a comprehensive roadmap and technical architecture that aligns with your business objectives.',
    },
    {
        number: '03',
        title: 'Design & Develop',
        description: 'Bringing ideas to life through iterative design and development, with regular feedback loops for refinement.',
    },
    {
        number: '04',
        title: 'Launch & Support',
        description: 'Deploying your solution and providing ongoing support to ensure continued success and optimization.',
    },
];

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const cards = sectionRef.current.querySelectorAll('.process-card');

        // Header animation
        gsap.fromTo(
            '.process-header',
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

        // Stagger cards entrance
        gsap.fromTo(
            cards,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
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
            id="process"
            className="section bg-[var(--color-bg-secondary)]"
            aria-label="Work process section"
        >
            <div className="container">
                {/* Section Header */}
                <div className="process-header mb-12 lg:mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-[var(--font-size-sm)] uppercase tracking-widest text-[var(--color-primary)]">
                            Process
                        </span>
                        <div className="w-12 h-[1px] bg-[var(--color-border)]" />
                        <span className="text-[var(--font-size-xs)] text-[var(--color-text-muted)]">03</span>
                    </div>
                    <h2 className="text-[var(--font-size-4xl)] lg:text-[var(--font-size-5xl)] font-bold">
                        How I Work
                    </h2>
                    <p className="mt-4 text-[var(--font-size-lg)] text-[var(--color-text-secondary)] max-w-2xl">
                        A streamlined approach to turning your ideas into reality
                    </p>
                </div>

                {/* Process Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {processSteps.map((step) => (
                        <article
                            key={step.number}
                            className="process-card group"
                        >
                            <div className="h-full card p-8 flex flex-col transition-all duration-300 hover:border-[var(--color-primary)]/50 hover:-translate-y-2">
                                {/* Number */}
                                <div className="mb-6">
                                    <span className="text-[var(--font-size-5xl)] font-bold text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300 inline-block">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-[var(--font-size-xl)] lg:text-[var(--font-size-2xl)] font-bold mb-4 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
