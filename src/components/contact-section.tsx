
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, CheckCircle2 } from "lucide-react"

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleWhatsApp = () => {
        const message = encodeURIComponent("Hi Yoga @ Infinity, I'd like to inquire about your classes!")
        window.open(`https://wa.me/919840941300?text=${message}`, "_blank")
    }

    const handleSubmit = (e: React.FormEvent) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        // Build and open WhatsApp URL with form data
        const text = `Hello! My name is ${formData.name}. I'm contacting you via your website regarding: ${formData.message}`
        const whatsappUrl = `https://wa.me/919840941300?text=${encodeURIComponent(text)}`
        window.open(whatsappUrl, "_blank")

        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 5000)
        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <section id="contact" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-5xl font-semibold mb-6 text-slate-800">Begin Your Journey</h2>
                    <p className="text-charcoal/60 text-lg mb-8 leading-relaxed">
                        We'd love to hear from you. Whether you have a question about class schedules,
                        membership options, or just want to say hello, our team is here to help.
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                                📍
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-teal-600">Visit Us</h4>
                                <a href="https://www.google.com/maps/place/Yoga@infinity/@13.1298795,80.1469006,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5263b03fab2409:0xf134aade5edbe9ad!8m2!3d13.1298795!4d80.1494755!16s%2Fg%2F11k9k88dg3?entry=ttu&g_ep=EgoyMDI2MDMwMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-brand-primary transition-colors block mt-1">
                                    Thirumalai St, Venkateswara Nagar, Oragadam,<br />
                                    Chennai, Tamil Nadu 600053
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                                📞
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-teal-600">Call Us</h4>
                                <a href="tel:+919840941300" className="text-charcoal/60 hover:text-brand-primary transition-colors block mt-1">
                                    +91 98409 41300
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-soft-bone p-8 md:p-12 rounded-3xl shadow-sm relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                onSubmit={handleSubmit}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-charcoal/80 block">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                setFormData(prev => ({ ...prev, name: value }))
                                            }}
                                            className="w-full px-4 py-3 rounded-lg bg-white border border-charcoal/10 focus:border-brand-primary focus:ring-0 transition-colors outline-none"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-charcoal/80 block">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                setFormData(prev => ({ ...prev, email: value }))
                                            }}
                                            className="w-full px-4 py-3 rounded-lg bg-white border border-charcoal/10 focus:border-brand-primary focus:ring-0 transition-colors outline-none"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-charcoal/80 block">Message</label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            setFormData(prev => ({ ...prev, message: value }))
                                        }}
                                        className="w-full px-4 py-3 rounded-lg bg-white border border-charcoal/10 focus:border-brand-primary focus:ring-0 transition-colors outline-none resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full py-6 text-lg rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg shadow-brand-primary/20 transition-all group font-bold tracking-wide"
                                >
                                    <span className="flex items-center gap-2">
                                        Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-serif text-charcoal mb-2">Message Sent!</h3>
                                <p className="text-charcoal/60">We've received your message and will get back to you shortly.</p>
                                <Button
                                    variant="ghost"
                                    className="mt-8 text-brand-primary font-medium"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    Send another message
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Floating WhatsApp Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWhatsApp}
                className="fixed bottom-8 right-8 z-50 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center cursor-pointer"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={32} />
            </motion.button>
        </section>
    )
}
