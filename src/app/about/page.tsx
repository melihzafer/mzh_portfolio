'use client';

import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import CodeEditor from '@/components/atoms/CodeEditor'
import SkillBar from '@/components/atoms/SkillBar'
import SkillBars from '@/components/molecules/SkillBars'
import { aboutData } from '@/lib/data'
import { useEffect } from 'react';

// Matrix Rain Animation Component
const MatrixRain = () => {
  useEffect(() => {
    const canvas = document.getElementById('contact-matrix-canvas') as HTMLCanvasElement;
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
      ctx.fillStyle = 'rgba(10, 15, 15, 0.02)';
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

    const interval = setInterval(draw, 120);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      id="contact-matrix-canvas"
      className="fixed inset-0 pointer-events-none opacity-10 z-0"
      style={{ background: 'transparent' }}
    />
  );
};

// Note: In a real app, you'd implement server actions for form submission
// This is a client-side implementation for demonstration
export default function AboutPage() {
  // Code editor tabs content
  const aboutContent = `// about.tsx
export const developer = {
  name: "Melih Zafer Hyusein",
  role: "Full-Stack Developer & Designer",
  location: "Bulgaria",
  experience: "5+ years",
  
  specialties: [
    "Modern React Development",
    "Next.js & TypeScript",
    "UI/UX Design Systems",
    "Mobile Development (React Native)",
    "Backend APIs & Databases"
  ],
  
  philosophy: \`
    I believe in crafting digital experiences that not only 
    look beautiful but perform exceptionally. Every line of 
    code should serve a purpose, and every design decision 
    should enhance the user experience.
  \`,
  
  approach: {
    design: "User-centered, accessible, performant",
    code: "Clean, scalable, well-tested",
    collaboration: "Transparent, iterative, feedback-driven"
  }
};

export default developer;`;

  const stackContent = `{
  "dependencies": {
    "frontend": {
      "react": "^18.2.0",
      "next": "^14.0.0", 
      "typescript": "^5.0.0",
      "tailwindcss": "^3.3.0",
      "framer-motion": "^10.0.0"
    },
    "backend": {
      "node": "^20.0.0",
      "python": "^3.11.0",
      "postgresql": "^15.0.0",
      "mongodb": "^7.0.0",
      "redis": "^7.0.0"
    },
    "tools": {
      "git": "^2.40.0",
      "docker": "^24.0.0",
      "aws": "latest",
      "figma": "latest",
      "vercel": "latest"
    }
  },
  "experience": {
    "total_years": 5,
    "projects_completed": 50,
    "companies_worked": 8,
    "technologies_mastered": 25
  },
  "certifications": [
    "AWS Solutions Architect",
    "Google Cloud Platform",
    "MongoDB Certified Developer"
  ]
}`;

  const timelineContent = `# Timeline

## 2024 - Present: Senior Full-Stack Developer
**Freelance & Consulting**
- Leading complex web application development
- Specializing in React, Next.js, and modern frontend
- Building scalable backend systems and APIs
- Mentoring junior developers

## 2022 - 2024: Frontend Lead
**TechCorp Solutions**
- Led team of 6 frontend developers
- Architected design system used across 10+ products
- Reduced bundle size by 40% through optimization
- Implemented comprehensive testing strategy

## 2020 - 2022: Full-Stack Developer
**StartupXYZ**
- Built MVP from ground up using React & Node.js
- Grew user base from 0 to 100K+ active users
- Implemented real-time features with WebSockets
- Deployed scalable infrastructure on AWS

## 2019 - 2020: Junior Developer
**Digital Agency ABC**
- Developed responsive websites for 20+ clients
- Learned modern development practices
- Collaborated with designers on pixel-perfect UIs
- Gained experience with various CMS platforms

## 2019: Started Development Journey
- Completed intensive bootcamp program
- Built first portfolio website
- Contributed to open source projects
- Began freelancing journey`;

  return (
    <main className="min-h-screen bg-bg text-text py-16 md:py-24 relative">
      <MatrixRain />
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-accent">Me</span>
            </h1>
            <p className="text-lg text-text/80 max-w-2xl mx-auto">
              Passionate about creating digital experiences that combine beautiful design with robust functionality
            </p>
          </div>

          {/* Code Editor Section */}
          <div className="mb-20">
            <CodeEditor
              tabs={[
                { name: 'about.tsx', content: aboutContent, language: 'typescript' },
                { name: 'stack.json', content: stackContent, language: 'json' },
                { name: 'timeline.md', content: timelineContent, language: 'markdown' }
              ]}
              className="max-w-4xl mx-auto"
            />
          </div>

          {/* Skills Section */}
          <div className="mb-20">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-12">
              Technical <span className="text-accent">Skills</span>
            </h2>
            <SkillBars 
              skills={aboutData.detailedSkills}
              showCategories={true}
              matrixTheme={false}
              className="max-w-4xl mx-auto"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '5+', label: 'Years Experience' },
              { number: '25+', label: 'Technologies' },
              { number: '100%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={stat.label} className="p-6">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-text/70 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
