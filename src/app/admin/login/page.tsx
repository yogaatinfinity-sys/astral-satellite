"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react"

const ADMIN_EMAIL = "yogaatinfinity@gmail.com"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setMessage(null)

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        console.log('Target URL:', supabaseUrl)

        if (!supabaseUrl) {
            setError("Configuration Error: NEXT_PUBLIC_SUPABASE_URL is undefined in environment.")
            setLoading(false)
            return
        }

        try {
            // CRITICAL TEST: Check if domain is reachable at all
            try {
                const healthCheck = await fetch(`${supabaseUrl}/auth/v1/health`, { method: "GET", mode: "no-cors" })
                console.log("Health check attempt finished")
            } catch (p) {
                console.error("Domain unreachable:", p)
                throw new Error("ISP_BLOCK")
            }

            console.log("Calling supabase.auth.signInWithPassword...")
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (loginError) throw loginError

            if (data.user?.email !== ADMIN_EMAIL) {
                await supabase.auth.signOut()
                throw new Error("This area is for studio owners only.")
            }

            router.push("/admin/dashboard")
        } catch (err: any) {
            console.error("Login Error Details:", err)

            if (err.message === "ISP_BLOCK" || err.message === "Failed to fetch") {
                setError(`Connection Blocked: Your ISP is likely blocking Supabase (Common in India). Please use a VPN or change DNS to 1.1.1.1.`)
            } else {
                setError(err.message || "An unexpected error occurred during login")
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleForgotPassword() {
        if (!email) {
            setError("Please enter your email to reset password.")
            return
        }
        setLoading(true)
        setError(null)
        setMessage(null)

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/reset-password`,
            })
            if (resetError) throw resetError
            setMessage("Password reset link sent to your email.")
        } catch (err: any) {
            setError(err.message || "Failed to send reset link")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#FAFAEE] text-charcoal">
            <Navbar />

            <div className="pt-32 pb-16 px-6 flex items-center justify-center min-h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-[#6fcbcc]/10 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6fcbcc]/10 text-[#6fcbcc] mb-4">
                            <LogIn size={32} />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Studio Admin</h1>
                        <p className="text-charcoal/60 mt-2">Manage your Yoga @ Infinity studio</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Mail size={16} /> Email Address
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#FAFAEE] border border-[#6fcbcc]/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6fcbcc]/50 transition-all"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold flex items-center gap-2">
                                    <Lock size={16} /> Password
                                </label>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="text-xs text-[#6fcbcc] hover:underline font-medium"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#FAFAEE] border border-[#6fcbcc]/20 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#6fcbcc]/50 transition-all"
                                    placeholder="••••••••"
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

                        {message && (
                            <div className="bg-[#6fcbcc]/10 text-emerald-700 p-3 rounded-lg flex items-start gap-2 text-sm border border-[#6fcbcc]/20 italic">
                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                <span>{message}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            style={{ backgroundColor: "#6fcbcc" }}
                            className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? "Authenticating..." : "Login to Studio"}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </main>
    )
}
