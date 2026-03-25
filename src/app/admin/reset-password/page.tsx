"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { KeyRound, Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react"

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        // Check if we have a session (the reset link auto-signs the user in temporarily)
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                setError("Invalid or expired reset link. Please request a new one.")
            }
        }
        checkSession()
    }, [])

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password: password,
            })

            if (updateError) throw updateError

            setSuccess(true)
            setTimeout(() => {
                router.push("/admin/login")
            }, 3000)
        } catch (err: any) {
            setError(err.message || "Failed to update password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#FAFAEE] text-charcoal">
            <Navbar />

            <div className="pt-32 pb-16 px-6 flex items-center justify-center min-h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-[#6fcbcc]/10 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6fcbcc]/10 text-[#6fcbcc] mb-4">
                            <KeyRound size={32} />
                        </div>
                        <h1 className="text-3xl font-serif">Reset Password</h1>
                        <p className="text-charcoal/60 mt-2">Create a secure new password for your account</p>
                    </div>

                    {success ? (
                        <div className="text-center py-8 space-y-4">
                            <div className="flex justify-center">
                                <CheckCircle2 size={48} className="text-emerald-500 animate-bounce" />
                            </div>
                            <h2 className="text-xl font-bold text-emerald-700">Password Updated!</h2>
                            <p className="text-charcoal/60">Your password has been successfully reset. Redirecting to login...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2">
                                    <Lock size={16} /> New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-[#FAFAEE] border border-[#6fcbcc]/20 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#6fcbcc]/50 transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6fcbcc]/60 hover:text-[#6fcbcc] focus:outline-none focus:text-[#6fcbcc] transition-colors p-1"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2">
                                    <Lock size={16} /> Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-[#FAFAEE] border border-[#6fcbcc]/20 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#6fcbcc]/50 transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6fcbcc]/60 hover:text-[#6fcbcc] focus:outline-none focus:text-[#6fcbcc] transition-colors p-1"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-start gap-2 text-sm border border-red-100 italic">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                style={{ backgroundColor: "#6fcbcc" }}
                                className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </main>
    )
}
