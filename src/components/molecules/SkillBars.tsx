'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'tools';
  icon?: string;
  experience?: string;
}

interface SkillBarsProps {
  skills: Skill[];
  className?: string;
  showCategories?: boolean;
  matrixTheme?: boolean;
}

const categoryColors = {
  frontend: 'from-green-500 to-emerald-400',
  backend: 'from-amber-700 to-amber-500', 
  mobile: 'from-green-700 to-green-400',
  ai: 'from-emerald-400 to-green-500',
  tools: 'from-slate-500 to-green-600'
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend', 
  mobile: 'Mobile',
  ai: 'AI & ML',
  tools: 'Tools & DevOps'
};

export function SkillBars({ 
  skills, 
  className = '', 
  showCategories = true,
  matrixTheme = false 
}: SkillBarsProps) {
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.2 });

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Animate skill levels when in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const animated: Record<string, number> = {};
        skills.forEach((skill, index) => {
          setTimeout(() => {
            animated[skill.name] = skill.level;
            setAnimatedSkills(prev => ({ ...prev, [skill.name]: skill.level }));
          }, index * 150);
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isInView, skills]);

  const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
    const animatedLevel = animatedSkills[skill.name] || 0;
    const gradientClass = categoryColors[skill.category];

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            {skill.icon && (
              <span className="text-lg" role="img" aria-label={skill.name}>
                {skill.icon}
              </span>
            )}
            <span className={`font-medium ${matrixTheme ? 'font-mono text-emerald-400' : 'text-text'}`}>
              {skill.name}
            </span>
            {skill.experience && (
              <span className="text-xs text-muted bg-surface px-2 py-1 rounded">
                {skill.experience}
              </span>
            )}
          </div>
          <span className={`text-sm font-mono ${matrixTheme ? 'text-emerald-400' : 'text-accent'}`}>
            {Math.round(animatedLevel)}%
          </span>
        </div>

        <div className="relative">
          {/* Background track */}
          <div className={`w-full h-2 rounded-full overflow-hidden ${
            matrixTheme ? 'bg-slate-800/30' : 'bg-slate-800'
          }`}>
            {/* Progress bar */}
            <motion.div
              className={`h-full bg-gradient-to-r ${gradientClass} relative overflow-hidden`}
              initial={{ width: 0 }}
              animate={{ width: `${animatedLevel}%` }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.1,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
            >
              {/* Matrix-style scanning line */}
              {matrixTheme && (
                <motion.div
                  className="absolute inset-y-0 right-0 w-1 bg-emerald-400 shadow-lg shadow-emerald-400/50"
                  animate={{
                    opacity: [0, 1, 0],
                    scaleY: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
              )}
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: 'linear'
                }}
              />
            </motion.div>
          </div>

          {/* Skill level indicator */}
          <motion.div
            className={`absolute top-0 h-2 w-1 ${
              matrixTheme ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-accent'
            } shadow-lg`}
            initial={{ left: 0 }}
            animate={{ left: `${animatedLevel}%` }}
            transition={{ 
              duration: 1.2, 
              delay: index * 0.1,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            style={{ transform: 'translateX(-2px)' }}
          />
        </div>
      </motion.div>
    );
  };

  if (showCategories) {
    return (
      <div ref={containerRef} className={`${className}`}>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className={`text-lg font-semibold ${
                matrixTheme ? 'text-emerald-400 font-mono' : 'text-accent'
              } border-b border-border pb-2`}>
                {categoryLabels[category as keyof typeof categoryLabels]}
                <span className="text-sm text-muted ml-2">({categorySkills.length})</span>
              </h3>
              <div className="space-y-4">
                {categorySkills.map((skill, index) => (
                  <SkillBar 
                    key={skill.name} 
                    skill={skill} 
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`space-y-4 ${className}`}>
      {skills.map((skill, index) => (
        <SkillBar 
          key={skill.name} 
          skill={skill} 
          index={index}
        />
      ))}
    </div>
  );
}

export default SkillBars;
