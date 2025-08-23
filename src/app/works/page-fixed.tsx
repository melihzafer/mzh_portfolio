'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
import TiltCard from '@/components/atoms/TiltCard';
import { ExternalLink, Github, Award, Coffee, Briefcase, ArrowRight } from 'lucide-react';

// Curated portfolio pieces - these are handpicked showcase projects
const curatedWorks = [
  {
    id: 'ecommerce-redesign',
    title: 'E-commerce Platform Redesign',
    tagline: 'Complete UX overhaul increased conversions by 40%',
    role: ['Lead UI/UX Designer', 'Frontend Developer'],
    context: 'Enterprise Client Project',
    period: '2024',
    heroImage: '/works/ecommerce-hero.jpg',
    description: 'Led the complete redesign of a major e-commerce platform, focusing on conversion optimization, accessibility, and mobile-first design. Collaborated with a team of 8 developers and stakeholders.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma', 'A/B Testing'],
    category: 'Web Development',
    liveUrl: 'https://demo-ecommerce.example.com',
    caseStudyUrl: '/works/ecommerce-redesign',
    featured: true,
    results: [
      { metric: 'Conversion Rate', value: '+40%' },
      { metric: 'Page Load Speed', value: '+65%' },
      { metric: 'User Satisfaction', value: '94%' }
    ]
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    tagline: 'Real-time data visualization for 10k+ users',
    role: ['Full-Stack Developer', 'Data Visualization'],
    context: 'Startup Product Development',
    period: '2024',
    heroImage: '/works/saas-dashboard-hero.jpg',
    description: 'Built a comprehensive analytics dashboard for a SaaS platform, handling real-time data from multiple sources with interactive visualizations and custom reporting features.',
    tech: ['React', 'Node.js', 'D3.js', 'PostgreSQL', 'Redis', 'WebSocket'],
    category: 'Web Development',
    liveUrl: 'https://demo-saas.example.com',
    caseStudyUrl: '/works/saas-dashboard',
    featured: true,
    results: [
      { metric: 'Performance Boost', value: '+75%' },
      { metric: 'User Engagement', value: '+60%' },
      { metric: 'Data Processing', value: '10k+ records/sec' }
    ]
  },
  {
    id: 'mobile-fitness-app',
    title: 'Fitness Tracking Mobile App',
    tagline: 'AI-powered workout recommendations',
    role: ['Mobile Developer', 'UI/UX Designer'],
    context: 'Health Tech Startup',
    period: '2023',
    heroImage: '/works/fitness-app-hero.jpg',
    description: 'Developed a cross-platform mobile app with AI-powered workout recommendations, social features, and comprehensive progress tracking.',
    tech: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow Lite', 'Expo'],
    category: 'Mobile Development',
    liveUrl: 'https://apps.apple.com/app/fitness-tracker',
    caseStudyUrl: '/works/mobile-fitness-app',
    featured: false,
    results: [
      { metric: 'App Store Rating', value: '4.8/5' },
      { metric: 'Monthly Active Users', value: '25k+' },
      { metric: 'User Retention', value: '78%' }
    ]
  },
  {
    id: 'ai-content-platform',
    title: 'AI Content Generation Platform',
    tagline: 'GPT-powered content creation suite',
    role: ['Full-Stack Developer', 'AI Integration'],
    context: 'MarTech Company',
    period: '2023',
    heroImage: '/works/ai-content-hero.jpg',
    description: 'Built an AI-powered content generation platform integrating multiple LLM APIs with custom fine-tuning, user management, and subscription billing.',
    tech: ['Next.js', 'Python', 'OpenAI API', 'Stripe', 'MongoDB', 'Docker'],
    category: 'Web Development',
    liveUrl: 'https://ai-content-demo.example.com',
    caseStudyUrl: '/works/ai-content-platform',
    featured: false,
    results: [
      { metric: 'Content Generated', value: '1M+ pieces' },
      { metric: 'User Satisfaction', value: '96%' },
      { metric: 'Cost Reduction', value: '-45%' }
    ]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  },
};

