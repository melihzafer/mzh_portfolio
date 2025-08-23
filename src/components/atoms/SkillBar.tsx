"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 1000; // 1 second animation
        const steps = 60; // 60fps
        const increment = value / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            current = value;
            clearInterval(interval);
          }
          setAnimatedValue(Math.round(current));
        }, duration / steps);

        return () => clearInterval(interval);
      }, animationDelay);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, animationDelay]);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text">{label}</span>
        <span 
          className="text-sm font-mono text-muted"
          aria-live="polite"
        >
          {animatedValue}%
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-${color} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: animationDelay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "100%" } : { x: "-100%" }}
            transition={{ 
              duration: 1.5, 
              delay: animationDelay + 0.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
