'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Custom hook for GSAP animations with cleanup
export function useGSAP(
    callback: (gsap: typeof import('gsap').default, ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger) => void | (() => void),
    dependencies: React.DependencyList = []
) {
    const contextRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        // Create GSAP context for cleanup
        contextRef.current = gsap.context(() => {
            callback(gsap, ScrollTrigger);
        });

        return () => {
            // Cleanup all GSAP animations in this context
            contextRef.current?.revert();
        };
    }, dependencies);

    return contextRef;
}

// Hook for scroll-triggered animations
export function useScrollAnimation(
    selector: string,
    animationVars: gsap.TweenVars,
    scrollTriggerVars?: ScrollTrigger.Vars
) {
    useGSAP(() => {
        gsap.fromTo(
            selector,
            { opacity: 0, y: 30 },
            {
                ...animationVars,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                    ...scrollTriggerVars,
                },
            }
        );
    }, [selector]);
}

// Stagger animation hook
export function useStaggerAnimation(
    containerSelector: string,
    itemSelector: string,
    staggerAmount: number = 0.1
) {
    useGSAP(() => {
        gsap.fromTo(
            itemSelector,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: staggerAmount,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: containerSelector,
                    start: 'top 80%',
                },
            }
        );
    }, [containerSelector, itemSelector]);
}

export { gsap, ScrollTrigger };
