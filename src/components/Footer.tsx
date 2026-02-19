'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP, gsap } from '@/hooks/useGSAP';

const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/dhruvvakharia', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/dhruvvakharia', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com/dhruvvakharia', icon: 'twitter' },
    { name: 'Email', url: 'mailto:hello@dhruvvakharia.com', icon: 'email' },
];

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!footerRef.current) return;

        gsap.fromTo(
            '.footer-cta',
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                },
            }
        );
    }, []);

    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case 'github':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                );
            case 'linkedin':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                );
            case 'twitter':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                );
            case 'email':
                return (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <footer ref={footerRef} role="contentinfo">

            {/* Wave SVG — transitions from dark bg into orange footer */}
            <div style={{ lineHeight: 0, overflow: 'hidden', background: 'var(--color-bg)', marginBottom: '-2px' }}>
                <svg
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    style={{ width: '100%', height: '120px', display: 'block' }}
                    fill="var(--color-primary)"
                >
                    <path d="M0,80 C180,120 360,20 540,60 C720,100 900,10 1080,50 C1200,75 1320,30 1440,70 L1440,120 L0,120 Z" />
                </svg>
            </div>

            {/* Entire footer — orange background */}
            <div
                className="footer-cta"
                style={{
                    background: 'var(--color-primary)',
                    position: 'relative',
                }}
            >
                {/* CTA content */}
                <div
                    className="container"
                    style={{
                        textAlign: 'center',
                        paddingTop: 'clamp(28px, 4vw, 28px)',
                        paddingBottom: 'clamp(16px, 2vw, 16px)',
                    }}
                >
                    <h2
                        className="font-black leading-[0.95]"
                        style={{
                            fontSize: 'clamp(2.5rem, 2rem + 5vw, 6rem)',
                            color: 'rgba(0,0,0,0.85)',
                            marginBottom: '16px',
                        }}
                    >
                        Let&apos;s Work Together
                    </h2>
                    <p
                        style={{
                            fontSize: 'clamp(0.9rem, 0.85rem + 0.3vw, 1.05rem)',
                            color: 'rgba(0,0,0,0.5)',
                            maxWidth: '440px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginBottom: '28px',
                            lineHeight: 1.6,
                        }}
                    >
                        Have a project in mind? Let&apos;s create something amazing.
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-3 font-semibold transition-all duration-300"
                        style={{
                            padding: '14px 32px',
                            background: 'rgba(0,0,0,0.9)',
                            color: '#fff',
                            borderRadius: '999px',
                            fontSize: '0.95rem',
                        }}
                    >
                        Start a Conversation
                        <svg
                            className="inline-block -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                            style={{ width: '16px', height: '16px' }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Bottom bar — socials + copyright, still on orange */}
                <div
                    className="container"
                    style={{
                        paddingTop: '24px',
                        paddingBottom: '24px',
                        borderTop: '1px solid rgba(0,0,0,0.1)',
                    }}
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p
                            style={{
                                fontSize: '0.8rem',
                                color: '#FFFFF0',
                            }}
                            suppressHydrationWarning
                        >
                            © {new Date().getFullYear()} Dhruv Vakharia. All rights reserved.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-all duration-200"
                                    style={{ color: '#FFFFF0' }}
                                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = '#FFFFF0'; }}
                                    aria-label={social.name}
                                >
                                    {renderIcon(social.icon)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
