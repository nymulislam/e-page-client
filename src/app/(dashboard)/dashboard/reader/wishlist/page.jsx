"use client";
import { useState, useEffect, startTransition } from "react";
import { Trash2, BookX } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { data: session } = authClient.useSession();
    const currentUser = session?.user;

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        startTransition(() => {
            if (!currentUser?.email) {
                setIsLoading(false);
                return;
            }

            fetch(`${apiURL}/wishlist/${currentUser.email}`)
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch wishlist");
                    return res.json();
                })
                .then((data) => {
                    setWishlistItems(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Failed to fetch wishlist:", error);
                    setIsLoading(false);
                });
        });
    }, [currentUser?.email, apiURL]);

    const handleDelete = async (ebookId, e) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            const res = await fetch(`${apiURL}/wishlist/${currentUser.email}/${ebookId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (data.deletedCount > 0) {
                setWishlistItems((prev) => prev.filter((item) => item.ebookId !== ebookId));
            } else {
                console.warn("No item deleted, maybe already removed");
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6 p-8">
                <div className="h-8 bg-amber-100/70 rounded w-48 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-amber-900/10 h-80 animate-pulse">
                            <div className="h-48 bg-amber-100/50 rounded-t-2xl"></div>
                            <div className="p-5 space-y-3">
                                <div className="h-5 bg-amber-100/70 rounded w-3/4"></div>
                                <div className="h-4 bg-amber-100/50 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!currentUser?.email) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-amber-900/10">
                <BookX size={48} className="text-amber-900/30 mb-4" />
                <h3 className="text-lg font-medium text-amber-950">Please Login</h3>
                <p className="text-amber-900/60 mt-1">Login to view your wishlist.</p>
                <Link
                    href="/login"
                    className="mt-6 px-6 py-3 bg-amber-900 text-white rounded-xl hover:bg-amber-950 transition-colors"
                >
                    Login Now
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif text-amber-950">My Wishlist</h1>
                <p className="text-sm text-amber-900/60">
                    Books you have saved to read or purchase later.
                </p>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-amber-900/10">
                    <BookX size={48} className="text-amber-900/30 mb-4" />
                    <h3 className="text-lg font-medium text-amber-950">Your wishlist is empty</h3>
                    <p className="text-amber-900/60 mt-1">
                        Explore our library and save your favorite books here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <Link
                            key={item._id}
                            href={`/ebooks/${item.ebookId}`}
                            className="group block bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden hover:shadow-xl hover:border-amber-300 transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden bg-amber-50">
                                <img
                                    src={item.cover}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Delete button */}
                                <button
                                    onClick={(e) => handleDelete(item.ebookId, e)}
                                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-red-500 hover:bg-red-50 hover:text-red-700 shadow-sm transition-colors z-10"
                                    title="Remove from wishlist"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="p-5 flex flex-col">
                                <h3 className="font-serif text-lg text-amber-950 font-medium line-clamp-1 group-hover:text-amber-700 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-amber-900/60 mt-1">By {item.writer}</p>
                                <p className="text-sm font-semibold text-amber-900 mt-2">
                                    ${item.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}