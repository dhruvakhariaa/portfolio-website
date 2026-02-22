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
        image: '/projects/project1.webp',
        tags: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'AWS'],
        github: 'https://github.com/dhruvakhariaa/zoomiees-mla',
        liveUrl: 'https://zoomiees.com',
        year: 'February 2026',
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
        image: '/projects/project2.webp',
        tags: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'Docker'],
        github: 'https://github.com/dhruvakhariaa/missing-semicolon',
        liveUrl: 'https://example.com',
        year: 'January 2026',
    },
    {
        id: 'clinker-transport-optimization-system',
        title: 'Clinker Transport Optimization System',
        description: 'An AI-powered logistics platform that optimizes clinker transportation routes, minimizes fuel consumption, and reduces delivery times.',
        details: {
            overview: 'A robust Multi-Period Mixed Integer Linear Programming (MILP) solution engineered to solve complex supply chain logistics for the cement industry. The platform determines the most cost-effective strategies for clinker production, multi-modal transportation routing, and inventory management across a network of Integrated Units (IUs) and Grinding Units (GUs) over configurable time horizons.',
            problem: 'Managing heavy industrial supply chains involves balancing production costs, freight expenses, fluctuating demand, and strict inventory constraints. Traditional planning methods often fail to find the true mathematical optimum. This project solves that by translating complex logistics rules — like integer trip constraints and safety stock requirements — into a rigorous mathematical model, ensuring minimal operational costs while consistently meeting product demand.',
            features: [
                {
                    title: 'Advanced MILP Optimization',
                    description: 'Utilizes a state-of-the-art Gurobi solver engine to compute optimal production cycles, transportation flows (T1 and T2 modes), and inventory levels.',
                },
                {
                    title: 'Multi-Period Planning',
                    description: 'Features a cyclic re-optimization logic capable of handling time-linked inventory balances across varied production horizons.',
                },
                {
                    title: 'Interactive Data Visualization',
                    description: 'Includes a React-based dashboard providing period-by-period result visualization, cost breakdown summaries, and transportation flow analysis.',
                },
                {
                    title: 'Excel Integration',
                    description: 'Seamlessly handles input data loading and validation, and extracts complex optimized solutions into user-friendly Excel formats for easy business management.',
                },
            ],
            stack: [
                {
                    category: 'Frontend',
                    items: ['React', 'JavaScript', 'CSS'],
                },
                {
                    category: 'Backend',
                    items: ['FastAPI', 'Python'],
                },
                {
                    category: 'Optimization',
                    items: ['Gurobi Solver', 'MILP'],
                },
                {
                    category: 'Data',
                    items: ['Excel Loaders', 'Solution Extractors'],
                },
            ],
        },
        image: '/projects/project3.webp',
        tags: ['Python', 'FastAPI', 'React', 'Gurobi', 'MILP'],
        github: 'https://github.com/dhruvakhariaa/clinker_transport_optimisation',
        liveUrl: 'https://example.com',
        year: 'December 2025',
    },
    {
        id: 'emotion-analyser',
        title: 'Emotion Analyser',
        description: 'A comprehensive mobile app for tracking workouts, nutrition, sleep patterns, and health metrics with personalized recommendations.',
        details: {
            overview: 'An AI-powered emotion analysis platform that leverages IBM Watson\'s NLP Emotion Prediction API to dissect text into five core emotional dimensions — anger, disgust, fear, joy, and sadness. Delivers instant, precision-scored breakdowns with dominant emotion identification through an intuitive Flask-based web interface, turning raw text into measurable emotional intelligence.',
            problem: 'Understanding the emotional undertone of text at scale is a challenge that spans industries — from customer support teams drowning in unstructured feedback, to content creators gauging audience reactions, to researchers studying sentiment in large text corpora. Manual emotion tagging is slow, subjective, and inconsistent. This platform eliminates that bottleneck by providing instant, API-driven analysis that scores text across five emotional axes and surfaces the dominant emotion — enabling data-backed decisions on tone, messaging, and audience engagement in real-time.',
            features: [
                {
                    title: 'Multi-Dimensional Emotion Scoring',
                    description: 'Analyzes input text and returns precision-scored values across all five emotional dimensions — not just a single label, but a full emotional fingerprint of the content.',
                },
                {
                    title: 'Dominant Emotion Identification',
                    description: 'Automatically surfaces the strongest emotional signal from the analysis, making it instantly clear what feeling drives the text — no manual interpretation needed.',
                },
                {
                    title: 'Real-Time Web Analysis',
                    description: 'A clean, responsive web interface where users can input any text and get instant emotional breakdowns — no API keys, no setup, just results on demand.',
                },
                {
                    title: 'Graceful Error Handling',
                    description: 'Robust input validation ensures blank or malformed inputs are caught and handled elegantly, returning clear user-facing messages instead of cryptic errors.',
                },
            ],
            stack: [
                {
                    category: 'Frontend',
                    items: ['HTML5', 'JavaScript', 'CSS'],
                },
                {
                    category: 'Backend',
                    items: ['Python', 'Flask', 'Requests'],
                },
                {
                    category: 'NLP & Testing',
                    items: ['IBM Watson NLP', 'Unittest', 'PyLint'],
                },
            ],
        },
        image: '/projects/project4.webp',
        tags: ['React Native', 'Expo', 'Node.js', 'PostgreSQL'],
        github: 'https://github.com/dhruvakhariaa/emotion-detector',
        liveUrl: 'https://example.com',
        year: 'January 2026',
    },
    {
        id: 'cloud-infrastructure-dashboard',
        title: 'Cloud Infrastructure Dashboard',
        description: 'A real-time monitoring dashboard for AWS infrastructure with cost optimization insights, alerts, and automated scaling recommendations.',
        details: {
            overview: 'A unified monitoring dashboard that aggregates data from multiple AWS services to provide real-time visibility into infrastructure health, performance metrics, and cloud spending. Features intelligent alerting and a cost optimization engine for resource right-sizing.',
            problem: 'Cloud infrastructure sprawl makes it difficult to track resource utilization, predict costs, and react to incidents quickly. Native AWS dashboards are fragmented across services. This dashboard centralizes everything into a single pane of glass with actionable cost-saving recommendations.',
            features: [
                {
                    title: 'Real-Time Metric Visualization',
                    description: 'Grafana-powered dashboards displaying CPU, memory, network, and custom application metrics with configurable refresh intervals.',
                },
                {
                    title: 'Intelligent Alerting',
                    description: 'Correlates events across services to reduce alert noise, with escalation policies and PagerDuty/Slack integrations.',
                },
                {
                    title: 'Cost Optimization Engine',
                    description: 'Identifies underutilized EC2 instances, idle RDS databases, and orphaned EBS volumes with right-sizing and reservation recommendations.',
                },
                {
                    title: 'Infrastructure as Code',
                    description: 'All infrastructure managed via Terraform, enabling one-click provisioning, environment replication, and drift detection.',
                },
            ],
            stack: [
                {
                    category: 'Frontend',
                    items: ['React', 'TypeScript', 'Grafana'],
                },
                {
                    category: 'Backend',
                    items: ['Python', 'Flask', 'Celery'],
                },
                {
                    category: 'Cloud & DevOps',
                    items: ['AWS', 'Terraform', 'CloudWatch', 'Docker'],
                },
            ],
        },
        image: '/projects/project-5.jpg',
        tags: ['AWS', 'Python', 'React', 'Terraform', 'Grafana'],
        github: 'https://github.com/dhruvakhariaa',
        year: '2023',
    },
    {
        id: 'social-media-analytics',
        title: 'Social Media Analytics',
        description: 'An analytics platform for tracking social media performance across multiple platforms with sentiment analysis and competitor insights.',
        details: {
            overview: 'A multi-platform analytics tool that connects to social media APIs to aggregate engagement metrics, audience demographics, and content performance. Features NLP-powered sentiment analysis and automated reporting with data-driven content strategy recommendations.',
            problem: 'Brands managing multiple social media accounts struggle to get a unified view of their performance. Manual reporting is time-consuming and misses real-time trend shifts. This platform automates cross-platform analytics with sentiment analysis, so teams can react to audience shifts and competitor moves in real-time.',
            features: [
                {
                    title: 'Cross-Platform Aggregation',
                    description: 'Unified dashboard pulling metrics from Instagram, Twitter/X, LinkedIn, and Facebook with normalized engagement scoring.',
                },
                {
                    title: 'Sentiment Analysis',
                    description: 'NLP-powered engine that gauges audience reactions on posts, comments, and mentions — identifying positive, negative, and neutral trends.',
                },
                {
                    title: 'Competitor Benchmarking',
                    description: 'Tracks rival brand performance, content strategies, and audience growth to surface actionable competitive insights.',
                },
                {
                    title: 'Automated Reporting',
                    description: 'Generates weekly and monthly summary reports with data-driven recommendations for content strategy, posting times, and audience targeting.',
                },
            ],
            stack: [
                {
                    category: 'Frontend',
                    items: ['React', 'Chart.js', 'TypeScript'],
                },
                {
                    category: 'Backend',
                    items: ['Python', 'Django', 'Celery'],
                },
                {
                    category: 'Database & NLP',
                    items: ['PostgreSQL', 'spaCy', 'NLTK'],
                },
            ],
        },
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
