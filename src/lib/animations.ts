import gsap from 'gsap';

// Easing presets
export const easings = {
    smooth: 'power2.out',
    smoothIn: 'power2.in',
    smoothInOut: 'power2.inOut',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
    expo: 'expo.out',
};

// Duration presets
export const durations = {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    verySlow: 1.2,
};

// Animation presets
export const animations = {
    fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: durations.normal, ease: easings.smooth },
    },
    fadeInUp: {
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: durations.normal, ease: easings.smooth },
    },
    fadeInDown: {
        from: { opacity: 0, y: -30 },
        to: { opacity: 1, y: 0, duration: durations.normal, ease: easings.smooth },
    },
    fadeInLeft: {
        from: { opacity: 0, x: -30 },
        to: { opacity: 1, x: 0, duration: durations.normal, ease: easings.smooth },
    },
    fadeInRight: {
        from: { opacity: 0, x: 30 },
        to: { opacity: 1, x: 0, duration: durations.normal, ease: easings.smooth },
    },
    scaleIn: {
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1, duration: durations.normal, ease: easings.bounce },
    },
    slideUp: {
        from: { y: '100%' },
        to: { y: 0, duration: durations.slow, ease: easings.expo },
    },
};

// ScrollTrigger defaults
export const scrollTriggerDefaults = {
    fadeIn: {
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse' as const,
    },
    parallax: {
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
    },
    pin: {
        start: 'top top',
        pin: true,
        pinSpacing: true,
    },
};

// Utility function for creating staggered animations
export function createStagger(amount: number = 0.1, from: 'start' | 'center' | 'end' | 'random' = 'start') {
    return {
        amount,
        from,
    };
}

// Utility for creating timeline
export function createTimeline(defaults?: gsap.TweenVars) {
    return gsap.timeline({
        defaults: {
            ease: easings.smooth,
            duration: durations.normal,
            ...defaults,
        },
    });
}

// Word-by-word animation helper
export function splitTextIntoWords(text: string): string[] {
    return text.split(/\s+/).filter(word => word.length > 0);
}

// Calculate scroll progress for word highlighting
export function getWordHighlightProgress(
    scrollProgress: number,
    wordIndex: number,
    totalWords: number,
    overlap: number = 0.3
): number {
    const wordProgress = wordIndex / totalWords;
    const adjustedProgress = (scrollProgress - wordProgress * (1 - overlap)) / overlap;
    return Math.max(0, Math.min(1, adjustedProgress));
}
