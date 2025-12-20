'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 640px)');
    function useMediaQuery(query) {
        const [matches, setMatches] = useState(false)

        useEffect(() => {
            if (typeof window === 'undefined') return
            const media = window.matchMedia(query)
            setMatches(media.matches)
            const handler = (e) => setMatches(e.matches)
            media.addEventListener('change', handler)
            return () => media.removeEventListener('change', handler)
        }, [query])

        return matches
    }

    const pathname = usePathname();
    const linkClass = (path) =>
    pathname === path
      ? "text-orange-600 font-semibold border-b-2 border-orange-600"
      : "text-white hover:text-orange-600 transition-colors";


    return (
        <>
            {/* NAVBAR */}
            <nav className="mx-auto flex items-center justify-between relative font-rubik z-40 h-20 px-6 pt-10 md:px-8 ">
                {/* Logo (fixed-height container so nav doesn't grow) */}
                <div className="flex items-center h-full">
                    <div className=" w-auto pt-4 flex items-center">
                        <Image
                            src="/logo1.png"
                            alt="logo"
                            width={240}
                            height={240}
                            className="h-full  object-contain"
                        />
                    </div>
                </div>

                {/* Desktop menu */}
                {!isMobile && (
                    <div className="hidden md:flex items-center gap-8 pb-5">
                        <ul className="flex gap-8 items-center text-lg font-rubik text-white font-semibold">
                            <a href='/' className="text-amber-500 underline" > Home </a>
                            <a href='/package' className={linkClass('/package')} > Tour Packages</a>
                            <a href='/Contact' className={linkClass('/package')}>Contact</a>
                            <a href='/Career' className={linkClass('/package')}>Career</a>
                            <a href='/AboutUs' className={linkClass('/package')}>About Us</a>
                        </ul>
                    </div>
                )}

                {/* Right side: desktop button or mobile hamburger */}
                <div className="flex items-center">
                    {!isMobile ? (
                        <>
                           {/* Login button */}

                        </>

                    ) : (
                        /* Mobile hamburger */
                        <button
                            aria-label="Open menu"
                            onClick={() => setDrawerOpen(true)}
                            className="p-2 rounded-md bg-white/10 cursor-pointer"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile Drawer (simple accessible overlay) */}
            {isMobile && drawerOpen && (
                <div className="fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
                    <aside className="absolute right-0 top-0 w-64 h-full bg-white/5 backdrop-blur p-6">
                        <button aria-label="Close menu" onClick={() => setDrawerOpen(false)} className="mb-6">
                            Close
                        </button>

                        <nav>
                            <ul className="flex flex-col gap-4  text-xl">
                                <a href='/'> Home </a>
                                <a href='/package'> Tour Packages</a>
                                <a href='/Contact'>Contact</a>
                                <a href='/Career'>Career</a>
                                <a href='/AboutUs'>About Us</a>
                            </ul>

                            {/* <div className="mt-6">
                                <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full w-full cursor-pointer">
                                    Login
                                </button>
                            </div> */}
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
}