// Matrix rain effect component
const MatrixRain = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-matrix-green font-mono text-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
          }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 12 }).map((_, j) => (
            <div key={j} className="block">
              {String.fromCharCode(Math.random() * 94 + 33)}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredWorks = selectedCategory === 'All' 
    ? curatedWorks 
    : curatedWorks.filter(work => work.category === selectedCategory);

  const featuredWorks = filteredWorks.filter(work => work.featured);
  const otherWorks = filteredWorks.filter(work => !work.featured);

  const categories = ['All', 'Web Development', 'Mobile Development', 'AI/ML'];

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16 relative">
      <MatrixRain />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 mb-20"
      >
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="w-2 h-2 bg-matrix-green rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-matrix-green font-mono text-sm tracking-wide">
              PORTFOLIO_SHOWCASE
            </span>
            <motion.div
              className="w-2 h-2 bg-matrix-green rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-text mb-6">
            <span className="text-accent-dark">Selected</span> Works
          </h1>
          
          <p className="text-xl text-text/70 mb-8 font-mono">
            <span className="text-matrix-green">$</span> Curated portfolio pieces showcasing{' '}
            <span className="text-accent">design</span>, <span className="text-accent">development</span>, and{' '}
            <span className="text-accent">impact</span>
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md font-mono text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-accent text-bg shadow-lg'
                    : 'bg-surface/50 text-text/70 hover:bg-surface hover:text-text'
                }`}
              >
                {category.toLowerCase().replace(' ', '_')}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Featured Works Section */}
      {featuredWorks.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-6 mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              <span className="text-matrix-green">&gt; </span>Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-dark to-matrix-green mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredWorks.map((work, index) => (
              <motion.div key={work.id} variants={itemVariants}>
                <TiltCard className="h-full">
                  <div className="bg-surface/80 backdrop-blur border border-border rounded-lg p-6 h-full flex flex-col group hover:border-accent-dark/50 transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-text mb-2 group-hover:text-accent-dark transition-colors">
                          {work.title}
                        </h3>
                        <p className="text-text/70 font-mono text-sm mb-3">
                          {work.tagline}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {work.role.map((r, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-accent/10 text-accent text-xs rounded font-mono"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-matrix-green font-mono text-sm">
                          {work.period}
                        </span>
                        <p className="text-text/50 text-xs mt-1">
                          {work.context}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-text/70 mb-6 line-clamp-3 flex-grow">
                      {work.description}
                    </p>

                    {/* Results */}
                    {work.results && (
                      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-bg/50 rounded-lg">
                        {work.results.map((result, i) => (
                          <div key={i} className="text-center">
                            <div className="text-accent font-bold text-lg">
                              {result.value}
                            </div>
                            <div className="text-text/50 text-xs font-mono">
                              {result.metric}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {work.tech.slice(0, 4).map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-bg text-text/70 text-xs rounded font-mono border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                        {work.tech.length > 4 && (
                          <span className="px-2 py-1 bg-bg text-text/50 text-xs rounded font-mono border border-border">
                            +{work.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      <Button
                        variant="matrix"
                        size="lg"
                        className="flex-1 flex items-center justify-center gap-2"
                        onClick={() => window.open(work.caseStudyUrl, '_self')}
                      >
                        <Briefcase className="w-5 h-5" />
                        case_study
                      </Button>
                      
                      <Button
                        variant="terminal"
                        size="lg"
                        className="flex items-center justify-center gap-2"
                        onClick={() => window.open(work.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-5 h-5" />
                        live_demo
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Other Works Section */}
      {otherWorks.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-6 mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-text mb-4">
              <span className="text-matrix-green">&gt; </span>Additional Projects
            </h2>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {otherWorks.map((work) => (
              <motion.div key={work.id} variants={itemVariants}>
                <TiltCard>
                  <div className="bg-surface/60 backdrop-blur border border-border rounded-lg p-6 h-full flex flex-col group hover:border-accent/50 transition-all duration-300">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-text mb-2 group-hover:text-accent transition-colors">
                        {work.title}
                      </h3>
                      <p className="text-text/70 text-sm mb-3 line-clamp-2">
                        {work.tagline}
                      </p>
                      <span className="text-matrix-green font-mono text-xs">
                        {work.period} • {work.context}
                      </span>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4 flex-grow">
                      <div className="flex flex-wrap gap-1">
                        {work.tech.slice(0, 4).map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-bg text-text/60 text-xs rounded font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {work.tech.length > 4 && (
                          <span className="px-2 py-1 bg-bg text-text/40 text-xs rounded font-mono">
                            +{work.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      <Button
                        variant="matrix"
                        size="sm"
                        className="flex-1 flex items-center justify-center gap-2"
                        onClick={() => window.open(work.caseStudyUrl, '_self')}
                      >
                        <Briefcase className="w-4 h-4" />
                        case_study
                      </Button>
                      
                      <Button
                        variant="terminal"
                        size="sm"
                        className="flex items-center justify-center gap-2"
                        onClick={() => window.open(work.liveUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                        demo
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="container mx-auto px-6"
      >
        <motion.div className="bg-gradient-to-r from-surface/20 to-accent-dark/5 backdrop-blur border border-accent-dark/20 rounded-2xl p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Coffee className="w-6 h-6 text-coffee" />
              <Award className="w-6 h-6 text-matrix-green" />
              <Github className="w-6 h-6 text-accent" />
            </div>
            
            <h2 className="text-3xl font-bold text-text mb-4">
              Ready for Your Next Project?
            </h2>
            
            <p className="text-lg text-text/70 mb-8 max-w-2xl mx-auto font-mono">
              <span className="text-matrix-green">$</span> Ready to build something amazing together?{' '}
              Check out my active repositories or get in touch!
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="matrix" 
                size="lg" 
                onClick={() => window.open('/projects', '_self')}
                className="inline-flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                live_projects
              </Button>
              <Button 
                variant="terminal" 
                size="lg" 
                onClick={() => window.open('/contact', '_self')}
                className="inline-flex items-center gap-2"
              >
                <ArrowRight className="w-5 h-5" />
                start_project
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
