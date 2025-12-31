'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const loaderRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [hasLoaded, setHasLoaded] = useState(false);
    const previousPathname = useRef(pathname);

    useEffect(() => {
        if (!loaderRef.current || !textRef.current) return;

        // Only run animation if pathname actually changed OR it's the initial load
        if (hasLoaded && pathname === previousPathname.current) return;

        previousPathname.current = pathname;

        const loader = loaderRef.current;
        const text = textRef.current;

        // Show loader
        loader.style.pointerEvents = 'auto';
        gsap.set(loader, { yPercent: 0 });
        gsap.set(text, { opacity: 0, y: 30 });

        // Timeline for the loading animation
        const tl = gsap.timeline({
            defaults: { ease: 'power3.inOut' },
        });

        // Determine timing based on whether it's first load
        const isFirstLoad = !hasLoaded;
        const textDuration = isFirstLoad ? 0.6 : 0.4;
        const slideDelay = isFirstLoad ? 0.3 : 0.2;
        const slideDuration = isFirstLoad ? 0.8 : 0.6;
        const initialDelay = isFirstLoad ? 0.2 : 0;

        // Animation sequence
        tl.to(text, {
            opacity: 1,
            y: 0,
            duration: textDuration,
            delay: initialDelay,
        })
            .to(
                loader,
                {
                    yPercent: -100,
                    duration: slideDuration,
                    delay: slideDelay,
                },
                `+=${slideDelay}`
            )
            .call(() => {
                // Hide loader after animation
                if (loaderRef.current) {
                    loaderRef.current.style.pointerEvents = 'none';
                }
                setHasLoaded(true);
            });
    }, [pathname, hasLoaded]);

    return (
        <>
            {/* Page Loader */}
            <div
                ref={loaderRef}
                className="fixed inset-0 z-[9999] bg-[var(--color-primary)]"
                style={{ pointerEvents: 'auto' }}
            >
                <div
                    ref={textRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-8 w-full"
                >
                    <h1 className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-black leading-none tracking-tight whitespace-nowrap">
                        DHRUV.
                    </h1>
                </div>
            </div>

            {/* Page Content */}
            {children}
        </>
    );
}
