'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import TiltCard from '@/components/atoms/TiltCard';
import { Coffee, Code, Github, ExternalLink, Filter, Coffee as CoffeeIcon } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
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
}

// Matrix Rain Animation Component
const MatrixRain = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 15, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      id="matrix-canvas"
      className="fixed inset-0 pointer-events-none opacity-20 z-0"
      style={{ background: 'transparent' }}
    />
  );
};

const techFilters = ['All', 'ready', 'live', 'work', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'Python', 'Node.js', 'CSS'];

export default function WorksPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/github/repos');
        if (!response.ok) {
          // attempt to read body for diagnostics
          let body = '';
          try { body = await response.text(); } catch (e) { body = String(e); }
          console.error('Repository fetch failed', { status: response.status, statusText: response.statusText, body });
          throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText} - ${body}`);
        }

        const data = await response.json();
        // Handle new API shape with works array
        const repoArray = data?.works || (Array.isArray(data) ? data : []);
        if (!Array.isArray(repoArray)) {
          console.error('Unexpected repos payload', data);
          throw new Error('Unexpected response shape from /api/github/repos');
        }
        
        // Filter to show only released repos on Works page
        const releasedRepos = repoArray.filter(repo => repo.has_releases && repo.latest_release);
        setRepositories(releasedRepos);
        setFilteredRepos(releasedRepos);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Set empty arrays on error to prevent map function errors
        setRepositories([]);
        setFilteredRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredRepos(repositories);
    } else {
      setFilteredRepos(
        repositories.filter(repo => {
            // Portfolio topics filter (ready, live, work)
            if (['ready', 'live', 'work'].includes(activeFilter.toLowerCase())) {
            return repo.portfolio_topics?.includes(activeFilter.toLowerCase()) ||
                 repo.topics.some(topic => topic.toLowerCase() === activeFilter.toLowerCase());
            }
            
            // Releases filter
            if (activeFilter === 'released') {
            return repo.has_releases && repo.latest_release;
            }
          
          // Tech/language filters
          return repo.language?.toLowerCase() === activeFilter.toLowerCase() ||
                 repo.topics.some(topic => topic.toLowerCase().includes(activeFilter.toLowerCase())) ||
                 repo.name.toLowerCase().includes(activeFilter.toLowerCase()) ||
                 repo.description?.toLowerCase().includes(activeFilter.toLowerCase());
        })
      );
    }
  }, [activeFilter, repositories]);

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
    <div className="relative min-h-screen bg-bg text-text overflow-hidden">
      <MatrixRain />
      
      <div className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          {/* Terminal-style Header */}
          <div className="mb-16 p-6 bg-surface border border-border rounded-lg font-mono text-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
              </div>
              <span className="text-muted">terminal@portfolio:~/works</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-matrix-green">$</span>
                <span className="text-coffee">cat</span>
                <span className="text-text">portfolio.works</span>
              </div>
              <div className="text-muted ml-4">
                <p className="mb-2"># Showcasing Full-Stack Development Excellence</p>
                <p className="mb-2"># Languages: JavaScript, TypeScript, Python, C++, C#, SQL, PHP</p>
                <p className="mb-2"># Frameworks: Next.js, React, Node.js, Express</p>
                <p className="mb-2"># Focus: Performance, Scalability, User Experience</p>
                <div className="flex items-center gap-2 mt-4">
                  <CoffeeIcon className="w-4 h-4 text-coffee" />
                  <span className="text-coffee">Brewing code with precision...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Terminal */}
          <div className="mb-8 p-4 bg-surface border border-border rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3 font-mono text-sm">
              <Filter className="w-4 h-4 text-matrix-green" />
              <span className="text-matrix-green">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {techFilters.map((filter) => (
                <Button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  className={`font-mono text-xs ${
                    activeFilter === filter 
                      ? 'bg-matrix-green text-bg border-matrix-green' 
                      : 'border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-bg'
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3 p-4 bg-surface border border-border rounded-lg font-mono">
                <Code className="w-5 h-5 text-matrix-green animate-spin" />
                <span className="text-matrix-green">Loading repositories...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3 p-4 bg-surface border border-error rounded-lg font-mono">
                <span className="text-error">Error: {error}</span>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo, index) => (
                <TiltCard
                  key={repo.id}
                  maxTilt={8}
                  scale={1.02}
                  className="group"
                >
                  <div className="h-full p-6 bg-surface border border-border rounded-lg hover:border-matrix-green transition-all duration-300 backdrop-blur-sm">
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
                    <h3 className="text-xl font-bold mb-2 text-text group-hover:text-matrix-green transition-colors">
                      {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>

                    {/* Description */}
                    <p className="text-muted mb-4 text-sm line-clamp-3">
                      {repo.description || 'A carefully crafted project showcasing modern development practices.'}
                    </p>

                    {/* Language & Stars */}
                    <div className="flex items-center justify-between mb-4">
                      {repo.language && (
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          ></div>
                          <span className="font-mono text-xs text-muted">{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <span>⭐</span>
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>

                    {/* Topics */}
                    {repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {/* Show portfolio topics first (ready, live, work) */}
                        {repo.portfolio_topics?.map((topic) => (
                          <span
                            key={topic}
                            className={`px-2 py-1 text-xs font-mono rounded ${getTopicChipStyle(topic)}`}
                          >
                            {topic}
                          </span>
                        ))}
                        {/* Show other topics, limit to avoid overflow */}
                        {repo.topics
                          .filter(topic => !['ready', 'live', 'work'].includes(topic.toLowerCase()))
                          .slice(0, 2)
                          .map((topic) => (
                            <span
                              key={topic}
                              className={`px-2 py-1 text-xs font-mono rounded ${getTopicChipStyle(topic)}`}
                            >
                              {topic}
                            </span>
                          ))}
                        {repo.topics.length > 5 && (
                          <span className="px-2 py-1 bg-surface text-muted text-xs font-mono rounded border border-border">
                            +{repo.topics.length - 5}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Updated Date & Release Info */}
                    <div className="text-xs text-muted font-mono mb-4 space-y-1">
                      <div>Updated: {formatDate(repo.pushed_at || repo.updated_at)}</div>
                      {repo.has_releases && repo.latest_release && (
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">📦</span>
                          <span>v{repo.latest_release.tag_name}</span>
                          <span className="text-muted">({formatDate(repo.latest_release.published_at)})</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="default"
                          size="sm"
                          className="w-full bg-matrix-green text-bg hover:bg-matrix-green/90 border-0"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </Button>
                      </a>
                      {repo.homepage && (
                        <a 
                          href={repo.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-coffee text-coffee hover:bg-coffee hover:text-bg"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Live
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredRepos.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex flex-col items-center gap-4 p-8 bg-surface border border-border rounded-lg font-mono">
                <Code className="w-12 h-12 text-muted" />
                <div>
                  <p className="text-muted mb-2">No repositories found for "{activeFilter}"</p>
                  <Button
                    onClick={() => setActiveFilter('All')}
                    variant="default"
                    size="sm"
                    className="bg-matrix-green text-bg hover:bg-matrix-green/90 border-0"
                  >
                    Show All Projects
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Coffee Break Terminal */}
          <div className="mt-16 p-6 bg-surface border border-border rounded-lg font-mono text-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Coffee className="w-4 h-4 text-coffee" />
              <span className="text-coffee">coffee.time();</span>
            </div>
            <div className="text-muted">
              <p>// Want to see more? Let's build something amazing together!</p>
              <p>// Each project represents hours of thoughtful coding, testing, and refinement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
