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

  // --- Chapter 1: THE FIELD (0 - 0.25) ---
  const ch1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.22, 0.25], [1, 1, 0, 0]);
  const ch1RotateX = useTransform(scrollYProgress, [0.15, 0.25], [0, -25]);
  const ch1Y = useTransform(scrollYProgress, [0, 0.1, 0.25], [60, 0, -60]);

  // --- Chapter 2: THE STRUGGLE (0.25 - 0.5) ---
  const curtainScaleX = useTransform(scrollYProgress, [0.22, 0.28], [0, 1]);
  const curtainOpacity = useTransform(scrollYProgress, [0.28, 0.32, 0.45, 0.48], [1, 0, 0, 0]);
  
  const ch2Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.48, 0.5], [0, 1, 1, 0, 0]);
  const ch2RotateY = useTransform(scrollYProgress, [0.25, 0.35], [-20, 0]);
  const ch2RotateX = useTransform(scrollYProgress, [0.4, 0.5], [0, -25]);

  // --- Chapter 3: THE TEAM (0.5 - 0.75) ---
  const ch3Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.72, 0.75], [0, 1, 1, 0, 0]);
  const ch3RotateX = useTransform(scrollYProgress, [0.5, 0.55], [25, 0]);
  const ch3OutRotateX = useTransform(scrollYProgress, [0.65, 0.75], [0, -25]);
  
  // Chapter 3 internal layers parity
  const ch3SilhouetteY = useTransform(scrollYProgress, [0.5, 0.75], ["10%", "-10%"]);
  const ch3TextY = useTransform(scrollYProgress, [0.5, 0.75], ["20%", "-20%"]);

  // --- Chapter 4: THE PLATFORM (0.75 - 1.0) ---
  const ch4CurtainScaleX = useTransform(scrollYProgress, [0.72, 0.76], [0, 1]);
  const ch4Opacity = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 0]);
  const ch4RotateX = useTransform(scrollYProgress, [0.75, 0.8], [25, 0]);
  const ch4OutRotateX = useTransform(scrollYProgress, [0.9, 1], [0, -25]);
  
  const ch4GlowScale = useTransform(scrollYProgress, [0.8, 0.95], [0.5, 1.5]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-background">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden [perspective:1000px] flex items-center justify-center">

        {/* Global Parallax Background mapping to chapters */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 select-none pointer-events-none">
          {/* Base Layer */}
          <div className="absolute inset-0 bg-[#0A0A0C]" />
          
          {/* Chapter 1 BG */}
          <motion.div style={{ opacity: ch1Opacity }} className="absolute inset-0" >
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C] opacity-80" />
             {/* Note: In real app, replace with actual court-overheard.jpg */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />
          </motion.div>

          {/* Chapter 3 BG (Silhouettes) */}
          <motion.div style={{ opacity: ch3Opacity, y: ch3SilhouetteY }} className="absolute inset-0 flex items-end justify-center pb-20">
             <div className="w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />
             <div className="w-[120%] h-full bg-[radial-gradient(ellipse_at_bottom,rgba(230,25,43,0.15),transparent_60%)]" />
          </motion.div>

          {/* Chapter 4 BG (Grid) */}
          <motion.div style={{ opacity: ch4Opacity }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
          </motion.div>
        </motion.div>


        {/* CHAPTER 1 */}
        <motion.div
          style={{ opacity: ch1Opacity, rotateX: ch1RotateX, y: ch1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
        >
          <h2 className="font-heading text-5xl md:text-7xl text-white">EVERY GREAT TEAM</h2>
          <h2 className="font-heading text-5xl md:text-7xl text-white">
            STARTS ON A <span className="text-primary drop-shadow-glow-red">PITCH.</span>
          </h2>
        </motion.div>

        {/* TRANSITION WIPE 1 -> 2 */}
        <motion.div
          style={{ scaleX: curtainScaleX, opacity: curtainOpacity }}
          className="absolute top-1/2 left-0 w-full h-[2px] bg-primary z-20 origin-left drop-shadow-glow-red"
        />

        {/* CHAPTER 2 */}
        <motion.div
          style={{ opacity: ch2Opacity, rotateY: ch2RotateY, rotateX: ch2RotateX }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-4xl md:text-6xl text-muted text-balance drop-shadow-lg">
              CALLING TO BOOK.
            </h2>
            <h2 className="font-heading text-4xl md:text-6xl text-primary/80 drop-shadow-glow-red-sm">
              WAITING. REJECTED.
            </h2>
            <h2 className="font-heading text-5xl md:text-7xl text-white mt-6 drop-shadow-2xl">
              THERE IS A BETTER WAY.
            </h2>
          </div>
        </motion.div>

        {/* CHAPTER 3 */}
        <motion.div
          style={{ opacity: ch3Opacity, y: ch3TextY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20"
        >
          {/* Wrapping in an extra div to apply dual rotateX properties without conflict */}
          <motion.div style={{ rotateX: ch3RotateX }}>
            <motion.div style={{ rotateX: ch3OutRotateX }} className="flex flex-col items-center">
              <h2 className="font-heading text-6xl md:text-8xl text-white">YOUR TEAM.</h2>
              <h2 className="font-heading text-6xl md:text-8xl text-primary drop-shadow-glow-red">YOUR LOYALTY.</h2>
              
              <motion.h2 
                style={{ opacity: useTransform(scrollYProgress, [0.55, 0.65], [0, 1]) }}
                className="font-heading text-6xl md:text-8xl text-white mt-2"
              >
                YOUR REWARDS.
              </motion.h2>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* TRANSITION WIPE 3 -> 4 */}
        <motion.div
          style={{ scaleX: ch4CurtainScaleX, opacity: useTransform(scrollYProgress, [0.76, 0.8], [1, 0]) }}
          className="absolute top-1/2 left-0 w-full h-[2px] bg-primary z-20 origin-left drop-shadow-glow-red"
        />

        {/* CHAPTER 4 */}
        <motion.div
          style={{ opacity: ch4Opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-30"
        >
          <motion.div
            style={{ scale: ch4GlowScale }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[radial-gradient(circle_at_center,rgba(230,25,43,0.3),transparent_70%)] z-[-1] rounded-full blur-3xl"
          />
          <motion.div style={{ rotateX: ch4RotateX }}>
            <motion.div style={{ rotateX: ch4OutRotateX }} className="flex flex-col items-center">
              <h2 className="font-heading text-5xl md:text-7xl text-white">ONE APP.</h2>
              <h2 className="font-heading text-5xl md:text-7xl text-white">EVERY GAME.</h2>
              <h2 className="font-heading text-7xl md:text-9xl text-primary drop-shadow-glow-red-intense mt-4 tracking-wide">
                ALL OF NEPAL.
              </h2>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
