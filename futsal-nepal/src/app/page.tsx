"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WaitlistModal from "@/components/WaitlistModal";
import IntroSplash from "@/components/IntroSplash";
import HeroSection from "@/components/HeroSection";
import ParallaxStory from "@/components/ParallaxStory";
import SlotShowcase from "@/components/SlotShowcase";
import FeatureRewards from "@/components/FeatureRewards";
import FeatureTournaments from "@/components/FeatureTournaments";
import FeatureLobby from "@/components/FeatureLobby";
import VenueOwnerSection from "@/components/VenueOwnerSection";
import WaitlistSection from "@/components/WaitlistSection";
import ProblemStatement from "@/components/ProblemStatement";
import Benefits from "@/components/Benefits";
import MarketStats from "@/components/MarketStats";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsWaitlistOpen(true);
    window.addEventListener('open-waitlist', handleOpen);
    return () => window.removeEventListener('open-waitlist', handleOpen);
  }, []);

  const [splashDone, setSplashDone] = useState(false);

  // Sync splashDone with IntroSplash's internal logic (hides on scroll > 60)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setSplashDone(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative bg-background text-white selection:bg-primary selection:text-white">
      {/* Global Entry Animation (Game Circle staggered reveal) */}
      <IntroSplash />

      {/* Navigation (Sticky after hero scroll) */}
      <Navbar />

      {/* 3D Shared Perspective Container */}
      <div style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}>
        {/* Main Flow */}
        <div id="hero">
          <HeroSection 
            splashDone={splashDone} 
            onOpenWaitlist={() => setIsWaitlistOpen(true)}
          />
        </div>

        <ProblemStatement />

        <div id="story">
          <ParallaxStory />
        </div>
      </div>

      <MarketStats />
      
      <div id="features" className="relative z-20 bg-background">
        <SlotShowcase />
        <FeatureRewards />
        <FeatureLobby />
        <FeatureTournaments />
        <Benefits />
      </div>

      <div id="pricing">
        {/* Abstracted Pricing teaser through Slot showcase, can anchor here */}
      </div>

      <div id="contact" className="relative z-20">
        <VenueOwnerSection />
        <WaitlistSection />
        <Footer />
      </div>

      {/* Global Waitlist Modal triggered from anywhere */}
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
      />

      {/* Floating CTA interceptor for legacy elements */}
      <div 
        className="hidden" 
        onClick={(e: any) => {
          if (e.target.innerText?.includes('ACCESS') || e.target.innerText?.includes('SPOT') || e.target.innerText?.includes('PARTNER')) {
             setIsWaitlistOpen(true);
          }
        }}
      />
    </main>
  );
}
