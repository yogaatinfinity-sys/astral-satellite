
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
    {
        text: "Yoga @ Infinity has completely transformed my practice. The aerial classes are a game changer for my back pain.",
        author: "Sarah J.",
        role: "Member since 2024"
    },
    {
        text: "The studio atmosphere is unlike any other. It truly feels like a quiet luxury escape in the middle of the city.",
        author: "Michael T.",
        role: "Yoga Teacher"
    },
    {
        text: "I love the attention to detail in every class. The instructors are knowledgeable and the community is so welcoming.",
        author: "Elena R.",
        role: "Beginner Yogi"
    }
]

export function TestimonialsSection() {
    const [current, setCurrent] = useState(0)

    const next = () => setCurrent((curr) => (curr + 1) % testimonials.length)
    const prev = () => setCurrent((curr) => (curr - 1 + testimonials.length) % testimonials.length)

    return (
        <section id="testimonials" className="py-24 bg-white text-charcoal overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-[60px] items-center">
                    {/* Left Side: Member Voices Info */}
                    <div className="space-y-8 lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 bg-[#6fcbcc]/10 rounded-full text-[#6fcbcc] text-xs font-bold uppercase tracking-widest"
                        >
                            Member Voices
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1]"
                        >
                            What Our Members <br />
                            <span className="italic italic-font">Are Saying</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-charcoal/60 text-lg leading-relaxed max-w-md"
                        >
                            Our community is built on stories of transformation, resilience, and connection. Hear from those who have found their home with us.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Button
                                className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                                onClick={() => window.location.hash = 'contact'}
                            >
                                Join Our Community
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Side: Testimonial Card */}
                    <div className="relative lg:w-1/2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="bg-[#FAFAEE] p-10 md:p-16 rounded-[40px] shadow-sm border border-charcoal/5 relative min-h-[450px] flex flex-col justify-between"
                            >
                                <div className="absolute top-10 right-10 opacity-20 text-[#f8b4a6]">
                                    <Quote size={80} />
                                </div>

                                <div className="relative z-10">
                                    <p className="text-2xl md:text-3xl font-serif text-charcoal leading-relaxed mb-12 font-medium">
                                        "{testimonials[current].text}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full bg-[#6fcbcc]/20 flex items-center justify-center text-[#6fcbcc] font-bold text-xl border border-[#6fcbcc]/10">
                                        {testimonials[current].author[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-charcoal leading-tight">
                                            {testimonials[current].author}
                                        </h4>
                                        <p className="text-charcoal/60 font-medium">
                                            {testimonials[current].role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slider Navigation */}
                        <div className="flex gap-4 mt-12 justify-center lg:justify-start">
                            <button
                                onClick={prev}
                                className="p-4 rounded-full border border-charcoal/10 hover:bg-brand-primary hover:text-white hover:border-transparent transition-all flex items-center justify-center group"
                            >
                                <ArrowLeft size={24} className="group-active:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={next}
                                className="p-4 rounded-full border border-charcoal/10 hover:bg-brand-primary hover:text-white hover:border-transparent transition-all flex items-center justify-center group"
                            >
                                <ArrowRight size={24} className="group-active:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
