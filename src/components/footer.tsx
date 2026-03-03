
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-soft-bone text-charcoal py-16 border-t border-charcoal/5 relative overflow-hidden">
            {/* Subtle pattern or gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-primary/10 to-transparent opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                <div className="text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                        <img src="/logo.png" alt="Yoga @ Infinity Logo" className="h-12 w-auto mix-blend-multiply" />
                        <span className="text-xl font-serif font-bold text-charcoal tracking-widest">
                            Yoga @ Infinity
                        </span>
                    </div>
                    <p className="text-charcoal/60 text-sm max-w-xs">
                        Embark on a journey of mindfulness and strength.
                    </p>
                    <p className="text-charcoal/40 text-xs mt-4">© <span suppressHydrationWarning>{new Date().getFullYear()}</span> All rights reserved.</p>
                </div>

                <div className="flex gap-8 text-sm font-medium tracking-wide">
                    <Link href="#" className="hover:text-gold transition-colors">Instagram</Link>
                    <Link href="#" className="hover:text-gold transition-colors">WhatsApp</Link>
                </div>
            </div>
        </footer>
    )
}
