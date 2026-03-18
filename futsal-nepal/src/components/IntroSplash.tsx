"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function IntroSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    const handleScroll = () => {
      if (window.scrollY > 60) {
        setShow(false);
        document.body.style.overflow = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split text for letter animation
  const title1 = "GAME".split("");
  const title2 = "CIRCLE".split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[150] bg-background flex flex-col items-center justify-center overflow-hidden [perspective:800px]"
        >
          {/* Central Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.12),transparent_60%)] pointer-events-none" />

          {/* SVG Pitch Background Layer */}
          <svg 
            viewBox="0 0 1440 900" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.07, zIndex: 1, pointerEvents: 'none' }}
          >
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="0.8" fill="rgba(16,185,129,0.4)" />
              </pattern>
            </defs>
            
            {/* Dot Grid */}
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* 1. OUTER BOUNDARY RECTANGLE */}
            <rect 
              x="120" y="60" width="1200" height="780" 
              stroke="#10B981" fill="none" strokeWidth="1.5" strokeLinecap="round"
              style={{
                strokeDasharray: '3240',
                strokeDashoffset: '3240',
                animation: 'drawLine 2.0s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '0.2s',
                // @ts-ignore
                '--dash-length': '3240'
              }}
            />

            {/* 2. CENTER VERTICAL LINE */}
            <line 
              x1="720" y1="60" x2="720" y2="840" 
              stroke="#10B981" fill="none" strokeWidth="0.8" strokeLinecap="round"
              style={{
                strokeDasharray: '780',
                strokeDashoffset: '780',
                animation: 'drawLine 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '0.4s',
                // @ts-ignore
                '--dash-length': '780'
              }}
            />

            {/* 3. CENTER CIRCLE */}
            <circle 
              cx="720" cy="450" r="120" 
              stroke="#10B981" fill="none" strokeWidth="0.8" strokeLinecap="round"
              style={{
                strokeDasharray: '754',
                strokeDashoffset: '754',
                animation: 'drawLine 2.0s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '0.6s',
                // @ts-ignore
                '--dash-length': '754'
              }}
            />

            {/* 4. CENTER SPOT */}
            <circle 
              cx="720" cy="450" r="5" 
              fill="#10B981"
              style={{
                opacity: 0,
                animation: 'fadeIn 0.3s ease forwards',
                animationDelay: '1.4s'
              }}
            />

            {/* 5. LEFT PENALTY AREA */}
            <rect 
              x="120" y="270" width="220" height="360" 
              stroke="#10B981" fill="none" strokeWidth="0.8" strokeLinecap="round"
              style={{
                strokeDasharray: '1160',
                strokeDashoffset: '1160',
                animation: 'drawLine 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '0.8s',
                // @ts-ignore
                '--dash-length': '1160'
              }}
            />

            {/* 6. RIGHT PENALTY AREA */}
            <rect 
              x="1100" y="270" width="220" height="360" 
              stroke="#10B981" fill="none" strokeWidth="0.8" strokeLinecap="round"
              style={{
                strokeDasharray: '1160',
                strokeDashoffset: '1160',
                animation: 'drawLine 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '0.8s',
                // @ts-ignore
                '--dash-length': '1160'
              }}
            />

            {/* 7. LEFT GOAL */}
            <rect 
              x="120" y="360" width="60" height="180" 
              stroke="#10B981" fill="none" strokeWidth="1.2" strokeLinecap="round"
              style={{
                strokeDasharray: '480',
                strokeDashoffset: '480',
                animation: 'drawLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '1.0s',
                // @ts-ignore
                '--dash-length': '480'
              }}
            />

            {/* 8. RIGHT GOAL */}
            <rect 
              x="1260" y="360" width="60" height="180" 
              stroke="#10B981" fill="none" strokeWidth="1.2" strokeLinecap="round"
              style={{
                strokeDasharray: '480',
                strokeDashoffset: '480',
                animation: 'drawLine 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: '1.0s',
                // @ts-ignore
                '--dash-length': '480'
              }}
            />

            {/* 9. LEFT PENALTY SPOT */}
            <circle 
              cx="280" cy="450" r="5" 
              fill="#10B981"
              style={{
                opacity: 0,
                animation: 'fadeIn 0.3s ease forwards',
                animationDelay: '1.6s'
              }}
            />

            {/* 10. RIGHT PENALTY SPOT */}
            <circle 
              cx="1160" cy="450" r="5" 
              fill="#10B981"
              style={{
                opacity: 0,
                animation: 'fadeIn 0.3s ease forwards',
                animationDelay: '1.6s'
              }}
            />

            {/* 11. CORNER ARCS */}
            <path d="M120 80 A20 20 0 0 1 140 60" stroke="#10B981" fill="none" strokeWidth="0.8" strokeLinecap="round" style={{ strokeDasharray: '32', strokeDashoffset: '32', animation: 'drawLine 0.8s ease forwards', animationDelay: '1.2s', '--dash-length': '32' } as any} />
            <path d="M1300 60 A20 20 0 0 1 1320 80" stroke="#10B981" fill="none" strokeWidth="0.8" strokeLinecap="round" style={{ strokeDasharray: '32', strokeDashoffset: '32', animation: 'drawLine 0.8s ease forwards', animationDelay: '1.3s', '--dash-length': '32' } as any} />
            <path d="M1320 820 A20 20 0 0 1 1300 840" stroke="#10B981" fill="none" strokeWidth="0.8" strokeLinecap="round" style={{ strokeDasharray: '32', strokeDashoffset: '32', animation: 'drawLine 0.8s ease forwards', animationDelay: '1.4s', '--dash-length': '32' } as any} />
            <path d="M140 840 A20 20 0 0 1 120 820" stroke="#10B981" fill="none" strokeWidth="0.8" strokeLinecap="round" style={{ strokeDasharray: '32', strokeDashoffset: '32', animation: 'drawLine 0.8s ease forwards', animationDelay: '1.5s', '--dash-length': '32' } as any} />
          </svg>

          {/* Initial red expanding line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-px bg-primary z-0 origin-center"
          />

          <div className="relative z-10 flex flex-col items-center">
            <h1 className="flex font-metal text-6xl md:text-9xl text-white tracking-widest leading-none mb-2">
              {title1.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: -50, opacity: 0, rotateX: -20 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.06,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
            <h1 className="flex font-metal text-6xl md:text-9xl text-primary tracking-widest leading-none relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl z-[-1]" />
              {title2.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: -50, opacity: 0, rotateX: -20 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    // title2 starts after title1 finishes (0.8 + (6 * 0.06) = ~1.16) + 0.1s delay ≈ 1.4s
                    delay: 1.4 + i * 0.06,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block relative z-10 drop-shadow-glow-red"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 1 }}
              className="mt-6 font-mono text-[10px] md:text-xs text-muted tracking-[0.3em]"
            >
              - Nepal First Futsal PLATFORM
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="font-mono text-[10px] text-muted tracking-widest uppercase"
            >
              SCROLL TO ENTER
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="text-muted w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
