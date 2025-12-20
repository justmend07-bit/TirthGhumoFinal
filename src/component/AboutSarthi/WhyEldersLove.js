import { Shield, Heart, Footprints, Sparkles, Clock, Smile, TrendingUp, Quote } from 'lucide-react';

function WhyEldersLove() {
  const benefits = [
    { icon: Shield, text: 'Feel safe, respected, understood' },
    { icon: Heart, text: 'No stress or worry' },
    { icon: Footprints, text: 'Someone to accompany them during long walks' },
    { icon: Sparkles, text: 'Peaceful darshan' },
    { icon: Clock, text: 'Travel at their own pace' },
    { icon: Smile, text: 'Friendly presence always' },
    { icon: TrendingUp, text: 'Regain confidence in traveling' },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Elders Love Traveling With a Saarthi
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-gray-700 font-medium pt-2 leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-start gap-6">
            <Quote className="w-12 h-12 text-orange-300 flex-shrink-0" />
            <div>
              <p className="text-2xl sm:text-3xl text-gray-800 font-medium italic leading-relaxed">
                A Saarthi feels like a son or daughter traveling with them.
              </p>
              <div className="mt-6 h-1 w-24 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyEldersLove;
