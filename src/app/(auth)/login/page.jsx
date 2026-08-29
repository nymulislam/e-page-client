"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AtSign, Shield, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/app/lib/auth-client";

export default function LoginPage() {
    const [activeRole, setActiveRole] = useState("Reader");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const roles = ["Reader", "Writer", "Admin"];

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoading(true);
        
        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                setErrorMsg(error.message || "Invalid email or password.");
                setIsLoading(false);
                return;
            }

            // সফল লগইনের পর রোল অনুযায়ী রিডাইরেক্ট
            if (activeRole === "Reader") router.push("/");
            else if (activeRole === "Writer") router.push("/dashboard/writer");
            else router.push("/dashboard/admin");
            
        } catch (err) {
            setErrorMsg("An unexpected error occurred during login.");
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="min-h-[85vh] bg-[#FDFBF7] flex items-center justify-center p-4 my-6">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-amber-100 shadow-xl shadow-amber-900/5 relative overflow-hidden">
                
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-amber-950 font-serif mb-2">Welcome back</h1>
                    <p className="text-amber-900/60 text-sm">Enter your credentials to access your account</p>
                </div>

                {/* Role Selection Tabs */}
                <div className="flex items-center justify-center gap-1 mb-6 bg-amber-50/50 p-1.5 rounded-full border border-amber-100">
                    {roles.map((role) => (
                        <button
                            key={role}
                            type="button"
                            onClick={() => setActiveRole(role)}
                            className={`flex-1 text-xs sm:text-sm font-medium py-2 rounded-full transition-all duration-300 cursor-pointer ${
                                activeRole === role
                                    ? "bg-amber-950 text-amber-50 shadow-md"
                                    : "text-amber-900/70 hover:text-amber-950 hover:bg-amber-100/50"
                            }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>

                {errorMsg && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleEmailLogin} className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-amber-950/80 flex items-center gap-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <AtSign className="absolute left-4 text-amber-900/40" size={18} />
                            <input
                                type="email" required placeholder="you@example.com"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white border border-amber-200 rounded-xl pl-11 pr-4 py-3 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-amber-950/80 flex items-center gap-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <Shield className="absolute left-4 text-amber-900/40" size={18} />
                            <input
                                type={showPassword ? "text" : "password"} required placeholder="Enter your password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white border border-amber-200 rounded-xl pl-11 pr-12 py-3 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                            />
                            <button
                                type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-amber-900/40 hover:text-amber-700 transition-colors cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit" disabled={isLoading}
                        className="w-full bg-amber-950 hover:bg-amber-900 text-amber-50 font-medium py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-900/20 flex justify-center items-center gap-2 mt-2 cursor-pointer"
                    >
                        {isLoading ? <span className="animate-pulse">Signing in...</span> : "Sign In"}
                    </button>
                </form>

                <div className="my-5 flex items-center gap-4">
                    <div className="h-px bg-amber-200 flex-1"></div>
                    <span className="text-xs text-amber-900/40 uppercase tracking-wider font-semibold">Or</span>
                    <div className="h-px bg-amber-200 flex-1"></div>
                </div>

                {/* Google OAuth Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white border border-amber-200 hover:bg-amber-50 text-amber-950 font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-sm cursor-pointer"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>

                <div className="mt-6 text-center text-sm text-amber-900/60">
                    New to E-Page?{" "}
                    <Link href="/register" className="text-amber-700 hover:text-amber-900 font-bold transition-colors">
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
}