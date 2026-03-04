"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

const ADMIN_EMAIL = "yogaatinfinity@gmail.com"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [adminPath, setAdminPath] = React.useState("/admin/login")

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)

        const checkAdminSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user?.email === ADMIN_EMAIL) {
                setAdminPath("/admin/dashboard")
            } else {
                setAdminPath("/admin/login")
            }
        }

        checkAdminSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user?.email === ADMIN_EMAIL) {
                setAdminPath("/admin/dashboard")
            } else {
                setAdminPath("/admin/login")
            }
        })

        return () => {
            window.removeEventListener("scroll", handleScroll)
            subscription.unsubscribe()
        }
    }, [])

    const navLinks = [
        { href: "/#services", label: "Classes" },
        { href: "/#zen-gravity", label: "Aerial Yoga" },
        { href: "/live", label: "Live Studio" },
        { href: "/#testimonials", label: "Stories" },
        { href: "/#contact", label: "Contact" },
    ]

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-6 md:px-12 h-28 flex items-center",
                scrolled ? "bg-soft-bone/80 backdrop-blur-md shadow-sm" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto w-full relative flex items-center justify-between">
                {/* Logo (Left for both Desktop and Mobile) */}
                <Link href="/" className="flex items-center gap-3 z-50 pl-4 md:pl-8">
                    <Image
                        src="/logo.svg"
                        alt="Yoga Infinity Logo"
                        width={110}
                        height={110}
                        className="h-[75px] md:h-[105px] w-auto object-contain"
                        priority={true}
                        unoptimized={true}
                    />
                </Link>

                {/* Desktop Menu (Centered) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-charcoal/80 hover:text-gold transition-colors font-medium text-sm tracking-wide whitespace-nowrap"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Button (Right Side) */}
                <div className="hidden lg:flex items-center gap-4 z-50">
                    <Link href={adminPath}>
                        <Button
                            variant="primary"
                            size="sm"
                            className="bg-transparent border border-[#6fcbcc] text-[#6fcbcc] hover:bg-[#6fcbcc] hover:text-white"
                        >
                            Manage Studio
                        </Button>
                    </Link>
                    <Button variant="primary" size="sm" onClick={() => {
                        const message = encodeURIComponent("Namaste! I just saw your website and I would like to book a Yoga session. Please let me know the available slots.");
                        window.open(`https://wa.me/919840941300?text=${message}`, "_blank")
                    }}>
                        Book a Class
                    </Button>
                </div>

                {/* Mobile Menu Toggle (Right) */}
                <div className="lg:hidden z-50">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-charcoal focus:outline-none">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 w-full h-screen bg-soft-bone flex flex-col items-center justify-center gap-10 lg:hidden z-40 px-6"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl font-serif text-charcoal hover:text-brand-primary transition-colors tracking-tight"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        <div className="w-full max-w-xs flex flex-col gap-4 pt-8 border-t border-charcoal/5">
                            <Link
                                href={adminPath}
                                onClick={() => setIsOpen(false)}
                                className="w-full text-center text-lg font-medium text-[#6fcbcc] border border-[#6fcbcc]/30 px-6 py-4 rounded-full bg-white/50 backdrop-blur-sm shadow-sm active:scale-[0.98] transition-all"
                            >
                                Manage Studio
                            </Link>
                            <Button
                                size="lg"
                                className="w-full rounded-full py-7 text-lg bg-[#6fcbcc] shadow-lg shadow-[#6fcbcc]/20"
                                onClick={() => {
                                    const message = encodeURIComponent("Namaste! I just saw your website and I would like to book a Yoga session. Please let me know the available slots.");
                                    window.open(`https://wa.me/919840941300?text=${message}`, "_blank");
                                    setIsOpen(false);
                                }}
                            >
                                Book a Class
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
