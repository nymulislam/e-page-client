"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react"; // Make sure to use framer-motion
import { 
  LayoutDashboard, BookOpen, Users, CircleDollarSign, 
  Settings, LogOut, Menu, X, PlusCircle, History, Bookmark, FileText
} from "lucide-react";

// নোট: রিয়েল প্রজেক্টে এই role টি NextAuth সেশন বা গ্লোবাল স্টেট থেকে আসবে।
// আপাতত UI দেখার জন্য 'admin', 'writer', বা 'user' চেঞ্জ করে দেখতে পারেন।
const USER_ROLE = "writer"; 

const menuItems = {
  user: [
    { name: "My Profile", icon: Settings, path: "/dashboard/user" },
    { name: "Purchased Ebooks", icon: BookOpen, path: "/dashboard/user/my-ebooks" },
    { name: "Purchase History", icon: History, path: "/dashboard/user/purchase-history" },
    { name: "Wishlist", icon: Bookmark, path: "/dashboard/user/wishlist" },
  ],
  writer: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard/writer" },
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

  const currentMenu = menuItems[USER_ROLE] || [];

  // Handle Mobile view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
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

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-amber-950/20 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? "280px" : "0px",
          x: isSidebarOpen ? 0 : isMobile ? -280 : 0 
        }}
        className={`fixed md:sticky top-0 h-screen bg-white border-r border-amber-100 z-50 overflow-hidden flex flex-col shrink-0 transition-shadow ${isSidebarOpen ? 'shadow-xl md:shadow-none' : ''}`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold text-amber-950 min-w-max">
            E-Page<span className="text-amber-600">.</span>
          </h1>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} className="text-amber-900/50 hover:text-amber-900">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="px-4 pb-4">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100/50 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-900 font-bold uppercase">
              {USER_ROLE[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-950 capitalize">{USER_ROLE} Account</p>
              <p className="text-xs text-amber-900/60">Manage your space</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {currentMenu.map((item, index) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={index} href={item.path} onClick={() => isMobile && setIsSidebarOpen(false)}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive 
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

        <div className="p-4 border-t border-amber-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors md:hidden"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-serif text-amber-950 capitalize hidden sm:block">
              {pathname.split('/').pop().replace('-', ' ') || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-amber-900/70 hover:text-amber-900 transition-colors">
              Back to Home
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}