import { ArrowRight, Heart } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          
          <span className="text-sm font-medium text-gray-700">Dignity • Companionship • Trust</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Saarthi — A Companion for
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
            Every Journey
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Giving elders the confidence to travel with safety, comfort, and dignity — with a companion who feels like family
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/Career/Sarthi/Register"
            className="group bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Become a Saarthi
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg">
            Learn More
          </button>
        </div>

        
      </div>
    </section>
  );
}

export default HeroSection;