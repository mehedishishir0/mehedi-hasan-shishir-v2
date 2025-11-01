"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins only once
if (typeof window !== "undefined" && gsap) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
