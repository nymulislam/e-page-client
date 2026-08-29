"use client";
import { CheckCircle2 } from "lucide-react";

const transactions = [
    { id: "TXN-9821", title: "JavaScript Mastery", writer: "Programming Hero", price: "$24.00", date: "20 Aug 2026", status: "Completed" },
    { id: "TXN-8712", title: "Advanced React & Next.js", writer: "Naimul Islam", price: "$18.50", date: "15 Jul 2026", status: "Completed" },
];

export default function PurchaseHistory() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif text-amber-950">Purchase History</h1>
                <p className="text-sm text-amber-900/60">Review your past financial transactions and invoice records.</p>
            </div>

            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/50 border-b border-amber-900/10 text-amber-950/70 text-sm">
                                <th className="p-4 font-medium">Ebook Name</th>
                                <th className="p-4 font-medium">Writer</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Purchase Date</th>
                                <th className="p-4 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-900/5 text-sm">
                            {transactions.map((tx, idx) => (
                                <tr key={idx} className="hover:bg-amber-50/30 transition-colors">
                                    <td className="p-4 font-medium text-amber-950">{tx.title}</td>
                                    <td className="p-4 text-amber-900/70">{tx.writer}</td>
                                    <td className="p-4 font-semibold text-amber-900">{tx.price}</td>
                                    <td className="p-4 text-amber-900/60">{tx.date}</td>
                                    <td className="p-4 text-right">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                                            <CheckCircle2 size={12} /> {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}