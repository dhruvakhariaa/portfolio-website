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
                (t) => t.vars.trigger === pinContainerRef.current
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
                                    style={{ fontSize: 'clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem)' }}
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
                                            group flex items-center gap-3 sm:gap-4
                                            px-3 py-2.5 sm:px-4 sm:py-3 lg:px-5 lg:py-3.5
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
                            <div className="service-card-container relative h-[320px] sm:h-[360px] lg:h-[400px] xl:h-[440px]">
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
                                    <div className="service-card-content h-full p-5 sm:p-6 lg:p-8 xl:p-10 flex flex-col">
                                        {/* Service Number + Title inline */}
                                        <div className="flex items-baseline gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8">
                                            <span
                                                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-primary)]"
                                                style={{ fontFamily: 'Inter, sans-serif' }}
                                            >
                                                {currentService.number}
                                            </span>
                                            <span className="service-number-square" aria-hidden="true" />
                                            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[var(--color-text)]">
                                                {currentService.title}
                                            </h3>
                                        </div>

                                        {/* Two description bullets */}
                                        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 lg:mb-10 flex-1">
                                            <p className="text-sm sm:text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-3">
                                                <span className="text-[var(--color-primary)] mt-1.5 shrink-0">—</span>
                                                {currentService.description1}
                                            </p>
                                            <p className="text-sm sm:text-base lg:text-lg text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-3">
                                                <span className="text-[var(--color-primary)] mt-1.5 shrink-0">—</span>
                                                {currentService.description2}
                                            </p>
                                        </div>

                                        {/* Features Grid - all orange dots */}
                                        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                                            {currentService.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2.5 text-xs sm:text-sm lg:text-base text-[var(--color-text-secondary)]"
                                                >
                                                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
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
