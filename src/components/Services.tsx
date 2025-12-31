'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';

interface Service {
    id: string;
    number: string;
    title: string;
    description: string;
    features: string[];
}

const services: Service[] = [
    {
        id: 'web-development',
        number: '01',
        title: 'Web Development',
        description: 'Building fast, scalable, and modern web applications using cutting-edge technologies. From simple landing pages to complex enterprise solutions.',
        features: ['React & Next.js', 'Node.js & Express', 'Database Design', 'API Development'],
    },
    {
        id: 'mobile-development',
        number: '02',
        title: 'Mobile Development',
        description: 'Creating cross-platform mobile applications that deliver native-like experiences on both iOS and Android devices.',
        features: ['React Native', 'Expo', 'Native Features', 'App Store Deployment'],
    },
    {
        id: 'ui-ux-design',
        number: '03',
        title: 'UI/UX Design',
        description: 'Designing intuitive and visually stunning user interfaces that prioritize user experience and drive engagement.',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    },
    {
        id: 'cloud-solutions',
        number: '04',
        title: 'Cloud Services',
        description: 'Architecting and deploying scalable cloud infrastructure using modern DevOps practices and cloud-native technologies.',
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

    useGSAP(() => {
        if (!sectionRef.current || !pinContainerRef.current) return;

        const totalServices = services.length;
        const scrollPerService = 350;
        const totalScrollDistance = totalServices * scrollPerService;

        let st: ScrollTrigger | null = null;

        // Delay trigger creation by 100ms to ensure About section's pinSpacing is calculated
        const timeoutId = setTimeout(() => {
            ScrollTrigger.refresh(true);

            // Create the main pinned scroll trigger
            st = ScrollTrigger.create({
                trigger: pinContainerRef.current,
                start: 'top top',
                end: `+=${totalScrollDistance}`,
                pin: true,
                pinSpacing: true,
                scrub: false,
                onUpdate: (self) => {
                    if (isTransitioningRef.current) return;

                    const progress = self.progress;
                    const clampedProgress = Math.max(0, Math.min(progress, 0.9999));
                    const rawIndex = clampedProgress * totalServices;
                    const newIndex = Math.floor(rawIndex);
                    const safeIndex = Math.max(0, Math.min(newIndex, totalServices - 1));

                    if (safeIndex !== lastIndexRef.current) {
                        isTransitioningRef.current = true;
                        const direction = safeIndex > lastIndexRef.current ? 'down' : 'up';

                        setSlideDirection(direction);
                        lastIndexRef.current = safeIndex;
                        setActiveService(safeIndex);
                        setAnimationKey(prev => prev + 1);

                        setTimeout(() => {
                            isTransitioningRef.current = false;
                        }, 450);
                    }
                },
            });

            // Entrance animation - only start when section is near the top
            gsap.fromTo(
                '.services-header-content',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 10%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            if (st) st.kill();
        };
    }, []);

    const handleMenuClick = useCallback((index: number) => {
        if (index === activeService || isTransitioningRef.current) return;

        isTransitioningRef.current = true;
        const direction = index > activeService ? 'down' : 'up';

        setSlideDirection(direction);
        lastIndexRef.current = index;
        setActiveService(index);
        setAnimationKey(prev => prev + 1);

        setTimeout(() => {
            isTransitioningRef.current = false;
        }, 450);

        // Scroll to corresponding position
        if (sectionRef.current) {
            const st = ScrollTrigger.getAll().find(
                (t) => t.vars.trigger === sectionRef.current
            );
            if (st) {
                const targetProgress = (index + 0.5) / services.length;
                const scrollTo = st.start + (st.end - st.start) * targetProgress;
                window.scrollTo({ top: scrollTo, behavior: 'smooth' });
            }
        }
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
                                <div className="flex items-center gap-3 mb-3 lg:mb-4">
                                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-[var(--color-primary)] font-medium">
                                        Services
                                    </span>
                                    <div className="w-6 sm:w-8 h-[1px] bg-[var(--color-border)]" />
                                    <span className="text-[10px] sm:text-xs text-[var(--color-text-muted)]">02</span>
                                </div>

                                {/* Heading - Much smaller and readable */}
                                <h2
                                    className="font-semibold leading-snug text-[var(--color-text)]"
                                    style={{ fontSize: 'clamp(1.125rem, 1rem + 0.5vw, 1.5rem)' }}
                                >
                                    Expertise that brings your vision to life
                                </h2>
                            </div>

                            {/* Service Menu */}
                            <nav
                                className="services-nav flex flex-row lg:flex-col gap-1.5 sm:gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0"
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
                                        className={`
                                            group flex items-center gap-2 sm:gap-3 
                                            px-3 py-2 sm:px-3.5 sm:py-2.5 lg:px-4 lg:py-3
                                            rounded-lg text-left whitespace-nowrap lg:whitespace-normal
                                            border transition-all duration-300
                                            ${activeService === index
                                                ? 'bg-[var(--color-bg-card)] border-[var(--color-primary)] shadow-[0_0_12px_rgba(255,73,37,0.1)]'
                                                : 'border-transparent hover:bg-[var(--color-bg-card)]/40 hover:border-[var(--color-border)]'
                                            }
                                        `}
                                    >
                                        <span
                                            className={`
                                                text-[10px] sm:text-xs font-bold font-mono transition-colors duration-300
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
                                                text-xs sm:text-sm lg:text-base font-medium transition-colors duration-300
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
                            <div className="service-card-container relative h-[280px] sm:h-[320px] lg:h-[380px] xl:h-[420px]">
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
                                    <div className="service-card-content h-full p-4 sm:p-5 lg:p-6 xl:p-8 flex flex-col">
                                        {/* Service Number with Square */}
                                        <div className="mb-3 sm:mb-4 lg:mb-5">
                                            <span
                                                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--color-primary)]"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                {currentService.number}
                                            </span>
                                            <span className="service-number-square" aria-hidden="true" />
                                        </div>

                                        {/* Service Title */}
                                        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2 sm:mb-3 text-[#CACACA]">
                                            {currentService.title}
                                        </h3>

                                        {/* Service Description */}
                                        <p className="text-xs sm:text-sm lg:text-base text-[#CACACA] leading-relaxed mb-4 sm:mb-5 lg:mb-6 flex-1">
                                            {currentService.description}
                                        </p>

                                        {/* Features Grid */}
                                        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 lg:gap-3">
                                            {currentService.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2 text-[10px] sm:text-xs lg:text-sm text-[#CACACA]"
                                                >
                                                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
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
