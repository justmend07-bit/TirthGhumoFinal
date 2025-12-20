import { SlideIn, FadeIn } from './AnimatedSection';
import { Target, Eye } from 'lucide-react';

const MissionVision = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Direction
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SlideIn direction="left" delay={0.2}>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 h-full hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To redefine pilgrimage with dignity, comfort, and modern services while keeping the soul of tradition alive — for elders, youth, and families alike.
              </p>
            </div>
          </SlideIn>

          <SlideIn direction="right" delay={0.4}>
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 h-full hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To become India's most trusted and loved pilgrimage partner, touching millions of lives with seamless travel experiences and heartfelt spiritual support.
              </p>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
