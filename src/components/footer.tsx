
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-soft-bone text-charcoal py-16 border-t border-charcoal/5 relative overflow-hidden">
            {/* Subtle pattern or gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-primary/10 to-transparent opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 relative z-10 w-full">
                {/* Brand Column */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:max-w-[30%]">
                    <div className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start w-full mb-4">
                        <img src="/nav-logo.svg" alt="Yoga @ Infinity Logo" className="h-[75px] md:h-[60px] w-auto object-contain flex-shrink-0 mx-auto md:mx-0" />
                        <span className="text-xl font-serif font-bold text-charcoal tracking-widest block text-center md:text-left mt-2 md:mt-0">
                            Yoga @ Infinity
                        </span>
                    </div>
                    <p className="text-charcoal/60 text-sm mt-2 max-w-[280px] w-full md:max-w-full mx-auto md:mx-0">
                        Embark on a journey of mindfulness and strength.
                    </p>
                    <p className="text-charcoal/40 text-xs mt-5 w-full text-center md:text-left">© <span suppressHydrationWarning>{new Date().getFullYear()}</span> All rights reserved.</p>
                </div>

                {/* Services Column */}
                <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left text-sm tracking-wide">
                    <h4 className="font-bold text-charcoal mb-2">The Infinity Collection</h4>
                    <Link href="#zen-gravity" className="text-slate-500 hover:text-teal-600 transition-colors">Hatha Yoga</Link>
                    <Link href="#zen-gravity" className="text-slate-500 hover:text-teal-600 transition-colors">Flexibility Training</Link>
                    <Link href="#zen-gravity" className="text-slate-500 hover:text-teal-600 transition-colors">Pranayama</Link>
                    <Link href="#zen-gravity" className="text-slate-500 hover:text-teal-600 transition-colors">Strength Yoga</Link>
                    <Link href="#zen-gravity" className="text-slate-500 hover:text-teal-600 transition-colors">Women Wellness Yoga</Link>
                    <Link href="#zen-gravity" className="text-slate-500 hover:text-teal-600 transition-colors">Advanced Yoga</Link>
                </div>

                {/* Contact Column */}
                <div className="flex flex-col items-center md:items-end gap-4 text-sm tracking-wide text-center md:text-right md:max-w-[30%]">
                    <h4 className="font-bold text-charcoal mb-2">Connect With Us</h4>
                    <a href="https://www.google.com/maps/place/Yoga@infinity/@13.1298795,80.1469006,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5263b03fab2409:0xf134aade5edbe9ad!8m2!3d13.1298795!4d80.1494755!16s%2Fg%2F11k9k88dg3?entry=ttu&g_ep=EgoyMDI2MDMwMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors text-center md:text-right block">
                        Thirumalai St, Venkateswara Nagar, Oragadam, Chennai, Tamil Nadu 600053
                    </a>
                    <a href="tel:+919840941300" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                        +91 98409 41300
                    </a>
                    <div className="flex gap-6 justify-center md:justify-end mt-2">
                        <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Instagram</Link>
                        <a href="https://wa.me/919840941300" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">WhatsApp</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
