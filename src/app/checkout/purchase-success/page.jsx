"use client";
import { useEffect, useState, startTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { authClient } from '@/app/lib/auth-client';

export default function PurchaseSuccess() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');
    const ebookId = searchParams.get('ebook_id');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: session } = authClient.useSession();
    const userEmail = session?.user.email || '';

    useEffect(() => {
        if (!sessionId || !ebookId) {
            startTransition(() => {
                setError('Missing payment information');
                setLoading(false);
            });
            return;
        }

        if (!userEmail) {
            startTransition(() => {
                setError('User not logged in. Please login again.');
                setLoading(false);
            });
            return;
        }


        let isMounted = true;

        const verifyPayment = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/verify-payment?session_id=${sessionId}&ebook_id=${ebookId}&user_email=${userEmail}`
                );

                // ✅ res.ok চেক করুন – ৪০০/৫০০ হ্যান্ডেল করুন
                if (!res.ok) {
                    const errorText = await res.text();
                    console.error('Verification error:', errorText);
                    throw new Error('Payment verification failed');
                }


                const data = await res.json();

                if (!isMounted) return;

                if (data.success) {
                    startTransition(() => {
                        setLoading(false);
                    });
                } else {
                    startTransition(() => {
                        setError(data.error || 'Payment verification failed');
                        setLoading(false);
                    });
                }
            } catch (err) {
                if (!isMounted) return;
                startTransition(() => {
                    setError('Failed to verify payment');
                    setLoading(false);
                });
            }
        };

        verifyPayment();

        return () => {
            isMounted = false;
        };
    }, [sessionId, ebookId, userEmail]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto mb-4" />
                    <p className="text-amber-900/60">Verifying your payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-10 max-w-md text-center shadow-xl border border-red-100">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-amber-950 mb-2">Payment Verification Failed</h1>
                    <p className="text-amber-900/60 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-amber-950 text-white px-8 py-3 rounded-xl hover:bg-amber-900 transition"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-10 max-w-md text-center shadow-xl border border-amber-100">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={40} />
                </div>
                <h1 className="text-2xl font-bold font-serif text-amber-950 mb-2">Payment Successful! 🎉</h1>
                <p className="text-amber-900/60 mb-6">
                    You now have access to your ebook. Check your dashboard to read it.
                </p>
                <button
                    onClick={() => router.push('/dashboard/reader/my-ebooks')}
                    className="bg-amber-950 text-white px-8 py-3 rounded-xl hover:bg-amber-900 transition"
                >
                    Go to My Ebooks
                </button>
            </div>
        </div>
    );
}