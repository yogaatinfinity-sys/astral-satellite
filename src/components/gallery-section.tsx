"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
    { src: "/assets/gallery/infinity-1.webp", alt: "Yoga practice session 1", span: "lg:row-span-2" },
    { src: "/assets/gallery/infinity-2.webp", alt: "Yoga practice session 2", span: "lg:row-span-1" },
    { src: "/assets/gallery/infinity-3.webp", alt: "Yoga practice session 3", span: "lg:row-span-1" },
    { src: "/assets/gallery/infinity-4.webp", alt: "Yoga practice session 4", span: "lg:row-span-2" },
    { src: "/assets/gallery/infinity-5.webp", alt: "Yoga practice session 5", span: "lg:row-span-1" },
    { src: "/assets/gallery/infinity-6.webp", alt: "Yoga practice session 6", span: "lg:row-span-1" },
]

export function GallerySection() {
    return (
        <section id="gallery" className="py-24 bg-soft-bone overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-charcoal/60 max-w-2xl mx-auto"
                    >
                        Glimpses of serenity and strength from our studio.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                ease: [0.21, 0.47, 0.32, 0.98]
                            }}
                            className={`relative rounded-3xl overflow-hidden shadow-xl group cursor-pointer ${image.span}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-90 grayscale-[10%] group-hover:grayscale-0"
                            />
                            
                            {/* Overlay for interaction */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
