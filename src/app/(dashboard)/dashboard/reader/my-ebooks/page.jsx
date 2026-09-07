"use client";
import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { Download, ArrowRight, BookOpen } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";

export default function MyEbooks() {
    const [purchasedBooks, setPurchasedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

        const fetchUserEbooks = async () => {
            try {
                const res = await fetch(`${apiURL}/api/purchases/${userEmail}`);
                if (res.ok) {
                    const data = await res.json();
                    startTransition(() => {
                        setPurchasedBooks(data);
                    });
                }
            } catch (err) {
                console.error("Failed to load purchased ebooks:", err);
            } finally {
                startTransition(() => {
                    setIsLoading(false);
                });
            }
        };

        fetchUserEbooks();
    }, [userEmail, apiURL]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif text-amber-950 font-bold">Purchased Ebooks</h1>
                <p className="text-sm text-amber-900/60">Access and read your library of purchased books.</p>
            </div>

            {/* Loading State: Skeleton Loader */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="bg-white rounded-2xl border border-amber-900/10 overflow-hidden flex flex-col animate-pulse">
                            <div className="h-52 bg-amber-900/10 w-full"></div>
                            <div className="p-5 flex flex-col justify-between space-y-4 flex-1">
                                <div className="space-y-2">
                                    <div className="h-4 bg-amber-900/10 rounded w-3/4"></div>
                                    <div className="h-3 bg-amber-900/10 rounded w-1/2"></div>
                                </div>
                                <div className="flex gap-2 pt-2 border-t border-amber-900/5">
                                    <div className="h-9 bg-amber-900/10 rounded-xl flex-1"></div>
                                    <div className="h-9 w-9 bg-amber-900/10 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : purchasedBooks.length === 0 ? (
                /* Empty State */
                <div className="bg-white rounded-2xl border border-amber-900/10 p-12 text-center space-y-4">
                    <div className="w-14 h-14 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                        <BookOpen size={24} />
                    </div>
                    <h3 className="text-base font-semibold text-amber-950">Your library is empty</h3>
                    <p className="text-sm text-amber-900/60">You haven&apos;t bought any ebooks yet.</p>
                    <Link
                        href="/ebooks"
                        className="inline-block px-5 py-2.5 bg-amber-900 text-white rounded-xl text-xs font-medium hover:bg-amber-950 transition-colors"
                    >
                        Browse Store
                    </Link>
                </div>
            ) : (
                /* Ebooks Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {purchasedBooks.map((book) => {
                        const targetId = book.ebookId || book._id;
                        return (
                            <div key={book._id} className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                                <div className="h-52 overflow-hidden bg-amber-50 relative border-b border-amber-900/5">
                                    <img
                                        src={book.ebookCover || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400"}
                                        alt={book.ebookTitle}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                                    <div>
                                        <h3 className="font-serif text-lg text-amber-950 font-medium group-hover:text-amber-800 transition-colors line-clamp-1">
                                            {book.ebookTitle}
                                        </h3>
                                        <p className="text-xs text-amber-900/60 mt-1">
                                            By {book.writer || book.ebookWriter || 'Unknown Writer'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 pt-2 border-t border-amber-900/10">
                                        <Link
                                            href={`/ebooks/${targetId}`}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-900 text-white rounded-xl text-xs font-medium hover:bg-amber-950 transition-colors"
                                        >
                                            Read Now <ArrowRight size={14} />
                                        </Link>
                                        <a
                                            href={book.pdfUrl || "#"}
                                            download
                                            className="p-2.5 border border-amber-900/20 text-amber-900 rounded-xl hover:bg-amber-50 transition-colors"
                                            title="Download PDF"
                                        >
                                            <Download size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}