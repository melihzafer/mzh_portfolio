'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/Button';
import TiltCard from '@/components/atoms/TiltCard';
import { ExternalLink, Github, Star, GitFork, Loader2, Terminal, Code, Coffee } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  title?: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  topics: string[];
  updated_at: string;
  created_at: string;
  pushed_at: string;
  has_releases?: boolean;
  latest_release?: {
    tag_name: string;
    name: string;
    published_at: string;
  };
  portfolio_topics?: string[];
  category?: string;
  tech?: string[];
}

interface GitHubAPIResponse {
  works: Project[];
  total: number;
  error?: string;
}

const categories = ['All'];

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

// Matrix rain effect component (client-only to avoid hydration mismatch)
const MatrixRain = () => {
  const [mounted, setMounted] = useState(false);
  const [streams, setStreams] = useState<
    { left: number; delay: number; duration: number; chars: string[] }[]
  >([]);

  useEffect(() => {
    // Defer rendering until after mount so SSR markup matches client initial render
    setMounted(true);
    const s = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      chars: Array.from({ length: 10 }).map(
        () => String.fromCharCode(Math.floor(Math.random() * 94) + 33)
      ),
    }));
    setStreams(s);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden">
      {streams.map((stream, i) => (
        <motion.div
          key={i}
          className="absolute text-matrix-green font-mono text-sm"
          style={{ left: `${stream.left}%`, top: `-10%` }}
          animate={{ y: ['0vh', '110vh'], opacity: [0, 1, 0] }}
          transition={{
            duration: stream.duration,
            repeat: Infinity,
            delay: stream.delay,
            ease: 'linear',
          }}
        >
          {stream.chars.map((ch, j) => (
            <div key={j} className="block">
              {ch}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get unique categories from projects data (with safe fallback)
  const dynamicCategories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => {
      // Use language as category for GitHub repos
      const c = (p.language && p.language.trim()) || 'Other';
      cats.add(c);
    });
    return ['All', ...Array.from(cats)];
  }, [projects]);

  const formatCategory = (category?: string) => {
    const label = (category && category.trim()) || 'Other';
    return label.toLowerCase().replace(/\s+/g, '_');
  };

  // Fetch projects from all public repos API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Fetch all public repos for Projects page
        const response = await fetch('/api/github/all-repos');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: GitHubAPIResponse = await response.json();
        
        if (data.error) {
          console.warn('GitHub API warning:', data.error);
        }
        
        const repoArray = data?.works || [];
        setProjects(repoArray);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => {
        // Filter by language as category
        return project.language?.toLowerCase() === selectedCategory.toLowerCase() ||
               project.topics?.some(topic => topic.toLowerCase().includes(selectedCategory.toLowerCase())) ||
               project.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
               project.description?.toLowerCase().includes(selectedCategory.toLowerCase());
      });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3776ab',
      Java: '#ed8b00',
      'C++': '#00599c',
      'C#': '#239120',
      React: '#61dafb',
      CSS: '#1572b6',
      HTML: '#e34c26',
      PHP: '#777bb4',
      Ruby: '#cc342d',
      Go: '#00add8',
      Rust: '#000000',
      Swift: '#fa7343',
      Kotlin: '#7f52ff',
    };
    return colors[language || ''] || '#6b7280';
  };

  const getTopicChipStyle = (topic: string) => {
    const portfolioTopics = ['ready', 'live', 'work'];
    if (portfolioTopics.includes(topic.toLowerCase())) {
      return {
        ready: 'bg-green-900/30 text-green-400 border border-green-400/30',
        live: 'bg-blue-900/30 text-blue-400 border border-blue-400/30', 
        work: 'bg-yellow-900/30 text-yellow-400 border border-yellow-400/30'
      }[topic.toLowerCase()] || 'bg-matrix-dark text-matrix-green';
    }
    return 'bg-matrix-dark text-matrix-green';
  };

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
            <Terminal className="w-12 h-12 text-matrix-green" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text font-mono">
              ~/projects<span className="text-matrix-green animate-pulse">_</span>
            </h1>
            <Coffee className="w-12 h-12 text-coffee" />
          </div>
          <p className="text-xl text-text/70 max-w-3xl mx-auto font-mono">
            <span className="text-matrix-green">$</span> Real projects from GitHub profile{' '}
            <span className="text-accent">melihzafer</span> - Live code, active repositories, and experimental hacks.
          </p>
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-danger/10 border border-danger/20 rounded-lg text-danger text-sm max-w-md mx-auto font-mono"
            >
              <Code className="w-4 h-4 inline mr-2" />
              ERROR: {error}
            </motion.div>
          )}
        </motion.div>

        {/* Terminal-style Filter Categories */}
        {!loading && dynamicCategories.length > 1 && (
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
                <span className="text-sm text-muted ml-2">filter_categories.sh</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {dynamicCategories.map((category) => (
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
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-matrix-green mx-auto mb-4" />
              <span className="text-matrix-green font-mono">
                <span className="animate-pulse">Fetching repositories from GitHub...</span>
              </span>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && filteredProjects.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => {
              const title = ((project as any)?.title ?? (project as any)?.name ?? 'Untitled').toString();
              return (
              <motion.div key={`${project.id}`} variants={itemVariants}>
                <TiltCard
                  maxTilt={8}
                  scale={1.02}
                  className="group h-full"
                >
                  <div className="h-full p-6 bg-surface border border-matrix-green/20 rounded-xl hover:border-matrix-green/40 transition-all duration-300 backdrop-blur-sm flex flex-col">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Github className="w-5 h-5 text-matrix-green" />
                        <span className="font-mono text-sm text-matrix-green">repo</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-matrix-green"></div>
                        <div className="w-2 h-2 rounded-full bg-coffee"></div>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl font-bold mb-2 text-text group-hover:text-matrix-green transition-colors font-mono">
                      {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>

                    {/* Description */}
                    <p className="text-text/70 mb-4 text-sm line-clamp-3 flex-grow">
                      {project.description || 'A carefully crafted project showcasing modern development practices.'}
                    </p>

                    {/* Language & Stars */}
                    <div className="flex items-center justify-between mb-4">
                      {project.language && (
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getLanguageColor(project.language) }}
                          ></div>
                          <span className="font-mono text-xs text-text/70">{project.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-xs text-text/70">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          <span>{project.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          <span>{project.forks_count}</span>
                        </div>
                      </div>
                    </div>

                    {/* Topics */}
                    {project.topics && project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {/* Show portfolio topics first (ready, live, work) */}
                        {project.portfolio_topics?.map((topic) => (
                          <span
                            key={topic}
                            className={`px-2 py-1 text-xs font-mono rounded ${getTopicChipStyle(topic)}`}
                          >
                            {topic}
                          </span>
                        ))}
                        {/* Show other topics, limit to avoid overflow */}
                        {project.topics
                          .filter(topic => !['ready', 'live', 'work'].includes(topic.toLowerCase()))
                          .slice(0, 2)
                          .map((topic) => (
                            <span
                              key={topic}
                              className="px-2 py-1 text-xs font-mono rounded bg-matrix-dark/20 text-matrix-green border border-matrix-green/20"
                            >
                              {topic}
                            </span>
                          ))}
                        {project.topics.length > 5 && (
                          <span className="px-2 py-1 text-xs font-mono rounded bg-surface text-text/70 border border-border">
                            +{project.topics.length - 5}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Updated Date & Release Info */}
                    <div className="text-xs text-text/70 font-mono mb-4 space-y-1">
                      <div>Updated: {formatDate(project.pushed_at || project.updated_at)}</div>
                      {project.has_releases && project.latest_release && (
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">📦</span>
                          <span>v{project.latest_release.tag_name}</span>
                          <span className="text-text/70">({formatDate(project.latest_release.published_at)})</span>
                        </div>
                      )}
                    </div>

                    {/* Actions - Only GitHub button, no Live button */}
                    <div className="mt-auto">
                      <Button
                        variant="matrix"
                        size="sm"
                        className="w-full flex items-center justify-center text-center gap-2"
                        onClick={() => window.open(project.html_url, '_blank')}
                      >
                        <span className="text-text/70">View on GitHub</span><Github className="w-4 h-4 py-0.5 mx-auto" />
                      </Button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );})}
          </motion.div>
        )}        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-text mb-2 font-mono">
              No repositories found
            </h3>
            <p className="text-text/70 font-mono">
              {selectedCategory === 'All' 
                ? '$ ls -la: No projects available at the moment.' 
                : `$ grep "${selectedCategory}": No matches found.`}
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
                <span className="text-matrix-green">$</span> Let's build something amazing together. 
                Check out my full portfolio or get in touch!
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="matrix" 
                  size="lg" 
                  onClick={() => window.open('/works', '_self')}
                  className="inline-flex items-center gap-2"
                >
                  <Code className="w-5 h-5" />
                  view_portfolio
                </Button>
                <Button 
                  variant="terminal" 
                  size="lg" 
                  onClick={() => window.open('/contact', '_self')}
                  className="inline-flex items-center gap-2"
                >
                  <Terminal className="w-5 h-5" />
                  contact_me
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
