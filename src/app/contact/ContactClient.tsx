'use client';

import { useRef, useState } from 'react';
import { FAQ } from '@/components';
import { useGSAP, gsap } from '../../hooks/useGSAP';

const contactInfo = [
    {
        label: 'Email',
        value: 'vakhariadhruv526@gmail.com',
        href: 'mailto:vakhariadhruv526@gmail.com',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        label: 'Location',
        value: 'Ahmedabad, India',
        href: null,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        label: 'Availability',
        value: 'Open to new opportunities',
        href: null,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/dhruvakhariaa' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dhruv-vakharia' },
    { name: 'Instagram', url: 'https://www.instagram.com/grow.alongside.me/' },
];

/* Shared inline styles for form fields */
const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    fontSize: 'clamp(0.875rem, 0.85rem + 0.15vw, 1rem)',
    color: 'var(--color-text)',
    background: 'var(--surface-4)',
    border: '1px solid var(--line-10)',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
};

export default function ContactClient() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const body = [
            `Name: ${formState.name}`,
            `Email: ${formState.email}`,
            '',
            formState.message,
        ].join('\n');

        const mailtoUrl = `mailto:vakhariadhruv526@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;

        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitStatus('idle'), 5000);
    };

    return (
        <div ref={pageRef} className="pt-24 lg:pt-32">
            {/* Page Header */}
            <section style={{ paddingTop: 'clamp(32px, 4vw, 56px)', paddingBottom: 0 }}>
                <div className="container">
                    <div className="contact-content" style={{ maxWidth: '640px' }}>
                        <div className="flex items-center gap-4" style={{ marginBottom: '16px' }}>
                            <span
                                style={{
                                    fontSize: 'clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: 'var(--color-primary)',
                                }}
                            >
                                Contact
                            </span>
                            <div style={{ width: '48px', height: '1px', background: 'var(--color-border)' }} />
                        </div>
                        <h1
                            className="font-bold"
                            style={{
                                fontSize: 'clamp(1.75rem, 1.5rem + 1.5vw, 3rem)',
                                lineHeight: 1.15,
                                marginBottom: '12px',
                            }}
                        >
                            Let&apos;s Create Something Amazing
                        </h1>
                        <p
                            style={{
                                fontSize: 'clamp(0.9rem, 0.85rem + 0.2vw, 1.05rem)',
                                color: 'var(--color-text-secondary)',
                                lineHeight: 1.6,
                            }}
                        >
                            Have a project in mind or just want to chat? I&apos;d love to hear from you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section style={{ paddingTop: 'clamp(40px, 5vw, 64px)', paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'clamp(32px, 4vw, 64px)' }}>
                        {/* Form */}
                        <div className="lg:col-span-7 contact-content">
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '20px' }}>
                                    <div>
                                        <label
                                            htmlFor="name"
                                            style={{
                                                display: 'block',
                                                fontSize: 'clamp(0.8rem, 0.75rem + 0.15vw, 0.875rem)',
                                                fontWeight: 500,
                                                color: 'var(--color-text-secondary)',
                                                marginBottom: '6px',
                                            }}
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            required
                                            style={inputStyle}
                                            placeholder="Your name"
                                            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                                            onBlur={e => { e.currentTarget.style.borderColor = 'var(--line-10)'; }}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            style={{
                                                display: 'block',
                                                fontSize: 'clamp(0.8rem, 0.75rem + 0.15vw, 0.875rem)',
                                                fontWeight: 500,
                                                color: 'var(--color-text-secondary)',
                                                marginBottom: '6px',
                                            }}
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            required
                                            style={inputStyle}
                                            placeholder="your@email.com"
                                            onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                                            onBlur={e => { e.currentTarget.style.borderColor = 'var(--line-10)'; }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        style={{
                                            display: 'block',
                                            fontSize: 'clamp(0.8rem, 0.75rem + 0.15vw, 0.875rem)',
                                            fontWeight: 500,
                                            color: 'var(--color-text-secondary)',
                                            marginBottom: '6px',
                                        }}
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                        placeholder="What's this about?"
                                        onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        style={{
                                            display: 'block',
                                            fontSize: 'clamp(0.8rem, 0.75rem + 0.15vw, 0.875rem)',
                                            fontWeight: 500,
                                            color: 'var(--color-text-secondary)',
                                            marginBottom: '6px',
                                        }}
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        style={{ ...inputStyle, resize: 'none' }}
                                        placeholder="Tell me about your project..."
                                        onFocus={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary"
                                    style={{ alignSelf: 'flex-start' }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Opening email...
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

                                {submitStatus === 'success' && (
                                    <div style={{ padding: '12px 16px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '8px', color: '#4ade80', fontSize: '0.875rem' }}>
                                        Your email app should open with the message ready to send.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-5 contact-content">
                            <div className="lg:sticky lg:top-32" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Contact Details */}
                                <div
                                    style={{
                                        padding: 'clamp(20px, 3vw, 32px)',
                                        background: 'var(--surface-3)',
                                        border: '1px solid var(--line-6)',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <h2
                                        className="font-bold"
                                        style={{
                                            fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.2rem)',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        Contact Info
                                    </h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {contactInfo.map((item, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div
                                                    className="flex items-center justify-center shrink-0"
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        background: 'var(--surface-5)',
                                                        color: 'var(--color-primary)',
                                                    }}
                                                >
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <span
                                                        style={{
                                                            display: 'block',
                                                            fontSize: 'clamp(0.7rem, 0.65rem + 0.15vw, 0.8rem)',
                                                            color: 'var(--color-text-muted)',
                                                            marginBottom: '2px',
                                                        }}
                                                    >
                                                        {item.label}
                                                    </span>
                                                    {item.href ? (
                                                        <a
                                                            href={item.href}
                                                            className="hover:text-[var(--color-primary)] transition-colors"
                                                            style={{ fontSize: 'clamp(0.85rem, 0.8rem + 0.15vw, 0.95rem)', color: 'var(--color-text)' }}
                                                        >
                                                            {item.value}
                                                        </a>
                                                    ) : (
                                                        <span style={{ fontSize: 'clamp(0.85rem, 0.8rem + 0.15vw, 0.95rem)', color: 'var(--color-text)' }}>
                                                            {item.value}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div
                                    style={{
                                        padding: 'clamp(20px, 3vw, 32px)',
                                        background: 'var(--surface-3)',
                                        border: '1px solid var(--line-6)',
                                        borderRadius: '12px',
                                    }}
                                >
                                    <h2
                                        className="font-bold"
                                        style={{
                                            fontSize: 'clamp(1rem, 0.9rem + 0.3vw, 1.2rem)',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        Follow Me
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="transition-colors"
                                                style={{
                                                    padding: '8px 16px',
                                                    background: 'var(--surface-5)',
                                                    color: 'var(--color-text-secondary)',
                                                    borderRadius: '999px',
                                                    fontSize: 'clamp(0.8rem, 0.75rem + 0.15vw, 0.875rem)',
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = '#000'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-5)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
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
