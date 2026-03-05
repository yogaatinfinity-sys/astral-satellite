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

const REVIEWS = [
  {
    id: 1,
    name: "Priya M.",
    role: "Student",
    stars: 5,
    comment: "Sharmila's 9-11 AM Morning Infinity Flow has completely transformed my daily routine. Her guidance in Strength Yoga is incredible, building both physical endurance and mental clarity. Highly recommend Yoga @ Infinity!"
  },
  {
    id: 2,
    name: "Aarti S.",
    role: "Student",
    stars: 5,
    comment: "The Strength Yoga sessions are challenging yet so rewarding. Sharmila gives personal attention and ensures every posture is correct. The morning classes are the perfect way to begin the day with positivity."
  },
  {
    id: 3,
    name: "Karthik R.",
    role: "Student",
    stars: 5,
    comment: "I've been attending the Morning Infinity Flow for a few months now, and the progress I've seen is remarkable. The energy in the studio is truly unique, making every class an uplifting experience."
  }
];

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
      <TestimonialsSection reviews={REVIEWS} />
      <ContactSection />
      <Footer />
    </main>
  );
}
