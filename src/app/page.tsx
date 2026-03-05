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

const GOOGLE_REVIEWS = [
  {
    id: 1,
    name: "Sathyaseelan C.",
    role: "Local Guide",
    stars: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    comment: "Highly recommended place for learning yoga forms. They teach us well based on our comfort and object. Can see gradual progress day-by-day."
  },
  {
    id: 2,
    name: "Janani K.",
    role: "Student",
    stars: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    comment: "Sharmila is a great instructor. Started with very simple poses and basic breathing techniques and slowly graduated to tougher ones. No pressure, feel very relaxed learning here."
  },
  {
    id: 3,
    name: "Rajeshwar R.",
    role: "Local Guide",
    stars: 5,
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    comment: "Great place to practice yoga and grow. Opportunity to learn new poses and relax your mind. The wooden flooring and ambiance are perfectly suited for focus."
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
      <TestimonialsSection reviews={GOOGLE_REVIEWS} />
      <ContactSection />
      <Footer />
    </main>
  );
}
