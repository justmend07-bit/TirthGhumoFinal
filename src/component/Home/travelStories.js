'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    title: 'Char Dham Yatra',
    subtitle: '[ AN UNFORGETTABLE SPIRITUAL JOURNEY ]',
    body:
      "“TirthGhumo made what could’ve been a hectic yatra feel like a serene, well-guided pilgrimage. The way they handled our travel, accommodations, and even weather updates was impressive. I felt safe, cared for, and spiritually fulfilled.” — Anil & Sunita Sharma",
    img: '/images/Travel_Stories/chardham-yatra.webp',
  },
  {
    title: 'Haridwar-Rishikesh',
    subtitle: '[ SOUL- CLEANSING EXPERIENCE ]',
    body:
      '“I was looking for a solo spiritual retreat, and this trip helped me reconnect with myself. Booking was easy, and the support was constant throughout.” — Meera Singh',
    img: '/images/Travel_Stories/Rishikesh-Haridwar.jpg',
  },
  {
    title: 'Pachmarhi Trip',
    subtitle: "[ NATURE'S SPIRITUAL HIDEAWAY ]",
    body:
      '“TirthGhumo’s Panchmarhi package was the perfect mix of serenity and sightseeing. The stay was cozy, food was homely, and the itinerary felt curated just for us.” — Vikram & Anjali',
    img: '/images/Travel_Stories/Panchmarhi.webp',
  },
];

export default function TripCards() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
    <section ref={ref} className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Read Our Travel Story
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {cards.map((c, i) => {
            // choose class per position: left(0) = left, center(1) = up, right(2) = right
            const animClass =
              i === 0 ? 'animate-leftFade' : i === 1 ? 'animate-upFade' : 'animate-rightFade';

            return (
              <article
                key={c.title}
                className={`relative h-full rounded-lg overflow-hidden bg-gray-400/90 text-white shadow-md transform opacity-0 ${visible ? animClass : ''
                  }`}
                style={{ animationDelay: `${i * 330}ms` }} // stagger: 0ms,220ms,440ms
              >
                <div className="relative w-full h-40 md:h-44">
                  <Image src={c.img} alt={c.title} fill style={{ objectFit: 'cover' }} />
                </div>

                <div className="p-8 md:p-5">
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">{c.title}</h3>
                  <div className="text-xs tracking-wider text-amber-300 mb-4">{c.subtitle}</div>
                  <p className="text-sm md:text-base text-gray-100/90 leading-relaxed mb-6">{c.body}</p>
                  {/* <div className="flex justify-center ">
                    <button className="bg-amber-500 px-5 py-3 rounded-full text-white shadow-lg">
                      Read More
                    </button>
                  </div> */}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        /* LEFT: fades in + slides from left */
        @keyframes leftFade {
          0% {
            transform: translateX(-36px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* UP: fades in + slides up */
        @keyframes upFade {
          0% {
            transform: translateY(36px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* RIGHT: fades in + slides from right */
        @keyframes rightFade {
          0% {
            transform: translateX(36px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        :global(.animate-leftFade) {
          animation-name: leftFade;
          animation-duration: 700ms;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        :global(.animate-upFade) {
          animation-name: upFade;
          animation-duration: 700ms;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }
        :global(.animate-rightFade) {
          animation-name: rightFade;
          animation-duration: 700ms;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.2, 0.9, 0.25, 1);
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          :global(.animate-leftFade),
          :global(.animate-upFade),
          :global(.animate-rightFade) {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* small visual niceties */
        article {
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
