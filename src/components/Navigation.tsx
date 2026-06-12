'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // On home page: hide navbar until scrollY > 600. On other pages: always visible.
    const isHomePage = pathname === '/';
    const isNavVisible = !isHomePage || isScrolled;

    useEffect(() => {
        if (!isHomePage) {
            return;
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 600);
        };

        // Check initial scroll position
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    // Close menu on route change
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(false);
    }, [pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {/* Skip link for accessibility */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <header
                className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-600 ${isNavVisible
                    ? 'bg-[var(--color-bg)]/90 backdrop-blur-lg border-b border-[var(--color-border)] translate-y-0 opacity-100'
                    : 'bg-transparent -translate-y-full opacity-0 pointer-events-none'
                    }`}
            >
                <nav className="container grid grid-cols-3 items-center h-16 lg:h-20" role="navigation" aria-label="Main navigation">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl lg:text-2xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors z-50"
                        aria-label="Dhruv Vakharia - Home"
                        onClick={(e) => {
                            if (pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'instant' });
                            }
                        }}
                    >
                        DV<span className="text-[var(--color-primary)]">.</span>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center justify-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    if (pathname === link.href) {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'instant' });
                                    }
                                    setIsOpen(false);
                                }}
                                className={`relative text-[var(--font-size-sm)] font-medium transition-colors ${pathname === link.href
                                    ? 'text-[var(--color-text)]'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                                    }`}
                            >
                                {link.name}
                                {pathname === link.href && (
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--color-primary)]" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center justify-end gap-4">
                        {/* Availability Badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full">
                            <span className="relative flex h-2 w-2 !ml-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)] !mr-4 !my-2 ">
                                Available
                            </span>
                        </div>
                        <Link href="/contact" className="btn btn-primary h-12 w-[120px] px-4">
                            Let&apos;s Talk
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden z-50 w-10 h-10 flex items-center justify-center fixed top-3 right-5
                            `}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        <div className="w-6 flex flex-col gap-1.5">
                            <span
                                className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
                                    } ${isOpen ? 'text-primary' : 'text-white'}`}
                            />
                            <span
                                className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                                    } ${isOpen ? 'text-primary' : 'text-white'}`}
                            />
                            <span
                                className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
                                    } ${isOpen ? 'text-primary' : 'text-white'}`}
                            />
                        </div>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[var(--color-primary)] z-40 lg:hidden transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                if (pathname === link.href) {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                                setIsOpen(false);
                            }}
                            className={`text-4xl font-bold text-black hover:translate-x-2 ${isOpen
                                ? 'translate-y-0 opacity-100 transition-all duration-300'
                                : 'translate-y-8 opacity-0'
                                }`}
                            style={isOpen ? { transitionDelay: `${index * 100 + 200}ms` } : undefined}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
