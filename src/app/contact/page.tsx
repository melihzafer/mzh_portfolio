"use client"

import { useState, useEffect } from 'react'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/data'
import { Coffee, Terminal, Code, Send, CheckCircle, Mail, Linkedin } from 'lucide-react'

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Honeypot field for spam protection
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    
    // Check honeypot
    if (formData.honeypot) {
      newErrors.honeypot = 'Spam detected'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({} as any))
        throw new Error(data?.error || 'Failed to send message')
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '', honeypot: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <main className="relative min-h-screen bg-bg text-text flex items-center justify-center overflow-hidden">
        <MatrixRain />
        <div className="container relative z-10">
          <div className="max-w-md mx-auto text-center">
            {/* Terminal-style success message */}
            <div className="p-6 bg-surface border border-matrix-green rounded-lg backdrop-blur-sm font-mono">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                </div>
                <span className="text-muted">terminal@contact:~/success</span>
              </div>
              
              <div className="text-left space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-matrix-green">$</span>
                  <span className="text-coffee">send</span>
                  <span className="text-text">message.status</span>
                </div>
                <div className="text-muted ml-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-matrix-green" />
                    <span className="text-matrix-green">SUCCESS: Message delivered!</span>
                  </div>
                  <p className="mb-2"># Thank you for reaching out.</p>
                  <p className="mb-4"># I'll get back to you within 24 hours.</p>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-coffee" />
                    <span className="text-coffee">Coffee time while I craft a response...</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-6 py-3 bg-matrix-green text-matrix-dark rounded-lg hover:bg-matrix-green/90 transition-colors font-mono font-semibold"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-bg text-text overflow-hidden">
      <MatrixRain />
      
      {/* Hero Section */}
      <section className="relative z-10 py-4 md:py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Terminal Header */}
            <div className="mb-8 p-6 bg-surface border border-border rounded-lg font-mono text-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                </div>
                <span className="text-muted">terminal@portfolio:~/contact</span>
              </div>
              
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-matrix-green">$</span>
                  <span className="text-coffee">init</span>
                  <span className="text-text">communication.protocol</span>
                </div>
                <div className="text-muted ml-4">
                  <p className="mb-2"># Ready to collaborate on your next project?</p>
                  <p className="mb-2"># Let's brew some digital magic together!</p>
                  <div className="flex items-center gap-2 mt-4">
                    <Coffee className="w-4 h-4 text-coffee" />
                    <span className="text-coffee">Currently accepting new projects...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative z-10 py-8">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-mono text-matrix-green mb-2">
                  <Terminal className="w-4 h-4" />
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-matrix-green transition-colors font-mono ${
                    errors.name ? 'border-error' : 'border-matrix-green/20'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-error text-orange-700 text-sm mt-1 font-mono">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-mono text-matrix-green mb-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-matrix-green transition-colors font-mono ${
                    errors.email ? 'border-error' : 'border-matrix-green/20'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-error text-orange-700 text-sm mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-mono text-matrix-green mb-2">
                  <Code className="w-4 h-4" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-surface border rounded-lg focus:outline-none focus:ring-2 focus:ring-matrix-green transition-colors resize-vertical font-mono ${
                    errors.message ? 'border-error' : 'border-matrix-green/20'
                  }`}
                  placeholder="// Tell me about your project or just say hello..."
                />
                {errors.message && (
                  <p className="text-error text-orange-700 text-sm mt-1 font-mono">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                {errors.submit && (
                  <p className="text-error text-orange-700 text-sm mb-4 font-mono">{errors.submit}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-matrix-green text-matrix-dark rounded-lg hover:bg-matrix-green/90 focus:outline-none focus:ring-2 focus:ring-matrix-green focus:ring-offset-2 focus:ring-offset-bg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono font-semibold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Code className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Alternative Contact Info */}
      <section className="relative z-10 py-16 bg-surface/50 backdrop-blur-sm">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Terminal-style header */}
            <div className="mb-8 p-4 bg-surface border border-matrix-green/20 rounded-lg font-mono text-sm">
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="w-4 h-4 text-coffee" />
                <span className="text-coffee">alternative.connections.available()</span>
              </div>
              <div className="text-muted">
                <p>// Multiple channels for seamless communication</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <a 
                href={`mailto:${siteConfig.contactEmail || 'hello@example.com'}`}
                className="p-6 bg-surface border border-matrix-green/20 rounded-lg hover:border-matrix-green/50 transition-colors group backdrop-blur-sm"
              >
                <div className="w-8 h-8 mx-auto mb-4 text-matrix-green">
                  <Mail className="w-full h-full" />
                </div>
                <h3 className="font-mono font-semibold mb-2 group-hover:text-matrix-green transition-colors">
                  Email
                </h3>
                <p className="text-muted text-sm font-mono">
                  {siteConfig.contactEmail || 'hello@example.com'}
                </p>
              </a>
              
              <a 
                href={siteConfig.linkedinUrl || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-surface border border-matrix-green/20 rounded-lg hover:border-matrix-green/50 transition-colors group backdrop-blur-sm"
              >
                <div className="w-8 h-8 mx-auto mb-4 text-matrix-green">
                  <Linkedin className="w-full h-full" />
                </div>
                <h3 className="font-mono font-semibold mb-2 group-hover:text-matrix-green transition-colors">
                  LinkedIn
                </h3>
                <p className="text-muted text-sm font-mono">
                  Connect professionally
                </p>
              </a>
            </div>
            
            {/* Coffee break terminal */}
            <div className="mt-8 p-4 bg-surface border border-coffee/20 rounded-lg font-mono text-sm">
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="w-4 h-4 text-coffee" />
                <span className="text-coffee">{'while(waiting) { brewCoffee(); }'}</span>
              </div>
              <div className="text-muted">
                <p>// Looking forward to hearing from you!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
