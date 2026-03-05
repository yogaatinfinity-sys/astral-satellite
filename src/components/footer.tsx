
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
                    <a href="https://www.google.com/maps/place/Yoga@infinity/@13.1298795,80.1469006,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5263b03fab2409:0xf134aade5edbe9ad!8m2!3d13.1298795!4d80.1494755!16s%2Fg%2F11k9k88dg3?entry=ttu&g_ep=EgoyMDI2MDMwMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors max-w-xs text-left md:text-right">
                        Thirumalai St, Venkateswara Nagar, Oragadam, Chennai, Tamil Nadu 600053
                    </a>
                    <a href="tel:+919840941300" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                        +91 98409 41300
                    </a>
                    <div className="flex gap-6 justify-center md:justify-end mt-2">
                        <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Instagram</Link>
                        <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">WhatsApp</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
