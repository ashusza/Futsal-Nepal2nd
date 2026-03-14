"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Outfit, JetBrains_Mono } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["300"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

interface HeroSectionProps {
  splashDone: boolean;
  onOpenWaitlist: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  isRed: boolean;
  phase: number;
  opacity: number;
}

export default function HeroSection({ splashDone, onOpenWaitlist }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  // Mouse tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const tiltRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax / Scroll transforms
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);

  // 3D Exit Transition
  const heroRotateX = useTransform(scrollYProgress, [0.65, 1], [0, -18]);
  const heroScale = useTransform(scrollYProgress, [0.65, 1], [1, 0.88]);
  const heroOpacity = useTransform(scrollYProgress, [0.65, 1], [1, 0]);

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.8 + 0.4,
          isRed: Math.random() < 0.62,
          phase: Math.random() * Math.PI * 2,
          opacity: 0,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.02;

        // Toroidal movement
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = (Math.sin(p.phase) + 1) / 2;
        const currentOpacity = p.isRed ? 0.4 + pulse * 0.5 : 0.1 + pulse * 0.25;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (p.isRed) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(230, 25, 43, 0.95)`;
          ctx.fillStyle = `rgba(230, 25, 43, ${currentOpacity})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.65})`;
        }
        
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    init();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse Tilt Lerp Loop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      tiltRef.current.targetX = -y * 5; // rotateX
      tiltRef.current.targetY = x * 7; // rotateY
    };

    const handleMouseLeave = () => {
      tiltRef.current.targetX = 0;
      tiltRef.current.targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let frameId: number;
    const loop = () => {
      const tr = tiltRef.current;
      tr.x += (tr.targetX - tr.x) * 0.06;
      tr.y += (tr.targetY - tr.y) * 0.06;
      setTilt({ x: tr.x, y: tr.y });
      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Scroll Indicator hide logic
  const [showScroll, setShowScroll] = useState(true);
  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY < 120);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background">
      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }
        @keyframes scrollLine {
          0%   { height: 0%;   top: 0%; }
          50%  { height: 100%; top: 0%; }
          100% { height: 0%;   top: 100%; }
        }
      `}</style>

      {/* Hero Section Container for 3D Exit */}
      <motion.section
        style={{
          rotateX: heroRotateX,
          scale: heroScale,
          opacity: heroOpacity,
          transformOrigin: "50% 100%",
          willChange: "transform, opacity",
        }}
        className="relative w-full h-full"
      >
        {/* BACKGROUND LAYERS */}
        <motion.div 
          style={{ y: bgY }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={splashDone ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 z-0"
        >
          {/* Layer 1: Canvas Particles */}
          <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

          {/* Layer 2: SVG Pitch Lines */}
          <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full z-[2]"
          >
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="textGlow" cx="25%" cy="50%" r="45%">
                <stop offset="0%" stopColor="rgba(230,25,43,0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#textGlow)" />

            {/* Pitch Lines */}
            <g fill="none" stroke="rgba(230,25,43,0.22)" strokeWidth="0.8">
              {/* Boundary */}
              <rect 
                x="40" y="40" width="1360" height="820" 
                strokeWidth="1" stroke="rgba(230,25,43,0.1)"
                style={{ 
                  strokeDasharray: 4360, strokeDashoffset: 4360,
                  animation: `drawLine 2s forwards 0.1s`
                }}
              />
              {/* Center Line */}
              <line 
                x1="720" y1="40" x2="720" y2="860"
                style={{ 
                  strokeDasharray: 820, strokeDashoffset: 820,
                  animation: `drawLine 1.8s forwards 0.3s`
                }}
              />
              {/* Center Circle */}
              <circle 
                cx="720" cy="450" r="100"
                style={{ 
                  strokeDasharray: 628, strokeDashoffset: 628,
                  animation: `drawLine 2s forwards 0.5s`
                }}
              />
              {/* Left Side */}
              <rect 
                x="40" y="250" width="180" height="400"
                style={{ 
                  strokeDasharray: 1160, strokeDashoffset: 1160,
                  animation: `drawLine 1.8s forwards 0.7s`
                }}
              />
              <rect 
                x="15" y="380" width="25" height="140"
                stroke="rgba(230,25,43,0.18)" strokeWidth="1"
                style={{ 
                  strokeDasharray: 330, strokeDashoffset: 330,
                  animation: `drawLine 1.5s forwards 0.9s`
                }}
              />
              {/* Right Side */}
              <rect 
                x="1220" y="250" width="180" height="400"
                style={{ 
                  strokeDasharray: 1160, strokeDashoffset: 1160,
                  animation: `drawLine 1.8s forwards 0.7s`
                }}
              />
              <rect 
                x="1400" y="380" width="25" height="140"
                stroke="rgba(230,25,43,0.18)" strokeWidth="1"
                style={{ 
                  strokeDasharray: 330, strokeDashoffset: 330,
                  animation: `drawLine 1.5s forwards 0.9s`
                }}
              />
            </g>
            {/* Spots */}
            <circle cx="720" cy="450" r="4" fill="rgba(230,25,43,0.2)" />
            <circle cx="220" cy="450" r="3" fill="rgba(230,25,43,0.2)" />
            <circle cx="1220" cy="450" r="3" fill="rgba(230,25,43,0.2)" />
          </svg>

          {/* Layer 3: Dark Overlay */}
          <motion.div 
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 z-[3] bg-[#0A0A0C]"
          />
        </motion.div>

        {/* CONTENT */}
        <div className="relative z-[10] w-full h-full flex flex-col justify-center px-[64px] [perspective:1200px]">
          <motion.div
            ref={headlineRef}
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            animate={splashDone ? { opacity: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y } : {}}
            transition={splashDone ? { 
              opacity: { delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              y: { delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              rotateX: { duration: 0 }, // Handled by tilt state
              rotateY: { duration: 0 } 
            } : {}}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex flex-col gap-0 select-none">
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={splashDone ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-white leading-[0.88] m-0 tracking-[0.05em] uppercase"
                style={{ fontSize: "clamp(72px, 9vw, 140px)" }}
              >
                BOOK.
              </motion.h1>
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={splashDone ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.70, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-white/45 leading-[0.88] m-0 tracking-[0.05em] uppercase"
                style={{ fontSize: "clamp(72px, 9vw, 140px)" }}
              >
                PLAY.
              </motion.h1>
              <div className="relative w-fit">
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  animate={splashDone ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-primary leading-[0.88] m-0 tracking-[0.05em] uppercase"
                  style={{ 
                    fontSize: "clamp(72px, 9vw, 140px)",
                    textShadow: "0 0 80px rgba(230,25,43,0.45)"
                  }}
                >
                  WIN.
                </motion.h1>
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={splashDone ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-[-1] pointer-events-none"
                  style={{ 
                    background: "radial-gradient(ellipse 50% 40% at 15% 50%, rgba(230,25,43,0.15), transparent)"
                  }}
                />
              </div>
            </div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={splashDone ? { y: 0, opacity: 0.55 } : {}}
              transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
              className={`${outfit.className} mt-[28px] max-w-[460px] text-[17px] text-white/55`}
            >
              Nepal&apos;s first elite futsal booking, rewards & tournament platform.
            </motion.p>

            {/* CTA */}
            <motion.button
              onClick={onOpenWaitlist}
              initial={{ x: 30, opacity: 0 }}
              animate={splashDone ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 1.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-primary text-white font-heading text-[15px] tracking-[0.1em] px-[36px] py-[14px] mt-8 [clip-path:polygon(0_0,calc(100%-14px)_0,100%_100%,0_100%)] hover:shadow-[0_0_60px_-10px_rgba(230,25,43,0.6)] hover:scale-[1.02] whileTap:scale-[0.98] transition-all duration-300 uppercase"
            >
              SECURE EARLY ACCESS
            </motion.button>
          </motion.div>
        </div>

        {/* BOTTOM ELEMENTS */}
        <AnimatePresence>
          {splashDone && (
            <>
              {/* Live Counter Pill */}
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute bottom-[32px] left-[64px] z-[10] flex items-center gap-3 bg-[rgba(20,20,23,0.85)] backdrop-blur-[8px] border border-[rgba(230,25,43,0.25)] px-[16px] py-[8px]"
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full bg-primary" 
                  style={{ animation: 'pulseDot 1.5s infinite ease-in-out' }}
                />
                <span className={`${jetbrains.className} text-[11px] text-[#52525B] tracking-[0.2em] uppercase`}>
                  1,432 WAITING
                </span>
              </motion.div>

              {/* Scroll Indicator */}
              {showScroll && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.4 }}
                  className="absolute bottom-[32px] left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2"
                >
                  <span className={`${jetbrains.className} text-[10px] text-[#3A3A3F] tracking-[0.25em] uppercase`}>SCROLL</span>
                  <div className="w-[1px] h-[32px] bg-muted/20 overflow-hidden relative">
                    <div 
                      className="absolute top-0 left-0 w-full bg-primary"
                      style={{ animation: 'scrollLine 2s infinite ease-in-out' }}
                    />
                  </div>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}
