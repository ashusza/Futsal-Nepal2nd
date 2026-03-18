"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { JetBrains_Mono } from "next/font/google";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

export default function WaitlistSection() {
  const { ref, inView } = useInView(0.3);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validateEmail = (value: string) => {
    if (!value.trim()) return 'Email is required';
    if (value.includes(' ')) 
      return 'Email cannot contain spaces';
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      return 'Enter a valid email address';
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (emailTouched) setEmailError(validateEmail(val));
    if (status === "error") setStatus("idle");
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setEmailTouched(true);
    const err = validateEmail(email);
    setEmailError(err);
    
    if (err) {
      const btn = document.getElementById('waitlist-submit-btn');
      if (btn) {
        btn.style.animation = 'none';
        void btn.offsetWidth;
        btn.style.animation = 'shake 0.4s ease';
      }
      return;
    }

    if (status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" ref={ref} className="relative w-full min-h-[90vh] bg-background flex items-center justify-center py-24 overflow-hidden">
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1 — Pulsing center explosion glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '1000px', height: '1000px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)',
            filter: 'blur(120px)',
            animation: 'pulseGlow 8s ease-in-out infinite'
          }}
        />

        {/* Layer 2 — Grid lines */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(16,185,129,0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(16,185,129,0.08) 1.5px, transparent 1.5px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)'
          }}
        />

        {/* Layer 3 — Corner darkness */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, #0A0A0C 100%)'
          }}
        />

        {/* Layer 4 — Top and Bottom accent lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-6xl md:text-[120px] text-white leading-[0.85] mb-6 drop-shadow-2xl">
            GET IN BEFORE<br />
            <span className="text-primary drop-shadow-glow-red-intense">KICKOFF.</span>
          </h2>
          <p className="font-body text-xl md:text-2xl text-muted mb-12 max-w-2xl mx-auto">
            Early access members get priority slots, founding perks, and first pick when we launch in Nepal.
          </p>
        </motion.div>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
           transition={{ delay: 0.2, duration: 0.6 }}
           className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-heading text-[32px] text-primary drop-shadow-glow-red py-8"
              >
                YOU&apos;RE IN.
              </motion.div>
            ) : status === "error" ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-heading text-[32px] text-primary py-8 cursor-pointer"
                onClick={() => setStatus("idle")}
              >
                TRY AGAIN.
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    placeholder="YOUR EMAIL ADDRESS"
                    className={`w-full bg-transparent border-b outline-none font-body text-xl py-4 transition-colors placeholder:text-[#3A3A3F] text-white rounded-none
                      ${emailTouched && emailError ? "border-[#EF4444] focus:border-[#EF4444]" : emailTouched && !emailError ? "border-[#10B981]/50 focus:border-[#10B981]/50" : "border-white/15 focus:border-white"}
                    `}
                  />
                  <AnimatePresence>
                    {emailTouched && emailError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -4, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-[10px] text-[#EF4444] tracking-[0.1em] mt-[6px]"
                      >
                        {emailError}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <button 
                  id="waitlist-submit-btn"
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full relative overflow-hidden bg-primary text-white font-heading text-2xl tracking-[0.1em] py-6 [clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0_100%)] hover:scale-[1.02] transition-all duration-300 group shadow-glow-red hover:shadow-glow-red-intense disabled:opacity-50
                    ${status === "loading" ? "animate-pulse" : ""}
                  `}
                >
                  <span className="relative z-10 transition-opacity duration-300">
                    {status === "loading" ? "SECURING..." : "SECURE EARLY ACCESS"}
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {status === "loading" && (
                     <motion.div 
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-white/5"
                     />
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-col items-center gap-4">
             <span className={`${jetbrains.className} text-[10px] text-[#52525B] uppercase tracking-[0.2em] font-medium`}>
               EARLY ACCESS CLOSES WHEN WE LAUNCH.
             </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
