"use client";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

const myEbooks = [
    { id: 1, title: "MERN Stack Development", price: "$22.50", status: "Published" },
    { id: 2, title: "Advanced React Patterns", price: "$18.00", status: "Unpublished" },
];

export default function ManageEbooks() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-amber-950">Manage Ebooks</h1>
                    <p className="text-sm text-amber-900/60">Edit, delete, or change the publishing status of your books.</p>
                </div>
                <Link href="/dashboard/writer/add-ebook" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-900 text-white rounded-xl text-sm font-medium hover:bg-amber-950 transition-colors shadow-sm whitespace-nowrap">
                    <Plus size={16} /> Add New Ebook
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/50 border-b border-amber-900/10 text-amber-950/70 text-sm">
                                <th className="p-4 font-medium">Title</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-900/5 text-sm">
                            {myEbooks.map((book) => (
                                <tr key={book.id} className="hover:bg-amber-50/30 transition-colors">
                                    <td className="p-4 font-medium text-amber-950">{book.title}</td>
                                    <td className="p-4 font-semibold text-amber-900">{book.price}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${book.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex items-center justify-end gap-2">
                                        <Link href={`/dashboard/writer/edit-ebook/${book.id}`} className="p-2 text-amber-800 hover:bg-amber-100 rounded-lg transition-colors" title="Edit">
                                            <Edit size={16} />
                                        </Link>
                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <Trash2 size={16} />
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