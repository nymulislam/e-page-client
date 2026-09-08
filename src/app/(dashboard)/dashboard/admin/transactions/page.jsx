"use client";

import { useState, useEffect, startTransition, useCallback } from "react";
import { ArrowUpRight, ArrowDownLeft, Search, RefreshCw, SearchX, Wallet } from "lucide-react";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const fetchTransactions = useCallback(() => {
        startTransition(() => {
            setLoading(true);
        });

        fetch(`${apiURL}/api/admin/transactions`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch transactions");
                return res.json();
            })
            .then((data) => {
                startTransition(() => {
                    setTransactions(data);
                    setLoading(false);
                });
            })
            .catch((error) => {
                console.error("Failed to fetch transactions:", error);
                startTransition(() => {
                    setLoading(false);
                });
            });
    }, [apiURL]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const filteredTransactions = transactions.filter((trx) =>
        trx.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trx.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trx.type?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                        <Wallet size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-amber-950">Transactions</h1>
                        <p className="text-sm text-amber-900/60 font-medium mt-0.5">Monitor all financial activities on the platform</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                    <div className="relative flex-1 sm:w-72">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
                        <input
                            type="text"
                            placeholder="Search email, TRX ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-amber-50/50 border border-amber-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-sm font-medium transition-all"
                        />
                    </div>
                    <button
                        onClick={fetchTransactions}
                        disabled={loading}
                        className="p-2.5 bg-amber-100/50 border border-amber-200 hover:bg-amber-100 text-amber-700 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
                        title="Refresh Data"
                    >
                        <RefreshCw size={18} className={loading ? "animate-spin text-amber-500" : ""} />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-amber-50/80 border-b border-amber-900/10 text-amber-950/70 text-xs uppercase tracking-wider font-semibold">
                                <th className="px-6 py-4 rounded-tl-2xl">Transaction ID</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Customer Email</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4 rounded-tr-2xl">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-900/5">
                            {loading ? (
                                /* --- SKELETON LOADING --- */
                                [...Array(5)].map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-amber-100 rounded w-28"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-7 bg-amber-100 rounded-full w-24"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-amber-100 rounded w-48"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-5 bg-amber-100 rounded w-20"></div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-amber-100 rounded w-32"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredTransactions.length > 0 ? (
                                /* --- ACTUAL DATA --- */
                                filteredTransactions.map((trx, index) => (
                                    <tr key={index} className="hover:bg-amber-50/40 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-sm font-medium text-amber-900/80 group-hover:text-amber-950">
                                            {trx.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide capitalize ${
                                                trx.type === 'withdrawal' 
                                                ? 'bg-red-50 text-red-600 border border-red-100' 
                                                : 'bg-green-50 text-green-600 border border-green-100'
                                            }`}>
                                                {trx.type === 'withdrawal' ? (
                                                    <ArrowUpRight size={14} />
                                                ) : (
                                                    <ArrowDownLeft size={14} />
                                                )}
                                                {trx.type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-amber-950/70">
                                            {trx.email}
                                        </td>
                                        <td className={`px-6 py-4 font-bold text-sm ${
                                            trx.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                                        }`}>{trx.amount}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-amber-900/60">
                                            {trx.date}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                /* --- EMPTY STATE --- */
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="w-16 h-16 bg-amber-50 flex items-center justify-center rounded-full">
                                                <SearchX size={32} className="text-amber-300" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-amber-950">No transactions found</h3>
                                            <p className="text-sm text-amber-900/60 max-w-sm">
                                                {searchQuery 
                                                    ? `We couldn't find any transaction matching "${searchQuery}". Try adjusting your search term.` 
                                                    : "There are no transactions recorded in the system yet."}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}