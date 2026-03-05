
"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
    { src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800", alt: "Sunset Yoga Flow", span: "row-span-2" },
    { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800", alt: "Aerial Silk Meditation", span: "row-span-1" },
    { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800", alt: "Modern Studio Space", span: "row-span-1" },
    { src: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=800", alt: "Serene Mindfulness", span: "row-span-2" },
    { src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800", alt: "Lotus Pose", span: "row-span-1" },
    { src: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?auto=format&fit=crop&q=80&w=800", alt: "Balanced Movement", span: "row-span-1" },
    { src: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=800", alt: "Warrior Pose Grace", span: "row-span-1" },
]

export function GallerySection() {
    return (
        <section className="py-24 bg-soft-bone overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-semibold mb-6 text-slate-800"
                    >
                        Infinity Gallery
                    </motion.h2>
                    <p className="text-charcoal/60 max-w-2xl mx-auto">
                        Glimpses of serenity and strength from our studio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={`relative rounded-xl overflow-hidden shadow-md group ${image.span}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
