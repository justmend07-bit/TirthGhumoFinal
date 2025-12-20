'use client';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';
import { ArrowLeftCircle, ArrowRightCircle, Star } from 'lucide-react';

export default function testimonials() {
    const [emblaRefTestimonials, emblaApiTestimonials] = useEmblaCarousel({ loop: false, align: "start" });
    
      
      const scrollPrevTestimonials = useCallback(() => emblaApiTestimonials && emblaApiTestimonials.scrollPrev(), [emblaApiTestimonials]);
      const scrollNextTestimonials = useCallback(() => emblaApiTestimonials && emblaApiTestimonials.scrollNext(), [emblaApiTestimonials]);
    const testimonials = [
        {
          name: "Pahuni",
          text: "The overall experience was genuinely amazing — from the trek itself to the river moments, the maggi , and the whole vibe of the journey. Everything felt fun, smooth, and memorable, and the team made it even better.",
          image: "/reviews/thumbnail1.jpg",
          highlight: false,
          rating: 5,
        },
        {
          name: "Manthan",
          text: "The team was incredibly supportive throughout the trek. Even when the rain made the path slippery and scary, everyone helped each other at every step. The summit point was absolutely stunning — so beautiful that none of us wanted to come back. The whole experience, from the fun to the challenges, felt unforgettable.",
          image: "/reviews/thumbnail3.jpg",
          highlight: false,
          rating: 5,
        },
        {
          name: "Ojaswita",
          text: "The trip turned out to be far more amazing than I expected — truly unexpected in the best way. It was my first trek with friends, and every moment felt unforgettable. The journey was adventurous, full of great vibes, and way better than anything I had imagined. From the views to the overall experience, everything came together perfectly and made it a trip worth remembering.",
          image: "/reviews/thumbnail4.jpg",
          highlight: false,
          rating: 5,
        },
        {
          name: "Arsheet",
          text: "From start to finish, the entire journey was genuinely fun — not for a single moment did it feel dull. The team took us to beautiful spots, kept safety as a top priority, and made sure everyone felt comfortable throughout. The food was surprisingly good, the experience stayed smooth, and the overall vibe made the trip completely worth it. It turned out far better than expected and truly became one of those unforgettable adventures.",
          image: "/reviews/thumbnail5.jpg",
          highlight: false,
          rating: 5,
        },
    
      ];
    return(
        <>
        {/* Testimonials Section */}
        <section className="w-full py-16 px-4 mt-17 md:px-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center relative">
            What our Trekkers say
            <span className="block w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
          </h2>


          <div className="overflow-hidden w-full" ref={emblaRefTestimonials}>
            <div className="flex gap-6 sm:gap-10 md:gap-16 px-2 sm:px-6">
              {testimonials.map((person, index) => (
                <div
                  key={index}
                  className="
            flex-[0_0_95%] sm:flex-[0_0_70%] md:flex-[0_0_30%]
            bg-white rounded-2xl p-6 shadow-md
            hover:scale-105 transition-transform duration-300 my-4
          "
                >

                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-200 shadow-md">
                      <Image
                        src={person.image}
                        alt={person.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-blue-900 text-lg md:text-xl font-bold mt-3">
                      {person.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < person.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>


                  <p className="text-gray-600 text-sm md:text-base font-medium text-center leading-relaxed">
                    “{person.text}”
                  </p>
                </div>
              ))}
            </div>
          </div>



          {/* Testimonial Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={scrollPrevTestimonials}
              className="
        w-10 h-10 sm:w-12 sm:h-12
        rounded-full bg-orange-400 hover:bg-orange-300
        flex items-center justify-center
        transition-transform hover:scale-110
      "
            >
              <ArrowLeftCircle size={24} className="text-white sm:size-30" />
            </button>

            <button
              onClick={scrollNextTestimonials}
              className="
        w-10 h-10 sm:w-12 sm:h-12
        rounded-full bg-orange-400 hover:bg-orange-300
        flex items-center justify-center
        transition-transform hover:scale-110
      "
            >
              <ArrowRightCircle size={24} className="text-white sm:size-30" />
            </button>
          </div>
        </section>
        </>
    );
}