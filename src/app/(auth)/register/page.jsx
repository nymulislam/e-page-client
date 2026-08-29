"use client";

import { useState } from "react";
import Link from "next/link";
import { User, AtSign, Shield, Eye, EyeOff, BookOpen, PenTool } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState("Reader");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // TODO: Validate Passwords Match & Implement BetterAuth logic
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    const handleGoogleSignUp = async () => {
        // TODO: Implement BetterAuth Google OAuth signup logic
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-lg bg-white rounded-3xl p-8 md:p-10 border border-amber-100 shadow-xl shadow-amber-900/5 relative overflow-hidden">
                
                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-amber-950 font-serif mb-2">Create an account</h1>
                    <p className="text-amber-900/60 text-sm">Join the community to discover and share knowledge</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4 relative z-10">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-amber-950/80">Full Name <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center">
                            <User className="absolute left-4 text-amber-900/40" size={18} />
                            <input
                                type="text" required placeholder="John Doe"
                                className="w-full bg-white border border-amber-200 rounded-xl pl-11 pr-4 py-3 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-amber-950/80">Email Address <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center">
                            <AtSign className="absolute left-4 text-amber-900/40" size={18} />
                            <input
                                type="email" required placeholder="you@example.com"
                                className="w-full bg-white border border-amber-200 rounded-xl pl-11 pr-4 py-3 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Password Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-amber-950/80">Password <span className="text-red-500">*</span></label>
                            <div className="relative flex items-center">
                                <Shield className="absolute left-4 text-amber-900/40" size={16} />
                                <input
                                    type={showPassword ? "text" : "password"} required placeholder="••••••••"
                                    className="w-full bg-white border border-amber-200 rounded-xl pl-10 pr-10 py-3 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                                />
                                <button
                                    type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-amber-900/40 hover:text-amber-700"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-amber-950/80">Confirm <span className="text-red-500">*</span></label>
                            <div className="relative flex items-center">
                                <Shield className="absolute left-4 text-amber-900/40" size={16} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"} required placeholder="••••••••"
                                    className="w-full bg-white border border-amber-200 rounded-xl pl-10 pr-10 py-3 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                                />
                                <button
                                    type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 text-amber-900/40 hover:text-amber-700"
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="pt-3">
                        <label className="text-sm font-semibold text-amber-950/80 block mb-3">Choose your journey:</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div 
                                onClick={() => setSelectedRole("Reader")}
                                className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${selectedRole === "Reader" ? "bg-amber-50 border-amber-600 text-amber-900 shadow-sm" : "bg-white border-amber-200 text-amber-900/60 hover:border-amber-400"}`}
                            >
                                <BookOpen size={24} />
                                <span className="text-sm font-medium">Reader</span>
                            </div>
                            <div 
                                onClick={() => setSelectedRole("Writer")}
                                className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-2 transition-all ${selectedRole === "Writer" ? "bg-amber-50 border-amber-600 text-amber-900 shadow-sm" : "bg-white border-amber-200 text-amber-900/60 hover:border-amber-400"}`}
                            >
                                <PenTool size={24} />
                                <span className="text-sm font-medium">Writer</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit" disabled={isLoading}
                        className="w-full bg-amber-950 hover:bg-amber-900 text-amber-50 font-medium py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-900/20 mt-6"
                    >
                        {isLoading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px bg-amber-200 flex-1"></div>
                    <span className="text-xs text-amber-900/40 uppercase tracking-wider font-semibold">Or</span>
                    <div className="h-px bg-amber-200 flex-1"></div>
                </div>

                {/* Google OAuth Register */}
                <button
                    onClick={handleGoogleSignUp}
                    className="w-full bg-white border border-amber-200 hover:bg-amber-50 text-amber-950 font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-sm"
                >
                    <FcGoogle size={22} />
                    Sign up with Google
                </button>

                <div className="mt-8 text-center text-sm text-amber-900/60">
                    Already have an account?{" "}
                    <Link href="/login" className="text-amber-700 hover:text-amber-900 font-bold transition-colors">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}