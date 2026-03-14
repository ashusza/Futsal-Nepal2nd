"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { Bell, Zap, GitCommitVertical } from "lucide-react";

export default function FeatureTournaments() {
  const { ref, inView } = useInView(0.3);
  const tiltRef = useMouseTilt(5);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 0.5 + i * 0.2;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, duration: 1.2, bounce: 0 },
          opacity: { delay, duration: 0.1 }
        }
      };
    }
  };

  const featureCards = [
    {
      title: "INSTANT NOTIFICATIONS",
      icon: <Bell className="w-5 h-5 text-primary" />,
      delay: 0.6
    },
    {
      title: "ONE-TAP REGISTRATION",
      icon: <Zap className="w-5 h-5 text-primary" />,
      delay: 0.8
    },
    {
      title: "LIVE BRACKETS",
      icon: <GitCommitVertical className="w-5 h-5 text-primary" />,
      delay: 1.0
    }
  ];

  return (
    <section ref={ref} className="relative w-full min-h-screen bg-[#0A0A0C] flex items-center justify-center overflow-hidden py-24 border-t border-[#2A2A2D]/30">
      
      {/* Background Ghost Marquee */}
      <div className="absolute top-1/4 left-0 w-[200%] opacity-5 pointer-events-none select-none">
        <h2 className="font-heading text-[120px] md:text-[200px] text-white whitespace-nowrap animate-marquee">
          DOMINATE THE LEAGUE — DOMINATE THE LEAGUE — DOMINATE THE LEAGUE — DOMINATE THE LEAGUE — 
        </h2>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
        
        {/* Header content */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <div className="font-mono text-[11px] text-muted tracking-[0.2em] mb-4">
            03 // THE ARENA
          </div>
          <h2 className="font-heading text-6xl md:text-8xl text-white leading-none">
            YOUR CITY.<br />
            <span className="text-primary drop-shadow-glow-red-sm">YOUR TOURNAMENT.</span>
          </h2>
        </motion.div>

        {/* Abstract Bracket UI */}
        <motion.div 
          ref={tiltRef}
          className="relative w-full max-w-4xl aspect-[2/1] bg-[rgba(20,20,23,0.4)] backdrop-blur-sm border border-[#2A2A2D] p-8 md:p-12 mb-16 flex items-center justify-center isolate hover:shadow-glow-red hover:border-primary/40 transition-all duration-500"
        >
          {/* SVG Bracket Drawing */}
          <motion.svg 
            viewBox="0 0 800 400" 
            className="w-full h-full drop-shadow-[0_0_12px_rgba(230,25,43,0.4)]"
          >
            {/* Base grey paths */}
            <motion.path 
              d="M50,50 L200,50 L200,100 L350,100" 
              stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"
              variants={draw} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}
            />
            <motion.path 
              d="M50,150 L200,150 L200,100" 
              stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"
              variants={draw} custom={0} initial="hidden" animate={inView ? "visible" : "hidden"}
            />
            
            <motion.path 
              d="M50,250 L200,250 L200,300 L350,300" 
              stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"
              variants={draw} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}
            />
            <motion.path 
              d="M50,350 L200,350 L200,300" 
              stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none"
              variants={draw} custom={1} initial="hidden" animate={inView ? "visible" : "hidden"}
            />

            {/* Winning Red Path */}
            <motion.path 
              d="M350,100 L450,100 L450,200 L600,200 L750,200" 
              stroke="#E6192B" strokeWidth="2" fill="none"
              className="drop-shadow-glow-red"
              variants={draw} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}
            />
            <motion.path 
              d="M350,300 L450,300 L450,200" 
              stroke="#E6192B" strokeWidth="2" fill="none"
              className="drop-shadow-glow-red"
              variants={draw} custom={2} initial="hidden" animate={inView ? "visible" : "hidden"}
            />
            
            {/* Winner Node Circle */}
            <motion.circle 
              cx="750" cy="200" r="12" 
              fill="#E6192B" 
              className="drop-shadow-glow-red-intense"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 1.5, type: 'spring' }}
            />
          </motion.svg>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ delay: card.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface border border-[#2A2A2D] p-6 hover:-translate-y-2 hover:border-primary transition-all duration-300 group hover:shadow-glow-red-sm"
            >
              <div className="bg-background w-10 h-10 border border-[#2A2A2D] flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                {card.icon}
              </div>
              <h3 className="font-mono text-sm tracking-widest text-white">{card.title}</h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
