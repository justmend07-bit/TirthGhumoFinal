'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const sample = {
  left: [
    {
      text: "Everything went so smoothly with Tirth Ghumo It truly felt less like a trip with a company and more like a journey with friends. The comfort, care, and vibe made the whole experience unforgettable",
      name: "Mr.Adarsh",
      avatar: "/images/testimonials/1.jpg",
      stars: 5,
    },
    {
      text: "Tirthghumo provided a hassle-free and enjoyable trip experience. Everything was well-managed and on time.",
      name: "Ms. Shruti",
      avatar: "/images/testimonials/5.jpg",
      stars: 5,
    },
  ],
  center: [
    {
      text:
        "Thanks to Tirthghumo, my pilgrimage was peaceful and well-organized. The arrangements were perfect for senior citizens.",
      name: "Mr.Mithleswar singh",
      avatar: "/images/testimonials/4.jpg",
      stars: 4,
      highlight: true,
    },
    {
      text:
        "Tirthghumo made our Somnath and Dwarka journey very smooth and comfortable. Excellent planning and caring service throughout.",
      name: "Mrs. Girija Singh",
      avatar: "/images/testimonials/2.jpg",
      stars: 5,
    },
  ],
  right: [
    {
      text: "Our first trip after marriage couldn’t have been more perfect! Pachmarhi’s scenic beauty, the adventures, and Tirth Ghumo’s well-planned itinerary made everything smooth and stress-free. A big thanks to the team for adding a friendly, homely vibe that made our journey even more special.",
      name: "Mr.Sagar & Mrs. Komal",
      avatar: "/images/testimonials/6.jpg",
      stars: 5,
    },
  ],
};

