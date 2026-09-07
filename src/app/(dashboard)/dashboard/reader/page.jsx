"use client";
import {
    Mail, MapPin, Calendar, ShieldCheck,
    Edit3, Sparkles, Award, Hexagon, Loader2
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { useState, useEffect } from "react";

export default function UserProfile() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // Format join date
    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        })
        : 'N/A';

    // Get user initials
    const getInitials = (name) => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (isPending) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="space-y-8 max-w-5xl mx-auto">
                <div className="text-center p-12 bg-white rounded-2xl border border-amber-200 shadow-sm">
                    <h3 className="text-lg font-serif text-amber-950">Please Login</h3>
                    <p className="text-amber-900/60 mt-1">You need to be logged in to view your profile.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-amber-600 mb-2">
                        <Sparkles size={18} />
                        <span className="text-sm font-medium tracking-wider uppercase">Personal Archive</span>
                    </div>
                    <h1 className="text-4xl font-serif text-amber-950">Your Identity.</h1>
                    <p className="text-amber-900/60 mt-1 max-w-lg">
                        Manage your digital presence within the sanctuary. Keep your personal narrative up to date.
                    </p>
                </div>
                <button className="group flex items-center gap-2 px-5 py-2.5 bg-amber-950 text-amber-50 rounded-full text-sm font-medium hover:bg-amber-900 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
                    <Edit3 size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                    Edit Profile
                </button>
            </div>

            {/* Premium Profile Card */}
            <div className="relative bg-white/70 backdrop-blur-2xl border border-amber-900/10 rounded-[2rem] p-8 md:p-10 shadow-sm overflow-hidden flex flex-col md:flex-row gap-10 items-center md:items-stretch">

                {/* Decorative Background Blur */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-50/60 rounded-full blur-2xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

                {/* Left Column: Avatar & Identity */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/3 border-b md:border-b-0 md:border-r border-amber-900/10 pb-8 md:pb-0 md:pr-10 justify-center">

                    <div className="relative group cursor-pointer mb-6">
                        <div className="absolute inset-0 bg-amber-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 flex items-center justify-center text-amber-50 text-5xl font-serif border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500">
                            {getInitials(user.name)}
                        </div>
                        {/* Floating Verified Badge */}
                        <div className="absolute bottom-1 right-1 bg-white text-amber-600 p-2 rounded-full shadow-lg border border-amber-100">
                            <ShieldCheck size={20} className="fill-amber-50" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-serif text-amber-950">{user.name}</h2>

                    <div className="flex flex-wrap items-center gap-2 mt-4 justify-center md:justify-start">
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 text-xs font-semibold tracking-widest uppercase rounded-full border border-amber-200/50 shadow-sm">
                            {user.userType === 'writer' ? 'Writer' : 'Reader'}
                        </span>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-widest uppercase rounded-full border border-emerald-200/50 flex items-center gap-1.5 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            Active
                        </span>
                    </div>
                </div>

                {/* Right Column: Information Grid */}
                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-5 items-center content-center">
                    {[
                        { label: "Email Address", value: user.email, icon: Mail },
                        { label: "Location", value: "Dhaka, Bangladesh", icon: MapPin },
                        { label: "Joined Date", value: joinDate, icon: Calendar },
                        { label: "Membership", value: user.plan === 'premium' ? 'Premium' : 'Free', icon: Award },
                    ].map((info, i) => (
                        <div key={i} className="group bg-white/60 hover:bg-white p-5 rounded-2xl border border-amber-900/5 hover:border-amber-900/20 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
                            <div className="mt-0.5 p-2.5 bg-amber-50 text-amber-800 rounded-xl group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-300">
                                <info.icon size={20} strokeWidth={1.5} />
                            </div>
                            <div>
                                <p className="text-[11px] text-amber-900/50 uppercase tracking-widest font-bold mb-1">
                                    {info.label}
                                </p>
                                <p className="text-sm font-medium text-amber-950">
                                    {info.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}