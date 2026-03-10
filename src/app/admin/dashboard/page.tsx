"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, UserPlus, LogOut, LayoutDashboard, Search, AlertCircle, Users, X, Home, QrCode, Calendar, MapPin, Globe, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { QRCodeCanvas } from "qrcode.react"

const ADMIN_EMAIL = "yogaatinfinity@gmail.com"

interface Member {
    id: string
    email: string
    full_name?: string
    phone_number?: string
    default_mode?: "online" | "offline"
    attendance_history?: { date: string, mode: "online" | "offline" }[]
    last_seen?: string
    created_at: string
}

export default function AdminDashboard() {
    const router = useRouter()
    const [members, setMembers] = useState<Member[]>([])
    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPhone, setNewPhone] = useState("")
    const [newMode, setNewMode] = useState<"online" | "offline">("offline")
    const [emailError, setEmailError] = useState("")
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null)
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [adding, setAdding] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [user, setUser] = useState<any>(null)
    const [showGlobalQr, setShowGlobalQr] = useState(false)
    const [historyModalMember, setHistoryModalMember] = useState<Member | null>(null)

    useEffect(() => {
        checkUser()

        // Real-time synchronization
        const channel = supabase
            .channel('members-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'members' },
                () => {
                    console.log("Realtime: Detecting members change, refreshing...")
                    fetchMembers()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    async function checkUser() {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session || session.user.email !== ADMIN_EMAIL) {
            router.push("/admin/login")
            return
        }

        setUser(session.user)
        fetchMembers()
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push("/admin/login")
    }

    async function fetchMembers() {
        try {
            setLoading(true)
            const { data, error: supabaseError } = await Promise.race([
                supabase.from("members").select("*").order("created_at", { ascending: false }),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Connection timed out")), 10000))
            ]) as any

            if (supabaseError) throw supabaseError
            setMembers(data || [])
            setFetchError(null)
        } catch (err: any) {
            console.error("Error fetching members:", err)
            setFetchError(err.message || "Failed to connect to the database.")
        } finally {
            setLoading(false)
        }
    }
    async function handleAdd() {
        if (!newName || !newEmail || !newPhone || !!emailError) return
        setAdding(true)
        setError(null)
        setToast(null)

        console.log("DEBUG: Attempting to add member:", { name: newName, email: newEmail, phone: newPhone, mode: newMode })

        const { data, error: insertError } = await supabase
            .from("members")
            .insert([{
                full_name: newName.trim(),
                email: newEmail.trim().toLowerCase(),
                phone_number: newPhone.trim(),
                default_mode: newMode,
                attendance_history: []
            }])
            .select()

        if (insertError) {
            console.error("DEBUG: Insert failed:", insertError)
            if (insertError.code === "23505") {
                setError(insertError.message.includes("phone_number")
                    ? `Phone number '${newPhone}' is already authorized.`
                    : `Email '${newEmail}' is already authorized.`)
            } else {
                setToast({ message: "Error: Could not save student. Please check your connection.", type: 'error' })
            }
        } else {
            console.log("DEBUG: Successfully added:", data)
            if (data) {
                setMembers([data[0], ...members])
            }
            setToast({ message: `Student ${newName.trim()} added successfully!`, type: 'success' })
            setNewEmail("")
            setNewName("")
            setNewPhone("")
            setNewMode("offline")
            setEmailError("")
        }
        setAdding(false)

        setTimeout(() => {
            setToast(null)
        }, 3000)
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to revoke access?")) return
        setError(null)

        const { error: deleteError } = await supabase
            .from("members")
            .delete()
            .eq("id", id)

        if (deleteError) {
            setError("Error revoking access: " + deleteError.message)
        } else {
            setMembers(members.filter(m => m.id !== id))
        }
    }

    async function toggleDefaultMode(memberId: string, currentMode: "online" | "offline" | undefined) {
        const newMode = currentMode === "online" ? "offline" : "online"

        // Optimistic update
        setMembers(members.map(m => m.id === memberId ? { ...m, default_mode: newMode } : m))

        const { error } = await supabase
            .from("members")
            .update({ default_mode: newMode })
            .eq("id", memberId)

        if (error) {
            setToast({ message: "Failed to update member mode", type: "error" })
            fetchMembers() // Revert state
        }
    }

    const filteredMembers = members.filter(m => {
        const query = searchQuery.toLowerCase()
        const emailMatch = m.email?.toLowerCase().includes(query)
        const nameMatch = m.full_name?.toLowerCase().includes(query)
        return emailMatch || nameMatch
    })

    if (!user) return null

    // Compute Live Analytics
    let presentOfflineCount = 0
    let presentOnlineCount = 0

    members.forEach(member => {
        if (member.default_mode === "offline") presentOfflineCount++
        if (member.default_mode === "online") presentOnlineCount++
    })

    return (
        <main className="min-h-screen bg-[#FAFAEE] text-charcoal overflow-x-hidden w-full box-border">
            <Navbar />

            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-[#6fcbcc] font-bold uppercase tracking-widest text-xs md:text-sm mb-2"
                        >
                            <LayoutDashboard size={16} className="md:w-[18px] md:h-[18px]" /> Admin Console
                        </motion.div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">Member Manager</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start md:self-center w-full sm:w-auto">
                        <Button
                            onClick={() => setShowGlobalQr(true)}
                            className="bg-[#6fcbcc] text-white hover:bg-[#5bb8b9] transition-colors shadow-sm"
                        >
                            <QrCode size={18} className="mr-2" /> Global QR
                        </Button>
                        <Button
                            onClick={handleLogout}
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={18} className="mr-2" /> Sign Out
                        </Button>
                    </div>
                </header>

                {/* Live Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl border border-[#6fcbcc]/20 shadow-sm flex items-center gap-4"
                    >
                        <div className="w-14 h-14 bg-[#6fcbcc]/10 rounded-2xl flex items-center justify-center text-[#6fcbcc]">
                            <Users size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest">Total Students</p>
                            <h2 className="text-3xl font-bold text-slate-800">{members.length}</h2>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-green-500/20 shadow-sm flex items-center gap-4"
                    >
                        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
                            <span className="text-2xl">🧘</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest">In Studio Today</p>
                            <h2 className="text-3xl font-bold text-slate-800">{presentOfflineCount}</h2>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-2xl border border-blue-500/20 shadow-sm flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                                <span className="text-2xl">💻</span>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest">Streaming Now</p>
                                <h2 className="text-3xl font-bold text-slate-800">{presentOnlineCount}</h2>
                            </div>
                        </div>
                        <Button
                            onClick={() => window.open("https://meet.google.com/ofn-wmhf-vkm", "_blank")}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl px-4 py-2 text-sm transition-all shadow-sm flex items-center gap-2"
                        >
                            <Globe size={16} /> Host Live
                        </Button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 w-full box-border">
                    {/* Left Column: Add Member */}
                    <div className="lg:col-span-1 w-full box-border">
                        <section className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-[#6fcbcc]/10 sticky top-32">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                                <UserPlus size={22} className="text-[#6fcbcc]" />
                                Grant Access
                            </h2>
                            <div className="space-y-6 w-full max-w-full">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-charcoal/60 px-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={newName}
                                        onChange={(e) => {
                                            setNewName(e.target.value)
                                            if (error) setError(null)
                                        }}
                                        className="w-full max-w-full bg-[#FAFAEE] border border-[#6fcbcc]/20 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#6fcbcc]/30 transition-all placeholder:text-charcoal/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-charcoal/60 px-1">Student Email</label>
                                    <input
                                        type="email"
                                        placeholder="student@example.com"
                                        value={newEmail}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setNewEmail(val)
                                            if (error) setError(null)
                                            if (toast) setToast(null)

                                            // Real-time email validation
                                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                            if (val && !emailRegex.test(val)) {
                                                setEmailError("Please enter a valid email address (e.g., name@gmail.com)")
                                            } else {
                                                setEmailError("")
                                            }
                                        }}
                                        className={cn(
                                            "w-full max-w-full bg-[#FAFAEE] border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#6fcbcc]/30 transition-all placeholder:text-charcoal/30",
                                            emailError ? "border-red-500" : "border-[#6fcbcc]/20"
                                        )}
                                    />
                                    {emailError && (
                                        <p className="text-xs text-red-500 px-1">{emailError}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-charcoal/60 px-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 234 567 8900"
                                        value={newPhone}
                                        onChange={(e) => {
                                            setNewPhone(e.target.value)
                                            if (error) setError(null)
                                        }}
                                        className="w-full max-w-full bg-[#FAFAEE] border border-[#6fcbcc]/20 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#6fcbcc]/30 transition-all placeholder:text-charcoal/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-charcoal/60 px-1">Default Mode</label>
                                    <div className="flex bg-[#FAFAEE] border border-[#6fcbcc]/20 rounded-xl p-1">
                                        <button
                                            onClick={() => setNewMode("offline")}
                                            className={cn(
                                                "flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all",
                                                newMode === "offline" ? "bg-white shadow-sm text-charcoal" : "text-charcoal/40 hover:text-charcoal/60"
                                            )}
                                        >
                                            In Studio
                                        </button>
                                        <button
                                            onClick={() => setNewMode("online")}
                                            className={cn(
                                                "flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all",
                                                newMode === "online" ? "bg-white shadow-sm text-charcoal" : "text-charcoal/40 hover:text-charcoal/60"
                                            )}
                                        >
                                            Online
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-2 text-sm border border-red-100 italic font-medium"
                                    >
                                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}

                                <Button
                                    onClick={handleAdd}
                                    disabled={adding || !newEmail || !newName || !newPhone || !!emailError}
                                    style={{ backgroundColor: (adding || !newEmail || !newName || !newPhone || !!emailError) ? undefined : "#6fcbcc" }}
                                    className={cn(
                                        "w-full text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-300 mt-2",
                                        (adding || !newEmail || !newName || !newPhone || !!emailError) ? "bg-gray-200 text-charcoal/30 shadow-none cursor-not-allowed pointer-events-none opacity-50" : "hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-[#6fcbcc]/20"
                                    )}
                                >
                                    {adding ? "Wait..." : "Grant Access Now"}
                                </Button>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Member List */}
                    <div className="lg:col-span-2 space-y-6 w-full box-border">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-charcoal/5">
                            <div className="relative flex-1 w-full md:max-w-md">
                                <Search size={18} className="absolute left-3 top-1/2 -track-y-1/2 -translate-y-1/2 text-charcoal/40" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full max-w-full bg-white border border-charcoal/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6fcbcc]/30"
                                />
                            </div>
                            <div className="text-sm font-medium text-charcoal/60 bg-white px-3 py-1 rounded-full border border-charcoal/5">
                                {filteredMembers.length} authorized students
                            </div>
                        </div>

                        <div className="space-y-4">
                            {fetchError ? (
                                <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-2xl border border-red-100 mt-4">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4">
                                        <AlertCircle size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-charcoal mb-2">Connection Error</h3>
                                    <p className="text-charcoal/60 mb-6 max-w-sm text-center">
                                        {fetchError}. Please check your internet or Supabase configuration.
                                    </p>
                                    <Button
                                        onClick={() => fetchMembers()}
                                        className="bg-[#6fcbcc] text-white px-8 py-3 rounded-full hover:scale-105 transition-transform max-w-full"
                                    >
                                        Retry Connection
                                    </Button>
                                </div>
                            ) : loading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#6fcbcc]"></div>
                                    <p className="font-medium italic">Refreshing secure list...</p>
                                </div>
                            ) : members.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-24 bg-white rounded-2xl border border-dashed border-[#6fcbcc]/20"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAFAEE] text-[#6fcbcc]/40 mb-4">
                                        <Users size={32} />
                                    </div>
                                    <p className="text-charcoal/60 font-medium text-lg">Your studio is quiet! Add your first student to get started.</p>
                                </motion.div>
                            ) : filteredMembers.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20 bg-white rounded-2xl border border-dashed border-charcoal/10"
                                >
                                    <p className="text-charcoal/40 italic">No members found matching your search.</p>
                                </motion.div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {filteredMembers.map((member) => (
                                        <motion.div
                                            key={member.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            layout
                                            className="bg-white p-4 md:p-5 rounded-2xl border border-[#6fcbcc]/10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center group hover:border-[#6fcbcc]/30 transition-all hover:shadow-md"
                                        >
                                            {/* Avatar & Name/Email (col-span-12 md:col-span-5) */}
                                            <div className="flex items-center gap-3 min-w-0 md:col-span-5">
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6fcbcc]/10 flex-shrink-0 flex items-center justify-center text-[#6fcbcc] font-bold text-lg border border-[#6fcbcc]/20">
                                                    {(member.full_name || member.email || "S")[0].toUpperCase()}
                                                </div>
                                                <div className="min-w-0 flex-[1_1_0%] overflow-hidden">
                                                    <p className="font-bold text-lg text-charcoal truncate w-full">
                                                        {member.full_name || "Unknown Student"}
                                                    </p>
                                                    <p className="text-sm text-charcoal/40 font-medium truncate w-full flex items-center gap-1.5 mt-0.5">
                                                        <Mail size={14} className="shrink-0" /> <span className="truncate min-w-[150px]">{member.email}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Phone (col-span-12 md:col-span-3) */}
                                            <div className="flex items-center gap-2 text-sm text-charcoal/60 md:col-span-3 font-medium min-w-0 truncate">
                                                <Phone size={14} className="text-[#6fcbcc] shrink-0" />
                                                <span className="truncate min-w-[120px]">{member.phone_number || "No Phone"}</span>
                                            </div>

                                            {/* Mode Toggle (col-span-12 md:col-span-2) */}
                                            <div className="md:col-span-2">
                                                <button
                                                    onClick={() => toggleDefaultMode(member.id, member.default_mode)}
                                                    className={cn(
                                                        "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-bold w-fit border transition-colors",
                                                        member.default_mode === "online"
                                                            ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                                                            : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                                                    )}
                                                >
                                                    {member.default_mode === "online" ? <Globe size={14} /> : <Home size={14} />}
                                                    {member.default_mode === "online" ? "Online" : "Studio"}
                                                </button>
                                            </div>

                                            {/* Actions (col-span-12 md:col-span-2) */}
                                            <div className="flex items-center justify-end gap-2 md:col-span-2 mt-2 md:mt-0">
                                                <button
                                                    onClick={() => setHistoryModalMember(member)}
                                                    className="text-xs font-bold text-[#6fcbcc] bg-[#6fcbcc]/10 px-3 py-2 rounded-lg hover:bg-[#6fcbcc]/20 transition-colors flex items-center gap-1.5 active:scale-95 whitespace-nowrap"
                                                >
                                                    <Calendar size={14} /> {member.attendance_history?.length || 0}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(member.id)}
                                                    className="p-2 text-charcoal/20 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all flex-shrink-0 ml-1"
                                                    title="Revoke Access"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Toasts Component */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-50 pointer-events-none"
                    >
                        <div className={cn(
                            "flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border pointer-events-auto",
                            toast.type === 'success'
                                ? "bg-[#eaf8f8] border-[#6fcbcc] text-charcoal"
                                : "bg-red-50 border-red-200 text-red-800"
                        )}>
                            {toast.type === 'success' ? (
                                <div className="w-8 h-8 rounded-full bg-[#6fcbcc]/20 flex items-center justify-center text-[#6fcbcc]">
                                    <UserPlus size={18} />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                    <AlertCircle size={18} />
                                </div>
                            )}
                            <p className="font-semibold">{toast.message}</p>
                            <button
                                onClick={() => setToast(null)}
                                className="ml-2 text-charcoal/40 hover:text-charcoal transition-colors ml-4"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Global QR Modal Component */}
            <AnimatePresence>
                {showGlobalQr && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm"
                        onClick={() => setShowGlobalQr(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-charcoal/10 relative text-center"
                        >
                            <button
                                onClick={() => setShowGlobalQr(false)}
                                className="absolute top-4 right-4 p-2 text-charcoal/40 hover:text-charcoal hover:bg-charcoal/5 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-16 h-16 bg-[#6fcbcc]/10 rounded-full flex items-center justify-center text-[#6fcbcc] mx-auto mb-4 border border-[#6fcbcc]/20">
                                <QrCode size={32} />
                            </div>

                            <h3 className="text-2xl font-semibold text-slate-800 mb-1">
                                Studio Check-in
                            </h3>
                            <p className="text-sm text-charcoal/60 mb-8 max-w-[200px] mx-auto leading-relaxed">
                                Present this QR code at the front desk for students to check in.
                            </p>

                            <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-[#6fcbcc]/40 inline-block mb-8 relative group cursor-pointer hover:border-[#6fcbcc] transition-colors" title="Right click to save/print!">
                                <QRCodeCanvas
                                    value={`${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/check-in`}
                                    size={200}
                                    bgColor={"#ffffff"}
                                    fgColor={"#2D7A7B"} // Teal
                                    level={"Q"}
                                    includeMargin={false}
                                />
                                <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-sm font-bold text-charcoal">
                                    Ready to Print
                                </div>
                            </div>

                            <Button
                                onClick={() => setShowGlobalQr(false)}
                                className="w-full bg-[#6fcbcc] text-white rounded-xl py-6 font-bold hover:bg-[#5bb8b9] shadow-lg shadow-[#6fcbcc]/20 transition-all hover:scale-[1.02]"
                            >
                                Done
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Attendance History Timeline Modal Component */}
            <AnimatePresence>
                {historyModalMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm"
                        onClick={() => setHistoryModalMember(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#FAFAEE] rounded-[2rem] p-8 max-w-md w-full shadow-2xl border border-charcoal/10 relative max-h-[85vh] flex flex-col"
                        >
                            <button
                                onClick={() => setHistoryModalMember(null)}
                                className="absolute top-6 right-6 p-2 text-charcoal/40 hover:text-charcoal bg-white rounded-full shadow-sm transition-colors border border-charcoal/5"
                            >
                                <X size={20} />
                            </button>

                            <div className="mb-8 pr-12">
                                <p className="text-[#6fcbcc] font-bold tracking-widest uppercase text-xs mb-2">Attendance Timeline</p>
                                <h3 className="text-3xl font-semibold text-slate-800 flex flex-col gap-1">
                                    <span className="break-all leading-tight">{historyModalMember.full_name || historyModalMember.email}</span>
                                </h3>
                            </div>

                            <div className="overflow-y-auto pr-2 space-y-4 flex-1 styling-scrollbar">
                                {!historyModalMember.attendance_history || historyModalMember.attendance_history.length === 0 ? (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-charcoal/10">
                                        <div className="w-12 h-12 bg-[#6fcbcc]/5 rounded-full flex items-center justify-center text-[#6fcbcc]/40 mx-auto mb-3">
                                            <Calendar size={24} />
                                        </div>
                                        <p className="text-charcoal/50 italic text-sm">No recorded sessions yet.</p>
                                    </div>
                                ) : (
                                    [...historyModalMember.attendance_history].reverse().map((record: any, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-2xl border border-[#6fcbcc]/10 shadow-sm flex items-center justify-between group hover:border-[#6fcbcc]/30 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner",
                                                    record.mode === "online" ? "bg-blue-50 text-blue-500" : "bg-green-50 text-green-500"
                                                )}>
                                                    {record.mode === "online" ? <Globe size={18} /> : <MapPin size={18} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-charcoal/90">
                                                        {new Date(record.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest mt-0.5">
                                                        {record.day || new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border",
                                                record.mode === "online" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-green-50 text-green-600 border-green-100"
                                            )}>
                                                {record.mode}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
