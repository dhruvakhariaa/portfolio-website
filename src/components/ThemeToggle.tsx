'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/**
 * Sun/moon theme switch. Reads/writes data-theme on <html> and persists to
 * localStorage. The pre-paint script in layout.tsx applies the saved theme,
 * so this only needs to sync its own button state on mount.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Sync button state to the theme the no-flash script already applied.
        // setState-in-effect is intentional here to avoid a hydration mismatch.
        const current = document.documentElement.getAttribute('data-theme');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(current === 'light' ? 'light' : 'dark');
        setMounted(true);
    }, []);

    const toggle = () => {
        const next: Theme = theme === 'light' ? 'dark' : 'light';
        if (next === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        try {
            localStorage.setItem('theme', next);
        } catch {
            /* ignore storage failures (private mode, etc.) */
        }
        setTheme(next);
    };

    const isLight = theme === 'light';

    return (
        <button
            type="button"
            onClick={toggle}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] ${className}`}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            /* Avoid a hydration flash of the wrong icon */
            suppressHydrationWarning
        >
            {mounted && isLight ? (
                // Moon — shown in light mode (click → go dark)
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            ) : (
                // Sun — shown in dark mode (click → go light)
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
            )}
        </button>
    );
}
