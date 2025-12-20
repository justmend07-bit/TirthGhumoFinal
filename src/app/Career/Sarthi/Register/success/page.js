"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function SarthiSuccessPage() {
  useEffect(() => {
    // Scroll to top when arriving
    window.scrollTo(0, 0);
  }, []);

  const router = useRouter();

  useEffect(() => {
    // ✅ Allow only if redirected from payment page
    const SarthiRegister = sessionStorage.getItem('saarthi_success');

    if (!SarthiRegister) {
      // 🚫 Redirect user if they directly access the success page
      router.replace('/');
      return;
    }

    // ✅ Remove session flag when user leaves or closes tab
    const cleanup = () => sessionStorage.removeItem('saarthi_success');
    window.addEventListener('beforeunload', cleanup);

    // ✅ Prevent back navigation to payment page
    const handlePopState = () => router.replace('/');
    window.addEventListener('popstate', handlePopState);

    // ✅ Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', cleanup);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-6 py-20">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg w-full text-center border border-orange-200">

        {/* Success Icon */}
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-tick" />

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
          Application Submitted!
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Thank you for applying to become a <span className="font-semibold">Saarthi</span>.
          Our team will review your application and contact you soon.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            href="/Career/Sarthi"
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow transition-all text-center"
          >
            Back to Saarthi Page
          </Link>

          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow-inner transition-all text-center"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <style>
        {`
  @keyframes tick {
    0% {
      transform: scale(0.2) rotate(-20deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.3) rotate(3deg);
      opacity: 1;
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
  .animate-tick {
    animation: tick 0.6s ease-out forwards;
    transform-origin: center;
  }
`}
      </style>

    </div>

  );
}
