"use client";
import { useState, useEffect } from "react";
import { Search, Trash2, CheckCircle2, XCircle, BookX } from "lucide-react";

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ManageEbooks() {
    const [ebooks, setEbooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    
    // পেজিনেশনের জন্য স্টেট
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // প্রতি পেজে কয়টি বই দেখাবে

    useEffect(() => {
        const fetchAllEbooks = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${apiURL}/ebooks/admin`);
                if (!res.ok) throw new Error("Failed to fetch ebooks");
                const data = await res.json();
                setEbooks(data);
            } catch (error) {
                console.error("Error fetching all ebooks:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllEbooks();
    }, []);

    const handleToggleStatus = async (id, currentIsSold) => {
        const newIsSold = !currentIsSold;

        try {
            const res = await fetch(`${apiURL}/ebooks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isSold: newIsSold }),
            });

            if (res.ok) {
                setEbooks((prevEbooks) =>
                    prevEbooks.map((book) => {
                        const bookId = book._id || book.id;
                        return bookId === id ? { ...book, isSold: newIsSold } : book;
                    })
                );
            } else {
                alert("Failed to update status!");
            }
        } catch (error) {
            console.error("Error updating ebook status:", error);
            alert("Something went wrong while updating status.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ebook?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${apiURL}/ebooks/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setEbooks((prevEbooks) =>
                    prevEbooks.filter((book) => (book._id || book.id) !== id)
                );
            } else {
                alert("Failed to delete the ebook!");
            }
        } catch (error) {
            console.error("Error deleting ebook:", error);
            alert("Something went wrong while deleting.");
        }
    };

    //  search filtering
    const filteredEbooks = ebooks.filter((book) => {
        const titleMatch = book.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const writerMatch = book.writer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.writerName?.toLowerCase().includes(searchQuery.toLowerCase());
        return titleMatch || writerMatch;
    });

    // pagination logic
    const totalPages = Math.ceil(filteredEbooks.length / itemsPerPage);
    const paginatedEbooks = filteredEbooks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-amber-950">Manage Ebooks</h1>
                    <p className="text-sm text-amber-900/60">Control all ebooks across the platform.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title or writer..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="pl-10 pr-4 py-2 bg-white border border-amber-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm w-full sm:w-72 transition-all"
                    />
                </div>
            </div>

            {/* Table / Loading Section */}
            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/50 border-b border-amber-900/10 text-amber-950/70 text-sm">
                                <th className="p-4 font-medium">Book Title</th>
                                <th className="p-4 font-medium">Writer Name</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-900/5">
                            {isLoading ? (
                                // Skeleton Loading Rows
                                [...Array(5)].map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="p-4">
                                            <div className="h-4 bg-amber-100 rounded w-3/4"></div>
                                        </td>
                                        <td className="p-4">
                                            <div className="h-4 bg-amber-100 rounded w-1/2"></div>
                                        </td>
                                        <td className="p-4">
                                            <div className="h-4 bg-amber-100 rounded w-1/4"></div>
                                        </td>
                                        <td className="p-4">
                                            <div className="h-6 bg-amber-100 rounded-md w-24"></div>
                                        </td>
                                        <td className="p-4 flex items-center justify-end gap-2">
                                            <div className="h-8 bg-amber-100 rounded w-20"></div>
                                            <div className="h-8 bg-amber-100 rounded w-8"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : paginatedEbooks.length > 0 ? (
                                paginatedEbooks.map((book) => {
                                    const bookId = book._id || book.id;
                                    const isPublished = !book.isSold;
                                    return (
                                        <tr key={bookId} className="hover:bg-amber-50/30 transition-colors group">
                                            <td className="p-4">
                                                <p className="font-medium text-amber-950">{book.title}</p>
                                            </td>
                                            <td className="p-4 text-sm text-amber-900/80">
                                                {book.writer || book.writerName || "Unknown"}
                                            </td>
                                            <td className="p-4 text-sm font-semibold text-amber-700">
                                                {typeof book.price === "number" ? `$${book.price}` : book.price}
                                            </td>
                                            <td className="p-4">
                                                {isPublished ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                                                        <CheckCircle2 size={14} /> Published
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
                                                        <XCircle size={14} /> Unpublished
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleToggleStatus(bookId, book.isSold)}
                                                    className={`text-xs px-3 py-1.5 border rounded-md transition-colors font-medium w-24 text-center ${
                                                        isPublished
                                                            ? "border-amber-900/20 text-amber-900 hover:bg-amber-50"
                                                            : "border-emerald-600 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                                    }`}
                                                >
                                                    {isPublished ? "Unpublish" : "Publish"}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(bookId)}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors border border-transparent hover:border-red-100"
                                                    title="Delete Ebook"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-amber-900/40">
                                            <BookX size={48} className="mb-3 opacity-50" />
                                            <p className="text-base font-medium text-amber-900/60">No ebooks found</p>
                                            <p className="text-sm">Try adjusting your search query or add new ebooks.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-amber-900/10 bg-amber-50/20 gap-3">
                        <p className="text-xs text-amber-900/70">
                            Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                            <span className="font-semibold">
                                {Math.min(currentPage * itemsPerPage, filteredEbooks.length)}
                            </span>{" "}
                            of <span className="font-semibold">{filteredEbooks.length}</span> ebooks
                        </p>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 text-xs font-medium border border-amber-900/20 rounded-md bg-white text-amber-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-50 transition-colors"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${
                                            currentPage === pageNum
                                                ? "bg-amber-800 text-white border-amber-800"
                                                : "bg-white text-amber-900 border-amber-900/20 hover:bg-amber-50"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 text-xs font-medium border border-amber-900/20 rounded-md bg-white text-amber-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}