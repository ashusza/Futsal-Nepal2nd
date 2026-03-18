"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "players",
    label: "FOR PLAYERS",
    title: "THE ULTIMATE\nPLAYGROUND.",
    items: [
      { 
        title: "Zero Friction", 
        body: "Book in 30 seconds. No phone calls. No uncertainty." 
      },
      { 
        title: "Find Your Circle", 
        body: "Connect with players who match your skill and vibe." 
      },
      { 
        title: "Earn as You Play", 
        body: "Loyalty that actually matters. Unlock your rewards" 
      }
    ]
  },
  {
    id: "venues",
    label: "FOR VENUE OWNERS",
    title: "MAXIMIZE\nYOUR PITCH.",
    items: [
      { 
        title: "Auto-Booking", 
        body: "Fill your dead hours automatically. 24/7 reservation system." 
      },
      { 
        title: "Data Insights", 
        body: "Know your peak times. Understand your players. Grow revenue." 
      },
      { 
        title: "No-Show Protection", 
        body: "Secure payments upfront. Say goodbye to empty slots." 
      }
    ]
  }
];

export default function Benefits() {
  const [activeTab, setActiveTab] = useState("players");
  const activeData = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="benefits" className="relative w-full min-h-screen bg-[#0A0A0C] px-6 py-24 md:px-20 md:py-32 overflow-hidden">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1 — Diagonal stripes */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(-60deg, transparent, transparent 30px, rgba(16,185,129,0.015) 30px, rgba(16,185,129,0.015) 31px)'
          }}
        />

        {/* Layer 2 — Center left glow */}
        <div 
          className="absolute left-[20%] top-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.07), transparent 70%)',
            filter: 'blur(100px)'
          }}
        />

        {/* Layer 3 — Top border glow */}
        <div 
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)'
          }}
        />
      </div>

      {/* Left Border Accent */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1 }}
        style={{ transformOrigin: "top" }}
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/15"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12"
        >
          <motion.h2 
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-5xl md:text-7xl text-white tracking-wider"
          >
            WHO IS THIS FOR?
          </motion.h2>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex gap-3 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-heading text-[13px] md:text-base tracking-[0.2em] px-7 py-3 transition-all duration-300 uppercase
                  ${isActive 
                    ? "bg-primary text-background shadow-[0_0_30px_-10px_rgba(16,185,129,0.5)]" 
                    : "bg-transparent text-white/40 border border-white/10 hover:border-primary/30 hover:text-white/70"
                  }
                `}
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
                  borderRadius: "0px"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-start"
            >
              {/* Left Column: Title */}
              <div>
                <h3 className="font-heading text-5xl md:text-6xl text-white leading-[0.9] tracking-wider uppercase whitespace-pre-line">
                  {activeData.title}
                </h3>
                <motion.div
                  key={`line-${activeTab}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ transformOrigin: "left" }}
                  className="w-20 h-[1px] bg-primary mt-6"
                />
              </div>

              {/* Right Column: Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10">
                {activeData.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex flex-col gap-3 group"
                  >
                    <h4 className="font-heading text-xl text-primary tracking-wide transition-transform duration-300 group-hover:translate-x-1">
                      {item.title}
                    </h4>
                    <p className="font-body text-sm text-white/50 leading-[1.8]">
                      {item.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
