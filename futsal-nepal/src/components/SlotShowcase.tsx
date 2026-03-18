"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useMouseTilt } from "@/hooks/useMouseTilt";

export default function SlotShowcase() {
  const { ref, inView } = useInView(0.2);
  const tiltRef = useMouseTilt(8); // mild hover tracking

  return (
    <section id="features" ref={ref} className="relative w-full min-h-screen bg-[#0A0A0C] flex items-center justify-center py-24 overflow-hidden [perspective:1000px]">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1 — Hexagon pattern SVG */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse">
              <path d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z" fill="none" stroke="rgba(16,185,129,0.04)" strokeWidth="0.8" />
              <path d="M28 50 L56 66 L56 98 L28 114 L0 98 L0 66 Z" fill="none" stroke="rgba(16,185,129,0.04)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" style={{ maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)' }} />
        </svg>

        {/* Layer 2 — Right side glow */}
        <div 
          className="absolute -right-[100px] top-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Copy Panel */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col z-10"
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
            YOUR SLOT.<br />
            <span className="text-primary drop-shadow-glow-red">YOUR RULES.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-body text-lg md:text-xl text-muted max-w-md"
          >
            Real-time availability. Instant booking. No calls. No waiting.
          </motion.p>
        </motion.div>


        {/* Right UI Mockup (Protected presentation) */}
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            ref={tiltRef}
            initial={{ x: 120, rotateY: 20, rotateX: 5, opacity: 0 }}
            animate={inView ? { x: 0, rotateY: -8, rotateX: 3, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
            className="w-full max-w-lg bg-surface border border-[#2A2A2D] shadow-2xl relative transition-shadow duration-500 hover:shadow-glow-red hover:border-primary/50"
          >
            {/* Top Tabs */}
            <div className="flex w-full border-b border-[#2A2A2D]">
              <div className="flex-1 py-4 text-center font-mono text-xs tracking-widest bg-primary text-white border-b-2 border-white">
                5-A-SIDE
              </div>
              <div className="flex-1 py-4 text-center font-mono text-xs tracking-widest text-muted border-b-2 border-transparent">
                6-A-SIDE
              </div>
              <div className="flex-1 py-4 text-center font-mono text-xs tracking-widest text-muted border-b-2 border-transparent">
                7-A-SIDE
              </div>
            </div>

            {/* Slots List */}
            <div className="p-6 flex flex-col gap-4">
              {/* Row 1 - Booked */}
              <div className="flex items-center justify-between p-4 bg-[#0A0A0C] border border-[#2A2A2D] opacity-60">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-muted">06:00 AM – 10:00 AM</span>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="font-mono text-[10px] text-muted uppercase">BOOKED</span>
                  </div>
                  <span className="font-heading text-xl text-muted mix-blend-multiply opacity-0">Rs 1,200</span>
                </div>
              </div>

              {/* Row 2 - Available */}
              <div className="group flex items-center justify-between p-4 bg-[#0A0A0C] border border-[#2A2A2D] hover:border-primary transition-colors cursor-pointer relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-center" />
                <div className="flex items-center gap-4 relative z-10 pl-2">
                  <span className="font-mono text-sm text-white">06:00 PM – 09:00 PM</span>
                  <span className="px-2 py-0.5 border border-primary/30 text-[9px] font-mono text-primary uppercase">PEAK</span>
                </div>
                <div className="flex items-center gap-5 text-right relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                    <span className="font-mono text-[10px] text-green-500 uppercase tracking-wider">AVAILABLE</span>
                  </div>
                  <span className="font-heading text-2xl text-white">Rs 1,200</span>
                </div>
              </div>

              {/* Row 3 - Available Off Peak */}
               <div className="group flex items-center justify-between p-4 bg-[#0A0A0C] border border-[#2A2A2D] hover:border-primary transition-colors cursor-pointer relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-center" />
                <div className="flex items-center gap-4 relative z-10 pl-2">
                  <span className="font-mono text-sm text-white">10:00 AM – 06:00 PM</span>
                  <span className="px-2 py-0.5 border border-muted text-[9px] font-mono text-muted uppercase">OFF-PEAK</span>
                </div>
                <div className="flex items-center gap-5 text-right relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="font-mono text-[10px] text-green-500 uppercase tracking-wider">AVAILABLE</span>
                  </div>
                  <span className="font-heading text-2xl text-white">Rs 1,000</span>
                </div>
              </div>

            </div>

             {/* Bottom Button Action Placeholder */}
             <div className="p-6 pt-2 pb-10">
                <button className="w-full bg-primary text-white font-heading text-xl py-4 hover:bg-white hover:text-primary transition-colors tracking-widest [clip-path:polygon(0_0,calc(100%-12px)_0,100%_100%,0_100%)]">
                  BOOK THIS SLOT
                </button>
             </div>

            {/* Gradient Mask to Hide Bottom Edge UI (Protection) */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />

          </motion.div>
        </div>

      </div>
    </section>
  );
}
