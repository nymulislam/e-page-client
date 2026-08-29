"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, ChevronRight } from 'lucide-react';

const topWriters = [
  { id: 1, name: "Khalid Hosseini", sales: "1.2M+ Sales", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200" },
  { id: 2, name: "Naguib Mahfouz", sales: "950K+ Sales", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
  { id: 3, name: "Elif Shafak", sales: "880K+ Sales", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200" }
];

export default function TopWriters() {
  return (
    <section className="py-20 bg-amber-50/40 border-y border-amber-100/60 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B5A2B 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif text-amber-950 mb-2">Top Writers</h2>
            <p className="text-amber-900/70">Authors who are winning hearts worldwide.</p>
          </div>
          <Link href="/writers" className="hidden sm:flex text-amber-700 hover:text-amber-600 items-center gap-1 font-medium">
            View All <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topWriters.map((writer, index) => (
            <motion.div
              key={writer.id}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 flex flex-col items-center text-center group hover:-translate-y-2 hover:shadow-md transition-all"
            >
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-amber-100 border-t-amber-500 animate-[spin_10s_linear_infinite]" />
                <img src={writer.avatar} alt={writer.name} className="w-full h-full object-cover rounded-full p-1.5" />
              </div>
              <h3 className="text-xl font-serif text-amber-950 mb-1">{writer.name}</h3>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full mt-2">
                <TrendingUp size={14} /> {writer.sales}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}