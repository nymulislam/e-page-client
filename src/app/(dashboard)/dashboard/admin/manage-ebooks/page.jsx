"use client";
import { useState } from "react";
import { Search, Trash2, CheckCircle2, XCircle } from "lucide-react";

const initialEbooks = [
    { id: 1, title: "The Art of Coding", writer: "John Doe", price: "$15.00", status: "published" },
    { id: 2, title: "History of Bengal", writer: "Jane Smith", price: "$12.00", status: "unpublished" },
    { id: 3, title: "Learn Next.js", writer: "Naimul Islam", price: "$20.00", status: "published" },
];

export default function ManageEbooks() {
    const [ebooks, setEbooks] = useState(initialEbooks);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-amber-950">Manage Ebooks</h1>
                    <p className="text-sm text-amber-900/60">Control all ebooks across the platform.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
                    <input
                        type="text"
                        placeholder="Search books..."
                        className="pl-10 pr-4 py-2 bg-white border border-amber-900/20 rounded-lg focus:outline-none text-sm w-full sm:w-64"
                    />
                </div>
            </div>

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
                            {ebooks.map((book) => (
                                <tr key={book.id} className="hover:bg-amber-50/30 transition-colors">
                                    <td className="p-4">
                                        <p className="font-medium text-amber-950">{book.title}</p>
                                    </td>
                                    <td className="p-4 text-sm text-amber-900/80">{book.writer}</td>
                                    <td className="p-4 text-sm font-semibold text-amber-700">{book.price}</td>
                                    <td className="p-4">
                                        {book.status === 'published' ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-50 text-green-700 text-xs font-semibold">
                                                <CheckCircle2 size={14} /> Published
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-yellow-50 text-yellow-700 text-xs font-semibold">
                                                <XCircle size={14} /> Unpublished
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 flex items-center justify-end gap-2">
                                        <button className="text-xs px-3 py-1.5 border border-amber-900/20 rounded-md hover:bg-amber-50 transition-colors font-medium">
                                            {book.status === 'published' ? 'Unpublish' : 'Publish'}
                                        </button>
                                        <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                                            <Trash2 size={18} />
                                        </button>
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