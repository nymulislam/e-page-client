"use client";

import { useState, useEffect, Suspense, startTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation"; // useRouter ইম্পোর্ট করা হলো
import {
    Search,
    SlidersHorizontal,
    BookOpen,
    ShoppingBag,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react";
import { authClient } from "@/app/lib/auth-client"; // Better-Auth ক্লায়েন্ট ইম্পোর্ট করা হলো

function BrowseEbooksContent() {
    const searchParams = useSearchParams();
    const queryCategory = searchParams.get("category");
    const router = useRouter();

    // ইউজারের সেশন চেক করার জন্য
    const { data: session } = authClient.useSession();

    const [allEbooks, setAllEbooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Fetch ebooks
    useEffect(() => {
        const fetchAllEbooks = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("http://localhost:5000/ebooks");
                const data = await res.json();
                setAllEbooks(data);
            } catch (error) {
                console.error("Error fetching all ebooks:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllEbooks();
    }, []);

    // Set category from URL query parameter
    useEffect(() => {
        if (queryCategory) {
            const formattedCategory =
                queryCategory.charAt(0).toUpperCase() + queryCategory.slice(1);
            startTransition(() => {
                setSelectedCategory(formattedCategory);
                setCurrentPage(1);
            });
        }
    }, [queryCategory]);

    const categories = [
        "All",
        "Technology",
        "Literature",
        "History",
        "Science",
        "Poetry",
        "Islamic",
        "Mystery",
    ];

    // Filter logic
    const filteredEbooks = allEbooks.filter((ebook) => {
        const matchesSearch =
            ebook.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ebook.writer?.toLowerCase().includes(searchQuery.toLowerCase());

        const ebookGenre = ebook.genre || ebook.category || "";
        const matchesCategory =
            selectedCategory === "All" ||
            ebookGenre.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    // Pagination calc
    const totalPages = Math.max(1, Math.ceil(filteredEbooks.length / itemsPerPage));
    const safePage = Math.min(Math.max(1, currentPage), totalPages);
    const paginatedEbooks = filteredEbooks.slice(
        (safePage - 1) * itemsPerPage,
        safePage * itemsPerPage
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    // বইয়ের ডিটেইলসে যাওয়ার সময় লগইন চেক করার ফাংশন
    const handleCardClick = (e, ebookId) => {
        e.preventDefault();
        if (!session) {
            // লগইন করা না থাকলে লগইন পেজে পাঠিয়ে দেবো
            router.push("/login");
        } else {
            // লগইন করা থাকলে ডিটেইলস পেজে যাবে
            router.push(`/ebooks/${ebookId}`);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (safePage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (safePage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", safePage - 1, safePage, safePage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-amber-950 px-4 md:px-12 py-10">
            {/* Header */}
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

            {/* Search & Filter */}
            <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-900/40"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full bg-white border border-amber-200 rounded-2xl pl-11 pr-4 py-3.5 text-amber-950 placeholder-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
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

            {/* Ebooks Grid */}
            <div className="max-w-7xl mx-auto">
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-4 border border-amber-100 shadow-sm animate-pulse h-80 flex flex-col justify-between"
                            >
                                <div className="w-full h-48 bg-amber-100/50 rounded-xl mb-4"></div>
                                <div className="h-4 bg-amber-100/70 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-amber-100/50 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : paginatedEbooks.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                            {paginatedEbooks.map((ebook) => (
                                <div
                                    key={ebook.id || ebook._id}
                                    onClick={(e) => handleCardClick(e, ebook.id || ebook._id)}
                                    className="group bg-white rounded-2xl p-4 border border-amber-200/80 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
                                >
                                    {ebook.isSold && (
                                        <div className="absolute top-6 right-6 z-10 bg-amber-950/90 text-amber-200 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                                            <CheckCircle2 size={13} className="text-amber-400" /> Sold
                                        </div>
                                    )}

                                    <div>
                                        <div className="relative w-full h-52 md:h-60 rounded-xl overflow-hidden mb-4 bg-amber-50 border border-amber-100">
                                            <Image
                                                src={ebook.cover}
                                                alt={ebook.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="font-serif font-bold text-amber-950 text-base md:text-lg line-clamp-1 group-hover:text-amber-700 transition-colors">
                                            {ebook.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-amber-900/60 mt-1">
                                            By <span className="font-medium text-amber-900">{ebook.writer}</span>
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between">
                                        <span className="font-bold text-amber-950 text-base md:text-lg">
                                            {typeof ebook.price === "number"
                                                ? `$${ebook.price.toFixed(2)}`
                                                : ebook.price}
                                        </span>
                                        <span className="w-9 h-9 rounded-xl bg-amber-50 group-hover:bg-amber-950 group-hover:text-amber-50 text-amber-900 flex items-center justify-center transition-all shadow-sm">
                                            <ShoppingBag size={16} />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={safePage === 1}
                                    className="p-2 rounded-xl bg-white border border-amber-200 text-amber-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                {getPageNumbers().map((pageNum, idx) =>
                                    pageNum === "..." ? (
                                        <span key={`ellipsis-${idx}`} className="px-2 text-amber-900/40">
                                            <MoreHorizontal size={20} />
                                        </span>
                                    ) : (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`w-10 h-10 rounded-xl font-medium transition-all ${
                                                safePage === pageNum
                                                    ? "bg-amber-950 text-amber-50 shadow-md"
                                                    : "bg-white border border-amber-200 text-amber-900 hover:bg-amber-50"
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    )
                                )}

                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={safePage === totalPages}
                                    className="p-2 rounded-xl bg-white border border-amber-200 text-amber-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-amber-200 shadow-sm max-w-xl mx-auto p-8">
                        <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                            <SlidersHorizontal size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-serif text-amber-950 mb-2">No ebooks found</h3>
                        <p className="text-amber-900/60 text-sm mb-6">
                            We couldn&apos;t find any ebooks matching your search criteria. Try checking your spelling or selecting a different category.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("All");
                                setCurrentPage(1);
                            }}
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

export default function BrowseEbooksPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex justify-center items-center bg-[#FDFBF7]">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-900"></div>
                </div>
            }
        >
            <BrowseEbooksContent />
        </Suspense>
    );
}