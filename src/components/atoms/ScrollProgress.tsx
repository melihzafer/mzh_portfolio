"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
  height?: string;
}

export default function ScrollProgress({ 
  className = "", 
  height = "2px" 
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-50 bg-gray-800 ${className}`}
      style={{ height }}
    >
      <motion.div
        className="h-full bg-accent origin-left"
        style={{ scaleX: scrollProgress }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      />
    </div>
  );
}
