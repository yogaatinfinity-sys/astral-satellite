
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"

export function ZenGravitySection() {
    const [gravityOff, setGravityOff] = useState(false)
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

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
                <label className="flex items-center gap-4 cursor-pointer mb-12 group">
                    <span className={`text-sm font-medium tracking-widest uppercase transition-opacity duration-300 ${gravityOff ? "opacity-50" : "opacity-100"}`}>
                        Grounded
                    </span>
                    <div
                        className={`w-16 h-8 rounded-full p-1 transition-colors duration-500 flex items-center ${gravityOff ? "bg-gold" : "bg-charcoal/10"}`}
                        onClick={() => setGravityOff(!gravityOff)}
                    >
                        <motion.div
                            layout
                            className="w-6 h-6 bg-white rounded-full shadow-md"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            style={{ marginLeft: gravityOff ? "2rem" : "0" }}
                        />
                    </div>
                    <span className={`text-sm font-medium tracking-widest uppercase transition-opacity duration-300 ${gravityOff ? "opacity-100" : "opacity-50 text-gold"}`}>
                        Zero Gravity
                    </span>
                </label>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                        Aerial Yoga
                    </h2>
                    <p className="text-charcoal/70 text-lg md:text-xl leading-relaxed">
                        Experience the freedom of flight. Suspend your practice, decompress your spine, and find balance in the air.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            animate={
                                gravityOff
                                    ? {
                                        y: [0, -20, 0],
                                        rotate: [0, 1, -1, 0],
                                        transition: {
                                            duration: 4 + item, // Staggered float duration
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: item * 0.5,
                                        },
                                    }
                                    : { y: 0, rotate: 0 }
                            }
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/60 backdrop-blur-sm border border-charcoal/10 p-8 rounded-3xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-primary/20 transition-colors duration-500" />

                            <div className="relative z-10">
                                <div className="h-12 w-12 rounded-full bg-brand-primary/10 text-brand-primary mb-6 flex items-center justify-center text-2xl">
                                    {item === 1 ? "🧘" : item === 2 ? "🕊️" : "✨"}
                                </div>
                                <h3 className="text-2xl font-serif mb-4 text-charcoal">
                                    {item === 1 ? "Fundamentals" : item === 2 ? "Air Flow" : "Restorative Air"}
                                </h3>
                                <p className="text-sm text-charcoal/60 leading-relaxed mb-6">
                                    {item === 1
                                        ? "Learn the basics of the hammock and build trust in your suspension."
                                        : item === 2
                                            ? "Fluid movements linking breath with aerial transitions."
                                            : "Deep relaxation floating in the cocoon of the silk."}
                                </p>
                                <Button
                                    variant="ghost"
                                    className="text-[#6fcbcc] hover:text-charcoal hover:bg-[#6fcbcc]/10 w-full justify-between group-hover:pl-4 transition-all"
                                    onClick={() => {
                                        const message = encodeURIComponent("Namaste! I just saw your website and I would like to book a Yoga session. Please let me know the available slots.");
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

