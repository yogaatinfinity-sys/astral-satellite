"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"

const itemTransition: any = { duration: 0.8, ease: "easeOut" }

export function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, 100])
    const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
        },
    }

    return (
        <section ref={sectionRef} className="relative min-h-[90vh] lg:h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-soft-bone pt-[120px] lg:pt-20">
            {/* Background patterns or subtle gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-soft-bone to-soft-bone opacity-50 pointer-events-none" />

            <div className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-start text-left"
                >
                    <motion.p
                        variants={itemVariants}
                        transition={itemTransition}
                        className="text-brand-primary font-medium tracking-widest uppercase text-sm md:text-base mb-4"
                    >
                        Welcome to Yoga @ Infinity
                    </motion.p>

                    <motion.h1
                        variants={itemVariants}
                        transition={itemTransition}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6"
                    >
                        Find Your <br className="hidden sm:block" />
                        <span className="relative inline-block">
                            <motion.span
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="inline-block text-gold"
                            >
                                Inner
                            </motion.span>{" "}
                            Peace
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        transition={itemTransition}
                        className="text-lg md:text-xl font-light text-slate-500 max-w-2xl mb-10"
                    >
                        From foundational Hatha to high-intensity Strength Yoga with dumbbells. Elevate your physical and mental peak in our signature morning flow.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        transition={itemTransition}
                        className="flex flex-col sm:flex-row gap-4 justify-start"
                    >
                        <Button
                            size="lg"
                            className="rounded-full bg-[#6fcbcc] hover:bg-[#5bb0b1] text-white shadow-lg shadow-[#6fcbcc]/20 transition-all duration-300 font-bold tracking-wide"
                            onClick={() => {
                                const el = document.getElementById('contact');
                                el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Start Your Journey
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full border-[#6fcbcc] text-[#6fcbcc] hover:bg-[#6fcbcc]/10 transition-all duration-300 font-bold tracking-wide"
                            onClick={() => {
                                const el = document.getElementById('zen-gravity');
                                el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            View Schedule
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ y: isMobile ? 0 : smoothY }}
                    className="relative w-full h-[400px] lg:h-[750px] flex justify-center lg:justify-end items-center"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full h-full transform-gpu lg:scale-110 xl:scale-125 origin-center lg:origin-right"
                    >
                        <Image
                            src="/assets/hero-pose.webp"
                            alt="Yoga teacher in teal outfit performing a backbend pose"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)] drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] transition-all duration-700 hover:scale-[1.05]"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative floating elements */}
            <motion.div
                animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                style={{ y: isMobile ? 0 : smoothY }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"
            />
        </section>
    )
}
