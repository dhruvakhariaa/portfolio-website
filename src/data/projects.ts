import type { Project } from '@/components/ProjectCard';

export const projects: Project[] = [
    {
        id: 'e-commerce-platform',
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
        image: '/projects/project-1.jpg',
        tags: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
        github: 'https://github.com/dhruvvakharia',
        liveUrl: 'https://example.com',
        year: '2024',
    },
    {
        id: 'ai-chatbot-assistant',
        title: 'AI Chatbot Assistant',
        description: 'An intelligent conversational AI powered by GPT-4, featuring context-aware responses, multi-language support, and seamless integrations.',
        image: '/projects/project-2.jpg',
        tags: ['Python', 'OpenAI', 'FastAPI', 'React', 'Docker'],
        github: 'https://github.com/dhruvvakharia',
        liveUrl: 'https://example.com',
        year: '2024',
    },
    {
        id: 'task-management-app',
        title: 'Task Management App',
        description: 'A collaborative project management tool with real-time updates, Kanban boards, team chat, and detailed analytics dashboards.',
        image: '/projects/project-3.jpg',
        tags: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
        github: 'https://github.com/dhruvvakharia',
        liveUrl: 'https://example.com',
        year: '2023',
    },
    {
        id: 'health-fitness-tracker',
        title: 'Health & Fitness Tracker',
        description: 'A comprehensive mobile app for tracking workouts, nutrition, sleep patterns, and health metrics with personalized recommendations.',
        image: '/projects/project-4.jpg',
        tags: ['React Native', 'Expo', 'Node.js', 'PostgreSQL'],
        github: 'https://github.com/dhruvvakharia',
        liveUrl: 'https://example.com',
        year: '2023',
    },
    {
        id: 'cloud-infrastructure-dashboard',
        title: 'Cloud Infrastructure Dashboard',
        description: 'A real-time monitoring dashboard for AWS infrastructure with cost optimization insights, alerts, and automated scaling recommendations.',
        image: '/projects/project-5.jpg',
        tags: ['AWS', 'Python', 'React', 'Terraform', 'Grafana'],
        github: 'https://github.com/dhruvvakharia',
        year: '2023',
    },
    {
        id: 'social-media-analytics',
        title: 'Social Media Analytics',
        description: 'An analytics platform for tracking social media performance across multiple platforms with sentiment analysis and competitor insights.',
        image: '/projects/project-6.jpg',
        tags: ['Python', 'Django', 'PostgreSQL', 'Chart.js', 'NLP'],
        github: 'https://github.com/dhruvvakharia',
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
