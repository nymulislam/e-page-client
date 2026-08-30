"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AtSign, Shield, Eye, EyeOff, User, PenTool } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/app/lib/auth-client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    // Demo Credentials
    const demoAccounts = {
        admin: { email: "admin@example.com", password: "password123", role: "admin" },
        writer: { email: "writer@example.com", password: "password123", role: "writer" },
        reader: { email: "reader@example.com", password: "password123", role: "reader" },
    };

    const handleLoginSubmit = async (loginEmail, loginPassword) => {
        setErrorMsg("");
        setIsLoading(true);
        
        try {
            const { data, error } = await authClient.signIn.email({
                email: loginEmail,
                password: loginPassword,
            });

            if (error) {
                setErrorMsg(error.message || "Invalid credentials. Ensure demo accounts exist in the database.");
                setIsLoading(false);
                return;
            }

            const session = await authClient.getSession();
            const userRole = session?.data?.user?.userType
 || "reader";

            if (userRole === "admin") router.push("/dashboard/admin");
            else if (userRole === "writer") router.push("/dashboard/writer");
            else router.push("/dashboard/user"); 
            
        } catch (err) {
            setErrorMsg("An unexpected error occurred during login.");
            setIsLoading(false);
        }
    };

    const handleEmailLogin = (e) => {
        e.preventDefault();
        handleLoginSubmit(email, password);
    };

    const handleDemoLogin = (role) => {
        const account = demoAccounts[role];
        setEmail(account.email);
        setPassword(account.password);
        handleLoginSubmit(account.email, account.password);
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-amber-950 font-serif mb-2">Welcome back</h1>
                    <p className="text-amber-900/60 text-sm">Sign in manually or use demo accounts</p>
                </div>

                {errorMsg && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-center">
                        {errorMsg}
                    </div>
                )}

                {/* --- One-Click Demo Login Section --- */}
                <div className="mb-6 space-y-2">
                    <p className="text-xs font-semibold text-amber-900/50 uppercase tracking-wider text-center mb-3">
                        Portfolio Demo Login
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        <button 
                            onClick={() => handleDemoLogin("admin")}
                            disabled={isLoading}
                            className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors cursor-pointer"
                        >
                            <Shield size={16} />
                            <span className="text-[10px] font-bold">Admin</span>
                        </button>
                        <button 
                            onClick={() => handleDemoLogin("writer")}
                            disabled={isLoading}
                            className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors cursor-pointer"
                        >
                            <PenTool size={16} />
                            <span className="text-[10px] font-bold">Writer</span>
                        </button>
                        <button 
                            onClick={() => handleDemoLogin("reader")}
                            disabled={isLoading}
                            className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors cursor-pointer"
                        >
                            <User size={16} />
                            <span className="text-[10px] font-bold">Reader</span>
                        </button>
                    </div>
                </div>

                <div className="my-5 flex items-center gap-4">
                    <div className="h-px bg-amber-200 flex-1"></div>
                    <span className="text-xs text-amber-900/40 uppercase tracking-wider font-semibold">Or manual login</span>
                    <div className="h-px bg-amber-200 flex-1"></div>
                </div>

                {/* --- Standard Login Form --- */}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-amber-50/50 border border-amber-200 rounded-xl py-3 pl-10 pr-4 text-sm text-amber-950 placeholder-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
                            required
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-amber-50/50 border border-amber-200 rounded-xl py-3 pl-4 pr-10 text-sm text-amber-950 placeholder-amber-900/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-900/40 hover:text-amber-900 transition-colors cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    
                    <button
                        type="submit" disabled={isLoading}
                        className="w-full bg-amber-950 hover:bg-amber-900 text-amber-50 font-medium py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-900/20 flex justify-center items-center gap-2 mt-2 cursor-pointer"
                    >
                        {isLoading ? <span className="animate-pulse">Signing in...</span> : "Sign In"}
                    </button>
                </form>

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