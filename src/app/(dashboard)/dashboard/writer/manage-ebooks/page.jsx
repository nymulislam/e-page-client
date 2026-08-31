"use client";
import { useState } from "react";
import { Edit, Trash2, Plus, Eye, EyeOff, BookOpen } from "lucide-react";
import Link from "next/link";

// আপনার দেওয়া ডাটা স্ট্রাকচার অনুযায়ী মক ডাটা
const initialEbooks = [
    { 
        _id: "6a92f5d01104a48fa86ca865", 
        title: "The Architecture of Modern Web Apps", 
        writer: "Naimul Islam", 
        price: 24, 
        cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop", 
        isSold: true, // true = Published, false = Unpublished
        genre: "Technology",
        uploadDate: "2026-01-15T10:30:00Z"
    },
    { 
        _id: "7b92f5d01104a48fa86ca866", 
        title: "Mastering Next.js 14", 
        writer: "Naimul Islam", 
        price: 18.5, 
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop", 
        isSold: false, 
        genre: "Programming",
        uploadDate: "2026-02-10T14:20:00Z"
    },
];

export default function ManageEbooks() {
    const [ebooks, setEbooks] = useState(initialEbooks);

    // Publish/Unpublish টগল করার ফাংশন (UI আপডেট)
    const togglePublishStatus = (id) => {
        setEbooks(prev => prev.map(book => 
            book._id === id ? { ...book, isSold: !book.isSold } : book
        ));
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-serif text-amber-950">My Ebooks</h1>
                        <p className="text-sm text-amber-900/60 mt-0.5">Manage your publications, edit details, or change visibility.</p>
                    </div>
                </div>
                <Link href="/dashboard/writer/add-ebook" className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-900 text-white rounded-xl text-sm font-semibold hover:bg-amber-950 hover:shadow-lg hover:shadow-amber-900/20 active:scale-[0.98] transition-all whitespace-nowrap">
                    <Plus size={18} /> Add New Ebook
                </Link>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/50 border-b border-amber-900/10 text-amber-950/70 text-xs uppercase tracking-wider font-semibold">
                                <th className="p-5">Ebook Details</th>
                                <th className="p-5">Genre</th>
                                <th className="p-5">Price</th>
                                <th className="p-5">Status</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-900/5 text-sm">
                            {ebooks.map((book) => (
                                <tr key={book._id} className="hover:bg-amber-50/30 transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-12 rounded-md overflow-hidden bg-amber-100 shrink-0 shadow-sm">
                                                <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-amber-950 text-base line-clamp-1">{book.title}</h3>
                                                <p className="text-xs text-amber-900/50 mt-1">Added: {new Date(book.uploadDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-amber-900/80 font-medium">{book.genre}</td>
                                    <td className="p-5 font-bold text-amber-900">${book.price.toFixed(2)}</td>
                                    <td className="p-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${book.isSold ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                            {book.isSold ? <Eye size={14} /> : <EyeOff size={14} />}
                                            {book.isSold ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Publish/Unpublish Action */}
                                            <button 
                                                onClick={() => togglePublishStatus(book._id)}
                                                className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors tooltip-trigger" 
                                                title={book.isSold ? "Unpublish" : "Publish"}
                                            >
                                                {book.isSold ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>

                                            <Link href={`/dashboard/writer/edit-ebook/${book._id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Ebook">
                                                <Edit size={18} />
                                            </Link>
                                            
                                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Ebook">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
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