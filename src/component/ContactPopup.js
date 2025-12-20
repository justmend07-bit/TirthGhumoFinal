"use client";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa";

export default function ContactPopup({ open, onClose }) {
  if (!open) return null;

  const phone = "6260499299";
  const email = "assistance.tirthghumo@gmail.com";
  const message = encodeURIComponent(
    "Hi! I want to know more about Tirth Ghumo"
  );

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-end sm:items-center justify-center">
      {/* Modal */}
      <div
  className={`
    bg-white w-full sm:max-w-md
    rounded-t-2xl sm:rounded-2xl
    p-6 shadow-xl
    animate-[fadeInUp_0.3s_ease-out]
  `}
>

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Contact Us
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Contact Options */}
        <div className="space-y-4">
          {/* Call */}
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <FaPhoneAlt className="text-blue-600 text-lg" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Call Us</p>
              <p className="text-sm text-gray-700">{phone}</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${phone}?text=${message}`}
            target="_blank"
            className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <FaWhatsapp className="text-green-600 text-lg" />
            </div>
            <div>
              <p className="font-medium text-gray-900">WhatsApp</p>
              <p className="text-sm text-gray-700">Chat with us instantly</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50"
          >
            <div className="bg-orange-100 p-3 rounded-full">
              <FaEnvelope className="text-orange-600 text-lg" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-700">{email}</p>
            </div>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 mt-6">
          <a href="https://www.instagram.com/tirthghumo?igsh=MW02ejMyMnRxeXBpNQ==" target="_blank" aria-label="Instagram">
            <FaInstagram className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-lg text-3xl" />
          </a>
          <a href="https://www.facebook.com/people/TirthGhumo/61574751792264/# " target="_blank" aria-label="Facebook" className="bg-blue-600 rounded-2xl w-8 h-8 text-center p-1" >
            <FaFacebookF className="text-white text-2xl " />
          </a>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
