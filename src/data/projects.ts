import type { Project } from '@/components/ProjectCard';

export const projects: Project[] = [
    {
        id: 'zoomiees',
        title: 'Zoomiees',
        description: 'A full-stack cross-platform mobile social networking application built for pet owners.',
        details: {
            overview: 'A full-stack mobile social networking platform built for pet owners. Users can create profiles for their pets, share posts and stories, message each other in real time, discover nearby pet events, and journal their pet\'s daily activities.',
            problem: 'Existing pet communities are scattered across general social media platforms, lacking dedicated features like pet-specific profiles, local event discovery, vet journaling, and real-time location sharing. Zoomiees solves this by building a purpose-made social layer for the pet owner community.',
            features: [
                {
                    title: 'Cross-Platform Mobile App',
                    description: 'Built with React Native + Expo, delivering a native experience on both iOS and Android from a single codebase.',
                },
                {
                    title: 'Real-Time Chat & Live Location',
                    description: 'WebSocket-powered messaging and live location sharing so pet owners can coordinate meetups and events instantly.',
                },
                {
                    title: 'Media Uploads',
                    description: 'Photos and videos stored securely on AWS S3, with optimized delivery via CloudFront for fast load times globally.',
                },
                {
                    title: 'Auth & Security',
                    description: 'Google & Apple sign-in, OTP-based 2FA, and JWT-authenticated REST APIs with rate limiting and request validation.',
                },
                {
                    title: 'Cloud Infrastructure',
                    description: 'Provisioned entirely with Terraform on AWS — EC2, RDS (PostgreSQL), S3, Secrets Manager, and CloudWatch for monitoring.',
                },
            ],
            stack: [
                {
                    category: 'Frontend',
                    items: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'React Query'],
                },
                {
                    category: 'Backend',
                    items: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Socket.IO'],
                },
                {
                    category: 'Cloud & DevOps',
                    items: ['AWS EC2', 'AWS RDS', 'AWS S3', 'CloudWatch', 'Docker', 'Terraform'],
                },
            ],
        },
        image: '/projects/project1.png',
        tags: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'AWS'],
        github: 'https://github.com/dhruvakhariaa/zoomiees-mla',
        liveUrl: 'https://zoomiees.com',
        year: '2026',
    },
    {
        id: 'jan-sewa-portal',
        title: 'Jan Sewa Portal',
        description: 'A national-scale digital public infrastructure platform unifying government services in Healthcare, Agriculture, and Urban sectors.',
        details: {
            overview: 'Developed for the Ingenious Hackathon 7.0, the Jan Sewa Portal is a comprehensive, centralized digital platform designed to unify essential government services. By bringing Healthcare, Agriculture, and Urban services under one accessible roof, the platform eliminates the fragmentation of traditional public systems, providing citizens with a single, highly reliable point of access available in English, Hindi, and Gujarati.',
            problem: 'Existing government platforms often suffer from slow load times, frequent downtime, and fragmented user experiences requiring multiple logins. Jan Sewa Portal resolves this by leveraging an event-driven microservices architecture to ensure 99.9% uptime, unified single sign-on (SSO), and scalable, independent service routing.',
            features: [
                {
                    title: 'AI-Powered Health Checker',
                    description: 'An intelligent, integrated bot that analyzes user symptoms against a trained ML dataset to provide preliminary disease predictions, confidence scores, and specialist recommendations.',
                },
                {
                    title: 'Resilient Microservices Architecture',
                    description: 'Engineered with a database-per-service model, circuit breakers, and event-driven communication via RabbitMQ to ensure high availability and fault tolerance.',
                },
                {
                    title: 'Role-Based Access Control (RBAC)',
                    description: 'Secure, dedicated environments tailored for Citizens, Service Providers, Sector Managers, and Platform Admins — each with scoped permissions.',
                },
                {
                    title: 'Multi-Language Support',
                    description: 'Full i18n support across English, Hindi, and Gujarati, making the platform accessible to a broader citizen base.',
                },
                {
                    title: 'Containerized Infrastructure',
                    description: 'Fully orchestrated and scalable deployment environments managed via Docker and Docker Compose, with Nginx as reverse proxy.',
                },
            ],
            stack: [
                {
                    category: 'Frontend',
                    items: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                },
                {
                    category: 'Backend',
                    items: ['Node.js', 'Express.js', 'Mongoose', 'JWT Authentication'],
                },
                {
                    category: 'Database & Caching',
                    items: ['MongoDB', 'Redis'],
                },
                {
                    category: 'DevOps & Messaging',
                    items: ['Docker', 'RabbitMQ', 'Nginx', 'MinIO'],
                },
            ],
        },
        image: '/projects/project2.png',
        tags: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Docker'],
        github: 'https://github.com/dhruvakhariaa',
        liveUrl: 'https://example.com',
        year: '2024',
    },
    {
        id: 'clinker-transport-optimization-system',
        title: 'Clinker Transport Optimization System',
        description: 'An AI-powered logistics platform that optimizes clinker transportation routes, minimizes fuel consumption, and reduces delivery times.',
        longDescription: `Project Overview
The Clinker Transport Optimization system is a robust Multi-Period Mixed Integer Linear Programming (MILP) solution engineered to solve complex supply chain logistics for the cement industry. The platform determines the most cost-effective strategies for clinker production, multi-modal transportation routing, and inventory management across a network of Integrated Units (IUs) and Grinding Units (GUs) over configurable time horizons.

The Problem It Solves
Managing heavy industrial supply chains involves balancing production costs, freight expenses, fluctuating demand, and strict inventory constraints. Traditional planning methods often fail to find the true mathematical optimum. This project solves that by translating complex logistics rules (like integer trip constraints and safety stock requirements) into a rigorous mathematical model, ensuring minimal operational costs while consistently meeting product demand.

Key Features

Advanced MILP Optimization: Utilizes a state-of-the-art Gurobi solver engine to compute optimal production cycles, transportation flows (T1 and T2 modes), and inventory levels.

Multi-Period Planning: Features a cyclic re-optimization logic capable of handling time-linked inventory balances across varied production horizons.

Interactive Data Visualization: Includes a React-based dashboard that provides period-by-period result visualization, cost breakdown summaries, and transportation flow analysis.

Excel Integration: Seamlessly handles input data loading and validation, and extracts complex optimized solutions into user-friendly Excel formats for easy business management.

Technical Stack & Architecture

Frontend: React, JavaScript, CSS (for interactive dashboard and visualization)

Backend API: FastAPI (Python)

Optimization Engine: Python, Gurobi Solver (for large-scale MILP problem solving)

Data Handling: Excel-based data loaders and solution extractors`,
        image: '/projects/project3.png',
        tags: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/dhruvakhariaa',
        liveUrl: 'https://example.com',
        year: '2023',
    },
    {
        id: 'health-fitness-tracker',
        title: 'Health & Fitness Tracker',
        description: 'A comprehensive mobile app for tracking workouts, nutrition, sleep patterns, and health metrics with personalized recommendations.',
        longDescription: 'This cross-platform mobile app provides a holistic view of personal health by integrating workout logging, nutrition tracking with a food database, sleep quality analysis, and vital health metrics. A recommendation engine analyzes user patterns to suggest workout routines, meal plans, and lifestyle adjustments.',
        image: '/projects/project-4.jpg',
        tags: ['React Native', 'Expo', 'Node.js', 'PostgreSQL'],
        github: 'https://github.com/dhruvakhariaa',
        liveUrl: 'https://example.com',
        year: '2023',
    },
    {
        id: 'cloud-infrastructure-dashboard',
        title: 'Cloud Infrastructure Dashboard',
        description: 'A real-time monitoring dashboard for AWS infrastructure with cost optimization insights, alerts, and automated scaling recommendations.',
        longDescription: 'This dashboard aggregates data from multiple AWS services to provide a unified view of infrastructure health, performance, and costs. It features real-time metric visualization with Grafana, intelligent alerting that correlates events across services to reduce noise, and a cost optimization engine that identifies underutilized resources.',
        image: '/projects/project-5.jpg',
        tags: ['AWS', 'Python', 'React', 'Terraform', 'Grafana'],
        github: 'https://github.com/dhruvakhariaa',
        year: '2023',
    },
    {
        id: 'social-media-analytics',
        title: 'Social Media Analytics',
        description: 'An analytics platform for tracking social media performance across multiple platforms with sentiment analysis and competitor insights.',
        longDescription: 'This platform connects to major social media APIs to aggregate engagement metrics, audience demographics, and content performance across channels. Its NLP-powered sentiment analysis engine gauges audience reactions and identifies trending topics in real-time, while the competitor benchmarking module surfaces actionable insights.',
        image: '/projects/project-6.jpg',
        tags: ['Python', 'Django', 'PostgreSQL', 'Chart.js', 'NLP'],
        github: 'https://github.com/dhruvakhariaa',
        liveUrl: 'https://example.com',
        year: '2022',
    },
];

export function getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id);
}

export function getFeaturedProjects(count: number = 3): Project[] {
    return projects.slice(0, count);
}
