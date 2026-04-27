import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import TechnologySection from "@/components/technology-section";
import ProjectsSection from "@/components/projects-section";
import CertificationsSection from "@/components/certifications-section";
import TimelineSection from "@/components/timeline-section";
import ReviewsSection from "@/components/reviews-section";
import TechStackGallery from "@/components/tech-stack-gallery";
import ContactSection from "@/components/contact-section";
import GitHubActivityShowcase from "@/components/github-activity-showcase";
import AllBlogsPage from "./blogs/_components/allBlogs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <AboutSection />
        <TechnologySection />
        <ProjectsSection />
        <CertificationsSection />
        <TimelineSection />
        <AllBlogsPage limitgst={6}/>
        <ReviewsSection />
        <TechStackGallery />
        <GitHubActivityShowcase username="mehedishishir0" />
        <ContactSection />
      </main>
    </div>
  );
}
