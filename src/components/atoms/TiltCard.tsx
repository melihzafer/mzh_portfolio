"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  disableOnMobile?: boolean;
}

export default function TiltCard({ 
  children, 
  className = "",
  maxTilt = 5,
  scale = 1.02,
  disableOnMobile = true
}: TiltCardProps) {
  const [tiltStyle, setTiltStyle] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableOnMobile && isMobile) return;
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / rect.height) * maxTilt * -1;
    const rotateY = (mouseX / rect.width) * maxTilt;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out',
    });
  };

  const shouldApplyTilt = !disableOnMobile || !isMobile;

  return (
    <motion.div
      ref={cardRef}
      className={`transform-gpu ${className}`}
      style={shouldApplyTilt ? tiltStyle : {}}
      onMouseMove={shouldApplyTilt ? handleMouseMove : undefined}
      onMouseLeave={shouldApplyTilt ? handleMouseLeave : undefined}
      whileHover={shouldApplyTilt ? undefined : { scale: 1.01 }}
    >
      {children}
    </motion.div>
  );
}
