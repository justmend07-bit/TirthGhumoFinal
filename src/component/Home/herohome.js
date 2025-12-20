'use client';
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react';
import { Roboto_Slab } from 'next/font/google'

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: ['300', '400', '500', '700'],
})

import Navbar from '../1DayTrek/navbar'
/* ---------- small hook: useMediaQuery ---------- */
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

/* ---------- HeroCarousel ---------- */
export default function HeroCarousel() {
  const images = [
    '/images/hero1.jpg',
    '/images/hero2.webp',
    '/images/hero3.jpg',
  ]

  const [index, setIndex] = useState(0)
  const [scaling, setScaling] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    function startLoop() {
      setScaling(true)
      setTimeout(() => setScaling(false), 1500)

      intervalRef.current = setInterval(() => {
        setScaling(true)
        setTimeout(() => {
          setIndex(i => (i + 1) % images.length)
          setScaling(false)
        }, 1500)
      }, 5000)
    }

    startLoop()
    return () => clearInterval(intervalRef.current)
  }, [images.length])

  const [cardVisible, setCardVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setCardVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  /* ---------- responsive logic ---------- */
  const isMobile = useMediaQuery('(max-width: 640px)') // mobile breakpoint
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="relative w-full min-h-[720px] font-rubik text-white">
      {/* Background hero image wrapper (fixed-size div, overflow hidden) */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full overflow-hidden">
          <div className={`absolute inset-0 transform origin-center ${scaling ? 'animate-heroScale' : ''}`}>
            <Image
              src={images[index]}
              alt={`Hero ${index}`}
              fill
              className="hero-img"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          <div className="absolute inset-0 bg-black/45" />
        </div>
      </div>

      <Navbar/>

      {/* Mobile Drawer (simple accessible overlay) */}
      {isMobile && drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute right-0 top-0 w-64 h-full bg-white/5 backdrop-blur p-6">
            <button aria-label="Close menu" onClick={() => setDrawerOpen(false)} className="mb-6">
              Close
            </button>

            <nav>
              <ul className="flex flex-col gap-4 text-xl">
                <a href='/'> Home </a> 
                <a href='/package'> Tour Packages</a>
                <a href='/Contact'>Contact</a>
                <a href='/Career'>Career</a>
                <a href='/AboutUs'>About Us</a>

              </ul>

              <div className="mt-6">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full w-full cursor-pointer">
                  Login
                </button>
              </div>
            </nav>
          </aside>
        </div>
      )}

      {/* Big headline (headline-wrapper adjusted responsively) */}
      <div className="max-w-6xl mx-auto px-8 pt-8 md:pt-24 lg:pt-36 relative z-40 headline-wrapper">
        <h1 className="text-6xl md:text-7xl lg:text-9xl leading-tight drop-shadow-md ">TIRTH GHUMO</h1>
        <p className="mt-6 text-2xl md:text-3xl">AASTHA BHI, SUVIDHA BHI.</p>
      </div>

      
      {!isMobile ? (
        <div
          className={`absolute z-50 right-8 lg:right-20 top-[30%] w-64 md:w-72 rounded-2xl shadow-2xl overflow-hidden ${cardVisible ? 'animate-cardSlideFade' : 'opacity-0'}`}
          style={{ perspective: '1000px' }}
        >
          <div className="relative w-full h-[380px] md:h-[420px] ">
            <Image src="/images/VR/vr.png" alt="trek" fill style={{ objectFit: 'cover' }} />
          </div>

          <div className="absolute left-4 top-4 font-sans  font-bold text-2xl leading-tight">
            VR Darshan
            <br />
            
          </div>
        </div>
      ) : (
        /* Mobile stacked card - flows below the headline */
        <div className={`relative max-w-3xl mx-auto mt-8 px-4 ${cardVisible ? 'animate-cardSlideFade' : 'opacity-0'}`}>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative w-full h-[240px]">
              <Image src="/images/VR/vr.png" alt="trek" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 bg-black/30">
              <div className="text-amber-400 font-bold text-2xl">VR Darshan</div>
              {/* <div className="text-white mt-2">STARTING ₹739</div> */}
            </div>
          </div>
        </div>
      )}

      {/* BOOK NOW pill — always at lower-right on desktop; inline on mobile after card */}
      {!isMobile ? (
        <div className={`absolute z-60 right-12 lg:right-35 bottom-12 ${cardVisible ? 'animate-bookFade' : 'opacity-0'}`}>
          <a href='/VR' > 
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 mb-20 cursor-pointer rounded-full shadow-2xl uppercase tracking-wider" >
            Book Now
          </button>
          </a>
        </div>
      ) : (
        <div className={`max-w-3xl mx-auto mt-6 px-4 ${cardVisible ? 'animate-bookFade' : 'opacity-0'}`}>
          <a href='/VR' >
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full shadow-2xl w-full uppercase tracking-wider">
            Book Now
          </button>
          </a>
        </div>
      )}

      {/* Scoped styles for animations & layout tweaks */}
      <style jsx>{`
        :global(.font-serif) { font-family: 'Playfair Display', serif; }

        .headline-wrapper { padding-right: 0; }
        @media (min-width: 1024px) {
          /* reserve space for the desktop floating card */
          .headline-wrapper { padding-right: 20rem; }
        }

        @keyframes heroScale {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        :global(.animate-heroScale) {
          animation: heroScale 1.5s ease-in-out forwards;
        }

        @keyframes cardSlideFade {
          0% { transform: translateX(40px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        :global(.animate-cardSlideFade) {
          animation: cardSlideFade 1.2s cubic-bezier(.2,.9,.3,1) forwards;
        }

        @keyframes bookFade {
          0% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        :global(.animate-bookFade) {
          animation: bookFade 0.9s ease-out forwards;
        }

        /* keep big headline legible on small screens */
        @media (max-width: 640px) {
          :global(.text-9xl) { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  )
}
