'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';

const aboutText = `I'm a Full Stack Developer passionate about creating exceptional digital experiences. With expertise in modern web technologies, I transform complex ideas into elegant, user-friendly applications. `;

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        setWords(aboutText.split(/\s+/));
    }, []);

    useGSAP(() => {
        if (!sectionRef.current || !textContainerRef.current || words.length === 0) return;

        const wordSpans = textContainerRef.current.querySelectorAll('.word');

        // Pin the section - use fixed scroll distance for consistent timing
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%', // Pin for 150% of viewport height
            pin: '.about-content',
            pinSpacing: true,
        });

        // Animate words from gray to white - same duration as pin
        gsap.fromTo(
            wordSpans,
            {
                color: 'rgba(255, 255, 255, 0.2)', // Start gray (low opacity white)
            },
            {
                color: 'rgba(255, 255, 255, 1)', // Transition to full white
                stagger: 0.03,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=150%', // Same as pin duration
                    scrub: 1,
                },
            }
        );

        // Label animation
        gsap.fromTo(
            '.about-label',
            { opacity: 0, y: 20 },
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
    }, [words]);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative z-10"
            aria-label="About section"
        >
            {/* Sticky content container - higher z-index to stay above Services during transition */}
            <div className="about-content min-h-screen flex items-center py-16 lg:py-24 bg-[var(--color-bg)] relative z-10">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        {/* Left - Sticky Label */}
                        <div className="lg:col-span-3">
                            <div className="about-label">
                                <span className="text-[var(--font-size-sm)] uppercase tracking-widest text-[var(--color-primary)]">
                                    About Me
                                </span>
                                <div className="mt-4 w-12 h-[1px] bg-[var(--color-border)]" />
                            </div>
                        </div>

                        {/* Right - Text Content */}
                        <div className="lg:col-span-9">
                            <div
                                ref={textContainerRef}
                                className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium leading-[1.5] tracking-tight"
                                style={{ wordSpacing: '0.2em' }}
                            >
                                {words.map((word, index) => (
                                    <span
                                        key={index}
                                        className="word"
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.2)',
                                        }}
                                    >
                                        {word}{' '}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
