"use client";

import { FaPaperPlane } from "react-icons/fa";

const Newsletter = () => {
    return (
        <section className="bg-[#1C1917] border-t border-stone-800/80 pt-12">
            <div className="container mx-auto px-4">
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 bg-stone-900 p-8 md:p-12 rounded-3xl border border-stone-800/60 shadow-2xl overflow-hidden">
                    
                    {/* Background Decorative Glow */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Text Content */}
                    <div className="max-w-xl text-center lg:text-left relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-100 mb-3">
                            Subscribe to our Newsletter
                        </h2>
                        <p className="text-sm text-stone-400 leading-relaxed">
                            Get the latest updates on new literary releases, rare historical manuscripts, and exclusive scholarly articles delivered directly to your inbox.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="w-full lg:w-auto flex-1 max-w-md relative z-10">
                        <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter your email address..." 
                                className="w-full bg-[#1C1917] border border-stone-700 rounded-full pl-6 pr-36 py-4 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all shadow-inner"
                                required
                            />
                            <button 
                                type="submit" 
                                className="absolute right-1.5 bg-amber-700 hover:bg-amber-600 text-amber-50 px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2 shadow-md hover:shadow-amber-900/50"
                            >
                                Subscribe <FaPaperPlane size={12} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;