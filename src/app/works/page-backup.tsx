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
    tagline: 'Real-time data visualization for 50k+ users',
    role: ['Full-Stack Developer', 'Data Visualization Specialist'],
    context: 'Startup MVP',
    period: '2024',
    heroImage: '/works/saas-hero.jpg',
    description: 'Built a comprehensive analytics dashboard from scratch for a B2B SaaS platform. Handled complex data visualization, real-time updates, and scalable architecture.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'D3.js', 'Socket.IO', 'Docker'],
    category: 'Full-Stack Development',
    liveUrl: 'https://analytics.example.com',
    caseStudyUrl: '/works/saas-dashboard',
    featured: true,
    results: [
      { metric: 'Data Processing', value: '1M+ points/sec' },
      { metric: 'Response Time', value: '<200ms' },
      { metric: 'Uptime', value: '99.9%' }
    ]
  },
  {
    id: 'mobile-fitness-app',
    title: 'Fitness Tracking Mobile App',
    tagline: 'AI-powered workout companion with 100k+ downloads',
    role: ['Mobile Developer', 'AI Integration Specialist'],
    context: 'Personal Project',
    period: '2023',
    heroImage: '/works/fitness-hero.jpg',
    description: 'Developed a cross-platform mobile app that uses machine learning to provide personalized workout recommendations. Integrated with wearable devices and health APIs.',
    tech: ['React Native', 'Expo', 'TensorFlow Lite', 'Firebase', 'HealthKit', 'Google Fit'],
    category: 'Mobile Development',
    liveUrl: 'https://apps.apple.com/app/fitness-tracker',
    caseStudyUrl: '#',
    featured: false,
    results: [
      { metric: 'App Store Rating', value: '4.8/5' },
      { metric: 'Downloads', value: '100k+' },
      { metric: 'Daily Active Users', value: '15k+' }
    ]
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content Generation Platform',
    tagline: 'GPT-powered writing assistant for marketing teams',
    role: ['AI Engineer', 'Backend Developer'],
    context: 'Freelance Project',
    period: '2023',
    heroImage: '/works/ai-hero.jpg',
    description: 'Created an AI-powered content generation platform that helps marketing teams create blog posts, social media content, and ad copy. Integrated multiple AI models and built custom training pipelines.',
    tech: ['Python', 'FastAPI', 'OpenAI GPT', 'PostgreSQL', 'Redis', 'Docker'],
    category: 'AI Development',
    liveUrl: 'https://ai-writer.example.com',
    caseStudyUrl: '#',
    featured: false,
    results: [
      { metric: 'Content Generated', value: '500k+ pieces' },
      { metric: 'Processing Speed', value: '<5 seconds' },
      { metric: 'Client Satisfaction', value: '96%' }
    ]
  }
];

