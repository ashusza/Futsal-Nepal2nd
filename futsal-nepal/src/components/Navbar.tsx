"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Navbar() {
  const scrollY = useScrollProgress();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show navbar only after scrolling past the first 100vh (IntroSplash)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsVisible(scrollY > window.innerHeight * 0.8);
    }
  }, [scrollY]);

  const navLinks = [
    { name: "FEATURES", href: "#features" },
    { name: "LOBBY", href: "#lobby" },
    { name: "TOURNAMENTS", href: "#tournaments" },
    { name: "REWARDS", href: "#rewards" },
    { name: "VENUES", href: "#venues" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: "-100%", opacity: 0 }}
        animate={{
          y: isVisible ? 0 : "-100%",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[100] h-16 bg-[rgba(20,20,23,0.85)] backdrop-blur-md border-b border-[#2A2A2D]"
      >
        <div className="h-full px-6 md:px-12 flex items-center justify-between max-w-[1920px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-1 font-metal text-2xl tracking-[0.05em]">
            <span className="text-white">GAME</span>
            <span className="text-primary relative">
              CIRCLE
              <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse-dot" />
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="group relative font-mono text-[11px] uppercase tracking-[0.15em] text-muted hover:text-white transition-colors duration-300"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full origin-left" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-waitlist'))}
              className="group relative bg-primary text-white font-heading text-sm tracking-[0.1em] px-6 py-2 [clip-path:polygon(0_0,calc(100%-12px)_0,100%_100%,0_100%)] hover:scale-[1.02] transition-transform duration-300"
            >
              <span className="relative z-10">EARLY ACCESS</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-lg md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ delay: i * 0.1 }}
                className="font-heading text-4xl text-white hover:text-primary transition-colors tracking-wider"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-waitlist'));
              }}
              className="mt-4 bg-primary text-white font-heading text-xl tracking-[0.1em] px-10 py-4 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_100%,0_100%)]"
            >
              EARLY ACCESS
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
