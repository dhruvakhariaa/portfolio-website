'use client';

import { useRef, useState } from 'react';
import { FAQ } from '@/components';
import { useGSAP, gsap } from '@/hooks/useGSAP';

const contactInfo = [
    {
        label: 'Email',
        value: 'hello@dhruvvakharia.com',
        href: 'mailto:hello@dhruvvakharia.com',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        label: 'Location',
        value: 'Mumbai, India',
        href: null,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        label: 'Availability',
        value: 'Open to new projects',
        href: null,
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/dhruvvakharia' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/dhruvvakharia' },
    { name: 'Twitter', url: 'https://twitter.com/dhruvvakharia' },
];

export default function ContactPage() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useGSAP(() => {
        if (!pageRef.current) return;

        gsap.fromTo(
            '.contact-content',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
            }
        );
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In production, you would send to a form service like Formspree
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formState),
        // });

        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
    };

    return (
        <div ref={pageRef} className="pt-24 lg:pt-32">
            {/* Page Header */}
            <section className="section pb-0">
                <div className="container">
                    <div className="contact-content max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[var(--font-size-sm)] uppercase tracking-widest text-[var(--color-primary)]">
                                Contact
                            </span>
                            <div className="w-12 h-[1px] bg-[var(--color-border)]" />
                        </div>
                        <h1 className="text-[var(--font-size-4xl)] lg:text-[var(--font-size-5xl)] font-bold mb-6">
                            Let&apos;s Create Something Amazing
                        </h1>
                        <p className="text-[var(--font-size-lg)] text-[var(--color-text-secondary)]">
                            Have a project in mind or just want to chat? I&apos;d love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Form */}
                        <div className="lg:col-span-7 contact-content">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            required
                                            className="form-input"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="form-input form-textarea resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>

                                {/* Success Message */}
                                {submitStatus === 'success' && (
                                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
                                        Thanks for reaching out! I&apos;ll get back to you soon.
                                    </div>
                                )}

                                {/* Error Message */}
                                {submitStatus === 'error' && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
                                        Something went wrong. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-5 contact-content">
                            <div className="lg:sticky lg:top-32 space-y-8">
                                {/* Contact Details */}
                                <div className="card p-8">
                                    <h2 className="text-[var(--font-size-xl)] font-bold mb-6">Contact Info</h2>
                                    <div className="space-y-6">
                                        {contactInfo.map((item, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-secondary)] flex items-center justify-center text-[var(--color-primary)]">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <span className="block text-[var(--font-size-sm)] text-[var(--color-text-muted)] mb-1">
                                                        {item.label}
                                                    </span>
                                                    {item.href ? (
                                                        <a
                                                            href={item.href}
                                                            className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                                                        >
                                                            {item.value}
                                                        </a>
                                                    ) : (
                                                        <span className="text-[var(--color-text)]">{item.value}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="card p-8">
                                    <h2 className="text-[var(--font-size-xl)] font-bold mb-6">Follow Me</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-full text-[var(--font-size-sm)] hover:bg-[var(--color-primary)] hover:text-black transition-colors"
                                            >
                                                {social.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ showAll={false} />
        </div>
    );
}
