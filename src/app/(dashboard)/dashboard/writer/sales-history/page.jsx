"use client";
import React, { useEffect, useState, startTransition } from "react";
import { authClient } from "@/app/lib/auth-client";
import { TrendingUp, BookOpen, DollarSign, Users, Loader2 } from "lucide-react";

export default function SalesHistory() {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: session } = authClient.useSession();
    const userEmail = session?.user?.email;

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (!userEmail) {
            startTransition(() => {
                setLoading(false);
                setError("You need to be logged in to view sales history.");
            });
            return;
        }

        const fetchSalesHistory = async () => {
            try {
                startTransition(() => {
                    setLoading(true);
                    setError(null);
                });

                const response = await fetch(`${apiURL}/api/sales/writer/${userEmail}`);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || "Failed to load sales history");
                }

                const data = await response.json();

                startTransition(() => {
                    setSalesData(data);
                    setLoading(false);
                });
            } catch (err) {
                console.error("Sales fetch error:", err);
                startTransition(() => {
                    setError(err.message || "Failed to load sales history");
                    setLoading(false);
                });
            }
        };

        fetchSalesHistory();
    }, [userEmail, apiURL]);

    // Calculate total sales & revenue
    const totalSales = salesData.length;
    const totalRevenue = salesData.reduce((sum, sale) => {
        const amount = parseFloat(sale.amount?.replace('$', '') || 0);
        return sum + amount;
    }, 0);

    // Skeleton Loader
    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div>
                    <div className="h-8 bg-amber-200/60 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-amber-100/50 rounded w-72"></div>
                </div>

                {/* Skeleton Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl border border-amber-900/10 p-5 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-100/50 rounded-xl"></div>
                                <div className="flex-1">
                                    <div className="h-3 bg-amber-100/50 rounded w-20 mb-2"></div>
                                    <div className="h-6 bg-amber-100/50 rounded w-16"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skeleton Table */}
                <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-amber-50/50">
                                <tr>
                                    {[1, 2, 3, 4].map((i) => (
                                        <th key={i} className="p-4">
                                            <div className="h-4 bg-amber-200/40 rounded w-24"></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="border-b border-amber-900/5">
                                        {[1, 2, 3, 4].map((j) => (
                                            <td key={j} className="p-4">
                                                <div className="h-4 bg-amber-100/40 rounded w-28"></div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-serif text-amber-950">Sales History</h1>
                    <p className="text-sm text-amber-900/60">Track all purchases made by readers for your published books.</p>
                </div>
                <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden p-12 text-center">
                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p className="text-red-600 font-medium">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-5 py-2.5 bg-amber-900 text-white rounded-xl hover:bg-amber-800 transition text-sm font-medium"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Empty State
    if (salesData.length === 0) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-serif text-amber-950">Sales History</h1>
                    <p className="text-sm text-amber-900/60">Track all purchases made by readers for your published books.</p>
                </div>
                <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden p-16 text-center">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-medium text-amber-950 mb-1">No Sales Yet</h3>
                    <p className="text-amber-900/60 text-sm">Your ebooks haven&apos;t been purchased yet. Keep writing!</p>
                </div>
            </div>
        );
    }

    // Sales Table
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif text-amber-950">Sales History</h1>
                <p className="text-sm text-amber-900/60">Track all purchases made by readers for your published books.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-amber-900/10 p-5 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-900">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-amber-900/60 font-medium">Total Books Sold</p>
                        <h4 className="text-xl font-bold text-amber-950">{totalSales}</h4>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-amber-900/10 p-5 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
                        <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-amber-900/60 font-medium">Total Revenue</p>
                        <h4 className="text-xl font-bold text-amber-950">${totalRevenue.toFixed(2)}</h4>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-amber-900/10 p-5 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-700">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs text-amber-900/60 font-medium">Unique Buyers</p>
                        <h4 className="text-xl font-bold text-amber-950">
                            {new Set(salesData.map(s => s.buyer)).size}
                        </h4>
                    </div>
                </div>
            </div>

            {/* Sales Table */}
            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-amber-900/10 bg-amber-50/30 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-amber-950">Transaction Details</h2>
                    <span className="text-xs text-amber-900/50">{totalSales} transactions</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/50 border-b border-amber-900/10 text-amber-950/70 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">Ebook Title</th>
                                <th className="p-4 font-semibold">Buyer</th>
                                <th className="p-4 font-semibold">Purchase Date</th>
                                <th className="p-4 font-semibold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-900/5 text-sm">
                            {salesData.map((sale, idx) => (
                                <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-8 bg-amber-400 rounded-full"></div>
                                            <span className="font-medium text-amber-950">{sale.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-amber-900/70">{sale.buyer}</td>
                                    <td className="p-4 text-amber-900/60">{sale.date}</td>
                                    <td className="p-4 text-right font-bold text-emerald-700">{sale.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}