'use client';

import { useRef, useState } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';

interface Stat {
    endValue: number;
    suffix: string;
    label: string;
}

const stats: Stat[] = [
    { endValue: 5, suffix: '+', label: 'Years Experience' },
    { endValue: 50, suffix: '+', label: 'Projects Completed' },
    { endValue: 10, suffix: '+', label: 'Happy Clients' },
    { endValue: 100, suffix: '%', label: 'Commitment' },
];

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null);
    const [counters, setCounters] = useState<number[]>(stats.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState(false);

    useGSAP(() => {
        if (!sectionRef.current || hasAnimated) return;

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 80%',
            onEnter: () => {
                if (hasAnimated) return;
                setHasAnimated(true);

                // Smooth count-up animation from 0 to final value
                stats.forEach((stat, index) => {
                    const duration = 4; // Animation duration in seconds
                    const startTime = performance.now();

                    const animate = () => {
                        const now = performance.now();
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / (duration * 1000), 1);

                        // Smooth ease-out cubic for natural deceleration
                        const easeOutCubic = 1 - Math.pow(1 - progress, 3);

                        // Calculate current value - smooth progression from 0 to end
                        const currentValue = Math.round(stat.endValue * easeOutCubic);

                        setCounters(prev => {
                            const newCounters = [...prev];
                            newCounters[index] = currentValue;
                            return newCounters;
                        });

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    // Stagger start of each counter for cascading effect
                    setTimeout(() => {
                        requestAnimationFrame(animate);
                    }, index * 250);
                });
            },
        });

        // Header animation
        gsap.fromTo(
            '.stats-header',
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

        // Stats items stagger animation
        gsap.fromTo(
            '.stat-item',
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
    }, [hasAnimated]);

    return (
        <section
            ref={sectionRef}
            id="stats"
            className="section relative z-10 bg-[var(--color-bg)] pb-20 lg:pb-32"
            aria-label="Statistics"
        >
            <div className="container">
                {/* Header */}
                <div className="stats-header text-center mb-16 lg:mb-24">
                    <span className="text-[var(--font-size-sm)] uppercase tracking-widest text-[var(--color-primary)] mb-4 block">
                        Results That Matter
                    </span>
                    <h2 className="text-[var(--font-size-3xl)] lg:text-[var(--font-size-4xl)] font-bold">
                        Track Record
                    </h2>
                </div>

                {/* Stats Grid - No card backgrounds */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-item text-center"
                        >
                            <span className="block text-[clamp(3rem,8vw,6rem)] font-bold tabular-nums leading-none">
                                <span className="text-[var(--color-primary)]">{counters[index]}</span>
                                <span className="text-[var(--color-text)]">{stat.suffix}</span>
                            </span>
                            <span className="mt-4 block text-[var(--font-size-base)] text-[var(--color-text-secondary)]">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
