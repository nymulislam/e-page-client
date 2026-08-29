import Link from "next/link";
import { FiBookOpen, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 bg-stone-50 text-stone-900">
            <div className="text-center max-w-md mx-auto space-y-6">
                
                {/* Decorative Icon Wrapper */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shadow-inner">
                    <FiBookOpen size={36} />
                </div>

                {/* Error Code & Heading */}
                <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
                        Error 404
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-stone-900">
                        Page Not Found
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                        The manuscript, chapter, or page you are looking for might have been moved, renamed, or does not exist in our library.
                    </p>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-100 text-sm font-medium transition-all shadow-md shadow-stone-900/10"
                    >
                        <FiArrowLeft size={16} />
                        Return to Library
                    </Link>
                </div>

            </div>
        </div>
    );
}