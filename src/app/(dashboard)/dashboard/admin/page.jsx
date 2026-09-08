"use client";
import { useState, useEffect, startTransition } from "react";
import {
    Users, PenTool, BookOpen, CircleDollarSign, Loader2
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const COLORS = ['#d97706', '#b45309', '#f59e0b', '#fbbf24', '#92400e'];

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalWriters: 0,
        ebooksSold: 0,
        totalRevenue: 0
    });
    const [salesData, setSalesData] = useState([]);
    const [genreData, setGenreData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const res = await fetch(`${apiURL}/api/admin/dashboard-stats`);
                if (!res.ok) throw new Error("Failed to fetch dashboard stats");
                const data = await res.json();

                startTransition(() => {
                    setStats(data.stats);
                    setSalesData(data.salesData);
                    setGenreData(data.genreData);
                    setIsLoading(false);
                });
            } catch (err) {
                console.error("Dashboard stats error:", err);
                startTransition(() => {
                    setError(err.message);
                    setIsLoading(false);
                });
            }
        };

        fetchDashboardStats();
    }, [apiURL]);

    // Skeleton Loading State
    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                {/* Header Skeleton */}
                <div>
                    <div className="h-8 bg-amber-200/60 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-amber-100/50 rounded w-72"></div>
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-amber-100/50"></div>
                            <div className="flex-1">
                                <div className="h-3 bg-amber-100/50 rounded w-20 mb-2"></div>
                                <div className="h-6 bg-amber-100/50 rounded w-16"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm">
                        <div className="h-6 bg-amber-100/50 rounded w-40 mb-6"></div>
                        <div className="h-[300px] w-full bg-amber-50/50 rounded-xl"></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm">
                        <div className="h-6 bg-amber-100/50 rounded w-40 mb-6"></div>
                        <div className="h-[250px] w-full bg-amber-50/50 rounded-xl"></div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-amber-100/50"></div>
                                    <div className="h-3 bg-amber-100/50 rounded w-16"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                <p className="text-red-600 font-medium">Failed to load dashboard data.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Stat Cards Data
    const statCards = [
        { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Total Writers", value: stats.totalWriters, icon: PenTool, color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Ebooks Sold", value: stats.ebooksSold, icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
        { title: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: CircleDollarSign, color: "text-green-600", bg: "bg-green-50" }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-serif text-amber-950 mb-1">Overview</h1>
                <p className="text-sm text-amber-900/60">Welcome back, Admin. Here is what&apos;s happening today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-amber-900/60 font-medium">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-amber-950 mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm">
                    <h3 className="text-lg font-serif text-amber-950 mb-6">Revenue Overview</h3>
                    {salesData.length === 0 || (salesData.length === 1 && salesData[0].name === 'No Data') ? (
                        <div className="h-[300px] flex items-center justify-center text-amber-900/50">
                            No sales data available.
                        </div>
                    ) : (
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fef3c7" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78350f', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#78350f', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip cursor={{stroke: '#fcd34d', strokeWidth: 2}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                    <Area type="monotone" dataKey="total" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm">
                    <h3 className="text-lg font-serif text-amber-950 mb-6">Ebooks by Genre</h3>
                    {genreData.length === 0 || (genreData.length === 1 && genreData[0].name === 'No Data') ? (
                        <div className="h-[250px] flex items-center justify-center text-amber-900/50">
                            No genre data.
                        </div>
                    ) : (
                        <>
                            <div className="h-[250px] w-full flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={genreData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {genreData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {genreData.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs text-amber-900/80">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}