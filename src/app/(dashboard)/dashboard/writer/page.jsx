"use client";
import { Users, BookOpen, CircleDollarSign, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock Data
const revenueData = [
  { name: 'Jan', total: 450 }, { name: 'Feb', total: 600 },
  { name: 'Mar', total: 550 }, { name: 'Apr', total: 850 },
  { name: 'May', total: 720 }, { name: 'Jun', total: 1245 },
];

const bookSalesData = [
  { name: 'MERN Stack Dev', value: 450 }, 
  { name: 'Advanced React', value: 300 },
  { name: 'JS Mastery', value: 250 }, 
  { name: 'Tailwind UI', value: 150 },
];

const COLORS = ['#d97706', '#b45309', '#f59e0b', '#fbbf24']; // Amber shades

export default function AuthorsDesk() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-serif text-amber-950 mb-1">Author&apos;s Desk</h1>
        <p className="text-sm text-amber-900/60">Welcome back. Here is a summary of your publishing performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Ebooks", value: "08", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50/80 border-blue-100" },
          { title: "Total Readers", value: "342", icon: Users, color: "text-purple-600", bg: "bg-purple-50/80 border-purple-100" },
          { title: "Total Revenue", value: "$1,245", icon: CircleDollarSign, color: "text-amber-600", bg: "bg-amber-50/80 border-amber-100" },
          { title: "Monthly Growth", value: "+18%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50/80 border-emerald-100" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
            <div className={`w-14 h-14 rounded-2xl border ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
              <stat.icon size={26} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-amber-900/50 uppercase font-bold tracking-wider">{stat.title}</p>
              <h3 className="text-2xl font-serif font-bold text-amber-950 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-serif text-amber-950">Revenue Overview</h3>
              <p className="text-xs text-amber-900/60 mt-1">Your earnings over the last 6 months</p>
            </div>
            <select className="px-3 py-1.5 bg-amber-50/50 border border-amber-900/10 rounded-lg text-xs font-medium text-amber-950 focus:outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fef3c7" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78350f', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#78350f', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{stroke: '#fcd34d', strokeWidth: 2}} 
                  contentStyle={{borderRadius: '12px', border: '1px solid rgba(120, 53, 15, 0.1)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff'}} 
                />
                <Area type="monotone" dataKey="total" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Book Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-serif text-amber-950">Top Selling Ebooks</h3>
            <p className="text-xs text-amber-900/60 mt-1">Revenue distribution by title</p>
          </div>
          
          <div className="flex-1 min-h-[200px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bookSalesData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value">
                  {bookSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: '1px solid rgba(120, 53, 15, 0.1)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff'}}
                  itemStyle={{color: '#451a03', fontWeight: 500}} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 space-y-3">
            {bookSalesData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-amber-950 font-medium">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  {item.name}
                </div>
                <span className="text-amber-900/60 font-medium">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}