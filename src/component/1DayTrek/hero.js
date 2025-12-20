import { HiOutlineInformationCircle } from "react-icons/hi";
import Image from "next/image";
export default function Hero() {

    return (
        <>
            {/* Hero Section */}
            <div className="relative h-[400px] rounded-3xl mx-4 mt-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                <Image
                    src="/trek/hero.jpg"
                    alt="Mountain landscape at sunrise"
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover 2xl:object-[center_-500px]"
                    priority
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <h1 className="text-5xl font-bold mb-3">1 Day Mrigannath Trek</h1>
                    <p className="text-3xl font-bold mb-6">Bhojpur/Bhudni</p>
                    <p className="text-lg mb-6">December 7, 2025 | Join the Adventure</p>
                    <a
                        href="#register"
                        className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                    >
                        Register Now
                    </a>
                </div>
            </div>
            {/* Notice */}
        <div className="w-full bg-white border border-yellow-300 rounded-xl px-4 py-3 md:px-6 md:py-4 flex flex-col md:flex-row items-start md:items-center gap-3 mt-5">

          {/* Icon */}
          <HiOutlineInformationCircle className="text-yellow-600 text-2xl md:text-3xl mt-0.5 shrink-0" />

          {/* Text */}
          <div className="text-left leading-snug md:leading-normal">
            <p className="text-yellow-900 font-semibold text-sm md:text-base">
              <b>Registrations for the November 23rd trek are now closed.</b>
            </p>

            <p className="text-yellow-800 text-xs md:text-sm mt-1">
              <span className="font-semibold">We're excited to see you on our next adventure on</span>
              &nbsp;<b>7th December (Registrations are open)</b>!
            </p>
          </div>
        </div>
        </>
    );
}