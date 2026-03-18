"use client";

import { useState, useEffect } from "react";

export function useWaitlistCount() {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/waitlist/count");
        const data = await res.json();
        setWaitlistCount(data.count);
      } catch (error) {
        console.error("Failed to fetch waitlist count:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCount();
  }, []);

  const shouldShow = !isLoading && waitlistCount !== null && waitlistCount >= 50;

  return { 
    waitlistCount, 
    isLoading, 
    shouldShow,
    displayCount: waitlistCount?.toLocaleString() 
  };
}
