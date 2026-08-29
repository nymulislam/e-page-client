"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiArrowRight, FiShare2, FiBookmark, FiShield, FiFileText, FiDownload } from "react-icons/fi";

const sliderData = [
    {
        id: 1,
        title: "Knowledge is not what is memorized. Knowledge is what benefits.",
        author: "— Classical Scholarly Tradition",
        vol: "Vol. 01",
        type: "PDF / ePub",
        category: "Open Access Archive"
    },
    {
        id: 2,
        title: "The ink of the scholar is more sacred than the blood of the martyr.",
        author: "— Historical Heritage",
        vol: "Vol. 02",
        type: "Manuscript",
        category: "Rare Collection"
    },
    {
        id: 3,
        title: "Seek wisdom even if it be as far as distant lands.",
        author: "— Ancient Wisdom",
        vol: "Vol. 03",
        type: "Research Paper",
        category: "Academic Journal"
    }
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-slide effect with pause on hover
    useEffect(() => {
        if (isHovered) return; // মাউস থাকলে স্লাইড পজ থাকবে

        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
        }, 4500);

        return () => clearInterval(timer);
    }, [isHovered]);

    const currentSlide = sliderData[currentIndex];

    return (
        <section className="relative overflow-hidden bg-stone-50 text-stone-900 py-20 lg:py-32 border-b border-stone-200">
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-7 space-y-6 text-center lg:text-left"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-medium tracking-wide">
                            <FiBookmark size={14} />
                            <span>Digital Manuscript & Ebook Repository</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-stone-900 leading-[1.15]">
                            Discover, Read & Share <span className="text-amber-600 italic">Timeless</span> Knowledge.
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            A digital literary haven designed for scholars and readers. Explore original manuscripts, academic works, and share your own masterpieces with a global community.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <Link
                                href="/ebooks"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-100 text-sm font-medium transition-all shadow-lg shadow-stone-900/15"
                            >
                                <FiBookOpen size={18} />
                                Browse Ebooks
                                <FiArrowRight size={16} />
                            </Link>

                            <Link
                                href="/dashboard/share"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 text-sm font-medium transition-all shadow-sm"
                            >
                                <FiShare2 size={18} className="text-amber-600" />
                                Share Your Manuscript
                            </Link>
                        </div>

                        {/* Trust info */}
                        <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-stone-500 border-t border-stone-200/60 max-w-lg mx-auto lg:mx-0">
                            <div className="flex items-center gap-1.5">
                                <FiShield className="text-amber-600" size={15} />
                                <span>Verified Authors</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FiBookOpen className="text-amber-600" size={15} />
                                <span>1,000+ Digital Works</span>
                            </div>
                        </div>

                    </motion.div>

                    {/* Right Side - Interactive Auto-sliding Card with Pause on Hover */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-5 relative flex justify-center lg:justify-end"
                    >
                        <div 
                            className="relative w-full max-w-md"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            
                            {/* Subtle Ambient Backlight */}
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-600/10 via-transparent to-stone-200/50 blur-lg -z-10" />

                            <div className="bg-white border border-stone-200/90 p-7 sm:p-8 rounded-2xl shadow-md relative overflow-hidden">
                                
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="space-y-6"
                                    >
                                        {/* Card Header */}
                                        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center text-amber-600">
                                                    <FiFileText size={13} />
                                                </div>
                                                <span className="text-xs font-mono tracking-wider uppercase text-stone-500 font-medium">Featured Folio</span>
                                            </div>
                                            <span className="px-2.5 py-0.5 rounded bg-stone-100 text-stone-700 text-[11px] font-mono font-medium">
                                                {currentSlide.type}
                                            </span>
                                        </div>

                                        {/* Core Quote / Excerpt */}
                                        <div className="space-y-3 py-2 min-h-[110px] flex flex-col justify-center">
                                            <p className="font-serif text-stone-900 text-xl leading-relaxed italic">
                                                &ldquo;{currentSlide.title}&rdquo;
                                            </p>
                                            <div className="flex items-center justify-between pt-1">
                                                <span className="text-xs text-stone-500 uppercase font-sans tracking-wide">
                                                    {currentSlide.author}
                                                </span>
                                                <span className="text-[11px] font-mono text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                                                    {currentSlide.vol}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Divider & Quick Meta Footer */}
                                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5 text-stone-500">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span>{currentSlide.category}</span>
                                            </div>
                                            <div className="text-amber-700 font-medium flex items-center gap-1 hover:underline cursor-pointer">
                                                <FiDownload size={13} /> Read Document
                                            </div>
                                        </div>

                                    </motion.div>
                                </AnimatePresence>

                                {/* Interactive Slide Pagination Dots */}
                                <div className="flex items-center justify-center gap-1.5 pt-6 mt-2 border-t border-stone-100/60">
                                    {sliderData.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                currentIndex === index 
                                                    ? "w-6 bg-amber-600" 
                                                    : "w-1.5 bg-stone-200 hover:bg-stone-300"
                                            }`}
                                            aria-label={`Go to slide ${index + 1}`}
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