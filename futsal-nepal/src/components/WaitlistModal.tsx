"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      setErrorMsg("ENTER A VALID EMAIL");
      return;
    }

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onClose();
        setTimeout(() => setStatus("idle"), 500); // Reset after close animation
      }, 4000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0A0A0C]/90 backdrop-blur-[20px]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={
              status === "success"
                ? {
                    height: "4px",
                    padding: 0,
                    overflow: "hidden",
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  }
                : { scale: 1, opacity: 1 }
            }
            exit={{ scale: 0.94, opacity: 0 }}
            className={`relative w-full max-w-[580px] bg-surface border border-primary shadow-glow-red-intense 
            ${status === "success" ? "" : "p-8 md:p-12"}`}
          >
            {/* Success State Overlay */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }} // Show after line hold
                  className="absolute inset-0 flex flex-col items-center justify-center bg-surface border border-primary shadow-glow-red-intense p-12"
                >
                  <div className="font-mono text-sm text-muted uppercase tracking-[0.2em] mb-2">
                    YOU ARE
                  </div>
                  <div className="font-heading text-7xl md:text-9xl text-primary drop-shadow-[0_0_80px_rgba(230,25,43,0.8)]">
                    #1433
                  </div>
                  <div className="font-mono text-xs text-muted mt-6">
                    WELCOME TO THE WAITLIST.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Default Form State */}
            {status !== "success" && (
              <>
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-muted hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="font-mono text-[11px] text-primary tracking-[0.2em] mb-4">
                  LIMITED EARLY ACCESS
                </div>
                <h2 className="font-heading text-5xl md:text-6xl mb-2">
                  SECURE YOUR SPOT
                </h2>
                <p className="font-body text-base text-muted mb-8">
                  Join Nepal&apos;s first elite futsal platform.
                </p>

                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
                  <span className="font-mono text-xs text-muted tracking-widest uppercase">
                    1,432 ALREADY WAITING
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="relative">
                    <motion.input
                      animate={
                        status === "error"
                          ? { x: [0, -8, 8, -4, 4, 0] }
                          : { x: 0 }
                      }
                      transition={{ duration: 0.4 }}
                      type="text"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      disabled={status === "loading"}
                      className={`w-full bg-transparent border-b pb-3 font-body text-xl md:text-2xl 
                        placeholder:text-muted focus:outline-none transition-colors duration-200
                        ${
                          status === "error"
                            ? "border-primary text-primary"
                            : "border-muted hover:border-white focus:border-white text-white"
                        }
                        ${status === "loading" ? "opacity-40" : "opacity-100"}
                      `}
                    />
                    {status === "error" && (
                      <div className="absolute -bottom-6 left-0 font-mono text-[11px] text-primary">
                        {errorMsg}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-4 relative overflow-hidden bg-primary text-white font-heading text-xl tracking-[0.1em] py-4 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_100%,0_100%)]
                    hover:scale-[1.02] transition-transform duration-300 disabled:hover:scale-100"
                  >
                    <motion.div
                      animate={
                        status === "loading"
                          ? { opacity: [0.6, 1, 0.6] }
                          : { opacity: 1 }
                      }
                      transition={{
                        duration: 0.3,
                        repeat: status === "loading" ? Infinity : 0,
                        ease: "linear",
                      }}
                      className="relative z-10"
                    >
                      {status === "loading" ? "VERIFYING..." : "SECURE SPOT"}
                    </motion.div>
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
