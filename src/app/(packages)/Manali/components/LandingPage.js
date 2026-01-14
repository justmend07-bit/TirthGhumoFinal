"use client";

import { Mountain, Users, Calendar, MapPin, Hotel, Utensils, Car, Compass, Star, Check, Train } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/component/navbar"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleBookNow = () => {

    router.push("/Manali/register");
  };

  const packages = [
    {
      name: "Golden Package",
      color: "from-amber-500 to-yellow-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
      borderColor: "border-amber-500",
      icon: Star,
      pricing: [
        { persons: "1 Person", price: "₹ 10,499/-", trainClass: "Sleeper" },
        { persons: "2 Person", price: "₹ 10,299/-", trainClass: "Sleeper" },
        { persons: "4 Person", price: "₹ 10,099/-", trainClass: "Sleeper" },
        { persons: "6+ Person", price: "₹ 9,899/-", trainClass: "Sleeper" }
      ],
      features: [
        "Sleeper Class Train (Bhopal ↔ Delhi)",
        "Hotel Stay & Camp stay",
        "Only Breakfast & Dinner Included",
        "A.C. Traveller (Delhi → Manali/Kasol → Delhi)",
        "All Intracity Travel Included"
      ]
    },
    {
      name: "Platinum Package",
      color: "from-slate-600 to-slate-800",
      bgColor: "bg-gradient-to-br from-slate-50 to-gray-50",
      borderColor: "border-slate-600",
      icon: Star,
      featured: true,
      pricing: [
        { persons: "1 Person", price: "₹ 11,999/-", trainClass: "3AC" },
        { persons: "2 Person", price: "₹ 11,799/-", trainClass: "3AC" },
        { persons: "4 Person", price: "₹ 11,599/-", trainClass: "3AC" },
        { persons: "6+ Person", price: "₹ 11,399/-", trainClass: "3AC" }
      ],
      features: [
        "3AC Class Train (Bhopal ↔ Delhi)",
        "Hotel Stay & Camp Stay",
        "Only Breakfast & Dinner Included",
        "A.C. Traveller (Delhi → Manali/Kasol → Delhi)",
        "All Intracity Travel Included"
      ]
    }
  ];

  const features = [
    {
      Icon: Users,
      title: "Saarthi",
      desc: "A verified companion who stays with your group throughout the journey, helping with routes, schedules, and on-ground support—so travel feels easy and safe.",
    },
    {
      Icon: Hotel,
      title: "Stay & Meals",
      desc: "Hotel or camp accommodation with complimentary breakfast and dinner included.",
    },
    {
      Icon: Calendar,
      title: "Travel Ticketing",
      desc: "Train tickets and A.C. traveler arrangements handled as part of the planned itinerary.",
    },
    {
      Icon: Car,
      title: "Transport & Driver",
      desc: "Vehicle charges including tolls, parking, fuel, and driver allowance covered for the journey.",
    },



  ];

  const itinerary = [
    {
      day: 1,
      title: "Bhopal → Delhi → Manali",
      desc: "Departure from Bhopal early morning. Breakfast en route at Bhopal. Reach Delhi by train (Sleeper). Overnight journey from Delhi → Manali by A.C. traveler. Dinner provided.",
    },
    {
      day: 2,
      title: "Manali Local Sightseeing",
      desc: "Reach Manali, check-in at hotel. Afternoon local sightseeing: Hadimba Devi Temple, Clubhouse, Lunch, Vashisht, Vanvihar, Mall Road. Back to hotel, dinner. Overnight stay in Manali.",
    },
    {
      day: 3,
      title: "Solang Valley - Atal Tunnel - Sissu",
      desc: "Wake up fresh, breakfast. Later depart for snow points: Solang Valley, Atal Tunnel, Sissu (if road open), Sissu Waterfall. Dinner. Overnight stay in Manali.",
    },
    {
      day: 4,
      title: "Anjani Mahadev | Kullu | Kasol Camp",
      desc: "Wake up fresh, breakfast & check out. Depart for Kasol via Kullu. Anjani Mahadev, River Rafting (own cost), Vanvihar, Buddhist monastery, Mall road. Reach Kasol, check-in to Riverside Camp, dinner. Enjoy bonfire & DJ night.",
    },
    {
      day: 5,
      title: "Kasol | Manikaran | Return Journey",
      desc: "Wake up fresh, breakfast. Check out from camp. Kasol market, Cholal walk, Manikaran Sahib. Dinner. Depart for Delhi (overnight). Delhi → Bhopal via Train.",
    },
    {
      day: 6,
      title: "Arrival at Bhopal",
      desc: "Reach Delhi in morning. Board train to Bhopal. Arrive back home with wonderful memories of your Manali adventure.",
    },
  ];

  useEffect(() => {
    // Clear any previous registration data when landing page loads
    const clearStorage = () => {
      sessionStorage.removeItem('manaliRegistration');
      localStorage.removeItem('manaliRegistrationStep');
    };

    // Clear on mount
    clearStorage();

    // Also clear if user navigates back to this page
    const handlePageShow = (event) => {
      if (event.persisted) {
        clearStorage();
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);


  const handleDownloadItinerary = async () => {
    try {
      const pdfUrl = "/itinerarypdf/manali-itinerary.pdf"; // Direct path from public folder

      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Manali-Trip-Itinerary.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Unable to download itinerary. Please try again.");
    }
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />


      {/* Hero Section with Mountain Background */}
      <div className="relative h-[420px] sm:h-[480px] md:h-[500px] overflow-hidden mt-18">
        {/* Mountain Background Image Simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800">
          {/* Mountain SVG Pattern */}
          <svg
            className="absolute bottom-0 w-full h-full opacity-30"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <path
              d="M0,400 L0,200 L200,100 L400,180 L600,60 L800,140 L1000,80 L1200,160 L1200,400 Z"
              fill="#334155"
              opacity="0.8"
            />
            <path
              d="M0,400 L0,250 L150,160 L350,220 L550,120 L750,180 L950,140 L1200,200 L1200,400 Z"
              fill="#475569"
              opacity="0.6"
            />
            <path
              d="M0,400 L0,300 L100,240 L300,280 L500,200 L700,240 L900,220 L1200,260 L1200,400 Z"
              fill="#64748b"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-3 md:mb-4 leading-tight px-2">
              Manali Group Trip 2026
            </h1>

            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4">
              Experience the magic of snow-capped peaks, beautiful valleys, and serene
              mountain landscapes on our premium 6-day adventure
            </p>

            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center px-4">
              <button
                onClick={handleBookNow}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full text-sm xs:text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full xs:w-auto"
              >
                Secure Your Spot
              </button>

              <button
                onClick={handleDownloadItinerary}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full text-sm xs:text-base sm:text-lg font-semibold border border-white/40 transition-all duration-300 w-full xs:w-auto"
              >
                Download Itinerary
              </button>
            </div>
          </div>
        </div>


      </div>


      {/* Why Travel With Us Section */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Why Travel With Us?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-2xl hover:bg-gray-50 transition duration-300 opacity-0 animate-fadeUp"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-2xl flex items-center justify-center">
                <feature.Icon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="pricing" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Package Pricing
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Transparent pricing for your Manali adventure. Both packages include comprehensive travel, stay, and meals.
            </p>
            <div className="mt-6 inline-block bg-orange-100 text-orange-700 px-6 py-3 rounded-full text-sm font-semibold">
              🎉 Massive discounts on early & group bookings!
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl ${pkg.featured ? 'ring-4 ring-orange-500 ring-offset-4' : ''
                  }`}
              >
                {/* Featured Badge */}
                {/* {pkg.featured && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold z-10">
                  MOST POPULAR
                </div>
              )} */}

                {/* Package Header */}
                <div className={`bg-gradient-to-br ${pkg.color} text-white p-6 sm:p-8`}>
                  <div className="flex items-center gap-3 mb-3">
                    <pkg.icon className="w-8 h-8" />
                    <h3 className="text-2xl sm:text-3xl font-bold">{pkg.name}</h3>
                  </div>
                  <p className="text-white/90 text-sm">
                    {pkg.pricing[0].trainClass} Class Train • Premium Stay • Full Meals
                  </p>
                </div>

                {/* Package Body */}
                <div className={`${pkg.bgColor} p-6 sm:p-8`}>
                  {/* Pricing Table */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Group Pricing</h4>
                    <div className="space-y-3">
                      {pkg.pricing.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <Users className="w-3 h-3 text-gray-600" />
                            <span className="font-semibold text-sm text-gray-900">{item.persons}</span>
                          </div>
                          <span className="text-lg font-bold text-gray-900">{item.price} </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">What's Included</h4>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Note */}
                  <p className="text-center text-xs text-gray-600 mt-6 pt-6 border-t border-gray-200">
                    Prices per person • All taxes included
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 sm:p-8 border-2 border-orange-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Both Packages Include
              </h4>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                  <Train className="w-6 h-6 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-800">Train Tickets</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                  <Hotel className="w-6 h-6 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-800">Hotel Stay & Camp Stay</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                  <Utensils className="w-6 h-6 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-800">All Meals(Dinner + Breakfast)</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                  <Car className="w-6 h-6 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-800">Local Transport</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div id="itinerary" className="bg-gray-50 py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
            Your 6-Day Journey
          </h2>

          <p className="text-center text-sm sm:text-base text-gray-600 mb-10 sm:mb-12 max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
            A carefully curated itinerary covering the best of Manali.
          </p>

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-orange-300" />

            <div className="space-y-6 sm:space-y-8">
              {itinerary.map((item, idx) => (
                <div
                  key={idx}
                  className="relative pl-12 sm:pl-20 opacity-0 animate-fadeUp"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  {/* Circle Marker */}
                  <div className="absolute left-0 sm:left-4 top-0 w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-white text-[10px] sm:text-xs font-bold">
                      {item.day}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-xl transition">
                    <div className="text-[10px] sm:text-xs text-orange-500 font-semibold mb-1">
                      Day {item.day}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={handleBookNow}
            className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-5 xs:px-3 sm:px-5 py-2 sm:py-3  rounded-full text-sm xs:text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-60 xs:w-auto"
          >
            Secure Your Spot
          </button>
        </div>
      </div>



      {/* Upcoming Batches Section */}
      {/* <div id="batches" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Batches</h2>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Select a date that works for you. All batches are professionally led by our expert team with full health and safety gear.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start"> */}
      {/* Batch List */}
      {/* <div className="space-y-4">
            {batches.map((batch, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-orange-500"
              >
                <div className="flex items-center space-x-4">
                  <Calendar className="w-8 h-8 text-orange-500" />
                  <div>
                    <div className="font-bold text-gray-900">{batch.dates}</div>
                    <div className="text-xs text-gray-500 uppercase">{batch.status}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{batch.price}</div>
                </div>
              </div>
            ))}
          </div> */}

      {/* Testimonial Card */}
      {/* <div className="bg-gradient-to-br from-teal-700 to-teal-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden"> */}
      {/* Mountain silhouettes */}
      {/* <svg className="absolute bottom-0 left-0 right-0 opacity-20" viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M0,200 L0,120 L50,80 L100,110 L150,60 L200,90 L250,70 L300,100 L350,80 L400,110 L400,200 Z" fill="currentColor" />
              <path d="M0,200 L0,140 L60,110 L120,130 L180,100 L240,120 L300,105 L360,125 L400,115 L400,200 Z" fill="currentColor" opacity="0.6" />
            </svg> */}

      {/* People illustration (simplified) */}
      {/* <div className="relative z-10 mb-6">
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="w-10 h-12 bg-orange-400 rounded-full"></div>
                ))}
              </div>
            </div> */}

      {/* <div className="relative z-10">
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm mb-4 leading-relaxed">
                "Amazing trip! The organization was perfect, accommodations were comfortable, and our guide made sure we experienced the best of Manali. Highly recommend Manali Travel!"
              </p>
              <div className="font-semibold">— Happy Traveler</div>
            </div>
          </div> */}
      {/* </div>
      </div> */}

      {/* Footer */}
      {/* <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">Manali Expeditions</span>
              </div>
              <p className="text-sm text-gray-400">
                We are a dedicated travel company committed to providing memorable experiences in the beautiful mountains of Manali and beyond.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Refund Policy</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Contact Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Newsletter</h3>
              <p className="text-sm text-gray-400 mb-4">
                Get updates on new trips and exclusive early-bird discounts.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-full bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-r-full text-sm font-semibold transition">
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2026 Manali Expeditions. All rights reserved.
          </div>
        </div>
      </footer> */}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { 
          animation: fadeUp 0.8s ease-out forwards; 
        }
      `}</style>
    </div>
  );
} 