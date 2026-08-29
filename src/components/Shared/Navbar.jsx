"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiHome, FiBookOpen, FiLayout } from "react-icons/fi";

const Navbar = () => {
    const pathname = usePathname();
    const user = null; 

    const navLinks = [
        { name: "Home", path: "/", icon: <FiHome /> },
        { name: "Browse Ebooks", path: "/ebooks", icon: <FiBookOpen /> },
        { name: "Dashboard", path: "/dashboard", icon: <FiLayout /> },
    ];

    const renderDesktopLinks = navLinks.map((link) => (
        <li key={link.path}>
            <Link
                href={link.path}
                className={`font-medium tracking-wide transition-all duration-300 px-4 py-2 rounded-full ${
                    pathname === link.path
                        ? "text-amber-900 bg-amber-500/15" 
                        : "text-amber-800/70 hover:text-amber-900 hover:bg-amber-50"
                }`}
            >
                {link.name}
            </Link>
        </li>
    ));

    const renderMobileLinks = navLinks.map((link) => (
        <li key={link.path}>
            <Link
                href={link.path}
                className={`font-medium tracking-wide transition-colors flex items-center gap-3 py-3 px-4 rounded-lg ${
                    pathname === link.path
                        ? "text-amber-900 bg-amber-500/10" 
                        : "text-amber-800/80 hover:text-amber-900 hover:bg-amber-50"
                }`}
            >
                <span className="text-lg text-amber-600">{link.icon}</span>
                {link.name}
            </Link>
        </li>
    ));

    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-[#FDFBF7]/90 border-b border-amber-200/60 shadow-sm">
            <div className="navbar container mx-auto px-4 lg:px-8 h-20">
                
                {/* Mobile Menu & Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0 text-amber-950">
                            <FiMenu size={26} />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#FDFBF7] text-amber-950 rounded-2xl z-[1] mt-4 w-60 p-3 shadow-xl border border-amber-100">
                            {renderMobileLinks}
                        </ul>
                    </div>
                    {/* Logo - Classic Scholarly */}
                    <Link href="/" className="text-2xl md:text-3xl font-bold tracking-wider text-amber-950 font-serif flex items-center gap-1">
                        E-Page<span className="text-amber-600">.</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-2">
                        {renderDesktopLinks}
                    </ul>
                </div>

                {/* Auth Button */}
                <div className="navbar-end">
                    {user ? (
                        <button className="btn btn-outline border-amber-300 text-amber-800 hover:bg-amber-50 hover:border-amber-400 btn-sm lg:btn-md rounded-full px-6">
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" className="btn bg-amber-900 hover:bg-amber-950 text-amber-50 border-none btn-sm lg:btn-md shadow-md rounded-full px-8 transition-transform hover:scale-105">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;