const categories = ['All', 'Web Development', 'Full-Stack Development', 'Mobile Development', 'AI Development'];

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

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16 relative">
      <MatrixRain />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Award className="w-12 h-12 text-matrix-green" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text font-mono">
              ~/portfolio<span className="text-matrix-green animate-pulse">_</span>
            </h1>
            <Coffee className="w-12 h-12 text-coffee" />
          </div>
          <p className="text-xl text-text/70 max-w-3xl mx-auto font-mono">
            <span className="text-matrix-green">$</span> Curated collection of production-ready projects{' '}
            <span className="text-accent">showcasing expertise</span> in{' '}
            <span className="text-accent">full-stack development</span>,{' '}
            <span className="text-accent">design</span>, and{' '}
            <span className="text-accent">innovation</span>.
          </p>
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-surface border border-matrix-green/30 rounded-lg p-6 font-mono">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 bg-danger rounded-full"></span>
              <span className="w-3 h-3 bg-warning rounded-full"></span>
              <span className="w-3 h-3 bg-success rounded-full"></span>
              <span className="text-sm text-muted ml-2">filter_portfolio.sh</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "matrix" : "terminal"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category.toLowerCase().replace(' ', '_')}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Works Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {filteredWorks.filter(work => work.featured).map((work) => (
            <motion.div key={work.id} variants={itemVariants}>
              <TiltCard className="h-full">
                <div className="bg-surface border border-matrix-green/20 rounded-xl overflow-hidden h-full flex flex-col hover:border-matrix-green/40 transition-colors">
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-2 px-3 py-1 bg-matrix-green/20 text-matrix-green rounded border border-matrix-green/30 backdrop-blur-sm">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-mono">featured</span>
                    </div>
                  </div>

                  {/* Project Header - Larger for featured */}
                  <div className="relative h-64 bg-gradient-to-br from-matrix-dark/20 to-bg flex items-center justify-center">
                    <div className="text-matrix-green/60 text-8xl font-mono font-bold">
                      {work.title.charAt(0)}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 text-xs font-mono bg-matrix-green/10 text-matrix-green rounded border border-matrix-green/30">
                        {work.category.toLowerCase().replace(' ', '_')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-text mb-2 font-mono">
                        {work.title.toLowerCase().replace(/\s+/g, '_')}
                      </h3>
                      <span className="text-sm text-matrix-green font-mono">{work.period}</span>
                    </div>

                    <p className="text-accent text-lg mb-4 font-mono">
                      {work.tagline}
                    </p>

                    <p className="text-text/70 mb-6 leading-relaxed">
                      {work.description}
                    </p>

                    {/* Results */}
                    {work.results && (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {work.results.map((result, index) => (
                          <div key={index} className="text-center p-3 bg-matrix-dark/20 rounded border border-matrix-green/20">
                            <div className="text-matrix-green font-mono font-bold text-lg">{result.value}</div>
                            <div className="text-xs text-text/60 font-mono">{result.metric}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {work.tech.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-matrix-dark/20 text-matrix-green rounded border border-matrix-green/20 font-mono"
                        >
                          {tech.toLowerCase()}
                        </span>
                      ))}
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
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Works Grid */}
        {filteredWorks.filter(work => !work.featured).length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-text font-mono mb-4">
                other_works<span className="text-matrix-green">[]</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-matrix-green to-transparent"></div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredWorks.filter(work => !work.featured).map((work) => (
                <motion.div key={work.id} variants={itemVariants}>
                  <TiltCard className="h-full">
                    <div className="bg-surface border border-matrix-green/20 rounded-xl overflow-hidden h-full flex flex-col hover:border-matrix-green/40 transition-colors">
                      {/* Project Header */}
                      <div className="relative h-40 bg-gradient-to-br from-matrix-dark/20 to-bg flex items-center justify-center">
                        <div className="text-matrix-green/60 text-5xl font-mono font-bold">
                          {work.title.charAt(0)}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="inline-block px-2 py-1 text-xs font-mono bg-matrix-green/10 text-matrix-green rounded border border-matrix-green/30">
                            {work.category.toLowerCase().replace(' ', '_')}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2 font-mono">
                            {work.title.toLowerCase().replace(/\s+/g, '_')}
                          </h3>
                          <span className="text-sm text-matrix-green font-mono">{work.period}</span>
                        </div>

                        <p className="text-accent text-sm mb-3 font-mono">
                          {work.tagline}
                        </p>

                        <p className="text-text/70 text-sm mb-4 line-clamp-3">
                          {work.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {work.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-matrix-dark/20 text-matrix-green rounded border border-matrix-green/20 font-mono"
                            >
                              {tech.toLowerCase()}
                            </span>
                          ))}
                          {work.tech.length > 4 && (
                            <span className="px-2 py-1 text-xs bg-matrix-dark/20 text-matrix-green/60 rounded border border-matrix-green/20 font-mono">
                              +{work.tech.length - 4}
                            </span>
                          )}
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
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {/* Empty State */}
        {filteredWorks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-text mb-2 font-mono">
              No portfolio pieces found
            </h3>
            <p className="text-text/70 font-mono">
              {selectedCategory === 'All' 
                ? '$ ls -la: No works available at the moment.' 
                : `$ grep "${selectedCategory}": No matches in portfolio.`}
            </p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-surface border border-matrix-green/30 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-matrix-green/5 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 font-mono">
                Want to collaborate?
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
