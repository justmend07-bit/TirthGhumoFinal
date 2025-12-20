"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  MessageCircle,
  AlertTriangle,
  Home,
} from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  const [whatsappClicked, setWhatsappClicked] = useState(false);
  const [canReturn, setCanReturn] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const [showModal, setShowModal] = useState(false);

  const whatsappGroupLink =
    "https://chat.whatsapp.com/your-group-invite-link";

  /* ---------------- Countdown ---------------- */

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanReturn(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ---------------- Handlers ---------------- */

  const handleWhatsappClick = () => {
    setWhatsappClicked(true);
    window.open(whatsappGroupLink, "_blank");
  };

  const handleReturnHome = () => {
    if (!whatsappClicked) {
      setShowModal(true);
    } else {
      router.push("/");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold mb-2">
              Payment Submitted Successfully
            </h1>

            <p className="text-gray-600">
              Your payment details have been received and are under
              verification.
            </p>
          </div>

          {/* What happens next */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
            <p className="font-semibold mb-2">
              What happens next?
            </p>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• Our team will verify your payment</li>
              <li>• Admin approval is required</li>
              <li>• You’ll receive a confirmation email once approved</li>
            </ul>
          </div>
        </div>

        {/* WhatsApp Section */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl p-8 text-white mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle />
            Important
          </h2>

          <p className="mb-6 text-green-50">
            Join the WhatsApp group to receive trip updates, pickup
            details and coordination messages.
          </p>

          <button
            onClick={handleWhatsappClick}
            className="w-full bg-white text-green-600 py-4 rounded-full font-bold mb-4 flex justify-center gap-2"
          >
            <MessageCircle />
            Join WhatsApp Group
          </button>

          {whatsappClicked && (
            <div className="bg-green-700 bg-opacity-40 rounded-lg p-4 text-sm">
              If the link didn’t open, you can tap the button again.
            </div>
          )}
        </div>

        {/* Return Home */}
        <button
          onClick={handleReturnHome}
          disabled={!canReturn}
          className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-full font-bold disabled:opacity-50 flex justify-center gap-2"
        >
          <Home />
          {!canReturn
            ? `Return to Home (${countdown}s)`
            : "Return to Home"}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-xl font-bold mb-4">
              Haven’t joined the WhatsApp group?
            </h3>

            <p className="text-gray-600 mb-6">
              You may miss important updates if you don’t join.
            </p>

            <button
              onClick={() => {
                setShowModal(false);
                handleWhatsappClick();
              }}
              className="w-full bg-green-600 text-white py-3 rounded-full mb-3"
            >
              Join WhatsApp Group
            </button>

            <button
              onClick={() => {
                setShowModal(false);
                router.push("/");
              }}
              className="w-full bg-gray-200 py-3 rounded-full"
            >
              I’ll join later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
