"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Mail, Home, Sparkles, Calendar, Users } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
    const [showConfetti, setShowConfetti] = useState(true);
    const [userName, setUserName] = useState("");
    const router = useRouter();

    useEffect(() => {
        // ✅ Allow only if redirected from payment page
        const paymentSuccess = localStorage.getItem('ManaliPaymentSuccess');

        if (!paymentSuccess) {
            // 🚫 Redirect user if they directly access the success page
            router.replace('/');
            return;
        }

        // ✅ Remove session flag when user leaves or closes tab
        const cleanup = () => localStorage.removeItem('ManaliPaymentSuccess');
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

    useEffect(() => {
        // Get user name from localStorage if available
        const savedData = sessionStorage.getItem('manaliRegistration');
        if (savedData) {
            const data = JSON.parse(savedData);
            setUserName(data.full_name || "Traveler");
        }

        // Hide confetti after animation
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleGoHome = () => {

        // Redirect to home page
        window.location.href = "/";
    };

    const whatsappGroupLink = "https://chat.whatsapp.com/GkEOdJU24mOKYPVycLxbmg";

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div> */}

            {/* Confetti Effect */}
            {/* {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Sparkles className={`w-${3 + Math.floor(Math.random() * 3)} h-${3 + Math.floor(Math.random() * 3)} text-${['orange', 'green', 'blue', 'yellow'][Math.floor(Math.random() * 4)]}-400`} />
            </div>
          ))}
        </div>
      )} */}

            {/* Header */}
            {/* <nav className="bg-white/80 backdrop-blur-sm shadow-sm relative z-10">
                <div className="container mx-auto px-6 py-4 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <Mountain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-lg text-gray-900">Tirth Ghumo</div>
                            <div className="text-xs text-gray-500">Aastha Bhi, Suvidha Bhi</div>
                        </div>
                    </div>
                </div>
            </nav> */}



            {/* Success Content */}
            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Success Icon */}
                    <div className="text-center mb-8 animate-fadeIn">
                        <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl mb-6 animate-scaleIn">
                            <CheckCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                            Registration Successful!
                        </h1>

                        {userName && (
                            <p className="text-xl text-gray-700 mb-2">
                                Congratulations, <span className="font-bold text-orange-500">{userName}</span>!
                            </p>
                        )}

                        <p className="text-lg text-gray-600">
                            You have successfully registered for
                        </p>
                        <p className="text-2xl font-bold text-orange-500 mt-2">
                            Manali Trip 2026
                        </p>
                        <p className="text-lg font-semibold text-gray-700 mt-3">
                            📅 23rd Feb - 28th Feb 2026
                        </p>

                        {/* Email Confirmation Notice */}
                        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-base font-semibold text-blue-900 mb-1">
                                        📧 Check Your Email
                                    </p>
                                    <p className="text-sm text-blue-800">
                                        After verification of your partial payment, you will receive a booking confirmation email within 24 hours.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Group Notice */}
                        <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-base font-semibold text-green-900 mb-2">
                                        💬 Join Our WhatsApp Group
                                    </p>
                                    <p className="text-sm text-green-800 mb-3">
                                        Don't forget to join the WhatsApp group below! All further information about the trip will be provided there only.
                                    </p>
                                    <a
                                        href={whatsappGroupLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Join WhatsApp Group
                                    </a>
                                </div>
                            </div>
                        </div>



                        

                        

                        {/* Payment & Booking Confirmation */}
                        {/* <div className="mt-8 text-center animate-fadeIn" style={{ animationDelay: '0.8s' }}>
                            <div className="inline-block bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl px-6 sm:px-10 py-6 border-2 border-green-200">
                                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                                <p className="text-green-700 font-bold text-lg mb-2">
                                    ✅ Partial Payment Received
                                </p>
                                <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xl">
                                    Your seat has been successfully booked! You have paid the partial payment to secure your spot on this incredible journey.
                                </p>
                            </div>
                        </div> */}
                    </div>

                    {/* Information Cards */}
                    {/* Information Cards */}
                    <div className="space-y-6 mb-8">

                        {/* Remaining Payment Alert */}
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-3xl p-4 sm:p-6 animate-slideUp shadow-lg" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-start space-x-3 sm:space-x-4">

                                <div className="flex-1">
                                    <h3 className="text-lg sm:text-xl font-bold text-yellow-900 mb-3 flex items-center justify-center gap-5">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 sm:w-14 sm:h-14 bg-yellow-400 rounded-2xl flex items-center justify-center">
                                                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-900" />
                                            </div>
                                        </div>
                                        <span className="text-lg">Important Payment Reminder</span>
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                                            <p className="text-sm sm:text-base text-gray-800 font-semibold mb-2">
                                                📌 Remaining Payment Deadline
                                            </p>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                The <span className="font-bold text-orange-600">remaining payment</span> must be completed <span className="font-bold text-orange-600">15 days before the trip starts.</span>
                                            </p>
                                        </div>
                                        <div className="bg-yellow-100 rounded-xl p-4">
                                            <p className="text-xs sm:text-sm text-yellow-900 font-medium">
                                                💡 <strong>Note:</strong> You will receive payment reminders via WhatsApp and Email.
                                            </p>
                                        </div>
                                        <div className="text-sm text-gray-700">
                                            <p>📞 For payment assistance: <strong className="text-orange-600">+91 6260499299</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        

                        
                        

                        {/* WhatsApp Group Card */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-xl py-4 px-4 text-white animate-slideUp" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-start space-x-4">

                                <div className="flex-1">

                                    <h3 className="text-lg sm:text-2xl font-bold mb-3 flex items-center gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm  ">
                                                <FaWhatsapp className="w-7 h-7 text-white" />
                                            </div>
                                        </div>
                                        Join Our WhatsApp Group
                                        
                                    </h3>
                                    <p className="text-green-50 leading-relaxed mb-4">
                                        <strong>Important:</strong> All future trip details, updates, meeting points, and important announcements will be shared exclusively in our WhatsApp group. Please join immediately to stay connected with your fellow travelers!
                                    </p>

                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-4">
                                        <p className="text-xs sm:text-sm font-bold text-white space-y-1">
                                            <span className="block">✅ Trip updates & reminders</span>
                                            <span className="block">✅ Payment deadline notifications</span>
                                            <span className="block">✅ Meet your co-travelers</span>
                                            <span className="block">✅ Last-minute changes & instructions</span>
                                            <span className="block">✅ Photos & memories sharing</span>
                                        </p>
                                    </div>

                                    <a
                                        href={whatsappGroupLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full bg-white text-green-600 px-6 py-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <FaWhatsapp className="w-6 h-6 mr-3" />
                                        Join WhatsApp Group Now
                                    </a>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Thank You Message */}
                        <div className="mt-12 mb-5 text-center animate-fadeIn" style={{ animationDelay: '1s' }}>
                            <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-6">
                                <Users className="w-12 h-12 text-orange-500 mx-auto mb-3" />
                                <p className="text-gray-700 font-semibold text-lg">
                                    Thank you for choosing Tirth Ghumo!
                                </p>
                                <p className="text-gray-600 text-sm mt-2">
                                    We're excited to have you on this amazing journey!
                                </p>
                            </div>
                        </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-slideUp" style={{ animationDelay: '0.8s' }}>
                        <button
                            onClick={handleGoHome}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                        >
                            <Home className="w-6 h-6 mr-3" />
                            Go Back to Home
                        </button>
                    </div>


                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.5) rotate(-180deg);
          }
          to { 
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
        </div>
    );
}