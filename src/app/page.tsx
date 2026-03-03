import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FeaturedImage } from "@/components/featured-image";
import { ServicesSection } from "@/components/services-section";
import { GallerySection } from "@/components/gallery-section";
import { ZenGravitySection } from "@/components/zen-gravity-section";
import { VirtualStudioSection } from "@/components/virtual-studio-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { WhyYogaSection } from "@/components/why-yoga-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-soft-bone selection:bg-brand-primary selection:text-white">
      <Navbar />
      <HeroSection />
      <FeaturedImage />
      <WhyYogaSection />
      <GallerySection />
      <ZenGravitySection />
      <VirtualStudioSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
