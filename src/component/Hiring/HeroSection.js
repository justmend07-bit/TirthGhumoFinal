import { Plane } from 'lucide-react';
import { useScrollAnimation } from '@/Hooks/useScrollAnimation';

export function HeroSection({ onApplyClick }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-blue-100 rounded-full mb-6">
              <Plane className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">
                We're Hiring
              </span>
            </div>
          </div>

          <h1
            className={`text-6xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 bg-clip-text text-transparent">
              Join Our Team
            </span>
            <br />
            <span className="text-gray-900">of Innovators</span>
          </h1>

          <p
            className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Build the future of travel technology with a team that values
            creativity, innovation, and making a real impact in how people
            explore the world.
          </p>

          <button
            onClick={onApplyClick}
            className={`group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 transition-all duration-1000 delay-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Apply Now
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>

          <div
            className={`mt-16 transition-all duration-1000 delay-800 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative w-full max-w-3xl mx-auto h-64 bg-gradient-to-br from-orange-100 to-blue-100 rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full animate-pulse opacity-20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Plane className="w-24 h-24 text-orange-600 transform rotate-45 animate-bounce" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
