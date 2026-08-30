"use client";
import { ShoppingCart, Trash2 } from "lucide-react";

const wishlistItems = [
    { id: 1, title: "Node.js Backend Architecture", author: "Tanmoy Ahmed", price: "$29.00", cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400" },
];

export default function WishlistPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif text-amber-950">My Wishlist</h1>
                <p className="text-sm text-amber-900/60">Books you have saved to read or purchase later.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden flex flex-col group">
                        <div className="h-48 overflow-hidden bg-amber-50 relative border-b border-amber-900/5">
                            <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                            <div>
                                <h3 className="font-serif text-lg text-amber-950 font-medium line-clamp-1">{item.title}</h3>
                                <p className="text-xs text-amber-900/60 mt-1">By {item.author}</p>
                                <p className="text-sm font-semibold text-amber-900 mt-2">{item.price}</p>
                            </div>
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-900 text-white rounded-xl text-xs font-medium hover:bg-amber-950 transition-colors shadow-sm">
                                <ShoppingCart size={14} /> Move to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}