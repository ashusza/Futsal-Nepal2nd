import { useEffect, useRef } from "react";

// Returns real-time mouse position relative to element center
// Used for 3D tilt effects on hero, bracket, rewards ring
export function useMouseTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let tiltX = 0,
      tiltY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      const targetX = -dy * maxTilt;
      const targetY = dx * maxTilt;

      // Lerp for smoothness
      tiltX += (targetX - tiltX) * 0.08;
      tiltY += (targetY - tiltY) * 0.08;

      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const onLeave = () => {
      tiltX = 0;
      tiltY = 0;
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxTilt]);

  return ref;
}
