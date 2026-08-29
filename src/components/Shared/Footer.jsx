import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-stone-900 border-t border-stone-800 text-stone-300 pt-16 pb-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    
                    {/* Brand Info */}
                    <div className="space-y-4 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-wider text-stone-100 font-serif">
                            E-Page<span className="text-amber-500">.</span>
                        </Link>
                        <p className="text-sm text-stone-400 leading-relaxed">
                            A digital literary haven to discover, read, and share original Islamic and historical ebooks with passionate readers worldwide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-amber-500 mb-4 tracking-wide uppercase text-xs">Quick Links</h3>
                        <ul className="space-y-2.5 text-sm text-stone-300">
                            <li>
                                <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/ebooks" className="hover:text-amber-400 transition-colors">Browse Ebooks</Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">Dashboard</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h3 className="font-semibold text-amber-500 mb-4 tracking-wide uppercase text-xs">Support & Legal</h3>
                        <ul className="space-y-2.5 text-sm text-stone-300">
                            <li>
                                <Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Support</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="font-semibold text-amber-500 mb-4 tracking-wide uppercase text-xs">Connect With Us</h3>
                        <p className="text-sm text-stone-400 mb-4">Follow us on social media for the latest releases and updates.</p>
                        <div className="flex items-center gap-3">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="Facebook"
                                className="w-9 h-9 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"
                            >
                                <FaFacebookF size={16} />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="Twitter"
                                className="w-9 h-9 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"
                            >
                                <FaTwitter size={16} />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="Instagram"
                                className="w-9 h-9 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"
                            >
                                <FaInstagram size={16} />
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label="LinkedIn"
                                className="w-9 h-9 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"
                            >
                                <FaLinkedinIn size={16} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400">
                    <p>Copyright © {new Date().getFullYear()} E-Page. All rights reserved.</p>
                    <p className="mt-2 sm:mt-0 font-serif tracking-wide text-amber-500/80">Unfold Your Next Great Story.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;