"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Upload,
    CheckCircle,
    AlertCircle,
} from "lucide-react";

export default function PaymentPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [screenshot, setScreenshot] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const bookingId =
        typeof window !== "undefined"
            ? sessionStorage.getItem("bookingId")
            : null;

    

    /* ---------------- Fetch payment info ---------------- */

    useEffect(() => {
        if (!bookingId) {
            router.replace("/");
            return;
        }

        const fetchPaymentInfo = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8000/api/bookings/${bookingId}/payment-info`
                );

                if (!res.ok) throw new Error("Failed to fetch payment info");

                const data = await res.json();
                setPaymentInfo(data);
            } catch (err) {
                alert("Unable to load payment details");
                router.replace("/");
            } finally {
                setLoading(false);
            }
        };

        fetchPaymentInfo();
    }, [bookingId, router]);

    /* ---------------- Submit payment ---------------- */

    const handleSubmit = async () => {
        if (!screenshot) {
            alert("Please upload payment screenshot");
            return;
        }

        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("screenshot", screenshot);

            const res = await fetch(
                `http://localhost:8000/api/bookings/${bookingId}/payment-submitted`,
                {
                    method: "PATCH",
                    body: formData,
                }
            );

            if (!res.ok) throw new Error();

            router.push("/success");
        } catch {
            alert("Failed to submit payment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    /* ---------------- UI ---------------- */

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading payment details…
            </div>
        );
    }

    const { amount, upi_id, upi_link } = paymentInfo;

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        upi_link
    )}`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="hover:bg-orange-700 p-2 rounded-full"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold">Payment</h1>
                        <p className="text-orange-100 text-sm">
                            Complete your booking
                        </p>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Amount */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h3 className="text-xl font-bold mb-2">Total Amount</h3>
                    <p className="text-3xl font-bold text-orange-600">
                        ₹{amount}
                    </p>
                </div>

                {/* UPI */}
                <div className="bg-white rounded-xl shadow p-6 mb-6 text-center">
                    <h3 className="text-xl font-bold mb-4">UPI Payment</h3>

                    <img
                        src={qrCodeUrl}
                        alt="UPI QR"
                        className="w-64 h-64 mx-auto mb-4"
                    />

                    <p className="font-semibold">UPI ID: {upi_id}</p>
                </div>

                {/* Screenshot */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4">
                        Upload Payment Screenshot *
                    </h3>

                    {!screenshot ? (
                        <label className="cursor-pointer block">
                            <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-orange-500">
                                <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                <p className="font-semibold">
                                    Click to upload screenshot
                                </p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                    e.target.files?.[0] &&
                                    setScreenshot(e.target.files[0])
                                }
                            />
                        </label>
                    ) : (
                        <div className="border-2 border-green-300 bg-green-50 rounded-xl p-6 flex gap-4">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                            <div>
                                <p className="font-semibold text-green-900">
                                    Screenshot selected
                                </p>
                                <button
                                    className="text-orange-600 text-sm"
                                    onClick={() => setScreenshot(null)}
                                >
                                    Upload again
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-full font-bold disabled:opacity-50"
                >
                    {submitting ? "Submitting..." : "I Have Paid"}
                </button>

                <div className="flex items-start gap-2 mt-4 text-amber-700">
                    <AlertCircle className="w-5 h-5 mt-0.5" />
                    <p className="text-sm">
                        Payment will be verified by our team.
                        Confirmation will be sent after approval.
                    </p>
                </div>
            </div>
        </div>
    );
}
