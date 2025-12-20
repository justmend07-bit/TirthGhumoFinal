import { Home, FootprintsIcon, Users, Briefcase, Coffee, Clock, Sparkles, HandHeart } from 'lucide-react';

function HowSarthiSupports() {
  const supports = [
    {
      icon: Home,
      title: 'Door-to-Door Support',
      description: 'Accompanies elders from home to destination and safely back',
    },
    {
      icon: FootprintsIcon,
      title: 'Walking Together',
      description: 'Walks with them at their own comfortable pace',
    },
    {
      icon: Users,
      title: 'Gentle Guidance',
      description: 'Supports them gently in crowded or unfamiliar areas',
    },
    {
      icon: Briefcase,
      title: 'Luggage Assistance',
      description: 'Assists with luggage only when needed',
    },
    {
      icon: Coffee,
      title: 'Comfort First',
      description: 'Ensures comfort during travel with rest breaks',
    },
    {
      icon: Clock,
      title: 'Coordination',
      description: 'Manages timings, seating, and travel coordination',
    },
    {
      icon: Sparkles,
      title: 'Spiritual Support',
      description: 'Helps during darshan or spiritual activities',
    },
    {
      icon: HandHeart,
      title: 'Steady Presence',
      description: 'Provides steady, respectful company throughout',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How a Saarthi Supports Elders
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supports.map((support, index) => {
            const Icon = support.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {support.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {support.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          <p className="text-2xl sm:text-3xl font-semibold text-white leading-relaxed">
            A Saarthi does not take care <span className="italic">for</span> elders — 
            <span className="block mt-2">a Saarthi cares <span className="italic">with</span> them.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowSarthiSupports;
