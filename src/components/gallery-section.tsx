"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
    { 
        src: "/assets/gallery/infinity-1.webp", 
        alt: "Horizontal yoga pose", 
        className: "md:col-span-2 md:row-span-2" 
    },
    { 
        src: "/assets/gallery/infinity-2.webp", 
        alt: "Group yoga session", 
        className: "md:col-span-1 md:row-span-1" 
    },
    { 
        src: "/assets/gallery/infinity-4.webp", 
        alt: "Standing Natarajasana portrait pose", 
        className: "md:col-span-1 md:row-span-2" 
    },
    { 
        src: "/assets/gallery/infinity-5.webp", 
        alt: "Backbend horizontal pose", 
        className: "md:col-span-1 md:row-span-1" 
    },
    { 
        src: "/assets/gallery/infinity-3.webp", 
        alt: "Yoga serenity", 
        className: "md:col-span-1 md:row-span-1" 
    },
    { 
        src: "/assets/gallery/infinity-6.webp", 
        alt: "Yoga strength", 
        className: "md:col-span-1 md:row-span-1" 
    },
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px]">
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
                            className={`relative rounded-3xl overflow-hidden group cursor-pointer ${image.className}`}
                        >
                            <div className="absolute inset-0 z-10 p-4">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="object-contain transition-all duration-700 group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] drop-shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
                                />
                            </div>
                            
                            {/* Accent Background for depth */}
                            <div className="absolute inset-0 bg-white/40 group-hover:bg-white/60 transition-colors duration-500 rounded-3xl" />
                            
                            {/* Overlay for interaction */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                            
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl z-30" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
