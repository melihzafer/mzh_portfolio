'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from "@/components/ui/Button"
import { Icon } from "@/components/ui/Icon"
import { Menu, X, ArrowRight } from "lucide-react"

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Works', href: '/works' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
      <nav className="container" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-display font-bold text-xl hover:text-accent transition-colors"
          >
            MZH
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-surface ${
                  pathname === item.href 
                    ? 'text-accent bg-surface font-medium' 
                    : 'text-muted hover:text-text'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button 
              onClick={() => window.open('/contact', '_self')}
              className="border-0 font-mono bg-matrix-green text-matrix-dark hover:bg-matrix-green/90 transition-all duration-200"
            >
              Let's Talk
              <Icon icon={ArrowRight} size="sm" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Icon icon={isMobileMenuOpen ? X : Menu} size="md" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-bg">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
                    pathname === item.href 
                      ? 'text-accent bg-surface font-medium' 
                      : 'text-muted hover:text-text hover:bg-surface'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="px-4 pt-4">
                <Button 
                  className="w-full border-0 font-mono bg-matrix-green text-matrix-dark hover:bg-matrix-green/90" 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.open('/contact', '_self');
                  }}
                >
                  Let's Talk
                  <Icon icon={ArrowRight} size="sm" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
