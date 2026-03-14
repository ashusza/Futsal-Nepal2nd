"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function IntroSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    const handleScroll = () => {
      if (window.scrollY > 60) {
        setShow(false);
        document.body.style.overflow = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split text for letter animation
  const title1 = "FUTSAL".split("");
  const title2 = "NEPAL".split("");

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[150] bg-background flex flex-col items-center justify-center overflow-hidden [perspective:800px]"
        >
          {/* Central Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,25,43,0.12),transparent_60%)] pointer-events-none" />

          {/* Initial red expanding line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-px bg-primary z-0 origin-center"
          />

          <div className="relative z-10 flex flex-col items-center">
            <h1 className="flex font-heading text-6xl md:text-9xl text-white tracking-widest leading-none mb-2">
              {title1.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: -50, opacity: 0, rotateX: -20 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.06,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
            <h1 className="flex font-heading text-6xl md:text-9xl text-primary tracking-widest leading-none relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl z-[-1]" />
              {title2.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: -50, opacity: 0, rotateX: -20 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{
                    // title2 starts after title1 finishes (0.8 + (6 * 0.06) = ~1.16) + 0.1s delay ≈ 1.4s
                    delay: 1.4 + i * 0.06,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block relative z-10 drop-shadow-glow-red"
                >
                  {letter}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 1 }}
              className="mt-6 font-mono text-[10px] md:text-xs text-muted tracking-[0.3em]"
            >
              NEPAL&apos;S ELITE FUTSAL PLATFORM
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="font-mono text-[10px] text-muted tracking-widest uppercase"
            >
              SCROLL TO ENTER
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="text-muted w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
