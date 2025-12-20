import { StaggerContainer, StaggerItem, FadeIn } from './AnimatedSection';
import { Users2, Sparkles, Home } from 'lucide-react';

const pillarsData = [
  {
    id: 1,
    icon: Users2,
    title: 'Tirth Yatra for Elders — With Dedicated Sarthi Support',
    description: 'We specialize in thoughtfully curated pilgrimage tours for elders, guided by our unique concept of Sarthi Support.',
    details: [
      'A Sarthi is not just a guide — he is your caregiver, assistant, and companion throughout the journey.',
      'He travels with you, walks with you, arranges your rituals, manages your comfort, and supports you like his own family.',
      'From travel to darshan, from food to accommodation — everything is taken care of. You simply focus on devotion.'
    ],
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    id: 2,
    icon: Sparkles,
    title: 'Youth Travel – Spirituality Meets Adventure',
    description: 'For the young generation, Tirth Ghumo brings a refreshing blend of adventure, exploration, and inner connection.',
    details: [
      'These journeys help today\'s youth reconnect with their roots, experience spirituality, and enjoy meaningful travel.'
    ],
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    id: 3,
    icon: Home,
    title: 'Family Trips – Joy, Bonding & Blessings',
    description: 'We organize family-friendly spiritual vacations designed for comfort, cultural immersion, and shared celebration.',
    details: [],
    gradient: 'from-orange-600 to-red-500'
  }
];

const ThreePillars = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Three Pillars
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <StaggerContainer staggerDelay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillarsData.map((pillar, index) => (
              <StaggerItem key={pillar.id}>
                <div className="bg-white rounded-2xl shadow-xl p-8 h-full hover:shadow-2xl transition-shadow duration-300 border border-orange-100 group">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${pillar.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {pillar.description}
                  </p>

                  {pillar.details.length > 0 && (
                    <ul className="space-y-3">
                      {pillar.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="inline-block w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-600 text-sm leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ThreePillars;
