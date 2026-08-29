"use client";
import { motion } from 'framer-motion';
import { Star, BookOpen } from 'lucide-react';

const featuredEbooks = [
  { id: 1, title: "The Desert Whisper", author: "Zaid Al-Hussain", price: "$12.99", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Oasis of Thoughts", author: "Amina Rahman", price: "$9.50", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "Sands of Time", author: "Omar Farooq", price: "$14.00", cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop" },
  { id: 4, title: "Mysteries of the Dune", author: "Leila Khalid", price: "$11.20", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Golden Era", author: "Tariq Aziz", price: "$15.99", cover: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=400&auto=format&fit=crop" },
  { id: 6, title: "Lantern's Light", author: "Fatima Noor", price: "$8.99", cover: "https://images.unsplash.com/photo-1571603772166-aecfc7104bf9?q=80&w=400&auto=format&fit=crop" }
];

export default function FeaturedEbooks() {
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

      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {featuredEbooks.map((book) => (
          <motion.div
            key={book.id}
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-white rounded-t-[3rem] rounded-b-xl shadow-lg hover:shadow-2xl transition-all border border-amber-100 overflow-hidden group cursor-pointer"
          >
            <div className="h-72 w-full overflow-hidden relative">
              <div className="absolute inset-0 bg-amber-950/10 group-hover:bg-transparent transition-colors z-10" />
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-serif text-amber-950 mb-1 group-hover:text-amber-700">{book.title}</h3>
              <p className="text-sm text-amber-900/60 mb-3">by {book.author}</p>
              <div className="flex justify-center items-center gap-1 mb-4 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-lg font-bold text-amber-800">{book.price}</span>
                <button className="bg-amber-100 text-amber-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-900 hover:text-white transition-colors">
                  Read Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}