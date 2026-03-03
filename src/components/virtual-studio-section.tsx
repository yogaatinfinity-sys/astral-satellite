
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"

import { useRouter } from "next/navigation"

export function VirtualStudioSection() {
    const router = useRouter()

    const handleJoinLive = () => {
        router.push("/live")
    }

    return (
        <section className="py-24 bg-[#FFFBF2] relative overflow-hidden text-charcoal">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/30 via-[#FFFBF2] to-[#FFFBF2] opacity-60" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-red-600 text-xs font-bold uppercase tracking-widest mb-6"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    Live Now
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                    Virtual Studio
                </h2>
                <p className="text-charcoal/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Practice from the comfort of your home. Join our real-time interactive sessions and stay connected with the community.
                </p>

                <div className="p-1 rounded-full bg-gradient-to-r from-gold/40 to-brand-primary/40 shadow-xl shadow-brand-primary/10">
                    <Button
                        size="lg"
                        className="bg-brand-primary hover:bg-[#5FAFB0] text-white font-bold rounded-full px-10 py-7 text-xl group relative overflow-hidden shadow-2xl transition-all duration-300"
                        onClick={handleJoinLive}
                    >
                        <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-3">
                            <Video size={24} className="text-white" />
                            Join Live Session
                        </span>
                    </Button>
                </div>
            </div>
        </section>
    )
}
