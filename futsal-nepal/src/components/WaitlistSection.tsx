"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

export default function WaitlistSection() {
  const { ref, inView } = useInView(0.3);

  return (
    <section ref={ref} className="relative w-full min-h-[90vh] bg-background flex items-center justify-center py-24 overflow-hidden">
      
      {/* Massive ambient center glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] bg-[radial-gradient(circle_at_center,rgba(230,25,43,0.15),transparent_60%)] z-0 pointer-events-none rounded-full blur-[100px]"
      />

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-6xl md:text-[120px] text-white leading-[0.85] mb-6 drop-shadow-2xl">
            THE PLATFORM IS<br />
            <span className="text-primary drop-shadow-glow-red-intense">READY.</span>
          </h2>
          <p className="font-body text-xl md:text-2xl text-muted mb-12 max-w-2xl mx-auto">
            Spots are strictly limited for the beta launch. Secure your place on the pitch before your rivals do.
          </p>
        </motion.div>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
           transition={{ delay: 0.2, duration: 0.6 }}
           className="w-full max-w-md"
        >
          <button className="w-full relative overflow-hidden bg-primary text-white font-heading text-2xl tracking-[0.1em] py-6 [clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0_100%)] hover:scale-[1.02] transition-transform duration-300 group shadow-glow-red group-hover:shadow-glow-red-intense">
            <span className="relative z-10">SECURE EARLY ACCESS</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          <div className="mt-8 flex items-center justify-center gap-3">
             <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
             <span className="font-mono text-xs text-muted tracking-widest uppercase">
               JOIN 1,432 OTHERS WAITING
             </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
