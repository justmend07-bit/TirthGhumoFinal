'use client';

import Video from '@/ui/video';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroParallax() {

    return (
        <section
            className="w-full h-[550px] mt-10 bg-fixed bg-center bg-cover bg-[url('/images/ParallexHero.jpg')] "
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center ">

                <div className="md:col-span-7 py-10 md:py-30 flex flex-col items-start ">
                    <p className="text-amber-400 mb-4">
                        Together We Can Make Awesome Memories
                    </p>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg leading-tight ">
                        Are You Ready To <br /> Join Us On Your Next <br /> Tirth?
                    </h1>

                    <Link href="/package" className="mt-8 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg shadow-md ">
                        Explore More
                    </Link>
                </div>

                <Video />
            </div>
        </section>

    );
}
