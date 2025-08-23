"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/Button"
import { Icon } from "@/components/ui/Icon"
import { Github, Linkedin, Twitter, Mail, ArrowUp, Instagram } from "lucide-react"
import { siteConfig } from "@/lib/data"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Email',
      href: `mailto:${siteConfig.contactEmail}`,
      icon: Mail,
    },
    {
      name: 'GitHub',
      href: siteConfig.githubUsername
        ? `https://github.com/${siteConfig.githubUsername}`
        : 'https://github.com',
      icon: Github,
    },
    {
      name: 'LinkedIn',
      href: siteConfig.linkedinUrl || 'https://linkedin.com/in/melihzafer',
      icon: Linkedin,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/melihzafer_',
      icon: Instagram,
    },
  ]

  const quickLinks = [
    { name: 'Works', href: '/works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container">
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <Link 
                href="/" 
                className="font-display font-bold text-2xl mb-4 block hover:text-accent transition-colors"
              >
                MZH
              </Link>
              <p className="text-muted text-sm max-w-md leading-relaxed mb-6">
                Building digital experiences that combine beautiful design 
                with robust functionality. Let's create something amazing together.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(social.href, social.href.startsWith('mailto:') ? '_self' : '_blank')}
                    aria-label={social.name}
                    className="hover:text-accent"
                  >
                    <Icon icon={social.icon} size="sm" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-muted text-sm hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <div className="flex justify-start md:justify-end">
              <Button 
                variant="outline" 
                className="group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
                <Icon icon={ArrowUp} size="sm" className="group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted text-sm">
              © {currentYear} Melih Zafer Hyusein. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted">
              <Link href="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
