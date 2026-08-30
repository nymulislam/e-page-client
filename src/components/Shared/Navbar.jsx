"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiBookOpen, FiLayout, FiLogIn } from "react-icons/fi";
import { authClient } from "@/app/lib/auth-client";
import { Bars } from "@gravity-ui/icons";
import { Button, Dropdown, Header, Label } from "@heroui/react";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/login"),
            },
        });
    };

    const role = user?.userType || "reader"; 
    const dashboardPath = `/dashboard/${role}`;

    const navLinks = [
        { name: "Home", path: "/", icon: <FiHome /> },
        { name: "Browse Ebooks", path: "/ebooks", icon: <FiBookOpen /> },
    ];

    if (user) {
        navLinks.push({ name: "Dashboard", path: dashboardPath, icon: <FiLayout /> });
    }

    const renderDesktopLinks = navLinks.map((link) => (
        <li key={link.path}>
            <Link
                href={link.path}
                className={`font-medium tracking-wide transition-all duration-300 px-4 py-2 rounded-full ${pathname.startsWith(link.path) && link.path !== '/' || pathname === link.path
                        ? "text-amber-900 bg-amber-500/15"
                        : "text-amber-800/70 hover:text-amber-900 hover:bg-amber-50"
                    }`}
            >
                {link.name}
            </Link>
        </li>
    ));

    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-[#FDFBF7]/90 border-b border-amber-200/60 shadow-sm">
            <div className="navbar container mx-auto px-4 lg:px-8 h-20">
                {/* Logo + Mobile Menu */}
                <div className="navbar-start">
                    <div className="lg:hidden">
                        <Dropdown>
                            <Button isIconOnly aria-label="Menu" variant="light">
                                <Bars className="outline-none text-amber-950" size={24} />
                            </Button>
                            <Dropdown.Popover className="min-w-[220px] bg-[#FDFBF7] border border-amber-200/60 shadow-xl rounded-2xl p-2">
                                <Dropdown.Menu
                                    onAction={(key) => router.push(key)}
                                >
                                    <Dropdown.Section>
                                        <Header className="text-amber-900/60 text-xs font-medium uppercase tracking-wider px-2">
                                            Navigation
                                        </Header>
                                        {navLinks.map((link) => (
                                            <Dropdown.Item
                                                key={link.path}
                                                id={link.path}
                                                textValue={link.name}
                                                className={`rounded-lg transition-colors ${pathname === link.path
                                                        ? "bg-amber-500/10 text-amber-900"
                                                        : "text-amber-800/80 hover:bg-amber-50"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 py-1">
                                                    <span className="text-amber-600 text-lg">{link.icon}</span>
                                                    <Label className="font-medium">{link.name}</Label>
                                                </div>
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Section>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    </div>

                    <Link href="/" className="text-2xl md:text-3xl font-bold tracking-wider text-amber-950 font-serif flex items-center gap-1">
                        E-Page<span className="text-amber-600">.</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-2">{renderDesktopLinks}</ul>
                </div>

                {/* Authentication */}
                <div className="navbar-end">
                    {isPending ? (
                        <div className="w-20 h-8 bg-amber-950/10 animate-pulse rounded-full" />
                    ) : user ? (
                        <div className="flex items-center gap-3">
                            <span className="hidden xl:inline-block text-xs font-semibold text-amber-900/70">
                                Hi, {user.name || "Scholar"}
                            </span>
                            <button onClick={handleLogout} className="btn btn-outline border-amber-300 text-amber-800 hover:bg-amber-50 hover:border-amber-400 btn-sm lg:btn-md rounded-full px-6 cursor-pointer">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-amber-950 hover:text-amber-700 transition-colors px-3 py-2">
                                <FiLogIn size={16} className="text-amber-700" /> Sign In
                            </Link>
                            <Link href="/register" className="btn bg-amber-950 hover:bg-amber-900 text-amber-50 border-none btn-sm lg:btn-md shadow-md rounded-full px-6 transition-all hover:scale-105">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;