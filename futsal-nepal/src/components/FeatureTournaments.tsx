"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { Building2, BellRing, Users2 } from "lucide-react";

export default function FeatureTournaments() {
  const { ref, inView } = useInView(0.3);
  const tiltRef = useMouseTilt(5);

  const tournamentFeatures = [
    {
      title: "HOST A TOURNAMENT",
      desc: "Comprehensive tools for venue owners to manage dates, slots, and pricing.",
      icon: <Building2 className="w-6 h-6 text-primary" />,
      delay: 0.4
    },
    {
      title: "GET NOTIFIED",
      desc: "Players receive instant mobile alerts for new tournament openings.",
      icon: <BellRing className="w-6 h-6 text-primary" />,
      delay: 0.6
    },
    {
      title: "JOIN AS TEAM OR SOLO",
      desc: "Enter as a full squad or join the community pool to find teammates.",
      icon: <Users2 className="w-6 h-6 text-primary" />,
      delay: 0.8
    }
  ];

  return (
    <section id="tournaments" ref={ref} className="relative w-full min-h-screen bg-[#0A0A0C] flex items-center justify-center overflow-hidden py-24 border-t border-[#2A2A2D]/30">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1 — Spotlight effect */}
        <div 
          className="absolute -top-[200px] left-1/2 -translate-x-1/2"
          style={{
            width: '600px', height: '800px',
            background: 'conic-gradient(from 180deg at 50% 0%, transparent 60deg, rgba(16,185,129,0.06) 90deg, rgba(16,185,129,0.08) 180deg, rgba(16,185,129,0.06) 270deg, transparent 300deg)',
            filter: 'blur(40px)'
          }}
        />

        {/* Layer 2 — Bottom fog */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[300px]"
          style={{
            background: 'linear-gradient(to top, #0A0A0C, transparent)'
          }}
        />

        {/* Layer 3 — Subtle dot grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)'
          }}
        />
      </div>
      
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
          <h2 className="font-heading text-6xl md:text-8xl text-white leading-none">
            YOUR CITY.<br />
            <span className="text-primary drop-shadow-glow-red-sm">YOUR TOURNAMENT.</span>
          </h2>
        </motion.div>

        {/* Abstract Feature Grid (Replaced Bracket) */}
        <div ref={tiltRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-16 px-4">
          {tournamentFeatures.map((card, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ delay: card.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface border border-[#2A2A2D] p-8 md:p-10 hover:-translate-y-2 hover:border-primary transition-all duration-300 group hover:shadow-glow-red-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />
              
              <div className="bg-background w-12 h-12 border border-[#2A2A2D] flex items-center justify-center mb-8 group-hover:border-primary transition-colors">
                {card.icon}
              </div>
              
              <h3 className="font-heading text-2xl md:text-3xl text-white mb-4 tracking-tight">
                {card.title}
              </h3>
              
              <p className="text-muted text-[15px] leading-relaxed group-hover:text-white/70 transition-colors">
                {card.desc}
              </p>

              {/* Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
