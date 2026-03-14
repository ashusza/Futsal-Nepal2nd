"use client";

import { useState } from "react";
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
import InvestorStrip from "@/components/InvestorStrip";
import WaitlistSection from "@/components/WaitlistSection";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <main className="relative bg-background text-white selection:bg-primary selection:text-white">
      {/* Global Entry Animation (Futsal Nepal staggered reveal) */}
      <IntroSplash />

      {/* Navigation (Sticky after hero scroll) */}
      <Navbar />

      {/* Main Flow */}
      <div id="hero">
        <HeroSection />
      </div>

      <div id="story">
        <ParallaxStory />
      </div>

      <div id="features" className="relative z-20 bg-background">
        <SlotShowcase />
        <FeatureRewards />
        <FeatureTournaments />
        <FeatureLobby />
      </div>

      <div id="pricing">
        {/* Abstracted Pricing teaser through Slot showcase, can anchor here */}
      </div>

      <div id="contact" className="relative z-20">
        <InvestorStrip />
        <WaitlistSection />
        <Footer />
      </div>

      {/* Global Waitlist Modal triggered from anywhere */}
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
      />

      {/* Floating CTA interceptor to open modal if they click standard CTA's 
          Note: For a real app we would pass setIsWaitlistOpen down through context 
          or props to the buttons in HeroSection, WaitlistSection, and Navbar.
          For this iteration we'll rely on those components triggering it via events or prop drilling.
          To keep it simple here, we attach a global listener. */}
      {/* 
        A quick hack to bind all 'EARLY ACCESS' / 'SECURE SPOT' buttons to opening the modal 
        without prop-drilling into 4 different deeply nested components.
      */}
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
