"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface SkillBarProps {
  label: string;
  value: number; // 0-100
  className?: string;
  color?: string;
  animationDelay?: number;
}

export default function SkillBar({ 
  label, 
  value, 
  className = "",
  color = "accent",
  animationDelay = 0
}: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text">{label}</span>
        <span 
          className="text-sm font-mono text-muted"
          aria-live="polite"
        >
          {value}%
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-${color} rounded-full relative overflow-hidden transition-all duration-300`}
          style={{ width: isInView ? `${value}%` : '0%' }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{ 
              animationDelay: `${animationDelay}ms`,
              animationDuration: '0s'
            }}
          />
        </div>
      </div>
    </div>
  );
}
