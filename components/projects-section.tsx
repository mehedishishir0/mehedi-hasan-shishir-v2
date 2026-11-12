"use client";

import { useState, useEffect, useRef } from "react";
import { useProject } from "@/hooks/ApiCall";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import FlexCarousel, { FlexCarouselItem } from "./FlexCarousel";

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useProject();
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  const projects = data?.data || [];

  const items: FlexCarouselItem[] =
    projects.length > 0
      ? projects.map((project: any) => ({
          src:
            project.image?.[0]?.url ||
            "https://images.unsplash.com/photo-1737071371043-761e02b1ef95?w=1200&q=80&auto=format&fit=max",
          alt: project.title,
          title: project.title,
          subtitle:
            project.technologies?.slice(0, 3).join(" • ") ||
            project.description?.slice(0, 50),
          id: project._id,
          href: `/project/${project._id}`,
        }))
      : [
          {
            src: "https://images.unsplash.com/photo-1737071371043-761e02b1ef95?w=1200&q=80&auto=format&fit=max",
            alt: "Iridescence Project",
            title: "Iridescence",
            subtitle: "Next.js • TailwindCSS • WebGL",
          },
          {
            src: "https://images.unsplash.com/photo-1693645325828-62cd35c8da8f?w=1200&q=80&auto=format&fit=max",
            alt: "White Room Project",
            title: "White Room",
            subtitle: "React • TypeScript • Node.js",
          },
          {
            src: "https://images.unsplash.com/photo-1747191092806-c7da11881986?w=1200&q=80&auto=format&fit=max",
            alt: "Clay Study Project",
            title: "Clay Study",
            subtitle: "Full Stack • REST API • Cloudinary",
          },
        ];

  // Calculate scroll progress within this pinned section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const currentScroll = -rect.top;
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items.length]);

  const handleSelect = (_index: number, item: FlexCarouselItem) => {
    if (item.href) {
      router.push(item.href);
    } else if (item.id) {
      router.push(`/project/${item.id}`);
    }
  };

  const scrollTrackHeight = `${100 + (Math.max(items.length, 3) - 1) * 80}vh`;

  return (
    <div
      ref={containerRef}
      id="projects"
      className="relative w-full bg-[#030712]"
      style={{ height: scrollTrackHeight }}
    >
      {/* Sticky container that locks onto the screen while user scrolls through all projects */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-8 overflow-hidden z-10">
        {/* Background glow effects */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Section Header */}
        <div className="text-center pt-2 sm:pt-4 px-4 z-10 flex-shrink-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-2 text-xs sm:text-sm md:text-base">
            Scroll to explore each project. Click any card or title to view details.
          </p>
        </div>

        {/* FlexCarousel Area */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center px-8 relative">
            <Skeleton className="h-[480px] w-full max-w-4xl bg-white/5 rounded-[2rem]" />
          </div>
        ) : (
          <div className="w-full flex-1 min-h-[460px] relative flex items-center justify-center">
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <FlexCarousel
                items={items}
                preset="liquid"
                intro="rise"
                cardHeight={0.62}
                gap={16}
                squeeze={0.2}
                focusOnClick
                captions
                fit="natural"
                radius={14}
                lensWidth={0.78}
                lensHeight={1.2}
                tilt={62}
                roundness={1}
                bend={0.34}
                reach={0.38}
                curl="twist"
                dispersion={0.45}
                liquid={0}
                followCursor={false}
                autoplay={false}
                interval={4}
                captureWheel={false}
                progress={scrollProgress}
                onSelect={handleSelect}
              />
            </div>
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-4 flex-shrink-0" />
      </div>
    </div>
  );
}
