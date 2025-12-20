import { Sparkles, Heart, Users, Plane, BookOpen, Star } from 'lucide-react';

function WhyBecomeSarthi() {
  const benefits = [
    {
      icon: Heart,
      title: 'Make a Real Difference',
      description: 'Impact lives in meaningful ways',
    },
    {
      icon: Sparkles,
      title: 'Meaningful Spiritual Journeys',
      description: 'Experience sacred places with purpose',
    },
    {
      icon: BookOpen,
      title: 'Learn Empathy & Leadership',
      description: 'Develop skills that last a lifetime',
    },
    {
      icon: Users,
      title: 'Build Human Connections',
      description: 'Form bonds across generations',
    },
    {
      icon: Plane,
      title: 'Travel Opportunities',
      description: 'Explore new destinations',
    },
    {
      icon: Star,
      title: 'Earn Blessings & Gratitude',
      description: 'Experience true appreciation',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why Become a Saarthi?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-orange-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 sm:p-12 text-center border-2 border-orange-200">
          <p className="text-2xl sm:text-3xl text-gray-800 font-semibold leading-relaxed">
            Becoming a Saarthi isn't just a role — 
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              it's an experience that stays with you.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}

export default WhyBecomeSarthi;
