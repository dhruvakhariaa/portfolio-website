'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP, gsap } from '@/hooks/useGSAP';

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Entrance animations
        tl.fromTo(
            nameRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1 }
        )
            .fromTo(
                imageRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 1 },
                '-=0.5'
            )
            .fromTo(
                taglineRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.5'
            )
            .fromTo(
                badgeRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 },
                '-=0.3'
            );
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col justify-between overflow-hidden"
            aria-label="Hero section"
        >
            {/* Main Content Grid */}
            <div className="container flex-1 flex items-center py-8 lg:py-0">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

                    {/* Left - Name/Title */}
                    <div className="lg:col-span-3 order-2 lg:order-1 z-10 relative">
                        <h1
                            ref={nameRef}
                            className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tighter"
                            style={{ writingMode: 'horizontal-tb' }}
                        >
                            <span className="block">DHRUV</span>
                            <span className="block text-[var(--color-primary)]">VAKHARIA</span>
                        </h1>
                    </div>

                    {/* Center - Image/Video */}
                    <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center z-0">
                        <div
                            ref={imageRef}
                            className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-[3/4] rounded-2xl overflow-hidden"
                        >
                            <Image
                                src="/hero-image.jpg"
                                alt="Dhruv Vakharia - Full Stack Developer"
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>

                    {/* Right - Tagline & CTA */}
                    <div
                        ref={taglineRef}
                        className="lg:col-span-3 order-3 flex flex-col gap-6 text-center lg:text-left z-10 relative"
                    >
                        <p className="text-[var(--font-size-xl)] lg:text-[var(--font-size-2xl)] text-[var(--color-text-secondary)] leading-relaxed">
                            Crafting digital experiences that blend creativity with cutting-edge technology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
            <div
                ref={badgeRef}
                className="border-t border-[var(--color-border)] py-4"
            >
                <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Tech Stack Marquee */}
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
