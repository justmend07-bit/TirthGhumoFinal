"use client";
import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaInstagram, FaFacebookF } from "react-icons/fa";
import { Ellipsis, ChevronDown, X } from "lucide-react";
import { usePathname } from "next/navigation";
import ContactPopup from "@/component/ContactPopup";


function getPageName(pathname) {
  if (pathname === "/") return "Tirth Ghumo";
  if (pathname.startsWith("/package")) return "Tour Packages";
  if (pathname === "/AboutUs") return "What Tirth Ghumo is About";
  if (pathname === "/Career") return "New Career Opportunities in Tirth Ghumo";
  if (pathname === "/Contact") return "Tirth Ghumo";
  return "your website";
}

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // Select the right message based on current page
  const pageName = getPageName(pathname);

  const message = `Hi! I want to know more about ${pageName}`;

  const encoded = encodeURIComponent(message);

  const phone = "916260499299";

  const [showContact, setShowContact] = useState(false);


  const actions = [
    {
      icon: <FaWhatsapp />,
      href: `https://wa.me/${phone}?text=${message}`,
      bg: "bg-green-500 hover:bg-green-600",
      label: "WhatsApp",
    },
    {
      icon: <FaPhoneAlt />,
      type: "contact", // 👈 special type
      bg: "bg-blue-600 hover:bg-blue-700",
      label: "Contact",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com/",
      bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-2xl hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700",
      label: "Instagram",
    },
    {
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/people/TirthGhumo/61574751792264/#",
      bg: "bg-blue-600 hover:bg-blue-700",
      label: "Facebook",
    },
  ];

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-3">

        <button
                key={actions[1].label}
                aria-label={actions[1].label}
                onClick={() => {
                  setShowContact(true);
                  setIsOpen(false);
                }}
                className={`
                ${actions[1].bg} text-white
                w-12 h-12 rounded-full
                flex items-center justify-center
                shadow-lg transition-all duration-300
                ${isOpen
                    ? "opacity-0 translate-y-0 scale-100 pointer-events-none"
                    : "opacity-100 translate-y-55 scale-100 "}
              `}
                style={{
                  transitionDelay: isOpen ? `${60}ms` : "0ms",
                }}
              >
                <span className="text-xl">{actions[1].icon}</span>
              </button>

        {/* Action Buttons */}
        <div className="flex flex-col items-center space-y-3">
          {actions.map((action, index) => {
            const isContact = action.type === "contact";

            return isContact ? (
              <button
                key={action.label}
                aria-label={action.label}
                onClick={() => {
                  setShowContact(true);
                  setIsOpen(false);
                }}
                className={`
                ${action.bg} text-white
                w-12 h-12 rounded-full
                flex items-center justify-center
                shadow-lg transition-all duration-300
                ${isOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-6 scale-75 pointer-events-none"}
              `}
                style={{
                  transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                }}
              >
                <span className="text-xl">{action.icon}</span>
              </button>
            ) : (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                aria-label={action.label}
                className={`
                ${action.bg} text-white
                w-12 h-12 rounded-full
                flex items-center justify-center
                shadow-lg transition-all duration-300
                ${isOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-6 scale-75 pointer-events-none"}
              `}
                style={{
                  transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                }}
              >
                <span className="text-xl">{action.icon}</span>
              </a>
            );
          })}
        </div>


        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
    relative
    bg-orange-600 hover:bg-orange-700
    text-white w-12 h-12 rounded-full
    shadow-xl
    flex items-center justify-center
    transition-colors duration-300
  "
        >

          <Ellipsis
            className={`
      absolute w-6 h-6
      transition-all duration-300 ease-in-out
      ${isOpen
                ? "opacity-0 scale-75 rotate-45"
                : "opacity-100 scale-100 rotate-0"}
    `}
          />


          <X
            className={`
      absolute w-6 h-6
      transition-all duration-300 ease-in-out
      ${isOpen
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-75 -rotate-45"}
    `}
          />
        </button>
      </div>


      <ContactPopup
        open={showContact}
        onClose={() => setShowContact(false)}
      />
    </>
  );

}
