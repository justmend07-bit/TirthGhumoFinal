'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Footer from '@/component/footer';
import { Menu, X } from "lucide-react";

export default function SuccessPage() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
   useEffect(() => {
    // ✅ Allow only if redirected from payment page
    const paymentSuccess = sessionStorage.getItem('paymentSuccess');

    if (!paymentSuccess) {
      // 🚫 Redirect user if they directly access the success page
      router.replace('/');
      return;
    }

    // ✅ Remove session flag when user leaves or closes tab
    const cleanup = () => sessionStorage.removeItem('paymentSuccess');
    window.addEventListener('beforeunload', cleanup);

    // ✅ Prevent back navigation to payment page
    const handlePopState = () => router.replace('/');
    window.addEventListener('popstate', handlePopState);

    // ✅ Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', cleanup);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);



    return (
        <div className="relative min-h-screen flex flex-col gap-8 pt-10 items-center justify-center overflow-hidden">
            {/* Navbar */}
            <nav className="w-full h-16 fixed top-0 left-0 z-50 bg-gradient-to-r from-white/80 via-amber-50/70 to-orange-100/70 backdrop-blur-md shadow-sm border-b border-orange-200">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full relative">

                    {/* Logo (Always visible) */}
                    <div className="flex items-center space-x-3">
                        <Image
                            src="/logo.png"
                            alt="Tirth Ghumo Logo"
                            width={160}
                            height={60}
                            className="rounded-xl hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Centered Navigation Links (Hidden on mobile) */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex items-center space-x-8 text-gray-700 font-semibold text-sm md:text-base">
                            <a href="https://tirthghumo.in/" className="hover:text-orange-600 transition-colors">
                                Home
                            </a>
                            <a href="#register" className="hover:text-orange-600 transition-colors">
                                Register
                            </a>
                            
                        </div>
                    </div>

                    {/* Hamburger Button (Visible on mobile) */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-700 focus:outline-none"
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-gradient-to-b from-white/90 to-amber-100/80 backdrop-blur-md shadow-md border-t border-orange-200">
                        <div className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-semibold text-base">
                            <a
                                href="https://tirthghumo.in/"
                                className="hover:text-orange-600 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </a>
                            <a
                                href="#register"
                                className="hover:text-orange-600 transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                Register
                            </a>
                            
                        </div>
                    </div>
                )}
            </nav>
            <Image
                src="/trek/1Day (2).jpg"
                alt="Mountain background"
                fill
                priority
                className="object-cover object-center -z-10"
            />


            <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl p-10 max-w-md w-full text-center mx-4 mt-10 ">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-green-500 p-4 rounded-full shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-black "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2 ">
                    Registration Successful!
                </h1>
                <p className="text-gray-600 mb-6 font-serif">
                    Our team will contact you shortly to confirm your trek details. Get ready
                    for an adventure of a lifetime!
                </p>

                <hr className="border-gray-500 font-bold mb-4" />

                

                    <div className='bg-green-50 rounded-lg flex flex-col justify-between p-8 mb-4 gap-3'>
                        <h2 className='text-black text-lg '>Join the conversation!</h2>
                        <p className="text-green-500 text-sm font-serif"> Connect with the fellow trekkers and get live updates.</p>
                        <a href="https://chat.whatsapp.com/JNJWMOENHvuAP8BJidrxaM?mode=wwt" className="bg-green-400 hover:bg-green-500 rounded-sm p-3  flex justify-around items-center text-sm hover:cursor-pointer"><FaWhatsapp className="text-3xl mx-2" />Click to join 1Day Trek Whatsapp Group</a>
                    </div>
                

                <hr className="border-gray-500 font-bold mb-4" />


                <p className="text-green-700 text-sm  mb-4 font-medium">
                    Follow Our Adventures
                </p>

                <div className="flex justify-center gap-6 mb-6">
                    <a
                        href="https://www.facebook.com/people/TirthGhumo/61574751792264/#" target="_blank"
                        className="bg-gray-300 hover:bg-gray-200 p-3 rounded-full transition"
                    >
                        <FaFacebook className="text-2xl " />
                    </a>
                    <a
                        href="https://www.instagram.com/tirthghumo?igsh=MW02ejMyMnRxeXBpNQ==" target="_blank"
                        className="bg-gray-300 hover:bg-gray-200 p-3 rounded-full transition"
                    >
                        <FaInstagram className="text-2xl " />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/tirthghumo/" target="_blank"
                        className="bg-gray-300 hover:bg-gray-200 p-3 rounded-full transition"
                    >
                        <FaLinkedin className="text-2xl " />
                    </a>
                </div>

                <button
                    onClick={() => router.push('/')}
                    className="bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                    Back to Homepage
                </button>
            </div>
            <Footer />
        </div>
    );
}


