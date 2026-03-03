"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const pillars = [
    {
        title: "For Your Body",
        description: "Improve strength, flexibility, and overall physical health.",
        icon: "/assets/icons/side-stretch.png",
        color: "#6fcbcc"
    },
    {
        title: "For Your Mind",
        description: "Find calm, focus, and manage stress in your daily life.",
        icon: "/assets/icons/front-meditation.png",
        color: "#f8b4a6" // Peach accent
    },
    {
        title: "For Your Community",
        description: "Connect, grow, and uplift the yoga community.",
        icon: "/assets/icons/three-meditation.png",
        color: "#6fcbcc"
    }
]

export function WhyYogaSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#FAFAEE] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-12px); }
                    }
                    .floating-image {
                        animation: float 6s ease-in-out infinite;
                    }
                `}</style>
                <div className="text-center mb-20 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-5xl font-bold text-charcoal mb-6 tracking-tight"
                    >
                        Why Yoga? Why Now?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-charcoal/60 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        Yoga is more than a physical practice—it’s a pathway to well-being for individuals and communities alike:
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-24 relative z-10">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1,
                                delay: index * 0.3,
                                ease: [0.21, 0.45, 0.32, 0.9]
                            }}
                            className="flex flex-col items-center text-center group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="relative w-full aspect-square max-w-[260px] mb-8 cursor-pointer"
                            >
                                {/* Subtle decorative elements */}
                                <div
                                    className="absolute inset-0 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                                    style={{ backgroundColor: pillar.color }}
                                />
                                <div
                                    className="absolute -inset-4 rounded-full blur-2xl opacity-10 group-hover:opacity-40 transition-all duration-700 pointer-events-none"
                                    style={{ backgroundColor: pillar.color }}
                                />

                                <div className="relative w-full h-full z-10 floating-image">
                                    <Image
                                        src={pillar.icon}
                                        alt={pillar.title}
                                        fill
                                        className={`object-contain transition-all duration-700 drop-shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${index === 1
                                            ? "group-hover:drop-shadow-[0_15px_45px_rgba(248,180,166,0.6)]"
                                            : "group-hover:drop-shadow-[0_15px_45px_rgba(111,203,204,0.6)]"
                                            }`}
                                    />
                                </div>
                            </motion.div>
                            <h3 className={`text-2xl font-bold mb-4 tracking-tight transition-colors duration-300 ${index === 1 ? 'text-charcoal group-hover:text-[#f8b4a6]' : 'text-charcoal group-hover:text-brand-primary'
                                }`}>
                                {pillar.title}
                            </h3>
                            <p className="text-charcoal/60 leading-relaxed max-w-[300px]">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
