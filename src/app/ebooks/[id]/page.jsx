"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
    ShoppingBag, Bookmark, CheckCircle2, ArrowLeft, 
    Calendar, Tag, User, BookOpen, AlertCircle 
} from "lucide-react";

export default function EbookDetailsPage() {
    const params = useParams();
    const router = useRouter();
    
    const [ebook, setEbook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);
    
    // Auth context
    const currentUser = { name: "Naymul Islam", role: "Writer" }; 
    const [hasPurchased, setHasPurchased] = useState(false); 

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchEbookDetails = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${apiURL}/ebooks/${params?.id}`);
                
                if (res.ok) {
                    const data = await res.json();
                    setEbook(data);
                    // checkPurchased API: setHasPurchased(data.purchased)
                } else {
                    setEbook(null);
                }
            } catch (error) {
                console.error("Error fetching ebook details:", error);
                setEbook(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (params?.id) {
            fetchEbookDetails();
        }
    }, [params, apiURL]);

    const handlePurchase = () => {
        // Stripe Checkout Logic
        console.log("Redirecting to Stripe...");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] px-4 md:px-12 py-10">
                <div className="max-w-6xl mx-auto">
                    <div className="h-6 w-24 bg-amber-100 rounded animate-pulse mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        <div className="md:col-span-5 h-[500px] bg-amber-100/50 rounded-3xl animate-pulse border border-amber-100"></div>
                        <div className="md:col-span-7 space-y-6">
                            <div className="h-10 bg-amber-100/70 rounded-lg w-3/4 animate-pulse"></div>
                            <div className="h-6 bg-amber-100/50 rounded w-1/3 animate-pulse"></div>
                            <div className="space-y-3 pt-6">
                                <div className="h-4 bg-amber-100/40 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-amber-100/40 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-amber-100/40 rounded w-5/6 animate-pulse"></div>
                            </div>
                            <div className="h-14 bg-amber-200/50 rounded-xl w-48 animate-pulse mt-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!ebook) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-3xl border border-amber-200 shadow-sm max-w-lg w-full p-10">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5 border border-red-100">
                        <AlertCircle size={32} />
                    </div>
                    <h3 className="text-3xl font-bold font-serif text-amber-950 mb-3">Ebook Not Found</h3>
                    <p className="text-amber-900/60 mb-8">
                        The manuscript you are looking for does not exist or has been removed from our archives.
                    </p>
                    <button 
                        onClick={() => router.back()}
                        className="bg-amber-950 hover:bg-amber-900 text-amber-50 font-medium px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={18} /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    const isOwnEbook = currentUser?.name === ebook.writer;
    const priceDisplay = typeof ebook.price === 'number' ? `$${ebook.price.toFixed(2)}` : ebook.price;

    return (
        <div className="min-h-screen bg-[#FDFBF7] px-4 md:px-12 py-10">
            <div className="max-w-6xl mx-auto">
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-amber-900/60 hover:text-amber-950 font-medium mb-8 transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Library
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    
                    {/* Left Column: Cover Image & Bookmark */}
                    <div className="lg:col-span-5 relative group">
                        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-amber-50 border border-amber-200 shadow-xl shadow-amber-900/10">
                            <Image
                                src={ebook.cover}
                                alt={ebook.title}
                                fill
                                priority
                                className="object-cover"
                            />
                            
                            {ebook.isSold && (
                                <div className="absolute top-4 left-4 z-10 bg-amber-950/90 text-amber-200 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
                                    <CheckCircle2 size={16} className="text-amber-400" /> Highly Purchased
                                </div>
                            )}

                            <button 
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                className={`absolute top-4 right-4 z-10 w-12 h-12 rounded-2xl backdrop-blur-md flex items-center justify-center transition-all shadow-lg ${
                                    isBookmarked 
                                        ? "bg-amber-500 text-white" 
                                        : "bg-white/80 text-amber-950 hover:bg-white"
                                }`}
                            >
                                <Bookmark size={20} className={isBookmarked ? "fill-current" : ""} />
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Ebook Details */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100/60 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
                                <Tag size={12} /> {ebook.genre || ebook.category || 'General'}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold font-serif text-amber-950 leading-tight mb-4">
                            {ebook.title}
                        </h1>

                        <Link 
                            href={`/writers/${(ebook.writer || '').toLowerCase().replace(/\s+/g, '-')}`}
                            className="inline-flex items-center gap-2 text-lg text-amber-700 hover:text-amber-900 font-medium transition-colors mb-8 w-max"
                        >
                            <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-950">
                                <User size={16} />
                            </span>
                            By {ebook.writer}
                        </Link>

                        <div className="grid grid-cols-2 gap-4 mb-8 p-5 bg-white border border-amber-200/80 rounded-2xl shadow-sm">
                            <div>
                                <p className="text-xs text-amber-900/50 uppercase tracking-wider font-semibold mb-1">Published</p>
                                <p className="text-amber-950 font-medium flex items-center gap-2">
                                    <Calendar size={16} className="text-amber-600" />
                                    {formatDate(ebook.uploadDate || ebook.createdAt)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-amber-900/50 uppercase tracking-wider font-semibold mb-1">Access</p>
                                <p className="text-amber-950 font-medium flex items-center gap-2">
                                    <BookOpen size={16} className="text-amber-600" />
                                    Digital PDF
                                </p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-xl font-bold font-serif text-amber-950 mb-3">Synopsis</h3>
                            <p className="text-amber-900/80 leading-relaxed text-lg">
                                {ebook.description || "No description provided."}
                            </p>
                        </div>

                        <div className="pt-8 border-t border-amber-200 flex flex-col sm:flex-row items-center gap-6">
                            <div className="text-4xl font-bold text-amber-950">
                                {priceDisplay}
                            </div>
                            
                            <div className="flex-1 w-full">
                                {isOwnEbook ? (
                                    <button disabled className="w-full bg-amber-100 text-amber-900/50 font-medium py-4 rounded-2xl cursor-not-allowed flex items-center justify-center gap-2 border border-amber-200">
                                        <AlertCircle size={20} /> You are the author
                                    </button>
                                ) : hasPurchased ? (
                                    <button className="w-full bg-amber-900 text-amber-50 font-medium py-4 rounded-2xl flex items-center justify-center gap-2 shadow-md">
                                        <CheckCircle2 size={20} /> Already Purchased (Read Now)
                                    </button>
                                ) : (
                                    <button 
                                        onClick={handlePurchase}
                                        className="w-full bg-amber-950 hover:bg-amber-900 text-amber-50 font-medium py-4 rounded-2xl transition-all shadow-xl hover:shadow-amber-900/20 flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={20} /> Purchase Manuscript
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}