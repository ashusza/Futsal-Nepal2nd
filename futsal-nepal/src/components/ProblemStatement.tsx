"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const panels = [
  {
    number: "01",
    title: "YOU CALLED.\nNO ONE ANSWERED.",
    body: "Six futsals. All full.\nYour whole team in the group chat\nwaiting for a maybe that never came.",
    align: "left"
  },
  {
    number: "02", 
    title: "ONE SHORT.\nMATCH CANCELLED.",
    body: "Always the last minute.\nAlways the same player who drops out.\nAlways the same frustration.",
    align: "right"
  },
  {
    number: "03",
    title: "50 GAMES. THEY FORGOT\nYOUR NAME.",
    body: "You kept showing up.\nSame pitch. Every weekend. For months.\nAnd it counted for nothing.",
    align: "left",
    highlight: "YOUR NAME."
  }
];

function PanelItem({ number, title, body, align, highlight }: any) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const isLeft = align === "left";
  const bgColor = (number === "01" || number === "03") ? "#0A0A0C" : "#0D0D10";

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[60vh] flex items-center px-6 py-20 md:px-20 border-bottom border-white/5 overflow-hidden"
      style={{ backgroundColor: bgColor, borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Watermark Number */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute font-metal pointer-events-none user-select-none text-[25vw] text-white/[0.025] z-0"
        style={{ 
          top: "50%", 
          transform: "translateY(-50%)",
          [isLeft ? "left" : "right"]: "-2vw"
        }}
      >
        {number}
      </motion.div>

      {/* Border Accent */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 bottom-0 w-[2px] bg-primary/15"
        style={{ 
          [isLeft ? "left" : "right"]: 0,
          transformOrigin: "top"
        }}
      />

      {/* Content Wrapper */}
      <div className={`relative z-10 w-full max-w-[640px] ${isLeft ? "mr-auto" : "ml-auto text-left"}`}>
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.2em] text-primary/50 mb-4 uppercase"
        >
          {number}
        </motion.div>

        {/* Title */}
        <motion.div
          style={{ y: titleY }}
          initial={{ x: isLeft ? -100 : 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="font-heading text-5xl md:text-8xl text-white tracking-wider leading-[0.9] whitespace-pre-line"
        >
          {highlight ? (
            <>
              {title.split(highlight)[0]}
              <span className="text-primary drop-shadow-glow-red">{highlight}</span>
              {title.split(highlight)[1]}
            </>
          ) : title}
        </motion.div>

        {/* Body Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: true }}
          className="font-body text-lg text-white/45 leading-[1.8] mt-6 whitespace-pre-line"
        >
          {body}
        </motion.div>
      </div>
    </div>
  );
}

export default function ProblemStatement() {
  return (
    <section id="problem" className="relative bg-[#0A0A0C] overflow-hidden">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Layer 1 — Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.04] mix-blend-mode-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
        
        {/* Layer 2 — Green tinted left glow */}
        <div 
          className="absolute -left-[200px] top-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.08), transparent 70%)',
            filter: 'blur(80px)'
          }}
        />

        {/* Layer 3 — Diagonal scan lines */}
        <div 
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255,255,255,0.008) 4px, rgba(255,255,255,0.008) 5px)`
          }}
        />
      </div>

      <div className="relative z-10">
        {panels.map((panel, i) => (
          <PanelItem key={i} {...panel} />
        ))}
      </div>

      {/* Closing Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="w-full h-[1px]"
        style={{ 
          background: "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.4) 50%, transparent 100%)",
          transformOrigin: "left"
        }}
      />
    </section>
  );
}
