
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wind, Heart, Zap, Sparkles, Droplets, Target, LucideIcon } from "lucide-react"

interface ServiceProps {
    title: string
    subtitle: string
    description: string
    icon: LucideIcon
}

const services: ServiceProps[] = [
    {
        title: "Hatha Yoga",
        subtitle: "Beginner Friendly",
        description: "Master the foundational poses and alignment in a supportive environment.",
        icon: Target,
    },
    {
        title: "Flexibility Training",
        subtitle: "Deep Stretch & Mobility",
        description: "Enhance your range of motion and release muscle tension through targeted stretching.",
        icon: Sparkles,
    },
    {
        title: "Pranayama",
        subtitle: "Breathing & Mind Control",
        description: "Unlock the power of your breath to reduce stress and improve mental clarity.",
        icon: Wind,
    },
    {
        title: "Strength Yoga",
        subtitle: "Yoga with Dumbbells",
        description: "Combine traditional asanas with resistance training to build lean muscle and functional strength.",
        icon: Zap,
    },
    {
        title: "Women Wellness Yoga",
        subtitle: "Specialized Programs",
        description: "Customized yoga practices designed to support women through all stages of life.",
        icon: Heart,
    },
    {
        title: "Advanced Yoga",
        subtitle: "Master Challenging Poses",
        description: "Take your practice to the next level with advanced inversions, arm balances, and transitions.",
        icon: Droplets,
    }
]

export function ZenGravitySection() {
    const containerRef = useRef<HTMLElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const shapeY1 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const shapeY2 = useTransform(scrollYProgress, [0, 1], [0, 100])
    const smoothShapeY1 = useSpring(shapeY1, { stiffness: 50, damping: 20 })
    const smoothShapeY2 = useSpring(shapeY2, { stiffness: 50, damping: 20 })

    return (
        <section ref={containerRef} id="zen-gravity" className="py-32 bg-[#FFFBF2] text-charcoal relative overflow-hidden transition-colors duration-700">
            {/* Drifting Background Shapes */}
            <motion.div
                style={{ y: isMobile ? 0 : smoothShapeY1 }}
                className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"
            />
            <motion.div
                style={{ y: isMobile ? 0 : smoothShapeY2 }}
                className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-slate-800">
                        The Infinity Collection
                    </h2>
                    <p className="text-charcoal/70 text-lg md:text-xl leading-relaxed">
                        Explore our diverse range of yoga practices tailored for every body and every goal.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 1, -1, 0],
                                transition: {
                                    duration: 4 + (index % 3), // Staggered float duration
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2,
                                },
                            }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/60 backdrop-blur-sm border border-charcoal/10 p-8 rounded-3xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-primary/20 transition-colors duration-500" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary mb-6 flex items-center justify-center">
                                    <service.icon size={24} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-medium mb-3 text-slate-700">{service.title}</h3>
                                <p className="text-brand-primary font-medium text-sm mb-4">{service.subtitle}</p>
                                <p className="text-sm text-charcoal/60 leading-relaxed mb-6 flex-grow">
                                    {service.description}
                                </p>
                                <Button
                                    variant="ghost"
                                    className="text-[#6fcbcc] hover:text-charcoal hover:bg-[#6fcbcc]/10 w-full justify-between group-hover:pl-4 transition-all mt-auto font-bold tracking-wide"
                                    onClick={() => {
                                        const message = encodeURIComponent(`Namaste! I just saw your website and I would like to book a session for ${service.title}. Please let me know the available slots.`);
                                        window.open(`https://wa.me/919840941300?text=${message}`, "_blank")
                                    }}
                                >
                                    Book Session <span className="text-lg">→</span>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

