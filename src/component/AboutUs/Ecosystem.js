import { StaggerContainer, StaggerItem, FadeIn } from './AnimatedSection';
import { CheckCircle2, Globe } from 'lucide-react';

const services = [
  'Hiring personal Sarthi for elderly or outstation travel',
  'Tailored itineraries for all age groups',
  'Full-service tours including food, accommodation & transport',
  'Safety-first planning with daily assistance',
  'Booking personalized pujas and rituals',
  'Arranging Chadhava & temple offerings',

  'Providing puja items, essentials, and spiritual merchandise',
  'Group planned trips'
  
  
];

const Ecosystem = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-6">
              <Globe className="w-8 h-8 text-orange-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              More Than a Travel Company
            </h2>
            <p className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4">
              A Complete Pilgrimage Ecosystem
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-4xl mx-auto">
            Tirth Ghumo provides every service related to your pilgrimage needs, including:
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-4 bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-800 font-medium">{service}</span>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <FadeIn delay={0.6}>
          <div className="bg-gradient-to-br from-orange-400 to-amber-400 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <p className="text-white text-xl md:text-2xl font-semibold mb-4">
              No stress. No confusion. No last-minute running.
            </p>
            <p className="text-white text-lg md:text-xl">
              Just a peaceful, comfortable, spiritually fulfilling experience.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Ecosystem;
