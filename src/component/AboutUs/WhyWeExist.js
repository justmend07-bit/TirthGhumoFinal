import { FadeIn } from './AnimatedSection';
import { Heart } from 'lucide-react';

const WhyWeExist = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full mb-6">
              <Heart className="w-8 h-8 text-orange-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why We Exist
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-lg">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              In the rush of modern life, the sacred joy of pilgrimage often gets lost in the stress of planning, coordination, local arrangements, food management, and safe travel — especially for elders.
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              <span className="font-semibold text-orange-500">Tirth Ghumo was created to bring devotion, dignity, and comfort back into every Tirth Yatra.</span>
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Whether you are an elderly devotee, a spiritual seeker, a family, or the new-age youth looking for a balance of spirituality and adventure — <span className="font-semibold text-orange-500">your journey begins here with us.</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default WhyWeExist;
