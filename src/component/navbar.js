'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";


/* ---- Move Hook Outside Component ---- */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handler = (e) => setMatches(e.matches);
    media.addEventListener('change', handler);

    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);   // ✅ FIXED
  const isMobile = useMediaQuery('(max-width: 640px)');
  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path
      ? "text-orange-600 font-semibold border-b-2 border-orange-600"
      : "text-gray-700 hover:text-orange-600 transition-colors";

  return (
    <>
      <nav className="w-full h-18 fixed top-0 flex flex-col pr-40 left-0 z-50 font-rubik bg-gradient-to-r from-white/80 via-amber-50/70 to-orange-100/70 backdrop-blur-md shadow-sm border-b border-orange-200">
        <div className="max-w-7xl  md:px-0 flex items-center justify-between h-full mx-auto w-full ">
 
          {/* Logo */}
          <div className="flex items-center space-x-1/2 w-52 ">
            <Image
              src="/logo.png"
              alt="Tirth Ghumo Logo"
              width={60}
              height={60}
              className="rounded-lg transition-transform duration-300 hover:scale-105 mt-5
                   w-52 sm:w-58 md:w-30 lg:w-30 xl:w-55 h-auto object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center w-full items-center ">
            <div className="flex items-center space-x-8 text-gray-700 font-semibold text-sm md:text-base">
              <a href="/" className={linkClass("/")}>
                Home
              </a>
              <a href="/package" className={linkClass("/package")}>
                Tour Packages
              </a>
              <a href="/Contact" className={linkClass("/Contact")}>
                Contact
              </a>

              <a href="/Career" className={linkClass("/Career")}>
                Career
              </a>
              <a href="/AboutUs" className={linkClass("/AboutUs")}>
                About Us
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} className='m-4' />}
          </button>

        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white/90 to-amber-100/80 backdrop-blur-md shadow-md border-t border-orange-200">
            <div className="flex flex-col items-center py-4 space-y-4 text-black font-semibold text-base">

              <a
                href="/"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>

              <a
                href="/package"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Tour Packages
              </a>
              <a
                href="/Contact"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a><a
                href="/Career"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Career
              </a>
              <a
                href="/AboutUs"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </a>

            </div>
          </div>
        )}
      </nav>
    </>
  );
}
