"use client";
const salesData = [
    { title: "Advanced React Patterns", buyer: "John Doe", date: "22 Aug 2026", amount: "$18.00" },
    { title: "MERN Stack Development", buyer: "Jane Smith", date: "18 Aug 2026", amount: "$22.50" },
];

export default function SalesHistory() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif text-amber-950">Sales History</h1>
                <p className="text-sm text-amber-900/60">Track all purchases made by readers for your published books.</p>
            </div>

            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/50 border-b border-amber-900/10 text-amber-950/70 text-sm">
                                <th className="p-4 font-medium">Ebook Title</th>
                                <th className="p-4 font-medium">Buyer Name</th>
                                <th className="p-4 font-medium">Purchase Date</th>
                                <th className="p-4 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-900/5 text-sm">
                            {salesData.map((sale, idx) => (
                                <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                                    <td className="p-4 font-medium text-amber-950">{sale.title}</td>
                                    <td className="p-4 text-amber-900/70">{sale.buyer}</td>
                                    <td className="p-4 text-amber-900/60">{sale.date}</td>
                                    <td className="p-4 text-right font-semibold text-emerald-700">{sale.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}