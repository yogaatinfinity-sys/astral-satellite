
"use client"

import { motion } from "framer-motion"
import { LucideIcon, Sun, Wind, Moon, Heart } from "lucide-react"

interface ServiceProps {
    title: string
    description: string
    icon: LucideIcon
}

const services: ServiceProps[] = [
    {
        title: "Vinyasa Flow",
        description: "Dynamic sequences that synchronize breath with movement to build heat and endurance.",
        icon: Sun, // Example icon
    },
    {
        title: "Hatha Yoga",
        description: "Gentle, slower-paced classes focusing on alignment and holding poses to build strength.",
        icon: Wind,
    },
    {
        title: "Restorative",
        description: "Deep relaxation through supported poses, allowing the body to release tension and stress.",
        icon: Moon,
    },
    {
        title: "Prenatal",
        description: "Safe and nurturing practices designed to support expectant mothers through all trimesters.",
        icon: Heart
    }
]

export function ServicesSection() {
    return (
        <section id="services" className="py-20 md:py-32 bg-soft-bone/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-serif text-charcoal mb-4 font-bold"
                    >
                        Our Classes
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-charcoal/60 max-w-2xl mx-auto"
                    >
                        Diverse practices for every level of experience.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl hover:shadow-xl transition-all duration-500 border border-transparent hover:border-brand-primary/20 group hover:-translate-y-1 flex flex-col h-full"
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 shadow-sm border border-charcoal/5 group-hover:border-transparent">
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-serif text-charcoal tracking-tight">{service.title}</h3>
                            <p className="text-charcoal/70 text-sm md:text-base leading-relaxed flex-grow">{service.description}</p>
                            <button
                                className="mt-8 text-left text-sm font-semibold text-charcoal group-hover:text-brand-primary transition-colors flex items-center gap-2"
                                onClick={() => {
                                    const message = encodeURIComponent(`Namaste! I would like to book a session for ${service.title}.`);
                                    window.open(`https://wa.me/919840941300?text=${message}`, "_blank");
                                }}
                            >
                                Book Session <span className="text-brand-primary transition-transform group-hover:translate-x-1">→</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
