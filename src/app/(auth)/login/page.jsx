"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AtSign, Shield, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const [activeRole, setActiveRole] = useState("Reader");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const roles = ["Reader", "Writer", "Admin"];

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // TODO: Implement BetterAuth email/password login logic here
        
        setTimeout(() => {
            setIsLoading(false);
            if (activeRole === "Reader") router.push("/");
            else if (activeRole === "Writer") router.push("/dashboard/writer");
            else router.push("/dashboard/admin");
        }, 1500);
    };

    const handleGoogleLogin = async () => {
        // TODO: Implement BetterAuth Google OAuth logic here
    };

    return (
        <div className="bg-[#FDFBF7] flex items-center justify-center p-4 my-12">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-amber-100 shadow-xl shadow-amber-900/5 relative overflow-hidden">
                
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-amber-950 font-serif mb-2">Welcome back</h1>
                    <p className="text-amber-900/60 text-sm">Enter your credentials to access your account</p>
                </div>

                {/* Role Selection Tabs */}
                <div className="flex items-center justify-center gap-2 mb-8 bg-amber-50/50 p-1.5 rounded-full border border-amber-100">
                    {roles.map((role) => (
                        <button
                            key={role}
                            onClick={() => setActiveRole(role)}
                            className={`flex-1 text-sm font-medium py-2 rounded-full transition-all duration-300 ${
                                activeRole === role
                                    ? "bg-amber-950 text-amber-50 shadow-md"
                                    : "text-amber-900/70 hover:text-amber-950 hover:bg-amber-100/50"
                            }`}
                        >
                            Login as {role}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-5">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-amber-950/80 flex items-center gap-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <AtSign className="absolute left-4 text-amber-900/40" size={18} />
                            <input
                                type="email" required placeholder="you@example.com"
                                className="w-full bg-white border border-amber-200 rounded-xl pl-11 pr-4 py-3.5 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-amber-950/80 flex items-center gap-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center">
                            <Shield className="absolute left-4 text-amber-900/40" size={18} />
                            <input
                                type={showPassword ? "text" : "password"} required placeholder="Enter your password"
                                className="w-full bg-white border border-amber-200 rounded-xl pl-11 pr-12 py-3.5 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                            />
                            <button
                                type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-amber-900/40 hover:text-amber-700 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit" disabled={isLoading}
                        className="w-full bg-amber-950 hover:bg-amber-900 text-amber-50 font-medium py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-900/20 flex justify-center items-center gap-2 mt-4"
                    >
                        {isLoading ? <span className="animate-pulse">Signing in...</span> : "Sign In"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px bg-amber-200 flex-1"></div>
                    <span className="text-xs text-amber-900/40 uppercase tracking-wider font-semibold">Or</span>
                    <div className="h-px bg-amber-200 flex-1"></div>
                </div>

                {/* Google OAuth Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white border border-amber-200 hover:bg-amber-50 text-amber-950 font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-sm"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>

                <div className="mt-8 text-center text-sm text-amber-900/60">
                    New to E-Page?{" "}
                    <Link href="/register" className="text-amber-700 hover:text-amber-900 font-bold transition-colors">
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
}