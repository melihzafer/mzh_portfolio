'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TypewriterEffectProps {
  phrases: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
}

export function TypewriterEffect({
  phrases,
  className = '',
  speed = 50,
  deleteSpeed = 30,
  pauseTime = 2000,
  loop = true
}: TypewriterEffectProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentPhrase = phrases[currentPhraseIndex];

  const typeText = useCallback(() => {
    if (!currentPhrase) return;

    if (!isDeleting) {
      // Typing forward
      if (currentText.length < currentPhrase.length) {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
      } else {
        // Finished typing current phrase
        if (phrases.length === 1 || !loop) {
          setIsCompleted(true);
          return;
        }
        
        setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(currentText.slice(0, -1));
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => 
          loop ? (prev + 1) % phrases.length : Math.min(prev + 1, phrases.length - 1)
        );
      }
    }
  }, [currentText, currentPhrase, isDeleting, phrases.length, pauseTime, loop]);

  useEffect(() => {
    if (isCompleted) return;

    const timer = setTimeout(
      typeText,
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timer);
  }, [typeText, isDeleting, speed, deleteSpeed, isCompleted]);

  // Reset when phrases change
  useEffect(() => {
    setCurrentText('');
    setCurrentPhraseIndex(0);
    setIsDeleting(false);
    setIsCompleted(false);
  }, [phrases]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="text-text">{currentText}</span>
      <motion.span
        className="ml-1 h-6 w-0.5 bg-accent"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        aria-hidden="true"
      />
      <span className="sr-only">{currentPhrase}</span>
    </span>
  );
}

export default TypewriterEffect;
