"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 px-4"
        >
            <div className="flex flex-col items-center space-y-4">
                
                {/* Animated Loader Icon */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-16 h-16 flex items-center justify-center"
                >
                    <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 animate-ping"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-t-amber-600 border-r-transparent border-b-stone-300 border-l-transparent animate-spin"></div>
                    <span className="font-serif font-bold text-amber-600 text-lg">E</span>
                </motion.div>

                {/* Loading Text */}
                <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-center space-y-1"
                >
                    <h2 className="text-sm font-medium tracking-wider uppercase text-stone-800 font-serif">
                        Loading Manuscript
                    </h2>
                    <p className="text-xs text-stone-500">Please wait while we fetch the pages...</p>
                </motion.div>

            </div>
        </motion.div>
    );
}