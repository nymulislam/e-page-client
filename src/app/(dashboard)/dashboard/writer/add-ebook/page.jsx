"use client";
import { useState } from "react";
import { Upload, PlusCircle, Image as ImageIcon, X } from "lucide-react";

const categories = [
    "Technology",
    "Literature",
    "History",
    "Science",
    "Poetry",
    "Islamic",
    "Mystery"
];

export default function AddEditEbook() {
    const [previewImage, setPreviewImage] = useState(null);

    // ডামি ইমেজ প্রিভিউ হ্যান্ডলার (ImgBB-তে আপলোডের আগে ইউজারকে দেখানোর জন্য)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-serif text-amber-950 tracking-tight">Publish New Ebook</h1>
                <p className="text-sm text-amber-900/60 mt-1">Fill out the details below to add a new masterclass to the platform.</p>
            </div>

            <form className="bg-white rounded-3xl border border-amber-900/10 shadow-sm p-6 md:p-10 space-y-8">
                
                {/* Title & Cover Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-amber-950">Book Title</label>
                            <input 
                                type="text" 
                                placeholder="e.g., The Architecture of Modern Web Apps" 
                                className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-amber-900/15 rounded-xl text-sm text-amber-950 placeholder:text-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10 transition-all" 
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-amber-950">Price ($)</label>
                                <input 
                                    type="number" 
                                    placeholder="24.00" 
                                    className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-amber-900/15 rounded-xl text-sm text-amber-950 placeholder:text-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10 transition-all" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-amber-950">Genre / Category</label>
                                <select className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-amber-900/15 rounded-xl text-sm text-amber-950 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10 transition-all appearance-none cursor-pointer">
                                    <option value="" disabled selected>Select a genre</option>
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Image Upload Area */}
                    <div className="space-y-2 lg:col-span-1">
                        <label className="text-sm font-semibold text-amber-950">Cover Image</label>
                        <div className="relative h-[220px] w-full border-2 border-dashed border-amber-900/20 rounded-2xl bg-[#FDFBF7] hover:bg-amber-50/50 hover:border-amber-900/40 transition-all flex flex-col items-center justify-center overflow-hidden group">
                            {previewImage ? (
                                <>
                                    <img src={previewImage} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button type="button" onClick={() => setPreviewImage(null)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg">
                                            <X size={18} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-4 text-center">
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-amber-700">
                                        <ImageIcon size={24} />
                                    </div>
                                    <p className="text-sm text-amber-900/70 font-medium">Upload Cover</p>
                                    <p className="text-xs text-amber-900/40 mt-1 mt-1">ImgBB URL or File (Max 2MB)</p>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-2 border-t border-amber-900/5 pt-8">
                    <label className="text-sm font-semibold text-amber-950">Full Description & Content</label>
                    <textarea 
                        rows={8} 
                        placeholder="Write a compelling description for your book to attract readers..." 
                        className="w-full px-4 py-4 bg-[#FDFBF7] border border-amber-900/15 rounded-xl text-sm text-amber-950 placeholder:text-amber-900/30 focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-600/10 transition-all resize-y leading-relaxed"
                    ></textarea>
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="w-full md:w-auto px-10 flex items-center justify-center gap-2 py-3.5 bg-amber-900 text-white rounded-xl text-sm font-semibold hover:bg-amber-950 hover:shadow-lg hover:shadow-amber-900/20 active:scale-[0.98] transition-all">
                        <PlusCircle size={18} /> Publish Ebook
                    </button>
                </div>
            </form>
        </div>
    );
}