import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="container text-center">
                <span className="text-[12rem] lg:text-[16rem] font-bold text-[var(--color-border)] leading-none block">
                    404
                </span>
                <h1 className="text-[var(--font-size-3xl)] lg:text-[var(--font-size-4xl)] font-bold mb-4 -mt-8">
                    Page Not Found
                </h1>
                <p className="text-[var(--font-size-lg)] text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="btn btn-primary">
                        Go Home
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                        Contact Me
                    </Link>
                </div>
            </div>
        </div>
    );
}
