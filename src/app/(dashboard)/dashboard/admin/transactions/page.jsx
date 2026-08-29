"use client";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const mockTransactions = [
    { id: "TRX-89234", type: "purchase", email: "user@example.com", amount: "+ $15.00", date: "Oct 24, 2024" },
    { id: "TRX-89235", type: "publishing_fee", email: "writer@example.com", amount: "+ $5.00", date: "Oct 23, 2024" },
    { id: "TRX-89236", type: "withdrawal", email: "writer2@example.com", amount: "- $50.00", date: "Oct 22, 2024" },
];

export default function Transactions() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-serif text-amber-950">Transactions</h1>
                <p className="text-sm text-amber-900/60">Monitor all financial activities on the platform.</p>
            </div>

            <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-amber-50/50 border-b border-amber-900/10 text-amber-950/70 text-sm">
                                <th className="p-4 font-medium">Transaction ID</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">Email</th>
                                <th className="p-4 font-medium">Amount</th>
                                <th className="p-4 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-amber-900/5">
                            {mockTransactions.map((trx, index) => (
                                <tr key={index} className="hover:bg-amber-50/30 transition-colors">
                                    <td className="p-4 font-mono text-sm text-amber-950/80">{trx.id}</td>
                                    <td className="p-4">
                                        <span className="capitalize text-sm font-medium text-amber-900/70 flex items-center gap-1.5">
                                            {trx.type === 'withdrawal' ? <ArrowUpRight size={14} className="text-red-500" /> : <ArrowDownLeft size={14} className="text-green-500" />}
                                            {trx.type.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-amber-900/70">{trx.email}</td>
                                    <td className={`p-4 font-semibold text-sm ${trx.amount.includes('-') ? 'text-red-600' : 'text-green-600'}`}>
                                        {trx.amount}
                                    </td>
                                    <td className="p-4 text-sm text-amber-900/60">{trx.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}