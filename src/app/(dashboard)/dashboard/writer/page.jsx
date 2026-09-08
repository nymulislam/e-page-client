"use client";
import { useState, useEffect, startTransition } from "react";
import {
  Users, BookOpen, TrendingUp, Feather,
  Award, ArrowUpRight, BookMarked, Loader2
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { authClient } from "@/app/lib/auth-client";

export default function AuthorsDesk() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [ebooks, setEbooks] = useState([]);
  const [salesData, setSalesData] = useState([]);

  // Computed stats
  const [totalRoyalties, setTotalRoyalties] = useState(0);
  const [activeReaders, setActiveReaders] = useState(0);
  const [publishedWorks, setPublishedWorks] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [topBooks, setTopBooks] = useState([]);

  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email;
  const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!userEmail) {
      startTransition(() => {
        setLoading(false);
        setError("Please login to view your dashboard.");
      });
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch writer's ebooks
        const ebooksRes = await fetch(`${apiURL}/ebooks/writer/${userEmail}`);
        if (!ebooksRes.ok) throw new Error("Failed to fetch ebooks");
        const ebooksData = await ebooksRes.json();
        setEbooks(ebooksData);

        // Fetch sales history
        const salesRes = await fetch(`${apiURL}/api/sales/writer/${userEmail}`);
        if (!salesRes.ok) throw new Error("Failed to fetch sales");
        const sales = await salesRes.json();
        setSalesData(sales);

        // Compute stats
        const totalRevenue = sales.reduce((sum, s) => sum + parseFloat(s.amount.replace('$', '') || 0), 0);
        setTotalRoyalties(totalRevenue);

        const uniqueReaders = new Set(sales.map(s => s.buyer).filter(Boolean));
        setActiveReaders(uniqueReaders.size);

        setPublishedWorks(ebooksData.length);

        // Monthly revenue chart (last 6 months or all months)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const salesByMonth = {};
        sales.forEach(s => {
          const date = new Date(s.date);
          if (!isNaN(date)) {
            const month = monthNames[date.getMonth()];
            const amount = parseFloat(s.amount.replace('$', '') || 0);
            salesByMonth[month] = (salesByMonth[month] || 0) + amount;
          }
        });
        // Get last 6 months or all months with data
        const allMonths = monthNames.slice(0, 6); // last 6 months (Jan-Jun) - adjust as needed
        const chartData = allMonths.map(month => ({
          name: month,
          total: Number((salesByMonth[month] || 0).toFixed(2))
        }));
        setMonthlyRevenue(chartData);

        // Top selling books: aggregate sales per ebook
        const bookSales = {};
        sales.forEach(s => {
          const title = s.title || 'Unknown';
          const amount = parseFloat(s.amount.replace('$', '') || 0);
          bookSales[title] = (bookSales[title] || 0) + amount;
        });
        const sorted = Object.entries(bookSales)
          .map(([title, total]) => ({ title, sales: total }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 4);
        const maxSales = sorted.length > 0 ? sorted[0].sales : 1;
        const topBooksData = sorted.map(book => ({
          ...book,
          percentage: Math.round((book.sales / maxSales) * 100)
        }));
        setTopBooks(topBooksData);

        startTransition(() => setLoading(false));
      } catch (err) {
        console.error("Error fetching writer dashboard:", err);
        startTransition(() => {
          setError(err.message || "Failed to load dashboard data.");
          setLoading(false);
        });
      }
    };

    fetchData();
  }, [userEmail, apiURL]);

  // Skeleton Loading
  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="h-6 bg-amber-200/60 rounded w-32 mb-2"></div>
            <div className="h-10 bg-amber-200/60 rounded w-64 mb-2"></div>
            <div className="h-4 bg-amber-100/50 rounded w-96"></div>
          </div>
          <div className="h-12 bg-amber-200/60 rounded-full w-44"></div>
        </div>

        {/* Stats row skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-gradient-to-br from-amber-800 to-amber-950 p-8 rounded-3xl h-64">
            <div className="h-6 bg-amber-200/20 rounded w-32"></div>
            <div className="h-12 bg-amber-200/20 rounded w-40 mt-4"></div>
            <div className="h-8 bg-amber-200/20 rounded w-36 mt-8"></div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="bg-white/60 p-6 rounded-3xl border border-amber-900/10 h-40">
                <div className="flex justify-between">
                  <div className="h-12 w-12 bg-amber-100/50 rounded-2xl"></div>
                  <div className="h-6 w-6 bg-amber-100/50 rounded"></div>
                </div>
                <div className="mt-6">
                  <div className="h-8 bg-amber-100/50 rounded w-20"></div>
                  <div className="h-4 bg-amber-100/50 rounded w-32 mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart and top books skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/80 p-6 rounded-3xl border border-amber-900/10 h-96">
            <div className="h-6 bg-amber-100/50 rounded w-32 mb-6"></div>
            <div className="h-64 bg-amber-50/50 rounded-xl"></div>
          </div>
          <div className="bg-white/80 p-6 rounded-3xl border border-amber-900/10 h-96">
            <div className="h-6 bg-amber-100/50 rounded w-40 mb-6"></div>
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <div className="h-4 bg-amber-100/50 rounded w-32"></div>
                  <div className="h-4 bg-amber-100/50 rounded w-12"></div>
                </div>
                <div className="h-2 bg-amber-100/50 rounded w-full mt-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

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
          <button className="flex items-center gap-2 bg-amber-950 text-amber-50 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-amber-900 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer">
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
              <h3 className="text-5xl font-serif font-medium mt-2">
                ${totalRoyalties.toFixed(2)}
              </h3>
            </div>
            <div className="mt-8 flex items-center gap-3 bg-white/10 backdrop-blur-md w-fit px-4 py-2 rounded-2xl border border-white/10">
              <TrendingUp size={18} className="text-amber-300" />
              <span className="text-sm font-medium text-amber-100">
                {salesData.length > 0 ? `${salesData.length} sales` : 'No sales yet'}
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Active Readers", value: activeReaders, desc: `${new Set(salesData.map(s => s.buyer)).size} unique buyers`, icon: Users },
            { title: "Published Works", value: publishedWorks, desc: `${ebooks.length} ebooks`, icon: BookMarked },
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
              <button className="px-3 py-1.5 bg-white shadow-sm rounded-lg text-amber-950">Last 6 Months</button>
            </div>
          </div>

          <div className="w-full h-[280px]">
            {monthlyRevenue.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
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
            ) : (
              <div className="h-full flex items-center justify-center text-amber-900/40">
                No revenue data yet.
              </div>
            )}
          </div>
        </div>

        {/* Bestselling Titles */}
        <div className="bg-white/80 p-6 md:p-8 rounded-3xl border border-amber-900/10 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-xl font-serif text-amber-950">Bestselling Works</h3>
            <p className="text-sm text-amber-900/60 mt-1">Your top performing titles</p>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6 mt-2">
            {topBooks.length > 0 ? (
              topBooks.map((book, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <h4 className="text-sm font-medium text-amber-950 group-hover:text-amber-700 transition-colors line-clamp-1 pr-4">{book.title}</h4>
                    <span className="text-sm font-bold text-amber-800">${book.sales.toFixed(2)}</span>
                  </div>
                  <div className="h-2 w-full bg-amber-100/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full relative"
                      style={{ width: `${book.percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-amber-900/40 py-8">
                No sales data available.
              </div>
            )}
          </div>

          <Link href="/dashboard/writer/manage-ebooks">
            <button className="mt-8 w-full py-3 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium hover:bg-amber-50 transition-colors">
              View All Publications
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}