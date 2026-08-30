"use client";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

const purchasedBooks = [
    { id: 1, title: "JavaScript Mastery", author: "Programming Hero", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400" },
    { id: 2, title: "Advanced React & Next.js", author: "Naimul Islam", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400" },
];

export default function MyEbooks() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif text-amber-950">Purchased Ebooks</h1>
                <p className="text-sm text-amber-900/60">Access and read your library of purchased books.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {purchasedBooks.map((book) => (
                    <div key={book.id} className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                        <div className="h-52 overflow-hidden bg-amber-50 relative border-b border-amber-900/5">
                            <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                            <div>
                                <h3 className="font-serif text-lg text-amber-950 font-medium group-hover:text-amber-800 transition-colors line-clamp-1">{book.title}</h3>
                                <p className="text-xs text-amber-900/60 mt-1">By {book.author}</p>
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-amber-900/10">
                                <Link href={`/ebooks/${book.id}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-900 text-white rounded-xl text-xs font-medium hover:bg-amber-950 transition-colors">
                                    Read Now <ArrowRight size={14} />
                                </Link>
                                <button className="p-2.5 border border-amber-900/20 text-amber-900 rounded-xl hover:bg-amber-50 transition-colors" title="Download PDF">
                                    <Download size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}