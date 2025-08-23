"use client"
import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Icon } from "@/components/ui/Icon"
import { ArrowRight, Award, Users, Coffee, Terminal, Code, Monitor } from "lucide-react"
import Link from "next/link"
import { aboutData } from "@/lib/data"
import { SkillBars } from "@/components/molecules/SkillBars"
import MatrixRain from "@/components/atoms/MatrixRain"

const stats = [
  {
    icon: Terminal,
    value: "5+",
    label: "Years Experience",
    color: "text-matrix-green"
  },
  {
    icon: Code,
    value: "50+",
    label: "Projects Completed",
    color: "text-coffee"
  },
  {
    icon: Monitor,
    value: "1000+",
    label: "Cups of Coffee",
    color: "text-matrix-green"
  }
]

export default function About() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  React.useEffect(() => {
    if (!isMounted || !containerRef.current) return
    
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }
    
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.2 }
    )
    obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [isMounted])
  return (
  <section className="relative py-12 md:py-16 lg:py-20 bg-bg overflow-hidden" id="about">
      <MatrixRain />
      
      <div className="relative z-10 container">
        {/* Terminal Header */}
        <div className="mb-16 p-6 bg-surface border border-border rounded-lg font-mono text-sm backdrop-blur-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-muted">terminal@portfolio:~/about</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-matrix-green">$</span>
              <span className="text-coffee">whoami</span>
            </div>
            <div className="text-muted ml-4">
              <p className="mb-2"># Full-Stack Developer & UI/UX Designer</p>
              <p className="mb-2"># Passionate about creating digital experiences that matter</p>
              <div className="flex items-center gap-2 mt-4">
                <Coffee className="w-4 h-4 text-coffee" />
                <span className="text-coffee">Coffee-driven development since 2019...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Content - Terminal Style */}
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-h1 font-extrabold text-5xl font-mono text-matrix-green">
                {aboutData.title}
              </h1>
              <div className="prose prose-lg max-w-4xl mx-auto text-muted space-y-4">
                <p className="text-lg leading-relaxed font-mono">
                  {aboutData.description}
                </p>
              </div>
            </div>

            {/* Terminal-style Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center p-4 bg-surface border border-border rounded-lg backdrop-blur-sm">
                  <div className="flex justify-center mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-matrix-dark text-matrix-green">
                      <Icon icon={stat.icon} size="sm" />
                    </div>
                  </div>
                  <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-muted font-mono">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('/about', '_self')}
                className="bg-matrix-green text-bg hover:bg-matrix-green/90 border-0 font-mono"
              >
                Learn More
                <Icon icon={ArrowRight} size="sm" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.open('/contact', '_self')}
                className="border-coffee text-coffee hover:bg-coffee hover:text-bg font-mono"
              >
                Let's Talk
              </Button>
            </div>
          </div>

          {/* Skills Section - Terminal Style */}
          <div className="space-y-8" ref={containerRef}>
            <div className="p-4 bg-surface border border-border rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3 font-mono text-sm">
                <Terminal className="w-4 h-4 text-matrix-green" />
                <span className="text-matrix-green">Skills:</span>
              </div>
              <h3 className="text-2xl font-semibold text-matrix-green text-center font-mono">Core Technologies</h3>
            </div>
            
            {/* Advanced Skill Bars - Matrix Theme */}
            <div className="w-full max-w-[100%] mx-auto">
              <SkillBars 
                skills={aboutData.detailedSkills} 
                showCategories={true}
                matrixTheme={true}
                className="space-y-6"
              />
            </div>
            
            {/* Matrix decorative elements */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-matrix-green/60 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-coffee/40 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
