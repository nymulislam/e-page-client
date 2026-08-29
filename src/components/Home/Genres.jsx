"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const genres = [
  { name: "Technology", icon: "💻", filter: "technology" },
  { name: "Literature", icon: "📚", filter: "literature" },
  { name: "History", icon: "🏛️", filter: "history" },
  { name: "Science", icon: "🔬", filter: "science" },
   { name: "Sci-Fi", icon: "🌌", filter: "sci-fi" },
  { name: "Poetry", icon: "📜", filter: "poetry" },
  { name: "Islamic", icon: "🌙", filter: "islamic" },
  { name: "Mystery", icon: "🗝️", filter: "mystery" }
];

export default function Genres() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif text-amber-950 mb-2">Explore Genres</h2>
        <p className="text-amber-900/70">Find the perfect story or knowledge for your mood.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {genres.map((genre, index) => (
          <Link key={index} href={`/ebooks?category=${genre.filter}`}>
            <motion.div
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="relative bg-white border border-amber-100 rounded-xl p-6 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-lg hover:border-amber-300 transition-all cursor-pointer group h-36"
            >
              {/* Decorative Accents (Corners) */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{genre.icon}</span>
              <span className="font-serif font-medium text-amber-950 group-hover:text-amber-700">{genre.name}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}