"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { Trophy } from "lucide-react";

export default function FeatureRewards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView(0.3);
  const tiltRef = useMouseTilt(12);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax rings
  const outerRingY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const middleRingY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

  // Animated Counter logic
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    if (inView) {
      // Animate from 0 to 847
      let start = 0;
      const end = 847;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setSessions(end);
          clearInterval(timer);
        } else {
          setSessions(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0C] flex items-center justify-center overflow-hidden py-24 [perspective:1000px]">
      
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(230,25,43,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(230,25,43,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

      <div ref={inViewRef} className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Copy Panel */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col z-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-mono text-[11px] text-muted tracking-[0.2em] mb-6"
          >
            02 // LOYALTY SYSTEM
          </motion.div>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-heading text-6xl md:text-[88px] text-white leading-[0.9] mb-8"
          >
            THE MORE<br />
            YOU PLAY,<br />
            THE MORE<br />
            <span className="text-primary drop-shadow-glow-red">YOU EARN.</span>
          </motion.h2>

          <div className="flex flex-col gap-3 font-body text-lg md:text-xl text-muted max-w-md">
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
              Play. Accumulate. Unlock.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
              Every game counts toward something bigger. 
              Your next free session is closer than you think.
            </motion.p>
          </div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
             transition={{ delay: 0.6, duration: 0.6 }}
             className="mt-12 p-6 border border-primary/20 bg-primary/5 inline-flex flex-col w-fit"
          >
            <span className="font-mono text-[10px] text-primary tracking-widest uppercase mb-1">
              FREE SESSIONS EARNED
            </span>
            <span className="font-mono text-5xl text-white">
              {sessions.toLocaleString().padStart(4, '0')}
            </span>
          </motion.div>
        </motion.div>

        {/* Right 3D Visual Panel */}
        <div className="relative w-full aspect-square flex items-center justify-center [perspective:800px] z-10">
          <motion.div ref={tiltRef} className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
            
            {/* Outer dotted ring (Parallax Layer 3) */}
            <motion.div 
              style={{ y: outerRingY }}
              className="absolute inset-0 rounded-full border border-dashed border-white/5 animate-[spin_40s_linear_infinite]"
            />

            {/* Middle solid ring (Parallax Layer 2) */}
            <motion.div 
              style={{ y: middleRingY }}
              className="absolute inset-[10%] rounded-full border border-white/10"
            />

            {/* Core Progress Ring (Parallax Layer 1) */}
            <motion.div 
              style={{ y: contentY }}
              className="absolute inset-[20%] rounded-full"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-glow-red">
                {/* Track */}
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.06)" className="stroke-[2px]" />
                {/* Progress (Animated) */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="#E6192B"
                  strokeLinecap="round"
                  className="stroke-[3px]"
                  style={{ strokeDasharray: 301.59 }} // 2 * pi * 48
                  initial={{ strokeDashoffset: 301.59 }}
                  animate={inView ? { strokeDashoffset: 301.59 * (1 - 0.7) } : {}}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                />
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <Trophy className="w-10 h-10 text-primary animate-pulse" />
                <span className="font-heading text-4xl text-white tracking-widest">FREE</span>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
