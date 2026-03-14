"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export default function InvestorStrip() {
  const { ref, inView } = useInView(0.3);

  const [counters, setCounters] = useState({
    market: 0,
    players: 0,
    venues: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = duration / 16;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        // Ease out quad
        const easeProgress = progress * (2 - progress);

        setCounters({
          market: Math.min(2, Math.floor(easeProgress * 2)),
          players: Math.min(500000, Math.floor(easeProgress * 500000)),
          venues: Math.min(50, Math.floor(easeProgress * 50)),
          revenue: Math.min(3, Math.floor(easeProgress * 3)),
        });

        if (currentStep >= steps) clearInterval(timer);
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section ref={ref} className="w-full bg-[#0A0A0C] border-t border-primary/30 py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* Background ambient red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[120px] bg-primary/10 blur-[60px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="font-mono text-[11px] text-primary tracking-[0.2em] mb-4">
            FOR INVESTORS
          </div>
          <h2 className="font-heading text-5xl md:text-7xl text-white leading-none">
            THE MARKET<br />
            IS WAITING.
          </h2>
        </motion.div>

        {/* Numbers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 w-full border border-[#2A2A2D]">
          
          <div className="flex flex-col items-center justify-center p-8 md:p-12 border-b border-r border-[#2A2A2D] md:border-b-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-heading text-5xl md:text-6xl text-white mb-2"
            >
              NPR {counters.market}Cr+
            </motion.div>
            <div className="text-center">
              <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Market Size</div>
              <div className="font-mono text-[10px] text-muted/60 tracking-widest uppercase">Year 1 TAM</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 md:p-12 border-b border-[#2A2A2D] md:border-b-0 md:border-r">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-heading text-5xl md:text-6xl text-white mb-2"
            >
              {counters.players.toLocaleString()}+
            </motion.div>
            <div className="text-center">
              <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Active</div>
              <div className="font-mono text-[10px] text-muted/60 tracking-widest uppercase">Futsal Players</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 md:p-12 border-r border-[#2A2A2D]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-heading text-5xl md:text-6xl text-white mb-2"
            >
              {counters.venues}+
            </motion.div>
            <div className="text-center">
              <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Venue</div>
              <div className="font-mono text-[10px] text-muted/60 tracking-widest uppercase">Partners Target Y1</div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="font-heading text-5xl md:text-6xl text-white mb-2"
            >
              {counters.revenue}
            </motion.div>
            <div className="text-center">
               <div className="font-mono text-[10px] text-muted tracking-widest uppercase mb-1">Revenue</div>
               <div className="font-mono text-[10px] text-muted/60 tracking-widest uppercase">Streams</div>
            </div>
          </div>

        </div>

        {/* Revenue Streams Abstract Pills */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
           transition={{ delay: 1.0, duration: 0.6 }}
           className="flex flex-wrap justify-center gap-4 mt-12 mb-16"
        >
           {["BOOKING COMMISSIONS", "VENUE SUBSCRIPTIONS", "TOURNAMENT FEES"].map((stream, i) => (
             <div key={i} className="bg-surface border border-primary/40 px-6 py-3 font-mono text-[11px] text-white tracking-widest uppercase">
               {stream}
             </div>
           ))}
        </motion.div>

        {/* CTA */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
           transition={{ delay: 1.2, duration: 0.6 }}
           className="flex flex-col items-center gap-4"
        >
          <button className="group relative bg-transparent border border-white text-white font-heading text-xl tracking-[0.1em] px-10 py-4 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_100%,0_100%)] hover:bg-white hover:text-background transition-colors duration-300">
            PARTNER WITH US
          </button>
          <a href="mailto:investor@futsalnepal.com" className="font-mono text-[11px] text-muted hover:text-white transition-colors tracking-widest">
            investor@futsalnepal.com
          </a>
        </motion.div>

      </div>
    </section>
  );
}
