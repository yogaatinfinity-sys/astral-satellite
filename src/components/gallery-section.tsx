"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
    { src: "/assets/gallery/infinity-1.webp", alt: "Yoga practice session 1" },
    { src: "/assets/gallery/infinity-2.webp", alt: "Yoga practice session 2" },
    { src: "/assets/gallery/infinity-3.webp", alt: "Yoga practice session 3" },
    { src: "/assets/gallery/infinity-4.webp", alt: "Yoga practice session 4" },
    { src: "/assets/gallery/infinity-5.webp", alt: "Yoga practice session 5" },
    { src: "/assets/gallery/infinity-6.webp", alt: "Yoga practice session 6" },
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

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ 
                                duration: 0.7, 
                                delay: index * 0.1,
                                ease: [0.21, 0.47, 0.32, 0.98]
                            }}
                            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute inset-0 z-10 p-2">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="object-cover transition-all duration-700 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] drop-shadow-[0_5px_10px_rgba(0,0,0,0.1)] rounded-2xl"
                                />
                            </div>
                            
                            {/* Overlay for interaction */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                            
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl z-30" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
