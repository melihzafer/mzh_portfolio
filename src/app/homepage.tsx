'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrolled = window.scrollY
        const parallax = scrolled * 0.5
        scrollRef.current.style.transform = `translateY(${parallax}px)`
      }
    }

    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mediaQuery.matches) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 8, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Name & Title */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-balance"
              >
                Melih Zafer
                <br />
                Hyusein
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-muted max-w-md"
              >
                Front-end Developer & Digital Designer
              </motion.p>
              
              <motion.p
                variants={itemVariants}
                className="text-sm md:text-base text-muted max-w-lg text-pretty"
              >
                Creating modern web experiences with pixel-perfect design and performance-first development
              </motion.p>
              
              <motion.div variants={itemVariants} className="pt-4">
                <a
                  href="/about"
                  className="inline-flex items-center px-6 py-3 bg-brand text-bg font-medium rounded-md hover:bg-brand-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-bg"
                >
                  About Me
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </motion.div>
            </motion.div>

            {/* Central Rule */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-64 bg-border" />

            {/* Right Column - Portrait */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-[3/4] bg-surface rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center">
                  <span className="text-muted text-sm">Portrait Image</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Geometric Overlays */}
        <div
          ref={scrollRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-brand/20 rotate-45" />
          <div className="absolute bottom-1/3 left-1/5 w-24 h-24 border border-brand/10 rotate-12" />
        </div>

        {/* Services Marker */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-muted">
            <span className="text-xs uppercase tracking-wide">Services</span>
            <div className="w-px h-8 bg-border" />
          </div>
        </div>
      </section>

      {/* Selected Works Teaser */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Selected Works
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              A showcase of recent projects demonstrating modern web development and design excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-surface rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]">
                  <div className="aspect-[4/3] bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                    <span className="text-muted text-sm">Project {i}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Project Title {i}
                    </h3>
                    <p className="text-muted text-sm mb-3">
                      Brief description of the project and technologies used
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-brand/10 text-brand text-xs rounded">
                        Frontend
                      </span>
                      <span className="px-2 py-1 bg-brand/10 text-brand text-xs rounded">
                        Design
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="/works"
              className="inline-flex items-center text-brand hover:text-brand-600 transition-colors duration-200"
            >
              View All Works
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
