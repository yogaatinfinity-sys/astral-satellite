
"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
    { src: "/assets/icons/front-meditation.jpg", alt: "Sunset Yoga Flow", span: "row-span-2" },
    { src: "/assets/icons/side-stretch.jpg", alt: "Aerial Silk Meditation", span: "row-span-1" },
    { src: "/assets/icons/three-meditation.jpg", alt: "Modern Studio Space", span: "row-span-1" },
    { src: "/assets/icons/side-stretch.jpg", alt: "Serene Mindfulness", span: "row-span-2" },
    { src: "/assets/icons/front-meditation.jpg", alt: "Lotus Pose", span: "row-span-1" },
    { src: "/assets/icons/three-meditation.jpg", alt: "Balanced Movement", span: "row-span-1" },
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
                        className="text-4xl md:text-5xl font-serif text-charcoal mb-4"
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
