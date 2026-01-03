'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP, gsap } from '@/hooks/useGSAP';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    //const badgeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Entrance animations
        tl.fromTo(
            nameRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2 }
        )
            .fromTo(
                subtitleRef.current,
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0, duration: 1 },
                '-=0.5'
            )
            .fromTo(
                imageRef.current,
                { opacity: 0, scale: 30 },
                { opacity: 1, scale: 1, duration: 1.5 },
                '-=0.5'
            )
            .fromTo(
                taglineRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1 },
                '-=0.5'
            );
        // .fromTo(
        //     badgeRef.current,
        //     { opacity: 0, y: 20 },
        //     { opacity: 1, y: 0, duration: 0.6 },
        //     '-=0.3'
        // );
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-between overflow-hidden"
            style={{ paddingTop: '40px' }}
            aria-label="Hero section"
        >
            {/* Background Image - Full Screen */}
            <div
                ref={imageRef}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/arun-clarke-aclChr6h0VI-unsplash.jpg"
                    alt="Dhruv Vakharia - Full Stack Developer"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Main Content Grid */}
            <div className="flex-1 flex items-center lg:items-start py-8 lg:py-0 lg:!pl-12 lg:!pr-24 relative z-10">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Left - Name/Title */}
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

                    {/* Middle - Empty space (columns 4-9) */}
                    <div className="lg:col-span-6 hidden lg:block order-1 lg:order-2" />

                    {/* Right - Tagline & CTA */}
                    <div
                        ref={taglineRef}
                        className="lg:col-span-3 lg:col-start-10 order-2 lg:order-3 flex flex-col text-center lg:text-right"
                    >
                        {/* Tagline - use lg:!mt-[Xpx] to position from top */}
                        <div className="text-[clamp(1.5rem,5vw,5rem)] font-semibold leading-[1.1] lg:!mt-[80px]">
                            <span className="text-[var(--color-primary)]">Create.</span><br />
                            <span className="text-[var(--color-text-primary)]"> Code.</span><br />
                            <span className="text-[var(--color-text-secondary)]"> Deploy.</span>
                        </div>
                        {/* Buttons - use mt-X to control gap from tagline */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start !mt-[220px]">
                            <Link href="/contact" className="btn btn-primary">
                                Let&apos;s Work Together
                            </Link>
                            <Link href="/projects" className="btn btn-outline">
                                View Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Tech Marquee */}
            {/* 
            <div
                ref={badgeRef}
                className="border-t border-[var(--color-border)] py-4"
            >
                <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="overflow-hidden max-w-[400px] sm:max-w-[600px]">
                        <div className="flex animate-marquee gap-8 whitespace-nowrap">
                            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'MongoDB', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'MongoDB'].map((tech, i) => (
                                <span
                                    key={i}
                                    className="text-[var(--font-size-sm)] text-[var(--color-text-muted)] uppercase tracking-wider"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            */}

            {/* Background gradient accents */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[var(--color-primary)]/10 to-transparent opacity-50 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-500/10 to-transparent opacity-30 blur-3xl pointer-events-none" />

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes scroll-down {
          0% {
            top: -8px;
          }
          100% {
            top: 24px;
          }
        }
        .animate-scroll-down {
          animation: scroll-down 1.5s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
}
