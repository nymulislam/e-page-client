"use client";

import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function GlobalError({ error, reset }) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-900 px-4 py-16">
                <div className="text-center max-w-md mx-auto space-y-6">
                    
                    {/* Decorative Warning Icon Wrapper */}
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shadow-inner">
                        <FiAlertTriangle size={36} />
                    </div>

                    {/* Heading & Description */}
                    <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                            System Error
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-stone-900">
                            Something went wrong!
                        </h1>
                        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                            An unexpected error occurred in our digital manuscript repository. Please try reloading the page.
                        </p>
                        {error?.message && (
                            <p className="text-xs text-stone-500 bg-stone-100 p-3 rounded-lg border border-stone-200 mt-3 font-mono text-left break-all">
                                {error.message}
                            </p>
                        )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <button
                            onClick={() => reset()}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-100 text-sm font-medium transition-all shadow-md shadow-stone-900/10 cursor-pointer"
                        >
                            <FiRefreshCw size={16} />
                            Try again
                        </button>
                    </div>

                </div>
            </body>
        </html>
    );
}