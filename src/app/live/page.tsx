
"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, Clock, Video, Users, ArrowRight, Lock, MessageCircle, LogOut, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

export default function LivePage() {
    const router = useRouter()
    const [emailInput, setEmailInput] = useState("")
    const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null)
    const [isMember, setIsMember] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true)
    const [verifying, setVerifying] = useState(false)

    // Progress Checker State
    const [progressPhone, setProgressPhone] = useState("")
    const [progressLoading, setProgressLoading] = useState(false)
    const [progressResult, setProgressResult] = useState<any>(null)
    const [progressError, setProgressError] = useState("")

    useEffect(() => {
        // Check local storage for persistent access
        const savedEmail = localStorage.getItem("studio_access_email")
        if (savedEmail) {
            setVerifiedEmail(savedEmail)
            checkAccess(savedEmail)
        } else {
            setLoading(false)
        }
    }, [])

    async function checkAccess(email: string) {
        setVerifying(true)
        try {
            const formattedEmail = email.trim().toLowerCase()
            console.log("Verifying access for:", formattedEmail)

            const { data, error } = await supabase
                .from("members")
                .select("email")
                .eq("email", formattedEmail)
                .maybeSingle()

            if (error) throw error

            if (data) {
                setVerifiedEmail(formattedEmail)
                localStorage.setItem("studio_access_email", formattedEmail)
                setIsMember(true)
            } else {
                setIsMember(false)
            }
        } catch (err) {
            console.error("Verification failed:", err)
            setIsMember(false)
        } finally {
            setLoading(false)
            setVerifying(false)
        }
    }

    async function handleOnlineCheckIn() {
        if (!verifiedEmail) {
            return
        }

        try {
            // Fetch current member history
            const { data: memberData } = await supabase
                .from("members")
                .select("id, attendance_history")
                .eq("email", verifiedEmail)
                .single()

            if (memberData) {
                const newHistory = memberData.attendance_history ? [...memberData.attendance_history] : []
                // Prevent duplicate checks on same day/route
                const todayStr = new Date().toDateString()
                const alreadyChecked = newHistory.some(r => new Date(r.date).toDateString() === todayStr && r.mode === "online")

                if (!alreadyChecked) {
                    const dateObj = new Date()
                    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                    newHistory.push({
                        date: dateObj.toISOString(),
                        mode: "online",
                        day: days[dateObj.getDay()]
                    })

                    await supabase
                        .from("members")
                        .update({
                            attendance_history: newHistory,
                            last_seen: new Date().toISOString()
                        })
                        .eq("id", memberData.id)
                }
            }
        } catch (e) {
            console.error("Auto check-in failed", e)
        }
    }

    async function handleCheckProgress(e: React.FormEvent) {
        e.preventDefault()
        if (!progressPhone) return

        setProgressLoading(true)
        setProgressError("")
        setProgressResult(null)

        try {
            const { data, error } = await supabase
                .from("members")
                .select("full_name, attendance_history")
                .eq("phone_number", progressPhone.trim())
                .single()

            if (error || !data) {
                setProgressError("No records found for this phone number.")
            } else {
                setProgressResult({
                    name: data.full_name,
                    history: data.attendance_history || []
                })
            }
        } catch (err) {
            setProgressError("Connection error. Please try again.")
        } finally {
            setProgressLoading(false)
        }
    }

    const handleVerificationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (emailInput) {
            checkAccess(emailInput)
        }
    }

    const handleReset = () => {
        localStorage.removeItem("studio_access_email")
        setVerifiedEmail(null)
        setIsMember(null)
        setEmailInput("")
    }

    const schedule = [
        { day: "Monday", time: "07:00 AM", class: "Vinyasa Flow", instructor: "Sarah" },
        { day: "Tuesday", time: "06:00 PM", class: "Aerial Basics", instructor: "Mike" },
        { day: "Wednesday", time: "07:00 AM", class: "Power Yoga", instructor: "Sarah" },
        { day: "Thursday", time: "06:00 PM", class: "Restorative Aerial", instructor: "Jessica" },
        { day: "Friday", time: "08:00 AM", class: "Morning Zen", instructor: "David" },
        { day: "Saturday", time: "09:00 AM", class: "Community Flow", instructor: "All" },
    ]

    return (
        <main className="min-h-screen bg-[#FAFAEE] selection:bg-[#6fcbcc] selection:text-white pb-20">
            <Navbar />

            <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto flex justify-end mb-4">
                {verifiedEmail && isMember && (
                    <Button
                        onClick={handleReset}
                        variant="ghost"
                        className="text-charcoal/40 hover:text-red-400 transition-all text-xs font-medium uppercase tracking-widest"
                    >
                        Reset Access
                    </Button>
                )}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6fcbcc]"></div>
                    <p className="text-charcoal/50 font-serif italic text-xl">Entering the Virtual Studio...</p>
                </div>
            ) : !verifiedEmail || isMember === false ? (
                /* THE WALL: Simple Email Verification OR Subscription Required */
                <section className="py-20 px-6 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-[#6fcbcc]/10 max-w-xl w-full"
                    >
                        {!isMember && isMember !== null ? (
                            /* State: Email entered but NOT FOUND */
                            <>
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 text-red-400 mb-8">
                                    <Lock size={48} />
                                </div>
                                <h2 className="text-4xl font-serif text-charcoal mb-4 italic">Registration Required</h2>
                                <div className="bg-[#FAFAEE] border border-red-100 rounded-2xl p-6 mb-10">
                                    <p className="text-red-500 font-serif text-xl leading-relaxed">
                                        Email <span className="font-bold underline">{emailInput || verifiedEmail}</span> is not registered for live classes.
                                    </p>
                                </div>
                                <p className="text-charcoal/60 mb-10 text-lg">
                                    Please contact the studio to register for your live session access.
                                </p>
                                <div className="flex flex-col gap-4">
                                    <Button
                                        size="lg"
                                        style={{ backgroundColor: "#6fcbcc" }}
                                        className="hover:scale-105 text-white rounded-full px-12 py-8 text-xl shadow-xl transition-all font-bold w-full"
                                        onClick={() => {
                                            const message = encodeURIComponent("Namaste! I just saw your website and I would like to book a Yoga session. Please let me know the available slots.");
                                            window.open(`https://wa.me/919840941300?text=${message}`, "_blank")
                                        }}
                                    >
                                        <MessageCircle className="mr-2" size={24} /> Contact Studio
                                    </Button>
                                    <button
                                        onClick={() => setIsMember(null)}
                                        className="text-charcoal/40 text-sm hover:text-[#6fcbcc] transition-colors font-medium underline uppercase tracking-widest"
                                    >
                                        Try another email
                                    </button>
                                </div>
                            </>
                        ) : (
                            /* State: Initial Entry */
                            <>
                                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#6fcbcc]/10 text-[#6fcbcc] mb-8">
                                    <Video size={48} />
                                </div>
                                <h2 className="text-4xl font-serif text-charcoal mb-4 italic">Virtual Studio</h2>
                                <p className="text-charcoal/60 mb-10 text-lg leading-relaxed">
                                    Please enter your registered email to join the live session.
                                </p>
                                <form onSubmit={handleVerificationSubmit} className="space-y-6">
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            required
                                            className="w-full h-16 rounded-2xl border border-[#6fcbcc]/20 text-center text-xl focus:ring-2 focus:ring-[#6fcbcc] focus:border-[#6fcbcc] bg-[#FAFAEE] outline-none transition-all"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={verifying}
                                        size="lg"
                                        style={{ backgroundColor: "#6fcbcc" }}
                                        className="hover:scale-105 text-white rounded-full px-12 py-8 text-xl shadow-xl transition-all font-bold w-full disabled:opacity-50"
                                    >
                                        {verifying ? "Verifying..." : "Join Session"}
                                    </Button>
                                    <p className="text-charcoal/30 text-xs uppercase tracking-[0.2em] font-bold">
                                        Authorized Students Only
                                    </p>
                                </form>
                            </>
                        )}
                    </motion.div>
                </section>
            ) : (
                /* MATCH FOUND: Full Access */
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Hero Section */}
                    <section className="py-16 px-6 md:px-12 bg-[#FAFAEE] text-charcoal relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#6fcbcc]/20 via-[#FAFAEE] to-[#FAFAEE] opacity-60" />

                        <div className="max-w-7xl mx-auto relative z-10">
                            <div className="text-center max-w-3xl mx-auto">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-green-50 text-green-600 border border-green-100"
                                >
                                    <CheckCircle2 size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest leading-none pt-0.5">Verified: {verifiedEmail}</span>
                                </motion.div>
                                <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-charcoal italic">
                                    Virtual Sanctuary
                                </h1>
                                <div className="h-1 w-24 bg-gold mx-auto mb-8" />
                                <p className="text-charcoal/80 text-xl md:text-2xl mb-12 leading-relaxed font-light">
                                    Welcome back. Your space is ready for practice.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Join Section */}
                    <section className="pb-16 px-6 md:px-12 relative z-20">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-[2rem] shadow-2xl p-10 border border-[#6fcbcc]/10">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="relative flex h-4 w-4">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                                            </span>
                                            <span className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm">Live Stream Active</span>
                                        </div>
                                        <h3 className="text-4xl font-serif text-charcoal mb-4">Daily Vinyasa Practice</h3>
                                        <div className="flex flex-wrap items-center gap-6 text-charcoal/60 font-medium text-lg">
                                            <span className="flex items-center gap-2"><Clock size={20} className="text-[#6fcbcc]" /> 07:00 AM IST</span>
                                            <span className="flex items-center gap-2"><Users size={20} className="text-[#6fcbcc]" /> Sarah J.</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                                        <a
                                            href="https://meet.google.com/new"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={handleOnlineCheckIn}
                                            style={{ backgroundColor: "#6fcbcc" }}
                                            className="inline-flex items-center justify-center hover:scale-105 text-white rounded-full px-12 py-4 text-2xl shadow-2xl transition-all w-full font-bold group"
                                        >
                                            <Video className="mr-3 group-hover:rotate-12 transition-transform" size={28} /> Join Now
                                        </a>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText("https://meet.google.com/new")
                                                alert("Meeting link copied to clipboard!")
                                            }}
                                            className="text-sm text-charcoal/50 hover:text-[#6fcbcc] underline transition-colors"
                                        >
                                            Link not opening? Copy to clipboard
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Schedule Section */}
                    <section className="py-20 px-6 md:px-12 bg-transparent">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Studio Schedule</h2>
                                <p className="text-charcoal/40 font-medium tracking-widest uppercase text-sm">Synchronized Worldwide</p>
                            </div>

                            <div className="grid gap-6">
                                {schedule.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-sm border-l-[6px] border-[#6fcbcc] flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-xl transition-all"
                                    >
                                        <div className="flex items-center gap-10 w-full md:w-auto">
                                            <div className="text-[#6fcbcc] font-serif italic text-2xl min-w-[120px]">
                                                {item.day}
                                            </div>
                                            <div>
                                                <h4 className="font-serif text-2xl text-charcoal font-bold mb-1">{item.class}</h4>
                                                <p className="text-[#6fcbcc] font-medium tracking-wide">{item.instructor}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                            <div className="flex items-center gap-3 text-charcoal/80 font-bold text-xl">
                                                <Clock size={20} className="text-gold" />
                                                {item.time}
                                            </div>
                                            <ArrowRight size={24} className="text-charcoal/20 group-hover:text-[#6fcbcc] group-hover:translate-x-2 transition-all" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* My Progress Checker Section */}
                    <section className="py-20 px-6 md:px-12 bg-white relative z-20 border-t border-[#6fcbcc]/10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl font-serif text-charcoal mb-4">My Progress</h2>
                            <p className="text-charcoal/60 mb-10 text-lg">Enter your registered phone number to view your practice history.</p>

                            <form onSubmit={handleCheckProgress} className="relative max-w-md mx-auto mb-10">
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number..."
                                    value={progressPhone}
                                    onChange={(e) => setProgressPhone(e.target.value)}
                                    className="w-full h-14 rounded-full border-2 border-[#6fcbcc]/20 text-center px-6 focus:ring-4 focus:ring-[#6fcbcc]/10 focus:border-[#6fcbcc] bg-[#FAFAEE] outline-none transition-all font-medium text-charcoal"
                                />
                                <Button
                                    type="submit"
                                    disabled={progressLoading || !progressPhone}
                                    className="absolute right-1 top-1 h-12 rounded-full bg-[#6fcbcc] text-white px-6 font-bold hover:bg-[#5bb8b9] transition-colors shadow-sm disabled:opacity-50"
                                >
                                    {progressLoading ? "Checking..." : "Inspect"}
                                </Button>
                            </form>

                            {progressError && (
                                <div className="text-red-500 font-medium py-3 px-6 bg-red-50 rounded-2xl inline-block mb-8">
                                    {progressError}
                                </div>
                            )}

                            {progressResult && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-[#FAFAEE] border border-[#6fcbcc]/20 rounded-[2rem] p-8 text-left shadow-xl"
                                >
                                    <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8 border-b border-[#6fcbcc]/20 pb-6">
                                        <div>
                                            <p className="text-[#6fcbcc] font-bold tracking-widest uppercase text-xs mb-2">Student Record</p>
                                            <h3 className="text-3xl font-serif text-charcoal">{progressResult.name}</h3>
                                        </div>
                                        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-[#6fcbcc]/10">
                                            <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest text-center">Total Classes</p>
                                            <p className="text-3xl font-serif text-[#6fcbcc] text-center mt-1">{progressResult.history.length}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-charcoal/60 mb-4 px-2 tracking-wide text-sm uppercase">Recent Activity</h4>
                                        <div className="space-y-3">
                                            {progressResult.history.length === 0 ? (
                                                <p className="text-charcoal/40 italic px-2">No past sessions found. Start practicing today!</p>
                                            ) : (
                                                [...progressResult.history].reverse().slice(0, 5).map((record: any, idx: number) => (
                                                    <div key={idx} className="flex justify-between items-center bg-white py-3 px-5 rounded-xl border border-charcoal/5">
                                                        <span className="font-medium text-charcoal/80 flex items-center gap-2">
                                                            <Calendar size={16} className="text-[#6fcbcc]" />
                                                            {new Date(record.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                                        </span>
                                                        <span className={cn(
                                                            "text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider",
                                                            record.mode === "online" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"
                                                        )}>
                                                            {record.mode}
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </section>
                </motion.div>
            )}

            <Footer />
        </main>
    )
}
