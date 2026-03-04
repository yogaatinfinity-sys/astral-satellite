
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-soft-bone text-charcoal py-16 border-t border-charcoal/5 relative overflow-hidden">
            {/* Subtle pattern or gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-primary/10 to-transparent opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                <div className="text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                        <img src="/logo.svg" alt="Yoga @ Infinity Logo" className="h-[60px] w-auto object-contain" />
                        <span className="text-xl font-serif font-bold text-charcoal tracking-widest">
                            Yoga @ Infinity
                        </span>
                    </div>
                    <p className="text-charcoal/60 text-sm max-w-xs mt-2">
                        Embark on a journey of mindfulness and strength.
                    </p>
                    <p className="text-charcoal/40 text-xs mt-4">© <span suppressHydrationWarning>{new Date().getFullYear()}</span> All rights reserved.</p>
                </div>

                <div className="flex flex-col gap-4 text-sm tracking-wide text-center md:text-right">
                    <a href="https://maps.app.goo.gl/3GfX1Fh7v2nB1y2b8" target="_blank" rel="noopener noreferrer" className="text-charcoal/70 hover:text-brand-primary transition-colors max-w-xs">
                        Thirumalai St, Venkateswara Nagar, Oragadam, Chennai, Tamil Nadu 600053
                    </a>
                    <a href="tel:+919840941300" className="text-charcoal/70 hover:text-brand-primary transition-colors font-medium">
                        +91 98409 41300
                    </a>
                    <div className="flex gap-6 justify-center md:justify-end mt-2">
                        <Link href="#" className="hover:text-gold transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-gold transition-colors">WhatsApp</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
