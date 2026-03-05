"use client"

import { motion } from "framer-motion"
import { ReviewWidget } from "./review-widget"

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-24 bg-white text-charcoal overflow-hidden w-full">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 w-full max-w-3xl mb-12 flex flex-col items-center"
                >
                    <div
                        className="inline-block px-4 py-1.5 bg-[#6fcbcc]/10 rounded-full text-[#6fcbcc] text-xs font-bold uppercase tracking-widest"
                    >
                        Member Voices
                    </div>

                    <h2
                        className="text-3xl md:text-5xl font-semibold mb-6 text-slate-800"
                    >
                        What Our Members <br className="hidden sm:block" />
                        Are Saying
                    </h2>

                    <p
                        className="text-charcoal/60 text-lg leading-relaxed max-w-xl"
                    >
                        Our community is built on stories of transformation, resilience, and connection. Hear from those who have found their home with us.
                    </p>
                </motion.div>

                {/* Elfsight Google Reviews Payload Layer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full"
                >
                    <ReviewWidget />
                </motion.div>

            </div>
        </section>
    )
}
