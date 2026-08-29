"use client";

import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function GlobalError({ error, reset }) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#FDFBF7] text-stone-900 px-4 py-16">
            <div className="text-center max-w-md mx-auto space-y-6 bg-white p-8 rounded-3xl border border-amber-200 shadow-xl shadow-amber-950/5">
                
                {/* Decorative Warning Icon Wrapper */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700 shadow-inner">
                    <FiAlertTriangle size={36} />
                </div>

                {/* Heading & Description */}
                <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
                        System Error
                    </span>
                    <h1 className="text-3xl font-bold font-serif tracking-tight text-amber-950">
                        Something went wrong!
                    </h1>
                    <p className="text-sm text-amber-900/70 leading-relaxed">
                        An unexpected error occurred in our digital manuscript repository. Please try reloading the page.
                    </p>
                    
                    {/* Error Message Box */}
                    {error?.message && (
                        <div className="text-xs text-red-700 bg-red-50 p-3 rounded-xl border border-red-200 mt-3 font-mono text-left break-all">
                            <span className="font-bold block mb-1">Error Details:</span>
                            {error.message}
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <div className="pt-2">
                    <button
                        onClick={() => reset()}
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-50 text-sm font-medium transition-all shadow-lg shadow-amber-950/20 cursor-pointer"
                    >
                        <FiRefreshCw size={16} />
                        Try again
                    </button>
                </div>

            </div>
        </div>
    );
}