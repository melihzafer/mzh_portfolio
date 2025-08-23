// Content model for projects
export interface Project {
  slug: string;
  title: string;
  blurb: string;
  impact: string;
  tech: string[];
  tags: string[];
  cover: string;
  links?: {
    site?: string;
    repo?: string;
    demo?: string;
  };
  featured?: boolean;
  year: string;
}

export const projects: Project[] = [
  {
    slug: 'orderia-smart-order',
    title: 'Orderia – Smart Order Pad',
    blurb: 'Table tracking, QR menus, analytics dashboard for restaurants. Modern React Native/Expo stack with real-time synchronization.',
    impact: '↓ order errors 37% · ↑ table turns 18%',
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Stripe'],
    tags: ['Mobile', 'Product', 'Analytics'],
    cover: '/images/orderia-cover.jpg',
    links: { 
      site: 'https://orderia.app', 
      repo: 'https://github.com/username/orderia' 
    },
    featured: true,
    year: '2024'
  },
  {
    slug: 'fintech-dashboard',
    title: 'FinTech Analytics Dashboard',
    blurb: 'Real-time trading dashboard with advanced charting, portfolio management, and risk analytics.',
    impact: '↑ user retention 45% · ↓ page load 2.1s',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'TradingView', 'WebSocket'],
    tags: ['Web', 'Analytics', 'Real-time'],
    cover: '/images/fintech-cover.jpg',
    links: { 
      site: 'https://fintech-demo.com' 
    },
    featured: true,
    year: '2024'
  },
  {
    slug: 'ai-content-generator',
    title: 'AI Content Generation Platform',
    blurb: 'Multi-modal AI content creation tool with custom workflows, team collaboration, and brand consistency.',
    impact: '↑ content output 300% · ↓ production time 75%',
    tech: ['React', 'Node.js', 'OpenAI', 'Replicate', 'PostgreSQL'],
    tags: ['AI', 'Web', 'SaaS'],
    cover: '/images/ai-content-cover.jpg',
    links: { 
      demo: 'https://ai-content-demo.com' 
    },
    featured: true,
    year: '2024'
  },
  {
    slug: 'ecommerce-redesign',
    title: 'E-commerce Platform Redesign',
    blurb: 'Complete overhaul of checkout flow, product discovery, and mobile experience for 50k+ daily users.',
    impact: '↑ conversion 28% · ↓ cart abandonment 35%',
    tech: ['Next.js', 'Shopify', 'Tailwind', 'Framer Motion', 'Algolia'],
    tags: ['Web', 'E-commerce', 'Design'],
    cover: '/images/ecommerce-cover.jpg',
    featured: false,
    year: '2023'
  },
  {
    slug: 'crypto-portfolio-tracker',
    title: 'Crypto Portfolio Tracker',
    blurb: 'Multi-exchange portfolio aggregation with DeFi protocol integration and tax reporting.',
    impact: '10k+ active users · $50M+ assets tracked',
    tech: ['React Native', 'Node.js', 'Web3.js', 'Redis', 'MongoDB'],
    tags: ['Mobile', 'Crypto', 'DeFi'],
    cover: '/images/crypto-cover.jpg',
    links: { 
      site: 'https://cryptotracker.app' 
    },
    featured: false,
    year: '2023'
  },
  {
    slug: 'healthcare-management',
    title: 'Healthcare Management System',
    blurb: 'HIPAA-compliant patient management with appointment scheduling and telemedicine integration.',
    impact: '↑ patient satisfaction 40% · ↓ admin time 50%',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'WebRTC', 'Docker'],
    tags: ['Web', 'Healthcare', 'Security'],
    cover: '/images/healthcare-cover.jpg',
    featured: false,
    year: '2023'
  },
  {
    slug: 'design-system',
    title: 'Enterprise Design System',
    blurb: 'Scalable component library with documentation site, used across 15+ products and 50+ developers.',
    impact: '↓ design debt 60% · ↑ dev velocity 35%',
    tech: ['Storybook', 'React', 'TypeScript', 'Rollup', 'Chromatic'],
    tags: ['Design', 'OSS', 'Developer Tools'],
    cover: '/images/design-system-cover.jpg',
    links: { 
      repo: 'https://github.com/company/design-system',
      demo: 'https://design-system.company.com'
    },
    featured: false,
    year: '2023'
  },
  {
    slug: 'iot-dashboard',
    title: 'IoT Monitoring Dashboard',
    blurb: 'Real-time sensor data visualization for smart building management with predictive maintenance alerts.',
    impact: '↓ energy costs 25% · ↑ uptime 99.8%',
    tech: ['Vue.js', 'Python', 'InfluxDB', 'Grafana', 'MQTT'],
    tags: ['Web', 'IoT', 'Real-time'],
    cover: '/images/iot-cover.jpg',
    featured: false,
    year: '2022'
  },
  {
    slug: 'social-media-scheduler',
    title: 'Social Media Scheduler',
    blurb: 'Multi-platform content scheduling with AI-powered hashtag suggestions and performance analytics.',
    impact: '↑ engagement 85% · 5k+ creators using',
    tech: ['React', 'Express.js', 'MySQL', 'Redis', 'Twitter API'],
    tags: ['Web', 'Social', 'Analytics'],
    cover: '/images/social-cover.jpg',
    featured: false,
    year: '2022'
  }
];

// Filter functions for project grid
export const getProjectsByTag = (tag: string) => {
  return projects.filter(project => project.tags.includes(tag));
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getProjectBySlug = (slug: string) => {
  return projects.find(project => project.slug === slug);
};

export const getAllTags = () => {
  const tags = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};
