"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const navLinks = [
    { name: "FEATURES", href: "#features" },
    { name: "LOBBY", href: "#lobby" },
    { name: "TOURNAMENTS", href: "#tournaments" },
    { name: "REWARDS", href: "#rewards" },
    { name: "VENUES", href: "#venues" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="relative w-full bg-[#0A0A0C] border-t border-[#2A2A2D] px-6 py-10 md:px-20 md:py-16 overflow-hidden"
    >
      {/* Background Detail - Green Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-[rgba(16,185,129,0.3)] blur-[20px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* ROW 1: Top Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-0 pb-10 border-b border-[#2A2A2D]">
          
          {/* Left: Wordmark & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-1 font-metal text-3xl tracking-[0.05em] mb-2">
              <span className="text-white">GAME</span>
              <span className="text-primary">CIRCLE</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
              NEPAL&apos;S FUTSAL PLATFORM
            </div>
          </div>

          {/* Center: Nav links (Hidden on Mobile) */}
          <div className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-5">
            <div className="text-white/30 hover:text-primary transition-colors duration-200 cursor-pointer">
              <Instagram size={18} />
            </div>
            <div className="text-white/30 hover:text-primary transition-colors duration-200 cursor-pointer">
              <Facebook size={18} />
            </div>
            <div className="text-white/30 hover:text-primary transition-colors duration-200 cursor-pointer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.02-.07z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ROW 2: Copyright & Credit */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-3 md:gap-0">
          <div className="font-mono text-[10px] tracking-[0.15em] text-white/20 text-center md:text-left">
            ©  2026 GAME CIRCLE. ALL RIGHTS RESERVED.
          </div>
          <div className="font-mono text-[10px] tracking-[0.15em] text-white/20 text-center md:text-right">
            Designed & Developed by Silicore Technologies Pvt. Ltd.
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
