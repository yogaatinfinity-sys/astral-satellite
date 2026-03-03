"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FeaturedImage() {
    return (
        <section className="py-24 bg-soft-bone">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-charcoal/5"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000"
                        alt="Serene Yoga Studio Demo"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
                    <div className="absolute bottom-12 left-12 text-white">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl md:text-5xl font-serif mb-2"
                        >
                            Space for Transformation
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg md:text-xl text-white/80 max-w-xl"
                        >
                            Experience the serene atmosphere of our premium studio.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
