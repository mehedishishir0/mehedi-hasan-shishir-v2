import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import TechnologySection from "@/components/technology-section"
import ProjectsSection from "@/components/projects-section"
import CertificationsSection from "@/components/certifications-section"
import TimelineSection from "@/components/timeline-section"
import ReviewsSection from "@/components/reviews-section"
import TechStackGallery from "@/components/tech-stack-gallery"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <TechnologySection />
        <ProjectsSection />
        <CertificationsSection />
        <TimelineSection />
        <ReviewsSection />
        <TechStackGallery />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
