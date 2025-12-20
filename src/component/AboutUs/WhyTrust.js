import { StaggerContainer, StaggerItem, FadeIn } from './AnimatedSection';
import { Star, Shield, Users, Heart, Sparkles, Headphones, Package } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';

const trustPoints = [
  {
    icon: Users,
    text: '1,800+ Successful Yatris',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Heart,
    text: 'Personalized Sarthi Assistance',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Shield,
    text: 'Elder-Friendly Itineraries',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Sparkles,
    text: 'Safe, Hygienic & Comfortable Travel',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Star,
    text: 'Devotion-Centric Planning',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: FaRupeeSign,
    text: 'Transparent Pricing',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Headphones,
    text: '24×7 On-Trip Support',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Package,
    text: 'One-Stop for All Pilgrimage Services',
    gradient: 'from-orange-500 to-amber-500'
  }
];

const TrustSection = () => {
  return (
    <section className="py-20 md:py-15 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why People Trust Tirth Ghumo
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point, index) => (
              <StaggerItem key={index}>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-orange-100">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${point.gradient} rounded-xl mb-4`}>
                    <point.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-gray-800 font-semibold leading-snug">
                    {point.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <FadeIn delay={0.8}>
          <div className="mt-16 bg-gradient-to-br from-orange-300 via-amber-500 to-yellow-500 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tirth Ghumo = Devotion + Comfort + Care
            </h3>
            <div className="w-24 h-1 bg-white mx-auto rounded-full mb-6 opacity-70"></div>
            <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              A pilgrimage experience where we take care of everything — and you take care of your faith.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default TrustSection;
