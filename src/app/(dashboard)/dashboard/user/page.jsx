"use client";
import { Mail, MapPin, Calendar, ShieldCheck, Edit3 } from "lucide-react";

export default function UserProfile() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-serif text-amber-950">My Profile</h1>
                    <p className="text-sm text-amber-900/60">Manage your personal information and account settings.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-900 text-white rounded-xl text-sm font-medium hover:bg-amber-950 transition-colors shadow-sm">
                    <Edit3 size={16} /> Edit Profile
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-amber-900/10">
                    <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-900 text-3xl font-serif font-bold border-4 border-white shadow-md">
                        N
                    </div>
                    <div className="text-center md:text-left space-y-1">
                        <h2 className="text-xl font-serif text-amber-950">Naimul Islam</h2>
                        <p className="text-sm text-amber-900/60 flex items-center justify-center md:justify-start gap-1.5">
                            <ShieldCheck size={16} className="text-amber-700" /> Reader & Member
                        </p>
                        <span className="inline-block mt-2 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
                            Active Account
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50/40 border border-amber-900/5">
                        <Mail className="text-amber-800" size={20} />
                        <div>
                            <p className="text-xs text-amber-900/50 uppercase tracking-wider font-semibold">Email Address</p>
                            <p className="text-sm font-medium text-amber-950">naimul@example.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50/40 border border-amber-900/5">
                        <MapPin className="text-amber-800" size={20} />
                        <div>
                            <p className="text-xs text-amber-900/50 uppercase tracking-wider font-semibold">Location</p>
                            <p className="text-sm font-medium text-amber-950">Dhaka, Bangladesh</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50/40 border border-amber-900/5">
                        <Calendar className="text-amber-800" size={20} />
                        <div>
                            <p className="text-xs text-amber-900/50 uppercase tracking-wider font-semibold">Joined Date</p>
                            <p className="text-sm font-medium text-amber-950">February 2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}