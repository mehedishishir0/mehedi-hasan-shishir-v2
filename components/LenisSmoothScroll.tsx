"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisSmoothScroll() {
  useEffect(() => {
    // ✅ Create Lenis instance with improved easing
    const lenis = new Lenis({
      duration: 1.5, // slightly longer easing duration for smoother stop
      smoothWheel: true,
      touchMultiplier: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 1), // smoother cubic ease-out
    });

    // ✅ Stable requestAnimationFrame loop
    let animationFrame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };
    animationFrame = requestAnimationFrame(raf);

    // ✅ Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return null;
}
