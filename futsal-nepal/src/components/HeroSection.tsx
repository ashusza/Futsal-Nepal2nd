"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useMouseTilt(8); // max tilt 8deg

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  // 3D Exit Transition (Hero tilts away smoothly)
  const heroRotateX = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-screen [perspective:1200px]">
      <motion.section
        style={{
          rotateX: heroRotateX,
          scale: heroScale,
          opacity: opacity,
          transformOrigin: "bottom center",
        }}
        className="relative w-full h-full flex flex-col justify-center overflow-hidden"
      >
        {/* Background Video / Image Fallback */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/70 to-[#0A0A0C]/85 z-10" />
          <div className="absolute inset-0 bg-surface-2 animate-ken-burns bg-cover bg-center" style={{ backgroundImage: "url('/images/placeholder-court.jpg')" }} />
          {/* Replace with video if provided: */}
          <video
            src="/video/hero-reel.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-[5] opacity-50"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col pb-20 pt-32">
          
          <motion.div style={{ y: textY }} className="max-w-4xl" ref={headlineRef}>
            <div className="flex flex-col gap-0 select-none">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-7xl md:text-[140px] text-white leading-[0.85] m-0"
              >
                BOOK.
              </motion.h1>
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-7xl md:text-[140px] text-white/55 leading-[0.85] m-0"
              >
                PLAY.
              </motion.h1>
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-7xl md:text-[140px] text-primary drop-shadow-glow-red leading-[0.85] m-0"
              >
                WIN.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="mt-8 max-w-lg font-body text-lg md:text-xl text-white/55"
            >
              Nepal&apos;s first elite futsal booking, rewards & tournament platform.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Bar Elements */}
        <div className="absolute bottom-10 left-0 w-full px-6 md:px-12 z-30 flex flex-col sm:flex-row justify-between items-end gap-6 pb-4">
          
          {/* Live Counter Pill */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex items-center gap-3 bg-[rgba(20,20,23,0.8)] backdrop-blur-md border border-[rgba(230,25,43,0.3)] px-4 py-2"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
            <span className="font-mono text-xs text-white tracking-widest uppercase">
              1,432 WAITING
            </span>
          </motion.div>

          {/* Center Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="hidden md:flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[11px] text-muted tracking-widest uppercase">SCROLL</span>
            <div className="w-[1px] h-12 bg-muted/30 overflow-hidden relative">
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-[50%] bg-primary"
              />
            </div>
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="group relative bg-primary text-white font-heading text-xl tracking-[0.1em] px-8 py-4 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_100%,0_100%)] hover:scale-[1.02] transition-transform duration-300"
          >
            <span className="relative z-10">SECURE EARLY ACCESS</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
