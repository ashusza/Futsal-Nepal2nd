"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ParallaxStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background Parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // --- Chapter 1: FIXED (0 - 0.25) ---
  const ch1Opacity = useTransform(scrollYProgress,
    [0, 0.18, 0.25],
    [1, 1, 0]
  );
  const ch1RotateX = useTransform(scrollYProgress,
    [0, 0.18, 0.25],
    [0, 0, -20]
  );
  const ch1Y = useTransform(scrollYProgress,
    [0, 0.08, 0.22, 0.25],
    [0, 0, -40, -60]
  );
  const ch1Scale = useTransform(scrollYProgress,
    [0, 0.08, 0.25],
    [1.0, 1.0, 1.0]
  );
  const ch1Z = useTransform(scrollYProgress,
    [0, 0.05, 0.25],
    [0, 0, 0]
  );
  const ch1LetterSpacing = useTransform(scrollYProgress,
    [0, 0.05, 0.25],
    ['0.05em', '0.05em', '0.05em']
  );

  // --- Chapter 2: THE STRUGGLE (0.25 - 0.5) ---
  const curtainScaleX = useTransform(scrollYProgress, [0.22, 0.28], [0, 1]);
  const curtainOpacity = useTransform(scrollYProgress,
    [0.28, 0.32, 0.45, 0.48],
    [1, 0, 0, 0]
  );
  const ch2Opacity = useTransform(scrollYProgress,
    [0.25, 0.3, 0.4, 0.48, 0.5],
    [0, 1, 1, 0, 0]
  );
  const ch2RotateY = useTransform(scrollYProgress, [0.25, 0.35], [-20, 0]);
  const ch2RotateX = useTransform(scrollYProgress, [0.4, 0.5], [0, -25]);

  // --- Chapter 3: THE TEAM (0.5 - 0.75) ---
  const ch3Opacity = useTransform(scrollYProgress,
    [0.5, 0.55, 0.65, 0.72, 0.75],
    [0, 1, 1, 0, 0]
  );
  const ch3RotateX = useTransform(scrollYProgress, [0.5, 0.55], [25, 0]);
  const ch3OutRotateX = useTransform(scrollYProgress, [0.65, 0.75], [0, -25]);
  const ch3SilhouetteY = useTransform(scrollYProgress, [0.5, 0.75], ["10%", "-10%"]);
  const ch3TextY = useTransform(scrollYProgress, [0.5, 0.75], ["20%", "-20%"]);

  // --- Chapter 4: THE PLATFORM (0.75 - 1.0) ---
  const ch4CurtainScaleX = useTransform(scrollYProgress, [0.72, 0.76], [0, 1]);
  const ch4CurtainOpacity = useTransform(scrollYProgress, [0.76, 0.8], [1, 0]);
  const ch4Opacity = useTransform(scrollYProgress,
    [0.75, 0.8, 0.95, 1],
    [0, 1, 1, 0]
  );
  const ch4RotateX = useTransform(scrollYProgress, [0.75, 0.8], [25, 0]);
  const ch4OutRotateX = useTransform(scrollYProgress, [0.9, 1], [0, -25]);
  const ch4GlowScale = useTransform(scrollYProgress, [0.8, 0.95], [0.5, 1.5]);

  // Glitch text shadow for NO WAY TO CONNECT
  const glitchTextShadow = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25],
    [
      '0 0 0px rgba(16,185,129,0)',
      '0 0 60px rgba(16,185,129,0.6)',
      '0 0 40px rgba(16,185,129,0.4)',
    ]
  );

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-background">

      {/* Sticky Viewport */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >

        {/* ── ATMOSPHERIC BACKGROUND ── */}
        <div className="absolute inset-0 pointer-events-none z-0">

          {/* Layer 1 — Deep space gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 120% 80% at 50% 50%, rgba(16,185,129,0.04) 0%, rgba(10,10,12,0) 60%, #0A0A0C 100%)'
            }}
          />

          {/* Layer 2 — Floating orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute rounded-full"
              style={{
                width: '500px', height: '500px',
                top: '-100px', left: '-150px',
                background: 'radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)',
                filter: 'blur(100px)',
                animation: 'floatOrb1 12s ease-in-out infinite'
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '400px', height: '400px',
                bottom: '-80px', right: '-100px',
                background: 'radial-gradient(circle, rgba(16,185,129,0.05), transparent 70%)',
                filter: 'blur(80px)',
                animation: 'floatOrb2 15s ease-in-out infinite'
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: '300px', height: '300px',
                top: '40%', left: '60%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.02), transparent 70%)',
                filter: 'blur(60px)',
                animation: 'floatOrb3 10s ease-in-out infinite'
              }}
            />
          </div>

          {/* Layer 3 — Star dots (fixed positions — no Math.random) */}
          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {[
              [12, 8], [25, 45], [67, 23], [89, 12], [34, 78],
              [56, 34], [78, 67], [45, 90], [23, 56], [90, 45],
              [11, 34], [44, 11], [66, 89], [88, 56], [33, 23],
              [55, 67], [77, 34], [22, 78], [44, 45], [99, 23]
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={`${cx}%`}
                cy={`${cy}%`}
                r={i % 3 === 0 ? "1" : "0.5"}
                fill="rgba(255,255,255,0.15)"
              />
            ))}
          </svg>
        </div>

        {/* ── GLOBAL PARALLAX BACKGROUND ── */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 z-0 select-none pointer-events-none"
        >
          <div className="absolute inset-0 bg-[#0A0A0C]" />

          {/* Chapter 1 BG */}
          <motion.div style={{ opacity: ch1Opacity }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C] opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
          </motion.div>

          {/* Chapter 3 BG */}
          <motion.div
            style={{ opacity: ch3Opacity, y: ch3SilhouetteY }}
            className="absolute inset-0 flex items-end justify-center pb-20"
          >
            <div className="w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
            <div className="w-[120%] h-full bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.15),transparent_60%)]" />
          </motion.div>

          {/* Chapter 4 BG */}
          <motion.div style={{ opacity: ch4Opacity }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
          </motion.div>
        </motion.div>

        {/* ── CHAPTER 1 ── */}
        <motion.div
          style={{
            opacity: ch1Opacity,
            rotateX: ch1RotateX,
            y: ch1Y,
            scale: ch1Scale,
            z: ch1Z,
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 gap-2"
        >
          {/* Line 1 */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ letterSpacing: ch1LetterSpacing }}
            className="font-heading text-5xl md:text-7xl text-white"
          >
            GREAT PLAYERS.
          </motion.h2>

          {/* Line 2 */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ letterSpacing: ch1LetterSpacing }}
            className="font-heading text-5xl md:text-7xl text-white"
          >
            SCATTERED ACROSS NEPAL.
          </motion.h2>

          {/* Line 3 — Glitch */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-2"
          >
            {/* Base text */}
            <motion.h2
              className="font-heading text-5xl md:text-7xl text-primary relative"
              style={{ textShadow: glitchTextShadow }}
            >
              NO WAY TO CONNECT.
            </motion.h2>

            {/* Glitch Layer Red */}
            <h2
              className="font-heading text-5xl md:text-7xl absolute inset-0 pointer-events-none"
              style={{
                color: '#ff0044',
                opacity: 0.7,
                animation: 'glitchLeft 3s infinite',
                clipPath: 'polygon(0 20%, 100% 20%, 100% 50%, 0 50%)',
                mixBlendMode: 'screen',
              }}
            >
              NO WAY TO CONNECT.
            </h2>

            {/* Glitch Layer Cyan */}
            <h2
              className="font-heading text-5xl md:text-7xl absolute inset-0 pointer-events-none"
              style={{
                color: '#00ffff',
                opacity: 0.7,
                animation: 'glitchRight 3s infinite',
                clipPath: 'polygon(0 55%, 100% 55%, 100% 80%, 0 80%)',
                mixBlendMode: 'screen',
              }}
            >
              NO WAY TO CONNECT.
            </h2>

            {/* Scan line sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="absolute left-0 right-0 h-[2px] bg-primary/30"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 1.2
                }}
              />
            </motion.div>

            {/* Glitch flicker blocks */}
            <motion.div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="absolute left-0 right-0 bg-primary/10 h-[8px]"
                style={{ top: '30%' }}
                animate={{
                  opacity: [0, 1, 0, 0, 1, 0],
                  scaleX: [1, 0.95, 1, 0.98, 1],
                  x: [0, -4, 2, -2, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0, 0.1, 0.2, 0.5, 0.6, 1],
                  ease: 'linear'
                }}
              />
              <motion.div
                className="absolute left-0 right-[30%] bg-white/5 h-[4px]"
                style={{ top: '65%' }}
                animate={{
                  opacity: [0, 0, 1, 0, 0],
                  x: [0, 8, -4, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  times: [0, 0.3, 0.4, 0.5, 1],
                  ease: 'linear',
                  delay: 0.8
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── TRANSITION WIPE 1 → 2 ── */}
        <motion.div
          style={{ scaleX: curtainScaleX, opacity: curtainOpacity }}
          className="absolute top-1/2 left-0 w-full h-[2px] bg-primary z-20 origin-left drop-shadow-glow-red"
        />

        {/* ── CHAPTER 2 ── */}
        <motion.div
          style={{
            opacity: ch2Opacity,
            rotateY: ch2RotateY,
            rotateX: ch2RotateX,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-4xl md:text-6xl text-white drop-shadow-lg">
              LOOKING FOR TEAMMATES.
            </h2>
            <h2 className="font-heading text-4xl md:text-6xl text-white drop-shadow-lg">
              LOOKING FOR A PITCH.
            </h2>
            <h2 className="font-heading text-5xl md:text-7xl text-primary mt-6 drop-shadow-glow-red">
              LOOKING FOR A WAY.
            </h2>
          </div>
        </motion.div>

        {/* ── CHAPTER 3 ── */}
        <motion.div
          style={{ opacity: ch3Opacity, y: ch3TextY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20"
        >
          <motion.div style={{ rotateX: ch3RotateX }}>
            <motion.div
              style={{ rotateX: ch3OutRotateX }}
              className="flex flex-col items-center"
            >
              <h2 className="font-heading text-6xl md:text-8xl text-white whitespace-nowrap">
                THEY FOUND EACH OTHER.
              </h2>
              <h2 className="font-heading text-6xl md:text-8xl text-primary drop-shadow-glow-red whitespace-nowrap">
                ON GAME CIRCLE.
              </h2>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── TRANSITION WIPE 3 → 4 ── */}
        <motion.div
          style={{
            scaleX: ch4CurtainScaleX,
            opacity: ch4CurtainOpacity,
          }}
          className="absolute top-1/2 left-0 w-full h-[2px] bg-primary z-20 origin-left drop-shadow-glow-red"
        />

        {/* ── CHAPTER 4 ── */}
        <motion.div
          style={{ opacity: ch4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-30"
        >
          <motion.div
            style={{ scale: ch4GlowScale }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.4),transparent_75%)] z-[-1] rounded-full blur-3xl"
          />
          <motion.div style={{ rotateX: ch4RotateX }}>
            <motion.div
              style={{ rotateX: ch4OutRotateX }}
              className="flex flex-col items-center"
            >
              <h2 className="font-heading text-5xl md:text-7xl text-white">
                WELCOME TO
              </h2>
              <h2
                className="font-heading text-7xl md:text-9xl text-primary mt-4 tracking-wide"
                style={{ filter: "drop-shadow(0 0 40px rgba(16,185,129,0.6))" }}
              >
                THE CIRCLE.
              </h2>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="font-mono text-sm uppercase text-white/40 tracking-[0.4em] mt-8"
              >
                WAITLIST IS NOW OPEN.
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}