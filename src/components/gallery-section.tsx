"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Plus } from "lucide-react"

interface GalleryImage {
    src: string;
    alt: string;
    orientation: 'portrait' | 'landscape' | 'square';
}

const curatedImages: GalleryImage[] = [
    { 
        src: "/assets/gallery/infinity-1.webp", 
        alt: "Yoga focus", 
        orientation: "square" 
    },
    { 
        src: "/assets/gallery/infinity-2.webp", 
        alt: "Studio landscape", 
        orientation: "landscape" 
    },
    { 
        src: "/assets/gallery/infinity-3.webp", 
        alt: "Portrait pose", 
        orientation: "portrait" 
    },
    { 
        src: "/assets/gallery/infinity-4.webp", 
        alt: "Balanced pose", 
        orientation: "square" 
    },
    { 
        src: "/assets/gallery/infinity-5.webp", 
        alt: "Yoga morning", 
        orientation: "square" 
    },
    { 
        src: "/assets/gallery/infinity-6.webp", 
        alt: "Standing pose", 
        orientation: "portrait" 
    },
]

const additionalImages: string[] = []

export function GallerySection() {
    const [isExpanded, setIsExpanded] = useState(false)

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

                {/* Main Bento Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 auto-rows-[200px] md:auto-rows-[300px]">
                    {curatedImages.map((image, index) => (
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
                            className={`relative overflow-hidden group cursor-pointer rounded-2xl
                                ${image.orientation === 'portrait' ? 'row-span-2 col-span-1 lg:row-span-2 lg:col-span-1' : ''}
                                ${image.orientation === 'landscape' ? 'col-span-2 lg:col-span-2 lg:row-span-1' : ''}
                                ${image.orientation === 'square' ? 'col-span-1 lg:col-span-1 lg:row-span-1' : ''}
                                max-lg:col-span-1 max-lg:row-span-1 
                                max-lg:max-w-full
                            `}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 1024px) 50vw, 33vw"
                                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110
                                    ${image.orientation === 'portrait' ? 'object-top' : 'object-center'}
                                `}
                            />
                            
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl z-20" />
                        </motion.div>
                    ))}
                </div>

                {/* See More Expansion */}
                <div className="mt-12 flex flex-col items-center">
                    {!isExpanded && additionalImages.length > 0 && (
                        <motion.button
                            onClick={() => setIsExpanded(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-white rounded-full font-bold shadow-lg shadow-[#D4AF37]/20 hover:bg-[#B8962D] transition-colors"
                        >
                            <Plus size={20} />
                            See More
                        </motion.button>
                    )}

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="w-full mt-8"
                            >
                                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                                    {additionalImages.map((image, index) => (
                                        <motion.div
                                            key={`extra-${index}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="relative rounded-2xl overflow-hidden break-inside-avoid"
                                        >
                                            <img
                                                src={image}
                                                alt={`Gallery extra ${index}`}
                                                className="w-full h-auto object-cover rounded-2xl"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
