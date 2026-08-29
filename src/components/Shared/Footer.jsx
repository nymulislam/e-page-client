"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#1C1917] text-stone-300 mt-auto">
            <div className="container mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
                    
                    {/* Brand Info */}
                    <div className="space-y-5 md:col-span-4 lg:col-span-4">
                        <Link href="/" className="inline-block text-3xl font-bold tracking-wider text-stone-100 font-serif">
                            E-Page<span className="text-amber-600">.</span>
                        </Link>
                        <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
                            A digital literary haven designed for scholars and readers. Discover, read, and share original Islamic and historical works with a global community.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 lg:col-span-2 lg:col-start-6">
                        <h3 className="font-semibold text-amber-600 mb-5 tracking-widest uppercase text-xs">Explore</h3>
                        <ul className="space-y-3 text-sm text-stone-400">
                            <li><Link href="/" className="hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300">Home</Link></li>
                            <li><Link href="/ebooks" className="hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300">Browse Ebooks</Link></li>
                            <li><Link href="/categories" className="hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300">Genres & Topics</Link></li>
                            <li><Link href="/dashboard" className="hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300">Dashboard</Link></li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <h3 className="font-semibold text-amber-600 mb-5 tracking-widest uppercase text-xs">Support</h3>
                        <ul className="space-y-3 text-sm text-stone-400">
                            <li><Link href="/about" className="hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300">Contact Support</Link></li>
                            <li><Link href="/privacy" className="hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-amber-500 hover:translate-x-1 inline-block transition-all duration-300">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <h3 className="font-semibold text-amber-600 mb-5 tracking-widest uppercase text-xs">Connect</h3>
                        <div className="flex flex-wrap gap-3">
                            <a 
                                href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"
                                className="w-10 h-10 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-amber-700 hover:text-white hover:-translate-y-1 transition-all duration-300"
                            >
                                <FaFacebookF size={16} />
                            </a>
                            <a 
                                href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"
                                className="w-10 h-10 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-amber-700 hover:text-white hover:-translate-y-1 transition-all duration-300"
                            >
                                <FaTwitter size={16} />
                            </a>
                            <a 
                                href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"
                                className="w-10 h-10 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-amber-700 hover:text-white hover:-translate-y-1 transition-all duration-300"
                            >
                                <FaGithub size={18} />
                            </a>
                            <a 
                                href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                                className="w-10 h-10 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-amber-700 hover:text-white hover:-translate-y-1 transition-all duration-300"
                            >
                                <FaLinkedinIn size={16} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="border-t border-stone-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
                    <p>Copyright © {new Date().getFullYear()} E-Page. All rights reserved.</p>
                    <p className="mt-3 sm:mt-0 font-serif tracking-widest text-amber-700/60 uppercase font-semibold">
                        Unfold Your Next Great Story.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;