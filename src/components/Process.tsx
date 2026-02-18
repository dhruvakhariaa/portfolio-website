'use client';

import { useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';

interface ProcessStep {
    step: number;
    title: string;
    description: string;
}

const steps: ProcessStep[] = [
    {
        step: 1,
        title: 'Discovery Phase',
        description: `You might know the competition in your industry, but I'll help you identify the unique opportunities that set you apart.`,
    },
    {
        step: 2,
        title: 'Design Phase',
        description: `I'll create wireframes, mockups, and bring your vision to life, ensuring every detail aligns with your goals.`,
    },
    {
        step: 3,
        title: 'Receive & Refine',
        description: `Designs are meant to be flexible. I'll work closely with you to refine and ensure it aligns with your vision.`,
    },
    {
        step: 4,
        title: 'Development',
        description: `"AI can vibe-code the whole project". Then, let's see how that code reacts in the real world. IT WOULD BREAK!!`,
    },
    {
        step: 5,
        title: 'Deployment',
        description: `Deploying is where even the best code breaks. I make sure that it doesn't. AWS, GCP, Azure, you name it, I connect it.`,
    },
    {
        step: 6,
        title: 'Support',
        description: `If the project can't return real-life value, then it's as good as powerbank without charging. I make sure it adds that value.`,
    },
];

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const pinContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current || !trackRef.current || !pinContainerRef.current) return;

        // Delay to ensure Services section's pinSpacing is calculated first
        const timeoutId = setTimeout(() => {
            ScrollTrigger.refresh(true);


            // Calculate the horizontal distance: track width minus viewport
            const getScrollAmount = () => {
                return -(trackRef.current!.scrollWidth - window.innerWidth + 200);
            };

            // Horizontal scroll driven by vertical scroll
            const horizontalTween = gsap.to(trackRef.current, {
                x: getScrollAmount,
                ease: 'none',
            });

            ScrollTrigger.create({
                trigger: pinContainerRef.current,
                start: 'top top',
                end: () => `+=${trackRef.current!.scrollWidth + 1000}`,
                pin: true,
                pinSpacing: true,
                scrub: 0.8,
                animation: horizontalTween,
                invalidateOnRefresh: true,
            });
        }, 200);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="process"
            className="bg-[var(--color-bg)]"
            aria-label="Work process"
        >
            {/* This entire container gets pinned */}
            <div ref={pinContainerRef} className="overflow-hidden min-h-screen flex items-center">
                {/* Horizontal track: heading + cards in one row */}
                <div
                    ref={trackRef}
                    className="flex items-start"
                    style={{ willChange: 'transform' }}
                >
                    {/* Left Side - Massive Heading (part of the scroll track) */}
                    <div className="shrink-0 flex items-start gap-3 pr-16 xl:pr-20 pl-8 lg:pl-16 xl:pl-20"
                        style={{ width: 'clamp(400px, 35vw, 550px)' }}
                    >
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

                    {/* Cards — same row, scroll horizontally */}
                    <div className="flex border-t border-[rgba(255,255,255,0.1)]">
                        {steps.map((step) => (
                            <div
                                key={step.step}
                                className="process-step-card flex flex-col justify-between
                                    p-5 sm:p-6 lg:p-5 xl:p-6
                                    min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]
                                    border-b border-[rgba(255,255,255,0.1)]
                                    border-r border-r-[rgba(255,255,255,0.1)]
                                    shrink-0"
                                style={{ padding: '24px', width: 'clamp(300px, 25vw, 380px)' }}
                            >
                                {/* Step Label at top */}
                                <div className="mb-auto">
                                    <span className="text-sm sm:text-base lg:text-lg text-[var(--color-text-muted)] uppercase tracking-wider">
                                        STEP {step.step}
                                        <span className="text-[var(--color-primary)]">.</span>
                                    </span>
                                </div>

                                {/* Title + Description grouped at bottom */}
                                <div>
                                    <h3
                                        className="font-bold text-[var(--color-text)] leading-tight"
                                        style={{ marginBottom: '24px', fontSize: 'clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)' }}
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
        </section>
    );
}
