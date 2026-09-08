"use client";
import { useState, useEffect, startTransition } from "react";
import { CheckCircle2, CreditCard, ShoppingBag, DollarSign, Calendar } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import Link from "next/link";

export default function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: session } = authClient.useSession();
    const userEmail = session?.user?.email;

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (!userEmail) {
            startTransition(() => {
                setIsLoading(false);
            });
            return;
        }

        const fetchPurchases = async () => {
            try {
                const res = await fetch(`${apiURL}/api/purchases/${userEmail}`);
                if (!res.ok) throw new Error("Failed to fetch purchase history");
                const data = await res.json();
                startTransition(() => {
                    setPurchases(data);
                });
            } catch (err) {
                console.error("Error fetching purchases:", err);
                startTransition(() => {
                    setError(err.message);
                });
            } finally {
                startTransition(() => {
                    setIsLoading(false);
                });
            }
        };

        fetchPurchases();
    }, [userEmail, apiURL]);

    // মোট খরচের হিসাব
    const totalSpent = purchases.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    // Skeleton Loading UI
    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                {/* Header Skeleton */}
                <div className="space-y-2">
                    <div className="h-7 bg-amber-100/70 rounded-md w-48"></div>
                    <div className="h-4 bg-amber-100/50 rounded-md w-80"></div>
                </div>

                {/* Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100/70 rounded-xl shrink-0"></div>
                            <div className="space-y-2 flex-1">
                                <div className="h-3 bg-amber-100/60 rounded w-2/3"></div>
                                <div className="h-6 bg-amber-100/80 rounded w-1/3"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Skeleton */}
                <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden p-6 space-y-4">
                    <div className="h-5 bg-amber-100/70 rounded w-40 mb-6"></div>
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-amber-900/5 last:border-0">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-10 h-12 bg-amber-100/70 rounded-md shrink-0"></div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-amber-100/70 rounded w-3/4"></div>
                                        <div className="h-3 bg-amber-100/50 rounded w-1/2"></div>
                                    </div>
                                </div>
                                <div className="h-4 bg-amber-100/60 rounded w-24 hidden sm:block"></div>
                                <div className="h-4 bg-amber-100/70 rounded w-16"></div>
                                <div className="h-4 bg-amber-100/60 rounded w-20 hidden md:block"></div>
                                <div className="h-6 bg-amber-100/60 rounded-full w-20 shrink-0"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 px-6 bg-red-50/50 rounded-2xl border border-red-200/80 max-w-xl mx-auto">
                <p className="text-red-600 font-medium">Failed to load purchase history: {error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (purchases.length === 0) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-serif text-amber-950 font-bold">Purchase History</h1>
                    <p className="text-sm text-amber-900/60">Review your past financial transactions and invoice records.</p>
                </div>
                <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-800">
                        <CreditCard size={28} />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-amber-950">No purchases found</h3>
                        <p className="text-sm text-amber-900/60 mt-1">You haven&apos;t purchased any ebooks yet.</p>
                    </div>
                    <Link href="/ebooks" className="inline-block px-5 py-2.5 bg-amber-900 text-white rounded-xl text-xs font-medium hover:bg-amber-950 transition-colors">
                        Explore Ebooks
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-serif text-amber-950 font-bold">Purchase History</h1>
                <p className="text-sm text-amber-900/60">Review your past financial transactions and invoice records.</p>
            </div>

            {/* Transaction Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-900">
                        <ShoppingBag size={22} />
                    </div>
                    <div>
                        <p className="text-xs text-amber-900/60 font-medium">Total Books Purchased</p>
                        <h4 className="text-xl font-bold text-amber-950">{purchases.length}</h4>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700">
                        <DollarSign size={22} />
                    </div>
                    <div>
                        <p className="text-xs text-amber-900/60 font-medium">Total Amount Spent</p>
                        <h4 className="text-xl font-bold text-amber-950">${totalSpent.toFixed(2)}</h4>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-700">
                        <Calendar size={22} />
                    </div>
                    <div>
                        <p className="text-xs text-amber-900/60 font-medium">Latest Purchase</p>
                        <h4 className="text-sm font-semibold text-amber-950">
                            {purchases[0]?.purchaseDate 
                                ? new Date(purchases[0].purchaseDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) 
                                : 'N/A'}
                        </h4>
                    </div>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-amber-900/10 bg-amber-50/30">
                    <h2 className="text-base font-semibold text-amber-950">Transactions Details</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/50 border-b border-amber-900/10 text-amber-950/70 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold">Ebook Details</th>
                                <th className="p-4 font-semibold">Transaction ID</th>
                                <th className="p-4 font-semibold">Price</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-900/5 text-sm">
                            {purchases.map((tx) => (
                                <tr key={tx._id} className="hover:bg-amber-50/30 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {tx.ebookCover && (
                                                <img 
                                                    src={tx.ebookCover} 
                                                    alt={tx.ebookTitle} 
                                                    className="w-10 h-12 object-cover rounded-md border border-amber-900/10 shrink-0" 
                                                />
                                            )}
                                            <div>
                                                <p className="font-semibold text-amber-950 line-clamp-1">{tx.ebookTitle}</p>
                                                <p className="text-xs text-amber-900/60 mt-0.5">
                                                    Writer: {tx.writer || tx.ebookWriter || 'Author'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-mono text-xs text-amber-900/70 bg-amber-50 px-2 py-1 rounded border border-amber-900/10">
                                            {tx.stripeSessionId ? `...${tx.stripeSessionId.slice(-10)}` : 'N/A'}
                                        </span>
                                    </td>
                                    <td className="p-4 font-semibold text-amber-900">
                                        ${tx.amount ? tx.amount.toFixed(2) : '0.00'} <span className="text-xs font-normal text-amber-900/50 uppercase">{tx.currency || 'USD'}</span>
                                    </td>
                                    <td className="p-4 text-amber-900/70 text-xs">
                                        {tx.purchaseDate ? new Date(tx.purchaseDate).toLocaleDateString('en-US', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        }) : 'N/A'}
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
                                            <CheckCircle2 size={13} /> {tx.status || 'Completed'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}