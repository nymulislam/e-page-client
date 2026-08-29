"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiHome, FiBookOpen, FiLayout } from "react-icons/fi";

const Navbar = () => {
    const pathname = usePathname();
    const user = null; // লগ-আউট অবস্থা

    const navLinks = [
        { name: "Home", path: "/", icon: <FiHome /> },
        { name: "Browse Ebooks", path: "/ebooks", icon: <FiBookOpen /> },
        { name: "Dashboard", path: "/dashboard", icon: <FiLayout /> },
    ];

    // ডেস্কটপ মেনু লিংক
    const renderDesktopLinks = navLinks.map((link) => (
        <li key={link.path}>
            <Link
                href={link.path}
                className={`font-medium tracking-wide transition-colors ${
                    pathname === link.path
                        ? "text-amber-800 bg-amber-500/10" 
                        : "hover:text-amber-700"
                }`}
            >
                {link.name}
            </Link>
        </li>
    ));

    // মোবাইল মেনু ড্রপডাউন লিংক
    const renderMobileLinks = navLinks.map((link) => (
        <li key={link.path}>
            <Link
                href={link.path}
                className={`font-medium tracking-wide transition-colors flex items-center gap-3 py-2.5 ${
                    pathname === link.path
                        ? "text-amber-800 bg-amber-500/10" 
                        : "hover:text-amber-700"
                }`}
            >
                <span className="text-lg text-amber-700">{link.icon}</span>
                {link.name}
            </Link>
        </li>
    ));

    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-stone-50/90 border-b border-stone-200 shadow-sm">
            <div className="navbar container mx-auto px-4">
                
                {/* Mobile Menu & Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0 text-stone-800">
                            <FiMenu size={24} />
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white text-stone-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-stone-200">
                            {renderMobileLinks}
                        </ul>
                    </div>
                    {/* Logo - Classic Scholarly Manuscript Style */}
                    <Link href="/" className="text-2xl font-bold tracking-wider text-stone-900 font-serif">
                        E-Page<span className="text-amber-600">.</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2 text-stone-700">
                        {renderDesktopLinks}
                    </ul>
                </div>

                {/* Auth Button */}
                <div className="navbar-end">
                    {user ? (
                        <button className="btn btn-outline btn-error btn-sm lg:btn-md">
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" className="btn bg-stone-900 hover:bg-stone-800 text-amber-100 border-none btn-sm lg:btn-md shadow-md">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;