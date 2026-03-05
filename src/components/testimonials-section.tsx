"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"

interface Review {
    id: number;
    name: string;
    role: string;
    stars: number;
    comment: string;
    image?: string;
}

interface TestimonialsSectionProps {
    reviews: Review[];
}

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextReview = () => {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <section id="testimonials" className="py-24 bg-white text-charcoal overflow-hidden w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Branding / CTA */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-[#0d9488]/10 rounded-full text-[#0d9488] text-xs font-bold uppercase tracking-widest">
                            Member Voices
                        </div>

                        <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-slate-800">
                            What Our Members <br className="hidden sm:block" />
                            Are Saying
                        </h2>

                        <p className="text-charcoal/60 text-lg leading-relaxed max-w-xl mb-8">
                            Our community is built on stories of transformation, resilience, and connection. Hear from those who have found their home with us.
                        </p>

                        <a
                            href="https://search.google.com/local/writereview?placeid=ChIJCSSrP7BjUjoRrenbXt6qNPE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-full px-8 py-4 text-lg font-bold shadow-lg transition-all"
                        >
                            Explore More Reviews
                        </a>
                    </div>

                    {/* Right Column: Featured Card */}
                    <div className="relative w-full">
                        <div className="bg-[#F5F5F0] rounded-3xl p-8 md:p-12 relative shadow-lg border border-slate-100 h-full min-h-[380px] flex flex-col justify-between">
                            {/* Peach Quotation Mark */}
                            <div className="text-[120px] text-[#FFB8A1] absolute -top-8 left-2 md:-left-4 font-serif leading-none select-none z-0 opacity-80">
                                &ldquo;
                            </div>

                            <div className="relative z-10 flex flex-col flex-grow">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col flex-grow"
                                    >
                                        <div className="flex gap-1 mb-6 text-yellow-400">
                                            {[...Array(reviews[activeIndex].stars)].map((_, i) => (
                                                <Star key={i} size={20} fill="currentColor" stroke="currentColor" />
                                            ))}
                                        </div>
                                        <p className="text-xl md:text-2xl font-serif font-bold text-slate-800 leading-relaxed mb-8">
                                            "{reviews[activeIndex].comment}"
                                        </p>
                                        <div className="mt-auto pb-12 flex items-center gap-4">
                                            {reviews[activeIndex].image && (
                                                <img
                                                    src={reviews[activeIndex].image}
                                                    alt={reviews[activeIndex].name}
                                                    className="w-14 h-14 rounded-full object-cover shadow-sm border-2 border-white flex-shrink-0"
                                                />
                                            )}
                                            <div>
                                                <h4 className="text-lg font-bold text-[#0d9488]">
                                                    {reviews[activeIndex].name}
                                                </h4>
                                                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                                                    {reviews[activeIndex].role}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Navigation Arrows */}
                            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-3 z-20">
                                <button
                                    onClick={prevReview}
                                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-[#0d9488] hover:text-white transition-colors text-slate-800 focus:outline-none"
                                    aria-label="Previous review"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                                <button
                                    onClick={nextReview}
                                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-[#0d9488] hover:text-white transition-colors text-slate-800 focus:outline-none"
                                    aria-label="Next review"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
