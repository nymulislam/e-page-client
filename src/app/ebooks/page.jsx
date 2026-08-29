"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, BookOpen, ShoppingBag, CheckCircle2 } from "lucide-react";

// ডামি ইবুক ডাটা (আপনার ডাটাবেজ বা API থেকে এটি ফেচ হবে)
const MOCK_EBOOKS = [
    {
        id: "1",
        title: "The Architecture of Modern Web Apps",
        writer: "Naimul Islam",
        price: "$24.00",
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
        isSold: true,
    },
    {
        id: "2",
        title: "Timeless Poetry & Philosophical Essays",
        writer: "Sabrina Ahmed",
        price: "$15.50",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
        isSold: false,
    },
    {
        id: "3",
        title: "Mastering React & Next.js Ecosystem",
        writer: "Tanvir Hossain",
        price: "$29.99",
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
        isSold: false,
    },
    {
        id: "4",
        title: "Digital Manuscript Archives of Bengal",
        writer: "Dr. Farhana Rahman",
        price: "$19.00",
        cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
        isSold: true,
    },
];

export default function BrowseEbooksPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(false); // ডাটা লোডিংয়ের সময় true হবে

    // ফিল্টারিং লজিক
    const filteredEbooks = MOCK_EBOOKS.filter((ebook) => {
        const matchesSearch = ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              ebook.writer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-amber-950 px-4 md:px-12 py-10">
            
            {/* Page Header */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/60 border border-amber-200 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-4">
                    <BookOpen size={14} /> Digital Manuscript Archive
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-amber-950 mb-4">
                    Explore & Discover <span className="text-amber-700 italic">Knowledge</span>
                </h1>
                <p className="text-amber-900/70 max-w-2xl mx-auto text-base">
                    Browse through our curated collection of original manuscripts, academic guides, and literary works by global authors.
                </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search Input */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-amber-200 rounded-2xl pl-11 pr-4 py-3.5 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                    />
                </div>

                {/* Filter / Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {["All", "Technology", "Literature", "History", "Science"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                selectedCategory === cat
                                    ? "bg-amber-950 text-amber-50 shadow-md"
                                    : "bg-white border border-amber-200 text-amber-900/70 hover:bg-amber-50"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto">
                {isLoading ? (
                    /* Skeleton Loader Grid */
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div key={item} className="bg-white rounded-2xl p-4 border border-amber-100 shadow-sm animate-pulse h-80 flex flex-col justify-between">
                                <div className="w-full h-48 bg-amber-100/50 rounded-xl mb-4"></div>
                                <div className="h-4 bg-amber-100/70 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-amber-100/50 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredEbooks.length > 0 ? (
                    /* Responsive Grid: 2 cols (mobile), 3 cols (tablet), 4 cols (desktop) */
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredEbooks.map((ebook) => (
                            <Link
                                key={ebook.id}
                                href={`/ebooks/${ebook.id}`}
                                className="group bg-white rounded-2xl p-4 border border-amber-200/80 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                            >
                                {/* Sold Badge */}
                                {ebook.isSold && (
                                    <div className="absolute top-6 right-6 z-10 bg-amber-950/90 text-amber-200 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                                        <CheckCircle2 size={13} className="text-amber-400" /> Sold
                                    </div>
                                )}

                                <div>
                                    {/* Cover Image Thumbnail */}
                                    <div className="relative w-full h-52 md:h-60 rounded-xl overflow-hidden mb-4 bg-amber-50 border border-amber-100">
                                        <Image
                                            src={ebook.cover}
                                            alt={ebook.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Title & Writer */}
                                    <h3 className="font-serif font-bold text-amber-950 text-base md:text-lg line-clamp-1 group-hover:text-amber-700 transition-colors">
                                        {ebook.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-amber-900/60 mt-1">
                                        By <span className="font-medium text-amber-900">{ebook.writer}</span>
                                    </p>
                                </div>

                                {/* Price & Action Footer */}
                                <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between">
                                    <span className="font-bold text-amber-950 text-base md:text-lg">{ebook.price}</span>
                                    <span className="w-9 h-9 rounded-xl bg-amber-50 group-hover:bg-amber-950 group-hover:text-amber-50 text-amber-900 flex items-center justify-center transition-all shadow-sm">
                                        <ShoppingBag size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Friendly Message When No Ebooks Match Filters */
                    <div className="text-center py-20 bg-white rounded-3xl border border-amber-200 shadow-sm max-w-xl mx-auto p-8">
                        <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                            <SlidersHorizontal size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-amber-950 mb-2">No ebooks found</h3>
                        <p className="text-amber-900/60 text-sm mb-6">
                            We couldn&apos;t find any ebooks matching your search criteria. Try checking your spelling or selecting a different category.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="bg-amber-950 hover:bg-amber-900 text-amber-50 font-medium px-6 py-3 rounded-xl transition-all shadow-md text-sm"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}