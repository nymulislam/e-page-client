"use client";
import { Upload, PlusCircle } from "lucide-react";

export default function AddEditEbook() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-serif text-amber-950">Publish New Ebook</h1>
                <p className="text-sm text-amber-900/60">Fill out the details below to add a new ebook to the platform.</p>
            </div>

            <form className="bg-white rounded-2xl border border-amber-900/10 shadow-sm p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-amber-950">Book Title</label>
                    <input type="text" placeholder="e.g., Master Node.js Architecture" className="w-full px-4 py-3 bg-[#FDFBF7] border border-amber-900/20 rounded-xl text-sm text-amber-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-amber-950">Price ($)</label>
                        <input type="number" placeholder="19.99" className="w-full px-4 py-3 bg-[#FDFBF7] border border-amber-900/20 rounded-xl text-sm text-amber-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-amber-950">Genre / Category</label>
                        <select className="w-full px-4 py-3 bg-[#FDFBF7] border border-amber-900/20 rounded-xl text-sm text-amber-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all">
                            <option value="">Select a genre</option>
                            <option>Programming</option>
                            <option>Web Development</option>
                            <option>UI/UX Design</option>
                            <option>Software Architecture</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-amber-950">Full Description & Content</label>
                    <textarea rows={6} placeholder="Write a compelling description for your book..." className="w-full px-4 py-3 bg-[#FDFBF7] border border-amber-900/20 rounded-xl text-sm text-amber-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all resize-y"></textarea>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-amber-950">Cover Image Upload (imgBB URL or File)</label>
                    <div className="border-2 border-dashed border-amber-900/20 rounded-xl p-8 text-center bg-[#FDFBF7] hover:bg-amber-50/50 hover:border-amber-900/40 transition-all cursor-pointer group">
                        <Upload className="mx-auto text-amber-900/40 mb-3 group-hover:text-amber-900/60 transition-colors" size={28} />
                        <p className="text-sm text-amber-900/70 font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-amber-900/50 mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                </div>

                <div className="pt-4 border-t border-amber-900/10">
                    <button type="submit" className="w-full md:w-auto px-8 flex items-center justify-center gap-2 py-3 bg-amber-900 text-white rounded-xl text-sm font-medium hover:bg-amber-950 transition-colors shadow-sm">
                        <PlusCircle size={18} /> Publish Ebook
                    </button>
                </div>
            </form>
        </div>
    );
}