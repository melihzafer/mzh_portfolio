"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/Card"
import { Avatar } from "@/components/ui/Avatar"
import { Icon } from "@/components/ui/Icon"
import { Quote, Star, Terminal, Coffee } from "lucide-react"
import { testimonialsData } from "@/lib/data"
import MatrixRain from "@/components/atoms/MatrixRain"
import TiltCard from "@/components/atoms/TiltCard"

export default function Testimonials() {
  return (
  <section className="relative py-12 md:py-16 lg:py-20 bg-bg overflow-hidden" id="testimonials">
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
            <span className="text-muted">terminal@portfolio:~/reviews</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-matrix-green">$</span>
              <span className="text-coffee">cat</span>
              <span className="text-text">client_feedback.log</span>
            </div>
            <div className="text-muted ml-4">
              <p className="mb-2"># Client Testimonials & Success Stories</p>
              <p className="mb-2"># Building trust through exceptional delivery</p>
              <div className="flex items-center gap-2 mt-4">
                <Coffee className="w-4 h-4 text-coffee" />
                <span className="text-coffee">Reading positive feedback...</span>
              </div>
            </div>
          </div>
        </div>

    <div className="text-center mb-10 md:mb-12">
          <h2 className="text-h1 font-mono mb-4 text-matrix-green">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto font-mono">
            Here's what some of my clients have to say about working with me.
          </p>
        </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TiltCard
              key={testimonial.author}
              maxTilt={5}
              scale={1.02}
              className="group"
            >
              <Card 
                className="h-full bg-surface border border-border hover:border-matrix-green transition-all duration-300 backdrop-blur-sm"
              >
                <CardContent className="space-y-4">
                  {/* Quote Icon */}
                  <div className="flex justify-between items-start">
                    <Icon icon={Quote} className="text-matrix-green/60" size="lg" />
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          icon={Star} 
                          className="text-coffee fill-current" 
                          size="sm" 
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <blockquote className="text-muted leading-relaxed font-mono text-sm">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fallback={testimonial.author.split(' ').map(n => n[0]).join('')}
                      size="md"
                    />
                    <div>
                      <div className="font-semibold text-matrix-green font-mono">{testimonial.author}</div>
                      <div className="text-sm text-muted font-mono">{testimonial.role}</div>
                      {testimonial.company && (
                        <div className="text-xs text-coffee font-mono">{testimonial.company}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
