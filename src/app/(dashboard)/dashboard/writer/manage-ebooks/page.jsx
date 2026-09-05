"use client";
import { useState, useEffect } from "react";
import { Edit, Trash2, Plus, Eye, EyeOff, BookOpen, Loader2, X } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";
import AddEBook from "../add-ebook/page";

export default function ManageEbooks() {
    const { data: session } = authClient.useSession();
    const [ebooks, setEbooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingEbookId, setEditingEbookId] = useState(null);

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const fetchEbooks = async () => {
        if (!session?.user?.email) return;
        try {
            const res = await fetch(`${apiURL}/ebooks/writer/${session.user.email}`);
            const data = await res.json();
            setEbooks(data);
        } catch (error) {
            console.error("Failed to fetch ebooks", error);
        } finally {
            setIsLoading(false);
        }
    };

    
    useEffect(() => {
    
        const fetchEbooks = async () => {
            if (!session?.user?.email) return;
            try {
                const res = await fetch(`${apiURL}/ebooks/writer/${session.user.email}`);
                const data = await res.json();
                setEbooks(data);
            } catch (error) {
                console.error("Failed to fetch ebooks", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEbooks();
    }, [session?.user?.email, apiURL]);

    const togglePublishStatus = async (id, currentStatus) => {
        try {
            const newStatus = !currentStatus;
            const res = await fetch(`${apiURL}/ebooks/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isSold: newStatus }),
            });
            if (res.ok) {
                setEbooks(prev => prev.map(book =>
                    book._id === id ? { ...book, isSold: newStatus } : book
                ));
            }
        } catch (error) {
            console.error("Failed to update status", error);
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
                setEbooks(prev => prev.filter(book => book._id !== id));
            }
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };


    const handleEditSuccess = () => {
        setIsEditModalOpen(false);
        setEditingEbookId(null);
        fetchEbooks(); 
    };

    if (isLoading) {
        return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-amber-900" size={40} /></div>;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
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
                <Link href="/dashboard/writer/add-ebook" className="flex items-center gap-2 px-6 py-3 bg-amber-900 text-white rounded-xl text-sm font-semibold hover:bg-amber-950 transition-all">
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
                            {ebooks.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-10 text-gray-500">No ebooks found. Add your first ebook!</td>
                                </tr>
                            ) : (
                                ebooks.map((book) => (
                                    <tr key={book._id} className="hover:bg-amber-50/30 transition-colors">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-12 rounded-md overflow-hidden bg-amber-100 shrink-0 shadow-sm">
                                                    <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-amber-950 text-base">{book.title}</h3>
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
                                                <button onClick={() => togglePublishStatus(book._id, book.isSold)} className="p-2 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors" title={book.isSold ? "Unpublish" : "Publish"}>
                                                    {book.isSold ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                                
                                                {/* Edit Button - Opens Modal */}
                                                <button 
                                                    onClick={() => {
                                                        setEditingEbookId(book._id);
                                                        setIsEditModalOpen(true);
                                                    }} 
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit size={18} />
                                                </button>

                                                <button onClick={() => handleDelete(book._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Modal Overlay */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-[#FDFBF7] rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200 border border-amber-900/10">
                        {/* Close Button */}
                        <button 
                            onClick={() => {
                                setIsEditModalOpen(false);
                                setEditingEbookId(null);
                            }} 
                            className="absolute top-6 right-6 p-2 bg-white text-gray-500 rounded-full shadow-sm hover:bg-gray-100 transition-colors z-10 border border-gray-200"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-6 md:p-8">
                            {/* AddEbook */}
                            <AddEBook 
                                ebookId={editingEbookId} 
                                onSuccess={handleEditSuccess} 
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}