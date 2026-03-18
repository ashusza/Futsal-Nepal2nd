"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useMouseTilt } from "@/hooks/useMouseTilt";

export default function FeatureLobby() {
  const { ref: containerRef, inView } = useInView(0.3);
  const tiltRef = useMouseTilt(6); // subtle float interaction

  // Counter removed as per request

  return (
    <section id="lobby" ref={containerRef} className="relative w-full min-h-[80vh] bg-[#0D0D10] flex items-center justify-center overflow-hidden py-24 [perspective:1000px]">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1 — Dot grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%)'
          }}
        />

        {/* Layer 2 — Bottom right glow */}
        <div 
          className="absolute -right-[100px] -bottom-[100px] rounded-full"
          style={{
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
      </div>
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
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
            className="font-heading text-6xl md:text-[88px] text-white leading-[0.9] mb-6"
          >
            NO TEAM?<br />
            <span className="text-primary drop-shadow-glow-red">NO PROBLEM.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-body text-lg md:text-xl text-muted max-w-md"
          >
            Find your squad. Fill your team. Play tonight.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
             transition={{ delay: 0.6, duration: 0.6 }}
             className="mt-12 flex items-center gap-4"
          >
            <span className="font-mono text-4xl text-white">
              SQUADS
            </span>
            <span className="font-mono text-[10px] text-primary tracking-widest uppercase">
              JOIN<br/>ANYTIME
            </span>
          </motion.div>
        </motion.div>


        {/* Right 3D Visual Panel: Abstract Avatar Grid */}
        <div className="relative w-full aspect-square flex items-center justify-center [perspective:800px] z-10">
          
          <motion.div 
            ref={tiltRef} 
            initial={{ y: 60, scale: 0.9, opacity: 0 }}
            animate={inView ? { y: 0, scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[400px] p-8 border border-[#2A2A2D] bg-[#141417] shadow-2xl flex flex-col items-center justify-center gap-6"
          >
             {/* Abstract Venue Info */}
             <div className="w-full flex items-center justify-between opacity-50 blur-[2px]">
               <div className="w-24 h-2 bg-muted rounded-full" />
               <div className="w-16 h-2 bg-muted/60 rounded-full" />
             </div>
             
             {/* Player Grid */}
             <div className="grid grid-cols-4 gap-4 w-full">
                {/* 5 Filled Slots */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`filled-${i}`}
                    initial={{ rotateZ: -10, scale: 0.8, opacity: 0 }}
                    animate={inView ? { rotateZ: 0, scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5, type: "spring" }}
                    className="aspect-square rounded-full bg-gradient-to-br from-white/20 to-primary/20 border border-white/10"
                  />
                ))}

                {/* 2 Empty Pulsing Slots */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={`empty-${i}`}
                    initial={{ rotateZ: 10, scale: 0.8, opacity: 0 }}
                    animate={inView ? { rotateZ: 0, scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.5, type: "spring" }}
                    className="relative aspect-square rounded-full border border-dashed border-primary"
                  >
                     <div className="absolute inset-x-0 bottom-0 top-[30%] bg-primary/20 blur-md rounded-full animate-pulse-dot" />
                  </motion.div>
                ))}

                {/* 1 Locked Slot */}
                 <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    className="aspect-square rounded-full bg-surface-2 border border-[#2A2A2D] flex items-center justify-center"
                  >
                     <div className="w-1.5 h-1.5 rounded-full bg-muted" />
                  </motion.div>
             </div>

             <div className="w-full h-8 mt-4 bg-primary/10 border border-primary/20 flex flex-col justify-center opacity-40 blur-[1px]">
               <div className="w-1/2 h-1 bg-primary mx-auto rounded-full" />
             </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
