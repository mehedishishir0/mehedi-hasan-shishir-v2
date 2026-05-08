// import HeroSection from "@/components/hero-section";
// import AboutSection from "@/components/about-section";
// import TechnologySection from "@/components/technology-section";
// import ProjectsSection from "@/components/projects-section";
// import CertificationsSection from "@/components/certifications-section";
// import TimelineSection from "@/components/timeline-section";
// import ReviewsSection from "@/components/reviews-section";
// import TechStackGallery from "@/components/tech-stack-gallery";
// import ContactSection from "@/components/contact-section";
// import GitHubActivityShowcase from "@/components/github-activity-showcase";
// import AllBlogsPage from "./blogs/_components/allBlogs";
// // import PortfolioFeatureSection from "@/components/PortfolioFeatureSection";

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       <main>
//         <HeroSection />
//         <AboutSection />
//         <TechnologySection />
//         <ProjectsSection />
//         <CertificationsSection />
//         <TimelineSection />
//         <AllBlogsPage limitgst={6}/>
//         <ReviewsSection />
//         <TechStackGallery />
//         <GitHubActivityShowcase username="mehedishishir0" />
//         <ContactSection />
//         {/* <PortfolioFeatureSection/> */}
//       </main>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import TechnologySection from "@/components/technology-section";
import ProjectsSection from "@/components/projects-section";
import CertificationsSection from "@/components/certifications-section";
import TimelineSection from "@/components/timeline-section";
import ReviewsSection from "@/components/reviews-section";
// import TechStackGallery from "@/components/tech-stack-gallery";
import ContactSection from "@/components/contact-section";
import GitHubActivityShowcase from "@/components/github-activity-showcase";
import AllBlogsPage from "./blogs/_components/allBlogs";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const locomotiveScroll = new LocomotiveScroll({
      el: scrollRef.current as HTMLElement,
      smooth: true,
      lerp: 0.08,
    } as any);

    return () => {
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      className="min-h-screen"
    >
      <main>
        <section data-scroll-section data-scroll-speed="2">
          <HeroSection />
        </section>

        <section data-scroll-section data-scroll-speed="2">
          <AboutSection />
        </section>

        <section data-scroll-section data-scroll-speed="2">
          <TechnologySection />
        </section>

        <section data-scroll-section data-scroll-speed="2">
          <ProjectsSection />
        </section>

        <section data-scroll-section data-scroll-speed="2">
          <CertificationsSection />
        </section>

        <section data-scroll-section data-scroll-speed="2">
          <TimelineSection />
        </section>

        <section data-scroll-section data-scroll-speed="2">
          <AllBlogsPage limitgst={6} />
        </section>

        <section data-scroll-section data-scroll-speed="2">
          <ReviewsSection />
        </section>

        {/* <section data-scroll-section data-scroll-speed="2">
          <TechStackGallery />
        </section> */}

        <section data-scroll-section data-scroll-speed="2">
          <GitHubActivityShowcase username="mehedishishir0" />
        </section>

        <section data-scroll-section data-scroll-speed="2">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}