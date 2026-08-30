"use client";
import {
  Users, BookOpen, TrendingUp, Feather,
  Award, ArrowUpRight, BookMarked
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

// Mock Data
const revenueData = [
  { name: 'Jan', total: 450 }, { name: 'Feb', total: 600 },
  { name: 'Mar', total: 550 }, { name: 'Apr', total: 850 },
  { name: 'May', total: 720 }, { name: 'Jun', total: 1245 },
];

const topBooks = [
  { title: 'The MERN Stack Masterpiece', sales: 450, percentage: 85 },
  { title: 'Advanced React Patterns', sales: 300, percentage: 65 },
  { title: 'JavaScript Essentials', sales: 250, percentage: 50 },
  { title: 'UI Design with Tailwind', sales: 150, percentage: 30 },
];

export default function AuthorsDesk() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Feather size={18} />
            <span className="text-sm font-medium tracking-wider uppercase">Author&apos;s Sanctuary</span>
          </div>
          <h1 className="text-4xl font-serif text-amber-950">Welcome back, Creator.</h1>
          <p className="text-amber-900/60 mt-1 max-w-lg">
            Your words are making an impact. Here is how your published works are performing across the globe.
          </p>
        </div>
        <Link href="/dashboard/writer/add-ebook">
          <button className="flex items-center gap-2 bg-amber-950 text-amber-50 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-amber-900 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
            <BookOpen size={16} />
            Publish New Ebook
          </button>
        </Link>
      </div>

      {/* Premium Overview Section (Asymmetric Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Featured Royalty Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 p-8 rounded-3xl text-amber-50 relative overflow-hidden shadow-xl shadow-amber-900/20 group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
            <Award size={120} strokeWidth={1} />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <p className="text-amber-200/80 text-sm font-medium tracking-wide">Total Royalties</p>
              <h3 className="text-5xl font-serif font-medium mt-2">$1,245<span className="text-2xl text-amber-400/80">.00</span></h3>
            </div>
            <div className="mt-8 flex items-center gap-3 bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-2xl border border-white/10">
              <TrendingUp size={18} className="text-amber-300" />
              <span className="text-sm font-medium text-amber-100">+18% from last month</span>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Active Readers", value: "342", desc: "Across 12 countries", icon: Users },
            { title: "Published Works", value: "08", desc: "3 Bestsellers", icon: BookMarked },
          ].map((stat, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-amber-900/10 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-amber-100/50 text-amber-800 rounded-2xl">
                  <stat.icon size={24} strokeWidth={1.5} />
                </div>
                <button className="text-amber-900/30 hover:text-amber-900 transition-colors">
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <div className="mt-6">
                <h4 className="text-3xl font-serif text-amber-950">{stat.value}</h4>
                <p className="text-sm font-medium text-amber-950/70 mt-1">{stat.title}</p>
                <p className="text-xs text-amber-900/50 mt-1">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics & Top Books Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Minimalist Area Chart */}
        <div className="lg:col-span-2 bg-white/80 p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-serif text-amber-950">Earnings Velocity</h3>
              <p className="text-sm text-amber-900/60 mt-1">Monthly revenue breakdown</p>
            </div>
            <div className="bg-amber-50 p-1 rounded-xl flex text-xs font-medium border border-amber-100">
              <button className="px-3 py-1.5 bg-white shadow-sm rounded-lg text-amber-950">6 Months</button>
              <button className="px-3 py-1.5 text-amber-900/60 hover:text-amber-900">Yearly</button>
            </div>
          </div>

          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d97706" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#fef3c7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#92400e', fontSize: 12, fontWeight: 500 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#92400e', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  cursor={{ stroke: '#fcd34d', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', padding: '12px 20px' }}
                  itemStyle={{ color: '#78350f', fontWeight: 600, fontSize: '16px' }}
                  labelStyle={{ color: '#92400e', fontSize: '12px', marginBottom: '4px' }}
                />
                <Area type="natural" dataKey="total" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bestselling Titles (Replaced Pie Chart for Premium Look) */}
        <div className="bg-white/80 p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-xl font-serif text-amber-950">Bestselling Works</h3>
            <p className="text-sm text-amber-900/60 mt-1">Your top performing titles</p>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6 mt-2">
            {topBooks.map((book, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-sm font-medium text-amber-950 group-hover:text-amber-700 transition-colors line-clamp-1 pr-4">{book.title}</h4>
                  <span className="text-sm font-bold text-amber-800">${book.sales}</span>
                </div>
                {/* Custom Elegant Progress Bar */}
                <div className="h-2 w-full bg-amber-100/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full relative"
                    style={{ width: `${book.percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 w-full py-3 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium hover:bg-amber-50 transition-colors">
            View All Publications
          </button>
        </div>
      </div>
    </div>
  );
}