"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useMouseTilt } from "@/hooks/useMouseTilt";

export default function FeatureRewards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView(0.3);
  const tiltRef = useMouseTilt(12);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="rewards" ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0C] flex items-center justify-center overflow-hidden py-24 [perspective:1000px]">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1 — Horizontal streak lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {[15, 25, 40, 50, 60, 70, 80, 90].map((y, i) => (
            <line 
              key={i}
              x1="0" 
              y1={`${y}%`} 
              x2="100%" 
              y2={`${y}%`} 
              stroke="rgba(16,185,129,0.04)" 
              strokeWidth="1" 
              strokeDasharray="4 120" 
              strokeDashoffset={i * 40}
            />
          ))}
        </svg>

        {/* Layer 2 — Left bloom glow */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '400px', height: '600px',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.07), transparent 65%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

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
              Every game counts toward something bigger,
              Which you deserved.
            </motion.p>
          </div>
        </motion.div>

        {/* Right 3D Visual Panel (Reworked) */}
        <div className="relative w-full flex items-center justify-center lg:justify-end z-10">
          <motion.div 
            ref={tiltRef} 
            className="relative flex flex-col items-center lg:items-start"
          >
            {/* Label Above */}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-[10px] text-[#52525B] tracking-[0.2em] uppercase mb-4"
            >
              YOUR PROGRESS
            </motion.span>

            {/* Trophy SVG Structure */}
            <div className="relative flex items-center justify-center">
              {/* Radial glow fading in behind trophy */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_65%)] pointer-events-none"
                style={{ width: '300px', height: '300px', filter: 'blur(40px)' }}
              />

              {/* Star Radial Glow */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ delay: 1.4, duration: 0.4 }}
                className="absolute left-1/2 top-[16px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                style={{ width: '60px', height: '60px' }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-[radial-gradient(circle,rgba(16,185,129,0.4),transparent_70%)] rounded-full"
                />
              </motion.div>

              {/* Particle Burst */}
              {inView && [...Array(8)].map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                const endX = Math.cos(angle) * 70;
                const endY = Math.sin(angle) * 70;
                return (
                  <motion.div
                    key={`particle-${i}`}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: endX, y: endY, opacity: 0 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 w-[3px] h-[3px] bg-primary z-30 pointer-events-none"
                    style={{ marginLeft: '-1.5px', marginTop: '-1.5px' }}
                  />
                )
              })}

              <svg viewBox="0 0 150 190" width="220" height="280" className="relative z-10 overflow-visible">
                {/* Part 1 BASE */}
                <motion.rect 
                  x="20" y="160" width="110" height="12" fill="#10B981"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "50% 100%" }}
                />

                {/* Part 2 STEM */}
                <motion.rect 
                  x="60" y="120" width="30" height="40" fill="#10B981"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={inView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  style={{ transformOrigin: "50% 100%" }}
                />

                {/* Part 3 LEFT HANDLE */}
                <motion.path 
                  d="M 30 60 Q 10 80 30 100 L 50 100 Q 35 80 50 60 Z" fill="#10B981"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  style={{ transformOrigin: "50px 80px" }}
                />

                {/* Part 4 RIGHT HANDLE */}
                <motion.path 
                  d="M 120 60 Q 140 80 120 100 L 100 100 Q 115 80 100 60 Z" fill="#10B981"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  style={{ transformOrigin: "100px 80px" }}
                />

                {/* Part 5 CUP BODY */}
                <motion.path 
                  d="M 40 20 L 30 60 L 50 100 L 100 100 L 120 60 L 110 20 Z" fill="#10B981"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  style={{ transformOrigin: "75px 100px" }}
                />

                {/* Part 6 STAR */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                  style={{ transformOrigin: "75px 10px" }}
                >
                  <motion.polygon
                    points="75,-4 78.29,3.71 86.41,3.71 79.86,8.46 82.35,16.29 75,11.53 67.65,16.29 70.14,8.46 63.59,3.71 71.71,3.71"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "75px 10px" }}
                  />
                </motion.g>
              </svg>
            </div>

            {/* 9 / 10 Games Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="font-heading text-5xl text-primary drop-shadow-glow-red mt-2 flex flex-col items-center lg:items-start"
            >
              9 / 10 GAMES
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="font-mono text-[10px] text-white/30 tracking-[0.15em] uppercase mt-1"
              >
                ★ ONE MORE GAME FOR THE STAR
              </motion.div>
            </motion.div>

            {/* Redacted Reward Block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-6 space-y-2 flex flex-col items-center lg:items-start"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12px] text-[#52525B]">GAME 10 UNLOCKS A FREE —</span>
                <div className="w-[120px] h-[16px] bg-primary opacity-90 shadow-glow-red-sm relative overflow-hidden">
                   {/* Static noise / texture for the redaction bar */}
                   <div className="absolute inset-0 bg-black/20 mix-blend-overlay opacity-50" />
                </div>
              </div>
              <div className="font-mono text-[10px] text-[#3A3A3F] tracking-[0.2em] uppercase mt-1">
                PLAY TO FIND OUT.
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}

