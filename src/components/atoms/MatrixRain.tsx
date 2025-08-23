'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function MatrixRain() {
  const [mounted, setMounted] = useState(false);
  const [streams, setStreams] = useState<
    { left: number; delay: number; duration: number; chars: string[] }[]
  >([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    if (reduce) return;
    const s = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      chars: Array.from({ length: 10 }).map(
        () => String.fromCharCode(Math.floor(Math.random() * 94) + 33)
      ),
    }));
    setStreams(s);
  }, [reduce]);

  if (!mounted || reduce) return null;

  return (
    <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden">
      {streams.map((stream, i) => (
        <motion.div
          key={i}
          className="absolute text-matrix-green font-mono text-sm"
          style={{ left: `${stream.left}%`, top: `-10%` }}
          animate={{ y: ['0vh', '110vh'], opacity: [0, 1, 0] }}
          transition={{
            duration: stream.duration,
            repeat: Infinity,
            delay: stream.delay,
            ease: 'linear',
          }}
        >
          {stream.chars.map((ch, j) => (
            <div key={j} className="block">
              {ch}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
