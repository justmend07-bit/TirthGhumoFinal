import Navbar from "@/component/navbar"

import {
  Mountain,
  Clock,
  Sparkles,
  MapPin,
  Users,
  Heart,
  Smartphone,
  Home,
  X,
   ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { useState, useRef } from "react";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRefs = useRef({});

  const features = [
    {
      icon: <Home className="w-8 h-8" />,
      title: 'Darshan from Home',
      description: 'Experience sacred places without leaving your home. Access spiritual experiences at your convenience'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Safe & Comfortable Darshan for Seniors',
      description:
        'Ideal for elderly devotees with health concerns or mobility limitations, allowing them to stay spiritually connected without the physical effort of traveling.'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Accessible Darshan for Everyone',
      description:
        'Created for devotees with physical disabilities, offering equal access to sacred temples and holy places through immersive virtual darshan—without barriers.'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Immersive VR Experience',
      description: 'Feel the divine presence through cutting-edge technology'
    },

  ];

  const destinations = [
    {
      name: 'Kedarnath',
      image: '/images/hero3.jpg',
      description: ''
    },
    {
      name: 'Ayodhya Deepotsav',
      image: '/images/VR/Ayodhya.webp',
      description: ''
    },
    {
      name: 'Banke Bihari Temple',
      image: '/images/VR/BankeBihari.webp',
      description: ''
    }
  ];

 const allDestinations = {
    "Jyotirlingas": [
      { name: 'SHRI NAGESHWAR JYOTIRLINGA', image: '/images/VR/Nageshwar.jpg' },
      { name: 'SHRI BHIMASHANKAR', image: '/images/VR/Bhimashankar.jpg' },
      { name: 'OMKARESHWAR', image: '/images/VR/Omkareshwar.jpeg' },
      { name: 'SHRI TRIMBAKESHWAR MANDIR', image: '/images/VR/Trimbakeshwar.jpg' },
      { name: 'SHRI BHOJESHWAR MANDIR', image: '/images/VR/Bhojeshwar.jpg' }
    ],
    "Shakti Peethas/Devi Temples": [
      { name: 'SHRI GADKALIKA MATA', image: '/images/VR/Gadkalika.jpg' },
      { name: 'MAA SHARDA DEVI', image: '/images/VR/Sharda.jpg' },
      { name: 'MAA HARSIDDHI DEVI SHAKTIPEETH', image: '/images/VR/Harsiddhi.jpg' },
      { name: 'MAA BAGLAMUKHI', image: '/images/VR/Baglamukhi.jpg' },
      { name: 'MAHALAXMI KOLHAPUR', image: '/images/VR/Mahalaxmi.jpg' },
      { name: 'AMBAJI TEMPLE', image: '/images/VR/Ambaji.jpg' },
      { name: 'BHADRAKALI SHAKTIPEETH', image: '/images/VR/Bhadrakali.jpg' },
      { name: 'CHAMUNDA DEVI', image: '/images/VR/Chamunda.jpg' },
      { name: 'ANNAPOORNA MATA MANDIR', image: '/images/VR/Annapoorna.jpg' }
    ],
    "Char Dham & Pilgrimage Circuits": [
      { name: 'CHAR DHAM PART-1 (YAMUNOTRI)', image: '/images/VR/Yamunotri.jpg' },
      { name: 'CHAR DHAM PART-2 (GANGOTRI)', image: '/images/VR/Gangotri.jpg' },
      { name: 'CHAR DHAM PART-3 (KEDARNATH)', image: '/images/VR/Kedarnath.jpg' },
      { name: 'CHAR DHAM PART-4 (BADRINATH)', image: '/images/VR/Badrinath.jpg' },
      // { name: 'YAMUNOTRI', image: '/images/VR/Yamunotri.jpg' },
      // { name: 'BADRINATH', image: '/images/VR/Badrinath.jpg' }
    ]
  };

  const scroll = (category, direction) => {
    const container = scrollContainerRefs.current[category];
    if (container) {
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="hero-section relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-800 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Spirituality Meets Technology</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Experience Divine Darshan
              <span className="block text-orange-600 mt-2">Through Virtual Reality</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Explore sacred spiritual destinations in immersive VR — anytime, from anywhere.
            </p>

            <p className="text-base text-gray-500 mb-10 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-orange-500" />
              Free access for devotees aged 60+ & persons with disabilities
            </p>

            <a
              href='/VR/register'
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Register for Virtual Darshan

            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Virtual Darshan?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bringing divine experiences to devotees through the power of immersive technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all duration-300 hover:shadow-xl text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl text-orange-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-600 rounded-xl text-white flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Making Spiritual Experiences Accessible
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  As part of our commitment to inclusive spirituality, we offer complimentary Divya Darshan experiences to devotees who need it most.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    FREE
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Senior Citizens (60+)
                  </h3>
                </div>
                <p className="text-gray-600">
                  Free 1st Divya Darshan access for all devotees aged 60 and above
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    FREE
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Persons with Disabilities
                  </h3>
                </div>
                <p className="text-gray-600">
                  Complimentary 1st Divya Darshan ensuring everyone can experience divine presence
                </p>
              </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                  ₹39
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Darshan Access
                </h3>
              </div>
              <p className="text-gray-600">
                Affordable spiritual experience for all other devotees at just ₹39 per person per darshan
              </p>
            </div>

          </div>

          <div className="flex justify-center mt-8">
            <a
              href="/VR/register"
              className="inline-flex items-center gap-2 bg-orange-600 text-white
               px-6 py-3 rounded-lg text-base font-semibold
               hover:bg-orange-700 
               shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Register for Virtual Darshan
            </a>
          </div>


        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Available Spiritual Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Immerse yourself in the most sacred places of spiritual significance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <div className="p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                    <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MapPin className="w-5 h-5" />
              See All Destinations
            </button>
          </div>
        </div>


        <div className="text-center bg-gradient-to-br from-orange-500 to-amber-400 rounded-3xl p-14 text-white">
          <Smartphone className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Begin Your Virtual Darshan Journey Today
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of devotees experiencing the divine through immersive VR technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-orange-100">
              <Heart className="w-5 h-5" />
              <span className="text-lg">Free for seniors 60+ & persons with disabilities</span>
            </div>
            <div className="hidden sm:block text-orange-100">•</div>
            <div className="flex items-center gap-2 text-orange-100">
              <span className="text-lg">₹39 for general registration</span>
            </div>
          </div>
          <a
            href="/VR/register"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Register & Experience Divya Darshan

          </a>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black/60 bg-opacity-75 transition-opacity -z-10"
              onClick={() => setIsModalOpen(false)}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full ">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-white">
                      All Spiritual Destinations
                    </h3>
                    <p className="text-orange-100 mt-1">
                      Explore our complete collection of sacred places
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 sm:px-6 py-6 sm:py-8 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
                {Object.entries(allDestinations).map(([category, destinations], categoryIndex) => (
                  <div key={categoryIndex} className="mb-10 sm:mb-12 last:mb-0">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 pb-2 border-b-2 border-orange-200 flex-grow">
                        {category}
                      </h4>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => scroll(category, 'left')}
                          className="bg-orange-100 hover:bg-orange-200 rounded-full p-1.5 sm:p-2 transition-colors"
                          aria-label="Scroll left"
                        >
                          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                        </button>
                        <button
                          onClick={() => scroll(category, 'right')}
                          className="bg-orange-100 hover:bg-orange-200 rounded-full p-1.5 sm:p-2 transition-colors"
                          aria-label="Scroll right"
                        >
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div 
                      ref={(el) => scrollContainerRefs.current[category] = el}
                      className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      
                      {destinations.map((destination, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 snap-start w-[200px] sm:w-[220px] md:w-[240px]"
                        >
                          <div className="aspect-[3/4] overflow-hidden">
                            <img
                              src={destination.image}
                              alt={destination.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                            <div className="p-3 sm:p-4 text-white w-full">
                              <h5 className="text-sm sm:text-base md:text-lg font-semibold leading-tight">
                                {destination.name}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  More destinations coming soon...
                </p>
                <a
                  href="/VR/register"
                  className="inline-flex w-30 md:w-38 items-center gap-2 bg-orange-600 text-white px-2 md:px-6 py-2 rounded-lg text-xs md:text-sm  font-semibold hover:bg-orange-700 transition-colors"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LandingPage;