import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Icon } from "@/components/ui/Icon"
import { Code2, Palette, Rocket, Globe, Database, Smartphone, Server, Terminal, Coffee } from "lucide-react"
import { featuresData } from "@/lib/data"
import MatrixRain from "@/components/atoms/MatrixRain"
import TiltCard from "@/components/atoms/TiltCard"

export default function Features() {
  const iconMap = {
    Code2,
    Palette,
    Server,
    Rocket,
    Database,
    Smartphone,
    Globe
  }

  return (
  <section className="relative py-12 md:py-16 lg:py-20 bg-bg overflow-hidden" id="features">
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
            <span className="text-muted">terminal@portfolio:~/services</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-matrix-green">$</span>
              <span className="text-coffee">ls</span>
              <span className="text-text">-la services/</span>
            </div>
            <div className="text-muted ml-4">
              <p className="mb-2"># Comprehensive Development Services</p>
              <p className="mb-2"># Full-Stack | Mobile | UI/UX | Performance</p>
              <div className="flex items-center gap-2 mt-4">
                <Coffee className="w-4 h-4 text-coffee" />
                <span className="text-coffee">Crafting digital solutions...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-h1 font-mono mb-4 text-matrix-green">
            What I Do
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto font-mono">
            I specialize in full-stack development, creating end-to-end solutions 
            that combine cutting-edge technology with thoughtful design.
          </p>
        </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {featuresData.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
            
            return (
              <TiltCard
                key={feature.title}
                maxTilt={6}
                scale={1.02}
                className="group"
              >
                <Card 
                  className="h-full bg-surface border border-border hover:border-matrix-green transition-all duration-300 backdrop-blur-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-matrix-dark text-matrix-green group-hover:bg-matrix-green group-hover:text-bg transition-all duration-300">
                        <Icon icon={IconComponent} size="lg" />
                      </div>
                    </div>
                    <CardTitle className="text-matrix-green font-mono">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="leading-relaxed text-muted font-mono text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
