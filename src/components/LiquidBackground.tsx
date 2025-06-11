'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LiquidBackground() {
  const [mounted, setMounted] = useState(false);
  
  // Use motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add spring animation for smooth following
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [mouseX, mouseY]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      {/* Base black background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* SATU BULETAN BESAR - Purple TERANG tapi buram */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(126, 34, 206, 0.45) 25%, rgba(139, 92, 246, 0.35) 40%, rgba(107, 33, 168, 0.25) 60%, rgba(88, 28, 135, 0.15) 80%, transparent 100%)',
          left: x,
          top: y,
          translateX: '-300px',
          translateY: '-300px',
          filter: 'blur(6px)', // Sedikit kurangi blur agar lebih terang
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      />

      {/* Static ambient particles - lebih terang */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(126, 34, 206, 0.25) 50%, transparent 80%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(147, 51, 234, 0.3) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-2/3 left-1/6 w-28 h-28 rounded-full blur-xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(147, 51, 234, 0.3) 60%, transparent 80%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-1/6 right-1/4 w-36 h-36 rounded-full blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(107, 33, 168, 0.25) 50%, transparent 75%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  );
}
