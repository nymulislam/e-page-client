"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import { authClient } from "@/app/lib/auth-client";

export default function FeaturedEbooks() {
  const [featuredEbooks, setFeaturedEbooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${apiURL}/ebooks`);
        const data = await res.json();
        setFeaturedEbooks(data.slice(0, 6)); 
      } catch (error) {
        console.error("Failed to fetch featured ebooks:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

 
  const handleCardClick = (e, bookId) => {
    e.preventDefault();
    if (!session) {
      router.push("/login"); 
    } else {
      router.push(`/ebooks/${bookId}`); 
    }
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-amber-950 mb-3 flex justify-center items-center gap-2">
          <BookOpen className="text-amber-600" size={32} />
          Featured Ebooks
        </h2>
        <p className="text-amber-900/70 max-w-xl mx-auto">Discover our handpicked collection of masterpieces.</p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4 rounded-full" />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-900"></div>
        </div>
      ) : (
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {featuredEbooks.map((book) => {
            const bookId = book.id || book._id;
            return (
              <div 
                key={bookId} 
                onClick={(e) => handleCardClick(e, bookId)}
                className="block group cursor-pointer"
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-white rounded-t-[3rem] rounded-b-xl shadow-lg hover:shadow-2xl transition-all border border-amber-100 overflow-hidden h-full flex flex-col"
                >
                  <div className="h-72 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-amber-950/10 group-hover:bg-transparent transition-colors z-10" />
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-serif text-amber-950 mb-1 group-hover:text-amber-700 line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-amber-900/60 mb-3">by {book.writer || book.author}</p>
                      <div className="flex justify-center items-center gap-1 mb-4 text-amber-500">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-4 mt-auto">
                      <span className="text-lg font-bold text-amber-800">
                        {typeof book.price === 'number' ? `$${book.price.toFixed(2)}` : book.price}
                      </span>
                      <button className="bg-amber-100 text-amber-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-900 hover:text-white transition-colors">
                        Read Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}