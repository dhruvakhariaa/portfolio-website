'use client';

import { useRef, useState, useCallback } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';

interface Service {
    id: string;
    number: string;
    title: string;
    description1: string;
    description2: string;
    features: string[];
}

const services: Service[] = [
    {
        id: 'web-development',
        number: '01',
        title: 'Web Development',
        description1: 'From simple landing pages to complex enterprise solutions with experience in modern frameworks.',
        description2: 'Building fast, scalable, and modern web applications using cutting-edge technologies.',
        features: ['React & Next.js', 'Node.js & Express', 'Database Design', 'API Development'],
    },
    {
        id: 'mobile-development',
        number: '02',
        title: 'Mobile Development',
        description1: 'Creating cross-platform mobile applications that deliver native-like experiences.',
        description2: 'Seamless performance on both iOS and Android with modern tooling and best practices.',
        features: ['React Native', 'Expo', 'Native Features', 'App Store Deployment'],
    },
    {
        id: 'ui-ux-design',
        number: '03',
        title: 'UI/UX Design',
        description1: 'Designing intuitive and visually stunning user interfaces that prioritize experience.',
        description2: 'Research-driven design systems that drive engagement and delight users.',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    },
    {
        id: 'cloud-solutions',
        number: '04',
        title: 'Cloud Services',
        description1: 'Architecting and deploying scalable cloud infrastructure using modern DevOps practices.',
        description2: 'Cloud-native technologies with automated pipelines and infrastructure as code.',
        features: ['AWS & GCP', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code'],
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const [activeService, setActiveService] = useState(0);
    const [animationKey, setAnimationKey] = useState(0);
    const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('down');
    const lastIndexRef = useRef(0);
    const isTransitioningRef = useRef(false);
    const isPinnedRef = useRef(false);
    const entranceCompleteRef = useRef(false);
    const observerRef = useRef<ReturnType<typeof ScrollTrigger.observe> | null>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    // Helper: transition to next/prev card (one step at a time)
    const goToCard = useCallback((direction: 'down' | 'up') => {
        // Only respond when the section is actually pinned
        if (!isPinnedRef.current || isTransitioningRef.current) return;

        const currentIndex = lastIndexRef.current;
        const nextIndex = direction === 'down' ? currentIndex + 1 : currentIndex - 1;

        // At boundaries — programmatically scroll past the pin to force unpin
        // DO NOT disable Observer here (that causes re-enable timing gap)
        if (nextIndex < 0 || nextIndex >= services.length) {
            const st = scrollTriggerRef.current;
            if (st) {
                isPinnedRef.current = false; // Prevent further callbacks during unpin
                const targetScroll = direction === 'down'
                    ? st.end + 1    // Just past the end to trigger unpin
                    : st.start - 1; // Just before start to trigger unpin
                window.scrollTo({ top: targetScroll });
            }
            return;
        }

        isTransitioningRef.current = true;
        setSlideDirection(direction);
        lastIndexRef.current = nextIndex;
        setActiveService(nextIndex);
        setAnimationKey(prev => prev + 1);

        // Sync ScrollTrigger's scroll position to match the current card
        if (scrollTriggerRef.current) {
            const st = scrollTriggerRef.current;
            const targetProgress = (nextIndex + 0.5) / services.length;
            const targetScroll = st.start + (st.end - st.start) * targetProgress;
            window.scrollTo({ top: targetScroll });
        }

        setTimeout(() => {
            isTransitioningRef.current = false;
        }, 450);
    }, []);

    useGSAP(() => {
        if (!sectionRef.current || !pinContainerRef.current) return;

        const totalServices = services.length;
        const scrollPerService = 350;
        const totalScrollDistance = totalServices * scrollPerService;

        // Delay trigger creation to ensure previous section's pinSpacing is calculated
        const timeoutId = setTimeout(() => {
            ScrollTrigger.refresh(true);

            // ScrollTrigger is ONLY for pinning — no onUpdate card switching
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: pinContainerRef.current,
                start: 'top top',
                end: `+=${totalScrollDistance}`,
                pin: true,
                pinSpacing: true,
                scrub: false,
                onToggle: (self) => {
                    isPinnedRef.current = self.isActive;
                    // Only enable Observer if entrance animation is complete
                    if (self.isActive && entranceCompleteRef.current) {
                        if (observerRef.current) observerRef.current.enable();
                    } else {
                        if (observerRef.current) observerRef.current.disable();
                    }
                },
            });

            // Observer: intercepts wheel/touch to step cards one-by-one
            // Target is WINDOW to guarantee event capture regardless of
            // position:fixed stacking or DOM structure during pinning
            observerRef.current = ScrollTrigger.observe({
                target: window,
                type: 'wheel,touch',
                tolerance: 10,
                preventDefault: true,
                onDown: () => goToCard('down'),
                onUp: () => goToCard('up'),
            });

            // Start disabled — onToggle will enable it when the section pins
            observerRef.current.disable();

            // --- Heading is always visible (no animation) ---
            // Nav + card animate in when section enters viewport

            gsap.set('.services-nav', { opacity: 0, x: -30 });
            gsap.set('.service-card-container', { opacity: 0, x: 30 });

            const entranceTrigger = {
                trigger: sectionRef.current,
                start: 'top 10%',
                toggleActions: 'play none none reverse' as const,
            };

            // Nav slides in from left
            gsap.to('.services-nav', {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: entranceTrigger,
            });

            // Card panel slides in from right
            gsap.to('.service-card-container', {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: entranceTrigger,
                onComplete: () => {
                    // Cards fully visible — enable Observer after 200ms grace period
                    setTimeout(() => {
                        entranceCompleteRef.current = true;
                        if (isPinnedRef.current && observerRef.current) {
                            observerRef.current.enable();
                        }
                    }, 200);
                },
            });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
            if (observerRef.current) observerRef.current.kill();
        };
    }, [goToCard]);

    const handleMenuClick = useCallback((index: number) => {
        if (index === activeService || isTransitioningRef.current) return;

        isTransitioningRef.current = true;
        const direction = index > activeService ? 'down' : 'up';

        setSlideDirection(direction);
        lastIndexRef.current = index;
        setActiveService(index);
        setAnimationKey(prev => prev + 1);

        // Scroll to corresponding position within the pin
        if (scrollTriggerRef.current) {
            const st = scrollTriggerRef.current;
            const targetProgress = (index + 0.5) / services.length;
            const scrollTo = st.start + (st.end - st.start) * targetProgress;
            window.scrollTo({ top: scrollTo, behavior: 'smooth' });
        }

        setTimeout(() => {
            isTransitioningRef.current = false;
        }, 450);
    }, [activeService]);

    const currentService = services[activeService];

    return (
        <section
            ref={sectionRef}
            id="services"
            className="services-section-wrapper relative"
            aria-label="Services section"
        >
            {/* Pinned container */}
            <div
                ref={pinContainerRef}
                className="services-pin-container w-full min-h-screen bg-[var(--color-bg)] flex items-center"
            >
                <div className="container w-full">
                    <div className="services-layout grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-16 items-start lg:items-center">

                        {/* Left Panel - Header and Menu */}
                        <div className="lg:col-span-5 xl:col-span-4">
                            <div className="services-header-content mb-6 lg:mb-8">
                                {/* Section Label */}
                                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[var(--color-primary)] font-medium">
                                        Services
                                    </span>
                                    <div className="w-6 sm:w-8 h-[1px] bg-[var(--color-border)]" />
                                    <span className="text-[10px] sm:text-xs text-[var(--color-text-muted)]">02</span>
                                </div>

                                {/* Heading - Larger display heading */}
                                <h2
                                    className="font-bold leading-tight text-[var(--color-text)]"
                                    style={{ fontSize: 'clamp(1.75rem, 1.4rem + 1.8vw, 3rem)', marginBottom: '32px' }}
                                >
                                    Expertise that brings your vision to life
                                </h2>
                            </div>

                            {/* Service Menu */}
                            <nav
                                className="services-nav flex flex-row lg:flex-col gap-2 sm:gap-3 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0"
                                role="tablist"
                                aria-label="Services navigation"
                            >
                                {services.map((service, index) => (
                                    <button
                                        key={service.id}
                                        role="tab"
                                        aria-selected={activeService === index}
                                        aria-controls={`service-content-${service.id}`}
                                        onClick={() => handleMenuClick(index)}
                                        style={{ paddingLeft: '24px', paddingRight: '24px' }}
                                        className={`
                                            group flex items-center gap-4
                                            px-5 py-3 sm:px-5 sm:py-3.5 lg:px-6 lg:py-4
                                            rounded-lg text-left whitespace-nowrap lg:whitespace-normal
                                            border transition-all duration-300 font-mono
                                            ${activeService === index
                                                ? 'bg-[var(--color-bg-card)] border-[var(--color-primary)] shadow-[0_0_12px_rgba(255,73,37,0.1)]'
                                                : 'border-transparent hover:bg-[var(--color-bg-card)]/40 hover:border-[var(--color-border)]'
                                            }
                                        `}
                                    >
                                        <span
                                            className={`
                                                text-xs sm:text-sm font-bold transition-colors duration-300
                                                ${activeService === index
                                                    ? 'text-[var(--color-primary)]'
                                                    : 'text-[var(--color-text-muted)]'
                                                }
                                            `}
                                        >
                                            {service.number}
                                        </span>
                                        <span
                                            className={`
                                                text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300
                                                ${activeService === index
                                                    ? 'text-[var(--color-text)]'
                                                    : 'text-[var(--color-text-secondary)]'
                                                }
                                            `}
                                        >
                                            {service.title}
                                        </span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Right Panel - Service Card */}
                        <div className="lg:col-span-7 xl:col-span-8">
                            <div className="service-card-container relative" style={{ height: 'clamp(380px, 30vw + 100px, 500px)' }}>
                                {/* Single Active Card with key for re-mount animation */}
                                <article
                                    key={`${currentService.id}-${animationKey}`}
                                    id={`service-content-${currentService.id}`}
                                    role="tabpanel"
                                    className={`
                                        service-card-box absolute inset-0
                                        ${slideDirection === 'down' ? 'animate-slide-in-up' : 'animate-slide-in-down'}
                                    `}
                                >
                                    <div className="service-card-content">
                                        {/* Top: Service Number + Title inline */}
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '48px' }}>
                                            <span
                                                style={{
                                                    fontFamily: 'Inter, sans-serif',
                                                    fontSize: 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)',
                                                    fontWeight: 700,
                                                    color: '#555555',
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {currentService.number}
                                            </span>
                                            <div className="service-number-square" aria-hidden="true" />
                                            <h3
                                                style={{
                                                    fontSize: 'clamp(1.5rem, 1rem + 2vw, 3rem)',
                                                    fontWeight: 700,
                                                    color: 'var(--color-text)',
                                                    lineHeight: 1.1,
                                                    margin: 0,
                                                }}
                                            >
                                                {currentService.title}
                                            </h3>
                                        </div>

                                        {/* Middle: Two description bullets */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                            <p style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '12px',
                                                fontSize: 'clamp(0.875rem, 0.75rem + 0.5vw, 1.125rem)',
                                                color: 'var(--color-text-secondary)',
                                                lineHeight: 1.7,
                                                margin: 0,
                                            }}>
                                                <span style={{ color: 'var(--color-primary)', marginTop: '4px', flexShrink: 0 }}>—</span>
                                                {currentService.description1}
                                            </p>
                                            <p style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '12px',
                                                fontSize: 'clamp(0.875rem, 0.75rem + 0.5vw, 1.125rem)',
                                                color: 'var(--color-text-secondary)',
                                                lineHeight: 1.7,
                                                margin: 0,
                                            }}>
                                                <span style={{ color: 'var(--color-primary)', marginTop: '4px', flexShrink: 0 }}>—</span>
                                                {currentService.description2}
                                            </p>
                                        </div>

                                        {/* Bottom: Features Grid - all orange dots, pinned to bottom */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '12px 24px',
                                            marginTop: 'auto',
                                        }}>
                                            {currentService.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px',
                                                        fontSize: 'clamp(0.8rem, 0.7rem + 0.3vw, 1rem)',
                                                        color: 'var(--color-text-secondary)',
                                                    }}
                                                >
                                                    <span style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        backgroundColor: 'var(--color-primary)',
                                                        flexShrink: 0,
                                                    }} />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
