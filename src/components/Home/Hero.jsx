"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiArrowRight, FiShare2, FiBookmark, FiShield, FiFileText, FiDownload } from "react-icons/fi";

const sliderData = [
    { id: 1, title: "Knowledge is not what is memorized. Knowledge is what benefits.", author: "— Classical Scholarly Tradition", vol: "Vol. 01", type: "PDF / ePub", category: "Open Access Archive" },
    { id: 2, title: "The ink of the scholar is more sacred than the blood of the martyr.", author: "— Historical Heritage", vol: "Vol. 02", type: "Manuscript", category: "Rare Collection" },
    { id: 3, title: "Seek wisdom even if it be as far as distant lands.", author: "— Ancient Wisdom", vol: "Vol. 03", type: "Research Paper", category: "Academic Journal" }
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % sliderData.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [isHovered]);

    const currentSlide = sliderData[currentIndex];

    return (
        <section className="relative overflow-hidden bg-[#FDFBF7] text-amber-950 py-20 lg:py-32 border-b border-amber-100">
            {/* Background Decorative Pattern */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-40 -left-40 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            </div>
            
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-7 space-y-6 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-widest uppercase">
                            <FiBookmark size={14} />
                            <span>Digital Manuscript Archive</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-amber-950 leading-[1.15]">
                            Discover, Read & Share <span className="text-amber-600 italic">Timeless</span> Knowledge.
                        </h1>

                        <p className="text-base sm:text-lg text-amber-900/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            A digital literary haven designed for scholars and readers. Explore original manuscripts, academic works, and share your own masterpieces with a global community.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <Link href="/ebooks" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-sm font-medium transition-all shadow-lg shadow-amber-900/20">
                                <FiBookOpen size={18} />
                                Browse Ebooks
                                <FiArrowRight size={16} />
                            </Link>

                            <Link href="/dashboard/share" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-amber-50 text-amber-950 border border-amber-200 text-sm font-medium transition-all shadow-sm">
                                <FiShare2 size={18} className="text-amber-600" />
                                Share Your Manuscript
                            </Link>
                        </div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-xs text-amber-900/60 border-t border-amber-200/50 max-w-lg mx-auto lg:mx-0">
                            <div className="flex items-center gap-1.5"><FiShield className="text-amber-600" size={15} /><span>Verified Authors</span></div>
                            <div className="flex items-center gap-1.5"><FiBookOpen className="text-amber-600" size={15} /><span>1,000+ Digital Works</span></div>
                        </div>
                    </motion.div>

                    {/* Right Side - Interactive Auto-sliding Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-5 relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-md" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            <div className="absolute -inset-2 rounded-t-[3rem] rounded-b-2xl bg-gradient-to-tr from-amber-600/20 via-transparent to-amber-200/40 blur-xl -z-10" />
                            
                            <div className="bg-white border border-amber-100 p-8 rounded-t-[3rem] rounded-b-2xl shadow-xl relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center justify-between pb-4 border-b border-amber-50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700"><FiFileText size={14} /></div>
                                                <span className="text-xs font-serif tracking-widest uppercase text-amber-900/60 font-semibold">Featured Folio</span>
                                            </div>
                                            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-mono font-medium border border-amber-100/50">{currentSlide.type}</span>
                                        </div>

                                        <div className="space-y-4 py-4 min-h-[120px] flex flex-col justify-center">
                                            <p className="font-serif text-amber-950 text-2xl leading-relaxed italic">&ldquo;{currentSlide.title}&rdquo;</p>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-sm text-amber-800/70 font-serif">{currentSlide.author}</span>
                                                <span className="text-xs font-mono text-amber-700 font-semibold bg-amber-100/50 px-2.5 py-1 rounded-md">{currentSlide.vol}</span>
                                            </div>
                                        </div>

                                        <div className="pt-5 border-t border-amber-50 flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2 text-amber-900/60">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <span>{currentSlide.category}</span>
                                            </div>
                                            <div className="text-amber-700 font-bold flex items-center gap-1.5 hover:text-amber-600 transition-colors cursor-pointer">
                                                <FiDownload size={14} /> Read Document
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="flex items-center justify-center gap-2 pt-6 mt-4 border-t border-amber-50/50">
                                    {sliderData.map((_, index) => (
                                        <button
                                            key={index} onClick={() => setCurrentIndex(index)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === index ? "w-8 bg-amber-700" : "w-2 bg-amber-200 hover:bg-amber-400"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}