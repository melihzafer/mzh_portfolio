"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import TiltCard from '@/components/atoms/TiltCard'
import { Project } from '@/content/projects'

interface WorkCardProps extends Project {
  index?: number
}

export function WorkCard({
  title,
  blurb,
  impact,
  tech,
  tags,
  cover,
  links,
  slug,
  year,
  index = 0
}: WorkCardProps) {
  const href = links?.site || links?.demo || `/works/${slug}`;
  const isExternal = links?.site || links?.demo;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="group"
    >
      <TiltCard 
        maxTilt={4}
        scale={1.02}
        className="h-full"
      >
        <Link 
          href={href} 
          target={isExternal ? "_blank" : undefined} 
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="block h-full"
        >
          <div className="bg-surface rounded-xl overflow-hidden border border-border transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lift group-hover:ring-1 group-hover:ring-accent/20 h-full flex flex-col">
            {/* Hero Image */}
            <div className="aspect-[16/10] bg-gradient-to-br from-accent/10 to-accent/5 relative overflow-hidden">
              {cover ? (
                <Image 
                  src={cover} 
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-2xl font-bold">
                      {title.charAt(0)}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* External link indicator */}
              {isExternal && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-accent/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-3 h-3 text-bg" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between text-xs text-muted mb-3">
                <div className="flex flex-wrap gap-1">
                  {tags.slice(0, 2).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-mono">{year}</span>
              </div>
              
              <h3 className="font-display text-lg font-semibold mb-2 text-text group-hover:text-accent transition-colors duration-200 overflow-hidden">
                <span className="block leading-tight" style={{ 
                  display: '-webkit-box', 
                  WebkitLineClamp: 2, 
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {title}
                </span>
              </h3>
              
              <div className="text-muted text-sm mb-4 flex-1 overflow-hidden">
                <p style={{ 
                  display: '-webkit-box', 
                  WebkitLineClamp: 2, 
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {blurb}
                </p>
              </div>
              
              {/* Impact metrics */}
              <div className="text-xs font-mono text-accent mb-4 bg-accent/5 rounded-lg p-2 border border-accent/10">
                {impact}
              </div>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 text-xs text-muted">
                {tech.slice(0, 3).map((t, i) => (
                  <span key={t} className="font-mono">
                    {t}{i < Math.min(tech.length - 1, 2) && ', '}
                  </span>
                ))}
                {tech.length > 3 && (
                  <span className="font-mono opacity-70">+{tech.length - 3}</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  )
}
