"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { Search, CheckCircle2, AlertCircle, Phone, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type CheckInStep = "search" | "found" | "success" | "error"

interface FoundMember {
    id: string
    full_name: string
    attendance_history: any[]
}

export default function CheckInPage() {
    const [step, setStep] = useState<CheckInStep>("search")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [member, setMember] = useState<FoundMember | null>(null)
    const [errorMessage, setErrorMessage] = useState("")

    // Handle initial auto-fill if coming from QR code URL param
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const phoneParam = urlParams.get('phone')
        if (phoneParam) {
            setPhone(phoneParam)
            // Optional: Auto-trigger search if phone param exists
            // handleSearch(phoneParam) 
        }
    }, [])

    async function handleSearch(searchPhone = phone) {
        if (!searchPhone) return
        setLoading(true)
        setErrorMessage("")

        try {
            const { data, error } = await supabase
                .from("members")
                .select("id, full_name, attendance_history")
                .eq("phone_number", searchPhone.trim())
                .single()

            if (error || !data) {
                setStep("error")
                setErrorMessage("Member not found. Please see the front desk.")
            } else {
                setMember(data)
                setStep("found")
            }
        } catch (err) {
            setStep("error")
            setErrorMessage("Connection error. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    async function handleConfirm() {
        if (!member) return
        setLoading(true)

        const dateObj = new Date()
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const newHistory = member.attendance_history ? [...member.attendance_history] : []
        newHistory.push({
            date: dateObj.toISOString(),
            mode: "offline",
            day: days[dateObj.getDay()]
        })

        const { error } = await supabase
            .from("members")
            .update({
                attendance_history: newHistory,
                last_seen: new Date().toISOString()
            })
            .eq("id", member.id)

        setLoading(false)
        if (error) {
            setStep("error")
            setErrorMessage("Failed to confirm attendance. Please try again.")
        } else {
            setStep("success")
            // Auto reset after 5 seconds
            setTimeout(() => {
                setStep("search")
                setPhone("")
                setMember(null)
            }, 5000)
        }
    }

    return (
        <main className="min-h-screen bg-[#FAFAEE] text-charcoal flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#6fcbcc]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#2D7A7B]/5 rounded-full blur-3xl" />

            {/* Back Button */}
            <Link href="/" className="absolute top-8 left-6 text-charcoal/40 hover:text-charcoal transition-colors z-10 flex items-center gap-2 font-medium">
                <ArrowLeft size={18} /> Home
            </Link>

            <div className="w-full max-w-md relative z-10">
                {/* Header Logo Area */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-white rounded-full mx-auto shadow-xl border border-[#6fcbcc]/20 flex items-center justify-center mb-6"
                    >
                        <span className="text-3xl">🧘‍♀️</span>
                    </motion.div>
                    <h1 className="text-3xl font-serif text-charcoal leading-tight">Studio Check-In</h1>
                    <p className="text-charcoal/60 mt-2">Welcome to your daily practice.</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-[#6fcbcc]/10 border border-[#6fcbcc]/20 p-8 min-h-[300px] flex flex-col justify-center overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {/* STEP 1: Search */}
                        {step === "search" && (
                            <motion.div
                                key="search"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-charcoal/60 px-2 uppercase tracking-wide">Enter Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" size={20} />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+1 234 567 8900"
                                            className="w-full bg-[#FAFAEE] border-2 border-[#6fcbcc]/20 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-[#6fcbcc] focus:ring-4 focus:ring-[#6fcbcc]/10 transition-all font-medium text-charcoal"
                                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        />
                                    </div>
                                </div>
                                <Button
                                    onClick={() => handleSearch()}
                                    disabled={loading || !phone}
                                    className="w-full bg-[#6fcbcc] hover:bg-[#5bb8b9] text-white py-6 rounded-2xl text-lg font-bold shadow-lg shadow-[#6fcbcc]/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>Search Member <Search size={20} className="ml-2" /></>
                                    )}
                                </Button>
                            </motion.div>
                        )}

                        {/* STEP 2: Found Confirm */}
                        {step === "found" && member && (
                            <motion.div
                                key="found"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="text-center space-y-8"
                            >
                                <div className="w-24 h-24 bg-[#6fcbcc]/10 rounded-full flex items-center justify-center mx-auto text-[#6fcbcc] text-3xl font-bold border-4 border-white shadow-lg">
                                    {member.full_name[0].toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-serif text-charcoal mb-2">Welcome Back!</h2>
                                    <p className="text-xl font-bold text-[#6fcbcc]">{member.full_name}</p>
                                    <p className="text-sm text-charcoal/50 mt-4 bg-charcoal/5 rounded-full py-1 px-4 inline-block">
                                        Record: {member.attendance_history?.length || 0} Sessions
                                    </p>
                                </div>
                                <div className="space-y-3 pt-4">
                                    <Button
                                        onClick={handleConfirm}
                                        disabled={loading}
                                        className="w-full bg-[#6fcbcc] hover:bg-[#5bb8b9] text-white py-6 rounded-2xl text-lg font-bold shadow-lg shadow-[#6fcbcc]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        {loading ? "Confirming..." : "Confirm My Attendance"}
                                    </Button>
                                    <button
                                        onClick={() => setStep("search")}
                                        className="text-sm font-semibold text-charcoal/40 hover:text-charcoal transition-colors py-2"
                                    >
                                        Not you? Go back
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: Success */}
                        {step === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-6"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100"
                                >
                                    <CheckCircle2 size={64} className="text-green-500" />
                                </motion.div>
                                <h2 className="text-3xl font-serif text-charcoal mb-3">You're Checked In!</h2>
                                <p className="text-charcoal/60 text-lg mb-8">Have a great session, {member?.full_name.split(' ')[0] || "Yogi"}.</p>
                                <motion.div
                                    initial={{ width: "100%" }}
                                    animate={{ width: "0%" }}
                                    transition={{ duration: 5, ease: "linear" }}
                                    className="h-1.5 bg-green-200 rounded-full absolute bottom-0 left-0"
                                />
                            </motion.div>
                        )}

                        {/* STEP 4: Error */}
                        {step === "error" && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="text-center py-4 space-y-6"
                            >
                                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">
                                    <AlertCircle size={40} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-charcoal mb-2">Oops!</h2>
                                    <p className="text-charcoal/60 leading-relaxed font-medium">
                                        {errorMessage}
                                    </p>
                                </div>
                                <Button
                                    onClick={() => setStep("search")}
                                    className="w-full bg-charcoal hover:bg-charcoal/90 text-white py-6 rounded-2xl font-bold transition-all shadow-xl mt-4"
                                >
                                    Try Again
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    )
}
