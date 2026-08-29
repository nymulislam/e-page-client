import Link from "next/link";
import { BookOpen, ArrowLeft, Search, Compass } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-16 bg-[#FDFBF7] text-amber-950 relative overflow-hidden">
            
            {/* Decorative Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center max-w-lg mx-auto space-y-6 relative z-10 bg-white p-8 md:p-12 rounded-3xl border border-amber-200 shadow-xl shadow-amber-950/5">
                
                {/* Unique Book Open / Lost Icon Wrapper */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 shadow-inner">
                    <BookOpen size={36} className="animate-pulse" />
                </div>

                {/* Error Code & Heading */}
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-widest">
                        <Compass size={13} /> Error 404 • Lost in Chapters
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-amber-950">
                        Page Not Found
                    </h1>
                    
                    <p className="text-sm sm:text-base text-amber-900/70 leading-relaxed max-w-md mx-auto">
                        The manuscript, chapter, or page you are looking for might have been moved, renamed, or lost in the archive shelves.
                    </p>
                </div>

                {/* Action Buttons Group */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-50 text-sm font-medium transition-all shadow-lg shadow-amber-950/20"
                    >
                        <ArrowLeft size={16} />
                        Return to Library
                    </Link>

                    <Link
                        href="/ebooks"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-950 border border-amber-200 text-sm font-medium transition-all"
                    >
                        <Search size={16} />
                        Browse Ebooks
                    </Link>
                </div>

            </div>
        </div>
    );
}