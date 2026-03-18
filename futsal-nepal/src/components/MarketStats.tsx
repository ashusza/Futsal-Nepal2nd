"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { label: "KATHMANDU PITCHES", value: "60+" },
 
  { label: "ACTIVE PLAYERS", value: "12K+" },
  { label: "MONTHLY MATCHES", value: "4K+" }
];

export default function MarketStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Breathing scale effect as section scrolls
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section 
      id="market" 
      ref={containerRef}
      className="relative w-full min-h-[80vh] bg-[#0A0A0C] px-6 py-24 md:px-20 md:py-32 flex items-center overflow-hidden"
    >
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1 — Green grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)"
          }}
        />

        {/* Layer 2 — Center explosion glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '800px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.12), transparent 65%)',
            filter: 'blur(60px)'
          }}
        />

        {/* Layer 3 — Corner vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, #0A0A0C 100%)'
          }}
        />
      </div>

      <motion.div 
        style={{ scale }}
        className="relative z-10 w-full max-w-[1200px] mx-auto"
      >
        {/* Top Animated Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ transformOrigin: "right" }}
          className="absolute -top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />

        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase"
          >
            THE MARKET GAP
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="font-heading text-5xl md:text-8xl text-white tracking-wider leading-[0.9]"
          >
            NEPAL IS READY.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-body text-base md:text-xl text-white/40 max-w-[560px]"
          >
            The game is growing. The players are waiting.
            The infrastructure is missing.
            Game Circle is the missing link.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative max-w-5xl mx-auto w-full">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`relative ${i === 2 ? 'col-span-2 lg:col-span-1 flex justify-center' : ''}`}>
              {/* Vertical Divider (Desktop Only) */}
              {i !== 0 && (
                <div className="hidden lg:block absolute left-[-24px] top-1/2 -translate-y-1/2 w-[1px] h-3/5 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="font-heading text-6xl md:text-8xl text-primary drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] leading-none transition-transform duration-300 group-hover:scale-105">
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] md:text-xs text-white/30 tracking-[0.2em] text-center uppercase mt-1">
                  {stat.label}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Animated Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2 }}
          style={{ transformOrigin: "left" }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent mt-20"
        />
      </motion.div>
    </section>
  );
}
