"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
    { 
        src: "/assets/gallery/infinity-1.webp", 
        alt: "Large yoga feature", 
        className: "md:col-span-2 md:row-span-2",
        objectPos: "object-center"
    },
    { 
        src: "/assets/gallery/infinity-2.webp", 
        alt: "Yoga session", 
        className: "md:col-span-1 md:row-span-1",
        objectPos: "object-center"
    },
    { 
        src: "/assets/gallery/infinity-5.webp", 
        alt: "Yoga pose", 
        className: "md:col-start-3 md:row-start-2 md:col-span-1 md:row-span-1",
        objectPos: "object-center"
    },
    { 
        src: "/assets/gallery/infinity-4.webp", 
        alt: "Standing Natarajasana portrait pose", 
        className: "md:col-start-4 md:row-span-2",
        objectPos: "object-top"
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

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-auto md:h-[600px] lg:h-[700px]">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                            className={`relative overflow-hidden group cursor-pointer rounded-xl h-[300px] md:h-full ${image.className}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                priority={index < 2}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className={`w-full h-full object-cover ${image.objectPos} transition-transform duration-700 group-hover:scale-105`}
                            />
                            
                            {/* Overlay for interaction */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl z-20" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
