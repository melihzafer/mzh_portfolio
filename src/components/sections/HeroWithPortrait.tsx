"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { Coffee, Code, Terminal } from "lucide-react";

// Matrix Rain Animation Component
const MatrixRain = () => {
  useEffect(() => {
    const canvas = document.getElementById('hero-matrix-canvas') as HTMLCanvasElement;
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
    const fontSize = 8;
    const columns = (canvas.width/10) / fontSize;
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

    const interval = setInterval(draw, 100);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      id="hero-matrix-canvas"
      className="fixed inset-0 pointer-events-none opacity-10 z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default function HeroWithPortrait() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "5+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      <MatrixRain />
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-1">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-matrix-green/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coffee/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">&
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Side */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-matrix-dark/30 rounded-full text-matrix-green text-sm font-mono border border-matrix-green/20">
                <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse"></div>
                Available for new projects
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm <span className="text-accent text-neutral-900 px-1 bg-emerald-700">Melih Zafer</span>{" "}
              </h1>
              
              {/* Terminal-style divider */}
              <div className="flex items-center gap-4 my-4">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-matrix-green to-transparent"></div>
                <Terminal className="w-4 h-4 text-matrix-green" />
                <div className="h-0.5 flex-1 bg-gradient-to-l from-matrix-green to-transparent"></div>
              </div>
              
              <h5 className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                <TypewriterEffect
                  phrases={[
                    "Full-Stack Developer",
                    "React/Next.js Expert", 
                    "Mobile Developer",
                    "Design-Driven Engineer",
                    "UI/UX Specialist",
                    "Creative Problem Solver",
                  ]}
                  className="text-matrix-green"
                />
              </h5>

              <p className="text-lg md:text-xl text-text/80 leading-relaxed max-w-lg font-mono">
                <span className="text-coffee">//</span> I craft digital experiences that combine beautiful design with
                robust functionality. Specializing in modern web technologies
                and user-centered development.
              </p>
              
              {/* Coding status */}
              <div className="flex items-center gap-2 text-sm font-mono">
                <Coffee className="w-4 h-4 text-coffee" />
              <span className="text-coffee">Currently working on:</span>
                <span className="text-green-300">MERTMAKS EOOD</span>                
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center md:p-4 bg-surface/50 border border-matrix-green/20 rounded-lg backdrop-blur-sm">
                  <div className="text-xl md:text-3xl font-bold text-matrix-green font-mono">
                    {stat.number}
                  </div>
                  <div style={{ fontSize: '0.6rem' }} className=" md:text-md text-center uppercase tracking-wider font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                className="bg-matrix-green text-matrix-dark hover:bg-matrix-green/90 font-mono font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                onClick={() => window.open("/works", "_self")}
              >
                <Code className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-matrix-green/30 text-matrix-green hover:bg-matrix-green/10 font-mono"
                onClick={() => window.open("/contact", "_self")}
              >
                <Coffee className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </motion.div>

            {/* Tech Stack Preview */}
            <motion.div variants={itemVariants} className="pt-8">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-matrix-green" />
                <p className="text-sm text-matrix-green mb-0 uppercase tracking-wider font-mono">
                  Technologies I work with
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  "React",
                  "Next.js", 
                  "TypeScript",
                  "Node.js",
                  "Tailwind",
                  "C#",
                  "Python",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-matrix-dark/30 border border-matrix-green/20 rounded-md text-sm text-matrix-green hover:border-matrix-green/50 transition-colors font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Portrait Side */}
          <motion.div
            variants={itemVariants}
            className="relative lg:justify-self-end"
          >
            <div className="relative">
              {/* Portrait Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-matrix-green/20 to-coffee/10 rounded-2xl rotate-3"></div>
                <div className="absolute inset-2 bg-surface border border-matrix-green/30 rounded-2xl -rotate-1 shadow-2xl"></div>

                {/* Portrait Image */}
                <div className="absolute inset-4 rounded-xl overflow-hidden">
                  <Image
                    src="/portrait.jpg"
                    alt="Melih Zafer Hyusein - Full-Stack Developer"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 320px, 384px"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-matrix-green rounded-full shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 w-12 h-12 bg-coffee/20 rounded-full backdrop-blur-sm border border-coffee/30"
                  animate={{
                    y: [0, 10, 0],
                    scale: [1, 0.9, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                
                {/* Code snippet floating element */}
                <motion.div
                  className="absolute -top-8 -right-8 p-2 bg-surface/90 border border-matrix-green/30 rounded text-xs font-mono text-matrix-green backdrop-blur-sm"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {'{ code: "magic" }'}
                </motion.div>
              </div>

              {/* Decorative Lines */}
              <div className="absolute top-1/2 -left-20 w-16 h-px bg-gradient-to-r from-transparent to-matrix-green/30 hidden lg:block"></div>
              <div className="absolute top-1/2 -right-20 w-16 h-px bg-gradient-to-l from-transparent to-matrix-green/30 hidden lg:block"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        variants={itemVariants}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-matrix-green to-transparent"></div>
          <span className="text-xs text-matrix-green uppercase tracking-wider font-mono">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}
