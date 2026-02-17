'use client';

import { useRef } from 'react';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface ProcessStep {
    step: number;
    title: string;
    description: string;
}

const steps: ProcessStep[] = [
    {
        step: 1,
        title: 'Discovery Phase',
        description: 'Understanding your goals, pain points, audience, and what sets you apart.',
    },
    {
        step: 2,
        title: 'Project Kickoff',
        description: 'Setting up projects, aligning on scope and milestones, and diving into the work.',
    },
    {
        step: 3,
        title: 'Receive & Refine',
        description: 'Sharing initial designs, gathering feedback, and fine-tuning together.',
    },
    {
        step: 4,
        title: 'Continue & Grow',
        description: 'Launching with confidence and supporting your next extraordinary moves.',
    },
];

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Animate the heading
        gsap.fromTo(
            headingRef.current,
            { opacity: 0, x: -40 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Animate the process cards
        const cards = cardsRef.current?.querySelectorAll('.process-step-card');
        if (cards) {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="process"
            className="py-20 lg:py-32 bg-[var(--color-bg)]"
            aria-label="Work process"
        >
            <div className="container">
                {/* Side-by-side layout: massive heading left + cards right */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16 xl:gap-20">

                    {/* Left Side - Massive Heading */}
                    <div ref={headingRef} className="lg:w-[35%] xl:w-[30%] shrink-0">
                        <div className="flex items-start gap-3 mb-0">
                            <h2
                                className="font-black uppercase leading-[0.9] text-[var(--color-text)]"
                                style={{ fontSize: 'clamp(3rem, 2.5rem + 4vw, 7rem)' }}
                            >
                                HOW I<br />WORK
                            </h2>
                            <span className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-2 whitespace-nowrap">
                                (PROCESS)
                            </span>
                        </div>
                    </div>

                    {/* Right Side - 4-Column Process Grid */}
                    <div ref={cardsRef} className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[rgba(255,255,255,0.1)]">
                            {steps.map((step, index) => (
                                <div
                                    key={step.step}
                                    className={`
                                        process-step-card flex flex-col justify-between
                                        p-5 sm:p-6 lg:p-5 xl:p-6
                                        min-h-[280px] sm:min-h-[320px] lg:min-h-[380px]
                                        border-b border-[rgba(255,255,255,0.1)]
                                        ${index > 0 ? 'sm:border-l lg:border-l' : ''}
                                        ${index === 2 ? 'sm:border-l-0 lg:border-l' : ''}
                                    `}
                                >
                                    {/* Step Label at top */}
                                    <div className="mb-auto">
                                        <span className="text-sm sm:text-base lg:text-lg text-[var(--color-text-muted)] uppercase tracking-wider">
                                            STEP {step.step}
                                            <span className="text-[var(--color-primary)]">.</span>
                                        </span>
                                    </div>

                                    {/* Title + Description at bottom */}
                                    <div>
                                        <h3
                                            className="font-bold text-[var(--color-text)] mb-3 sm:mb-4 leading-tight"
                                            style={{ fontSize: 'clamp(1.25rem, 1rem + 1vw, 2rem)' }}
                                        >
                                            {step.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
