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
    name: "thamarai selvi",
    role: "Local Guide",
    stars: 5,
    comment: "I have joined at yoga@infinity few weeks back. She is amazing and dedicated. I never imagined, that I am able to do yoga with ease. She is friendly and professional, precise and flexible. Thank you Sharmila mam"
  },
  {
    id: 2,
    name: "Keerthana priya",
    role: "Student",
    stars: 5,
    comment: "Amongst the few classes that I have attended, one of the most dedicated and effective class for yoga class. Guaranteed results from 1st week itself if we are regular"
  },
  {
    id: 3,
    name: "Reka NagarajaRao",
    role: "Local Guide",
    stars: 5,
    comment: "If you want to spend an hour or 2 focussing on your well-being, this is the place to be. Sharmila mam (yoga) & Rekha mam (breathing & healing) take you through a wonderful journey of Yoga, breathing and expansion of consciousness. They will guide you through the process as you begin to explore deeper within yourself. Highly recommended place for learning yoga forms."
  },
  {
    id: 4,
    name: "Aishwarya Srinivasan",
    role: "Student",
    stars: 5,
    comment: "It has been an wonderful experience for me here. When I started, Ireduced almost 10 kgs in three months and slowly and steady weight reduce in next three months. Both excercise and yoga makes us feel energetic through out the day. I enjoy my each and every class. Mam teaches with lots of patience and encourages everyone to try different and new yoga poses everyday."
  },
  {
    id: 5,
    name: "Vathsala K",
    role: "Local Guide",
    stars: 5,
    comment: "One of the best yoga centre in ambattur. If you want to reduce weight, if you want to do meditation, if you want to practise yoga , if you want to do workout and zumba dance this is the right place. Ms. Sharmila is very professional, well experienced and have deep knowledge about yoga. She is very much passion towards her profession and dedicated too. Join and become a active person."
  },
  {
    id: 6,
    name: "Suganya Sekar",
    role: "Student",
    stars: 5,
    comment: "Attending this yoga class has been a truly uplifting experience. Both my instructors Sharmi and Rekha creates a welcoming and friendly atmosphere that makes everyone feel comfortable, no matter their level of experience. The classes are not only physically beneficial but also mentally soothing. Their passion for yoga is evident in every class, and it is truly inspiring. I highly recommend these classes to anyone looking for a well-rounded and rejuvenating yoga experience."
  },
  {
    id: 7,
    name: "Lakshmi Krishnamurthy",
    role: "Local Guide",
    stars: 5,
    comment: "Wonderful place to learn yoga. Sharmila mam is a great teacher. She also conducts work out sessions along with teaching yoga. She is very dedicated and very patient in teaching asanas. Very positive sessions to begin each day."
  },
  {
    id: 8,
    name: "nanthini nanthu",
    role: "Student",
    stars: 5,
    comment: "Really energetic and her attitude towards us really superb... She makes us so flexible in both physically and mentally."
  },
  {
    id: 9,
    name: "sangeetha Ravikumar",
    role: "Student",
    stars: 5,
    comment: "A lively place. Where u can feel positivity and peace. Sharmi n Rekha both trainers rock . Train us perfectly for what v r there for."
  },
  {
    id: 10,
    name: "Selvi",
    role: "Local Guide",
    stars: 5,
    comment: "Best place to learn yoga and both Sharmila mam and reka mam are very friendly and dedicated."
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
