'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP, gsap } from '@/hooks/useGSAP';
import PhysicsPlayground from './PhysicsPlayground';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
            nameRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 2.2 }
        )
            .fromTo(
                subtitleRef.current,
                { opacity: 0, x: -300 },
                { opacity: 1, x: 0, duration: 1 },
                '-=0.5'
            )
            .fromTo(
                taglineRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1 },
                '-=0.5'
            );
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-between overflow-hidden"
            style={{ paddingTop: '40px' }}
            aria-label="Hero section"
        >
            {/* Full-bleed background photo — bottom layer (z-0) */}
            <div className="hero-bg-photo">
                <Image
                    src="/AI_Bg_020.png"
                    alt=""
                    fill
                    priority
                    quality={100}
                    sizes="100vw"
                    draggable={false}
                />
            </div>
            {/* Soft legibility wash over the photo */}
            <div className="hero-bg-overlay" aria-hidden="true" />

            {/* Interactive Physics Playground — z-0, behind text */}
            <PhysicsPlayground />

            {/* Main Content Grid — z-10, above physics */}
            <div
                className="flex-1 flex items-center lg:items-start py-8 lg:py-0 lg:!pl-12 lg:!pr-24 relative z-10"
                style={{ pointerEvents: 'none' }}
            >
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Left — Name / Title */}
                    <div className="lg:col-span-3 order-1 text-center lg:text-left lg:self-start">
                        <div
                            ref={nameRef}
                            className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[0.9] tracking-tighter"
                        >
                            <span className="block">DHRUV</span>
                            <span className="text-[var(--color-primary)]">VAKHARIA</span>
                        </div>
                        <div ref={subtitleRef} className="!opacity-0 lg:!opacity-100 text-[clamp(1.5rem,5vw,3rem)] font-semibold leading-[1.1] lg:!mt-[250px]">
                            <span className="text-white">The Full stack developer</span>
                            <span className="text-[var(--color-text-secondary)]"> that you want</span>
                        </div>
                    </div>

                    {/* Middle — Empty space (columns 4-9) */}
                    <div className="lg:col-span-6 hidden lg:block order-1 lg:order-2" />

                    {/* Right — Tagline & CTA */}
                    <div
                        ref={taglineRef}
                        className="lg:col-span-3 lg:col-start-10 order-2 lg:order-3 flex flex-col text-center lg:text-right"
                    >
                        {/* Tagline */}
                        <div className="text-[clamp(1.5rem,5vw,5rem)] font-semibold leading-[1.1] lg:!mt-[80px]">
                            <span className="text-[var(--color-primary)]">Create.</span><br />
                            <span className="text-[var(--color-text-primary)]"> Code.</span><br />
                            <span className="text-[var(--color-text-secondary)]"> Deploy.</span>
                        </div>

                        {/* CTA Buttons — pointer-events restored so buttons are clickable */}
                        <div
                            id="hero-cta-buttons"
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-center !mt-[220px]"
                            style={{ pointerEvents: 'auto' }}
                        >
                            <Link href="/contact" className="btn btn-primary btn-sweep">
                                <span className="btn-sweep__label">Let&apos;s Work Together</span>
                                <svg className="btn-sweep__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                            <Link href="/projects" className="btn btn-secondary">
                                View Projects
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