function Stars({ count = 5, size = 14, muted = false }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < count ? (muted ? "#f6ad55" : "#f59e0b") : "none"} stroke={i < count ? (muted ? "#f6ad55" : "#f59e0b") : "#e5e7eb"} strokeWidth="1.2">
          <path d="M12 .587l3.668 7.431L23.4 9.75l-5.6 5.46L19.335 24 12 19.897 4.665 24 6.2 15.21 0.6 9.75l7.732-1.732L12 .587z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id='testimonials' className="w-full bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#24123a] mb-8 sm:mb-10 md:mb-12 px-4">
          Why People Love Us?
        </h2>

        {/* Mobile View - Single Column */}
        <div className="md:hidden space-y-6">
          {/* All testimonials in single column for mobile */}
          {sample.left.map((t, i) => (
            <blockquote
              key={`left-${i}`}
              className={`relative bg-white hover:shadow-lg rounded-2xl shadow-[0_10px_30px_rgba(2,6,23,0.06)] p-5 sm:p-6 text-gray-500 text-sm opacity-0 transform translate-y-6 ${visible ? 'animate-fadeUp' : ''}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <p className="italic leading-relaxed">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100 flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} width={40} height={40} style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                  <div className="mt-1"><Stars count={t.stars} size={12} muted /></div>
                </div>
              </div>
            </blockquote>
          ))}

          {sample.center.map((t, i) => (
            <div
              key={`center-${i}`}
              className={`relative opacity-0 transform translate-y-6 ${visible ? 'animate-fadeUp' : ''}`}
              style={{ animationDelay: `${(sample.left.length + i) * 100}ms` }}
            >
              {t.highlight ? (
                <div className="bg-white p-5 sm:p-6 hover:shadow-lg rounded-2xl shadow-[0_20px_40px_rgba(2,6,23,0.08)]">
                  <p className="text-gray-700 italic leading-relaxed text-sm">"{t.text}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-gray-100 flex-shrink-0">
                      <Image src={t.avatar} alt={t.name} width={44} height={44} style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{t.name}</div>
                      <div className="mt-1"><Stars count={t.stars} size={13} /></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#FFAB00] text-white p-5 sm:p-6 hover:shadow-lg rounded-2xl shadow-[0_20px_40px_rgba(2,6,23,0.08)]">
                  <p className="leading-relaxed text-sm">"{t.text}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white bg-gray-300 flex-shrink-0">
                      <Image src={t.avatar} alt={t.name} width={44} height={44} style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="mt-1"><Stars count={t.stars} size={13} /></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {sample.right.map((t, i) => (
            <blockquote
              key={`right-${i}`}
              className={`relative bg-white hover:shadow-lg rounded-2xl shadow-[0_10px_30px_rgba(2,6,23,0.06)] p-5 sm:p-6 text-gray-500 text-sm opacity-0 transform translate-y-6 ${visible ? 'animate-fadeUp' : ''}`}
              style={{ animationDelay: `${(sample.left.length + sample.center.length + i) * 100}ms` }}
            >
              <p className="italic leading-relaxed">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-100 flex-shrink-0">
                  <Image src={t.avatar} alt={t.name} width={40} height={40} style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                  <div className="mt-1"><Stars count={t.stars} size={12} muted /></div>
                </div>
              </div>
            </blockquote>
          ))}
        </div>

        {/* Tablet & Desktop View - Three Columns */}
        <div className="hidden md:flex flex-row gap-6 lg:gap-8 justify-center items-start">
          {/* LEFT */}
          <div className="space-y-6 lg:space-y-8 w-full md:max-w-[280px] lg:max-w-[320px]">
            {sample.left.map((t, i) => (
              <blockquote
                key={i}
                className={`relative bg-white hover:shadow-lg rounded-2xl shadow-[0_10px_30px_rgba(2,6,23,0.06)] p-5 lg:p-6 text-gray-500 text-sm lg:text-base opacity-0 transform translate-y-6 ${visible ? 'animate-fadeUp' : ''}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <p className="italic leading-relaxed">"{t.text}"</p>
                <div className="mt-5 lg:mt-6 flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white flex-shrink-0">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} style={{ objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                    <div className="mt-1"><Stars count={t.stars} size={12} muted /></div>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>

          {/* CENTER */}
          <div className="space-y-6 lg:space-y-8 w-full md:max-w-[400px] lg:max-w-[560px] flex flex-col items-center">
            {sample.center.map((t, i) => (
              <div
                key={i}
                className={`w-full relative opacity-0 transform translate-y-6 ${visible ? 'animate-fadeUp' : ''}`}
                style={{ animationDelay: `${i * 160}ms` }}
              >
                {t.highlight ? (
                  <div className="bg-white p-6 lg:p-8 hover:shadow-lg rounded-2xl shadow-[0_20px_40px_rgba(2,6,23,0.08)]">
                    <p className="text-gray-700 italic leading-relaxed text-sm lg:text-base">"{t.text}"</p>
                    <div className="mt-5 lg:mt-6 flex items-center gap-3 lg:gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white flex-shrink-0">
                        <Image src={t.avatar} alt={t.name} width={48} height={48} style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{t.name}</div>
                        <div className="mt-1"><Stars count={t.stars} size={14} /></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FFAB00] text-white p-6 lg:p-8 hover:shadow-lg rounded-2xl shadow-[0_20px_40px_rgba(2,6,23,0.08)]">
                    <p className="leading-relaxed text-sm lg:text-base">"{t.text}"</p>
                    <div className="mt-5 lg:mt-6 flex items-center gap-3 lg:gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white bg-gray-300 flex-shrink-0">
                        <Image src={t.avatar} alt={t.name} width={48} height={48} style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="mt-1"><Stars count={t.stars} size={14} /></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="space-y-6 lg:space-y-8 w-full md:max-w-[280px] lg:max-w-[320px]">
            {sample.right.map((t, i) => (
              <blockquote
                key={i}
                className={`relative bg-white hover:shadow-lg rounded-2xl shadow-[0_10px_30px_rgba(2,6,23,0.06)] p-5 lg:p-6 text-gray-500 text-sm lg:text-base opacity-0 transform translate-y-6 ${visible ? 'animate-fadeUp' : ''}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <p className="italic leading-relaxed">"{t.text}"</p>
                <div className="mt-5 lg:mt-6 flex items-center gap-3 lg:gap-4 justify-start">
                  
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white flex-shrink-0">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                    <div className="mt-1"><Stars count={t.stars} size={12} muted /></div>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        :global(.animate-fadeUp) {
          animation-name: fadeUp;
          animation-duration: 700ms;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(.2, .9, .3, 1);
        }
      `}</style>
    </section>
  );
}