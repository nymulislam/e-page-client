"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, BookOpen, Users, CircleDollarSign,
    Settings, LogOut, Menu, X, PlusCircle, History, Bookmark, FileText
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

const menuItems = {
    reader: [
        { name: "My Profile", icon: Settings, path: "/dashboard/reader" },
        { name: "Purchased Ebooks", icon: BookOpen, path: "/dashboard/reader/my-ebooks" },
        { name: "Purchase History", icon: History, path: "/dashboard/reader/purchase-history" },
        { name: "Wishlist", icon: Bookmark, path: "/dashboard/reader/wishlist" },
    ],
    writer: [
        { name: "Author's Desk", icon: LayoutDashboard, path: "/dashboard/writer" },
        { name: "Manage Ebooks", icon: FileText, path: "/dashboard/writer/manage-ebooks" },
        { name: "Add Ebook", icon: PlusCircle, path: "/dashboard/writer/add-ebook" },
        { name: "Sales History", icon: CircleDollarSign, path: "/dashboard/writer/sales-history" },
        { name: "Wishlist", icon: Bookmark, path: "/dashboard/writer/wishlist" },
    ],
    admin: [
        { name: "Analytics Home", icon: LayoutDashboard, path: "/dashboard/admin" },
        { name: "Manage Users", icon: Users, path: "/dashboard/admin/manage-users" },
        { name: "Manage Ebooks", icon: BookOpen, path: "/dashboard/admin/manage-ebooks" },
        { name: "Transactions", icon: CircleDollarSign, path: "/dashboard/admin/transactions" },
    ]
};

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const userRole = session?.user?.userType || "reader";
    const currentMenu = menuItems[userRole] || menuItems.reader;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsMobile(true);
                setIsSidebarOpen(false);
            } else {
                setIsMobile(false);
                setIsSidebarOpen(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    };


    if (isPending) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#FDFBF7]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-900"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto flex w-full font-sans text-amber-950 bg-[#FDFBF7] min-h-[calc(100vh-80px)]">

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobile && isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-amber-950/20 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? "260px" : "0px", x: isSidebarOpen ? 0 : isMobile ? -260 : 0 }}
                className="fixed lg:sticky top-0 lg:top-20 h-screen lg:h-[calc(100vh-80px)] bg-white border-r border-amber-900/10 z-40 overflow-hidden flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
            >
                {isMobile && (
                    <div className="p-4 flex items-center justify-end lg:hidden">
                        <button onClick={() => setIsSidebarOpen(false)} className="text-amber-900/60 hover:text-amber-900 bg-amber-50 p-2 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>
                )}

                <div className={`px-5 ${isMobile ? 'pt-0' : 'pt-6'} pb-4`}>
                    <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 font-bold uppercase shadow-sm">
                            {userRole[0]}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-amber-950 capitalize">{userRole}</p>
                            <p className="text-xs text-amber-900/60">Manage your space</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-2 custom-scrollbar">
                    {currentMenu.map((item, index) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link key={index} href={item.path} onClick={() => isMobile && setIsSidebarOpen(false)}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                    ? "bg-amber-900 text-white shadow-md shadow-amber-900/20"
                                    : "text-amber-900/70 hover:bg-amber-50 hover:text-amber-900"
                                    }`}>
                                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="font-medium whitespace-nowrap">{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto border-t border-amber-900/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600/80 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut size={18} strokeWidth={2} />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-[#FDFBF7]">
                <div className="lg:hidden h-16 bg-white/80 backdrop-blur-md border-b border-amber-900/10 sticky top-0 z-30 px-6 flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 -ml-2 rounded-lg text-amber-900/60 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                    <h2 className="text-lg font-serif text-amber-950 capitalize">
                        {pathname.split('/').pop().replace('-', ' ') || 'Dashboard'}
                    </h2>
                </div>

                <div className="p-6 md:p-8 flex-1 overflow-x-hidden w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}