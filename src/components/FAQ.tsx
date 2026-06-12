'use client';

import { useRef, useState } from 'react';
import { useGSAP, gsap } from '@/hooks/useGSAP';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const faqItems: FAQItem[] = [
    {
        id: 1,
        question: "What is your development process?",
        answer: "My development process follows an agile methodology with clear phases: Discovery, Planning, Design, Development, Testing, and Launch. I maintain regular communication and provide updates throughout each phase to ensure the project stays on track.",
    },
    {
        id: 2,
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on complexity and scope. A simple website can take 2-4 weeks, while a complex web application might take 2-4 months. I'll provide a detailed timeline estimate after our initial consultation.",
    },
    {
        id: 3,
        question: "What technologies do you specialize in?",
        answer: "I specialize in modern web technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS. I also have experience with mobile development using React Native and various database systems.",
    },
    {
        id: 4,
        question: "Do you provide ongoing support after launch?",
        answer: "Yes, I offer ongoing maintenance and support packages to ensure your application runs smoothly. This includes bug fixes, security updates, performance optimization, and feature enhancements as needed.",
    },
    {
        id: 5,
        question: "How do you handle project communication?",
        answer: "I believe in transparent and regular communication. We'll have scheduled check-ins, and I'm available via email, Slack, or video calls. You'll always know the status of your project and any challenges we're addressing.",
    },
];

interface FAQProps {
    showAll?: boolean;
}

export default function FAQ({ showAll = true }: FAQProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const items = showAll ? faqItems : faqItems.slice(0, 3);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useGSAP(() => {
        if (!sectionRef.current) return;

        gsap.fromTo(
            '.faq-header',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            }
        );

        gsap.fromTo(
            '.faq-item',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="faq"
            className="section"
            aria-label="Frequently asked questions"
        >
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Header — left side */}
                    <div className="lg:col-span-4 faq-header">
                        <div className="lg:sticky lg:top-32">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[var(--color-primary)]">
                                    FAQ
                                </span>
                                <div className="w-12 h-[1px] bg-[var(--line-15)]" />
                            </div>
                            <h2
                                className="font-black text-[var(--color-text)] leading-[0.95] mb-6"
                                style={{ fontSize: 'clamp(2.5rem, 2rem + 3vw, 5rem)' }}
                            >
                                Common<br />Questions
                            </h2>
                            <p className="text-base text-[var(--color-text-muted)] leading-relaxed max-w-sm">
                                Find answers to frequently asked questions about my services and process.
                            </p>
                        </div>
                    </div>

                    {/* Accordion — right side */}
                    <div className="lg:col-span-8">
                        <div role="region" aria-label="FAQ accordion">
                            {items.map((item, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <div
                                        key={item.id}
                                        className="faq-item"
                                        style={{
                                            borderBottom: '1px solid var(--line-8)',
                                        }}
                                    >
                                        <button
                                            onClick={() => toggleItem(index)}
                                            className="w-full flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-inset transition-colors"
                                            style={{ padding: '24px 0' }}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-${item.id}`}
                                        >
                                            <span
                                                className="font-medium text-[var(--color-text)] pr-8 transition-colors"
                                                style={{
                                                    fontSize: 'clamp(0.95rem, 0.9rem + 0.3vw, 1.125rem)',
                                                    color: isOpen ? 'var(--color-text)' : 'var(--color-text-secondary)',
                                                }}
                                            >
                                                {item.question}
                                            </span>
                                            <span
                                                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                                                style={{
                                                    background: isOpen ? 'var(--color-primary)' : 'transparent',
                                                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                                }}
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    style={{
                                                        color: isOpen ? '#000' : 'var(--color-primary)',
                                                    }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </span>
                                        </button>

                                        <div
                                            id={`faq-answer-${item.id}`}
                                            className="overflow-hidden transition-all duration-300"
                                            style={{
                                                maxHeight: isOpen ? '300px' : '0px',
                                                opacity: isOpen ? 1 : 0,
                                            }}
                                        >
                                            <div style={{ paddingBottom: '24px', paddingRight: '48px' }}>
                                                <p className="text-base text-[var(--color-text-muted)] leading-relaxed">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
