'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineInformationCircle } from "react-icons/hi";

const cards = [
  {
    title: 'ULTIMATE TRAVEL PARTNER',
    body:
      'Discover India’s most beautiful spiritual and adventurous spots — at prices that keep your wallet and your soul happy.',
    img: '/Temple_pilgrimage_story_d24e29fe.png',
  },
  {
    title: 'Divya Drishti',
    body:
      'Experience divine darshan from anywhere through immersive VR technology. Visit holy temples and pilgrimage sites virtually — no crowds, no travel stress, just pure spiritual connection at your convenience.',
    img: '/images/VR/VRicon.png',
  },
  {
    title: 'SAARTHI – YOUR TRAVEL GUIDE',
    body:
      'Our Saarthi supports you at every step — from planning and bookings to on-ground assistance and guidance. Whether virtual or physical journeys, Saarthi ensures a smooth, guided, and worry-free experience.',
    img: '/images/US/saarthi.png',
  },
  {
    title: 'BEST TRAVEL EXPERIENCES',
    body:
      'Because we offer truly hassle-free travel — from booking to blessings, we manage everything so you can focus on your journey.',
    img: '/River_trek_tour_card_8373a280.png',
  },
  {
    title: 'EASY BOOKING',
    body:
      'Book your trip with ease — and leave the planning to us with detailed, day-wise itineraries tailored for comfort and devotion.',
    img: '/images/US/easybooking.png',
  },
  
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // IntersectionObserver to trigger animations when the section is visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-white py-20 ">
      <div className="max-w-6xl mx-auto px-6 text-center ">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Why Should You Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 place-items-center md:place-items-stretch  ">
          {cards.map((c, i) => (
            <article
              key={c.title}
              // when `visible` becomes true we add the animation class,
              // each card has inline animationDelay for the stagger
                className={`card-panel transform opacity-0 translate-y-6  rounded-2xl p-5 w-full   ${visible ? 'animate-slideUpFade' : ''
                }`}
              style={{ animationDelay: `${i * 400}ms` }} // stagger: 0ms,200ms,400ms
            >
              <div className="flex justify-center mb-6">
                <div className="w-[110px] h-[110px]  rounded-full border border-rose-300 flex items-center justify-center">
                  <Image src={c.img} alt={c.title} width={64} height={74} className='rounded-full w-[110px] h-[110px] object-cover' />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-amber-500 mb-4 px-2">
                {c.title}
              </h3>

              <p className="text-gray-700 leading-relaxed max-w-md mx-auto md:max-w-none md:px-5">
                {c.body}
              </p>
            </article>
          ))}
        </div>
        

      </div>

      {/* Scoped CSS for the animation */}
      <style jsx>{`
        @keyframes slideUpFade {
          0% {
            transform: translateY(18px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        :global(.animate-slideUpFade) {
          animation-name: slideUpFade;
          animation-duration: 600ms;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* respects reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          :global(.animate-slideUpFade) {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* small card styling (so it looks like your screenshot) */
        .card-panel {
          padding-top: 6px;
        }
      `}</style>
    </section>
  );
}
