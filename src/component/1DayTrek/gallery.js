'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

export default function Gallery() {
    const [emblaRefGallery, emblaApiGallery] = useEmblaCarousel({ loop: false, align: "start" });
    const scrollPrevGallery = useCallback(() => emblaApiGallery && emblaApiGallery.scrollPrev(), [emblaApiGallery]);
      const scrollNextGallery = useCallback(() => emblaApiGallery && emblaApiGallery.scrollNext(), [emblaApiGallery]);
    const gallery = [
        {
          src: "/trek/beginning.jpg",
          title: "Ready to Roll",
          desc: "Energy high, spirits higher — the TG trip begins!",
        },
        {
          src: "/trek/bhojpur.jpg",
          title: "Bhojpur",
          desc: "A historical site with ancient temple.",
        },
          {
          src: "/trek/new.JPG",
          title: "Temple Triumph",
          desc: "Gathered beneath the ancient temple’s grandeur — a reminder that every journey is sacred when shared together.",
        },
         {
          src: "/trek/The_group.jpg",
          title: "Trek Group Stop",
          desc: "Midway rest with fun, laughter, and shared moments among trekkers.",
        },
        {
          src: "/trek/TheAscent1.jpg",
          title: "The Ascent",
          desc: "A challenging climb with rewarding views.",
        },
        {
          src: "/trek/summit2.jpg",
          title: "The heights",
          desc: "Finding peace in the heights we once only dreamed of reaching.",
        },
        {
          src: "/trek/summit.jpg",
          title: "Summit Success",
          desc: "Celebrating the achievement together.",
        },
        {
          src: "/trek/Scene1.jpg",
          title: "Freedom Peak",
          desc: "The signature pose — you know the rule!!",
        },
        {
          src: "/trek/peak2.jpg",
          title: "Peak Serenity",
          desc: "At the edge of the summit, where the climb meets calm — finding peace in the heights we once only dreamed of reaching.",
        },
        {
          src: "/trek/Scene2.jpg",
          title: "Bhojpur Blessings",
          desc: "Spiritual calm meets adventure — only with Tirth Ghumo at Bhojpur.",
        },
        {
          src: "/trek/riverside.jpg",
          title: "Riverside",
          desc: "Discover the local nature.",
        },
      ];
      // Scroll sideways
        useEffect(() => {
          if (!emblaApiGallery) return;
      
          const node = emblaApiGallery.containerNode();
      
          const handleWheel = (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
              e.preventDefault();
              e.deltaX > 0 ? emblaApiGallery.scrollNext() : emblaApiGallery.scrollPrev();
            }
          };
      
          node.addEventListener("wheel", handleWheel, { passive: false });
      
          return () => node.removeEventListener("wheel", handleWheel);
        }, [emblaApiGallery]);

      return (
        <>
        {/* Glimpses from the Trail */}
                <div className="max-w-6xl mx-auto px-4 py-16">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center relative">
                    Glimpses from the Trail
                    <span className="block w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
                  </h2>
        
        
                  <div className="overflow-hidden" ref={emblaRefGallery}>
                    <div className="flex gap-6">
                      {gallery.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex-[0_0_80%] md:flex-[0_0_25%] rounded-2xl overflow-hidden shadow-xl bg-white m-5"
                        >
                          <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="p-4">
                            <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
        
                  {/* Gallery Controls */}
                  <div className="flex justify-center mt-6 gap-4">
                    <button
                      onClick={scrollPrevGallery}
                      className="w-12 h-12 bg-orange-400 rounded-full hover:bg-orange-300 flex items-center justify-center"
                    >
                      <ArrowLeftCircle size={30} className="text-white" />
                    </button>
                    <button
                      onClick={scrollNextGallery}
                      className="w-12 h-12 bg-orange-400 rounded-full hover:bg-orange-300 flex items-center justify-center"
                    >
                      <ArrowRightCircle size={30} className="text-white" />
                    </button>
                  </div>
                </div>
        </>
      );
}