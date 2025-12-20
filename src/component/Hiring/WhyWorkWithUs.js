import { Code2, Rocket, Lightbulb, Users } from 'lucide-react';
import { useScrollAnimation } from '@/Hooks/useScrollAnimation';

const benefits = [
  {
    icon: Rocket,
    title: 'Fast-Growing Environment',
    description:
      'Join a rapidly expanding tech startup revolutionizing the travel industry with cutting-edge solutions.',
  },
  {
    icon: Code2,
    title: 'Modern Tech Stack',
    description:
      'Build with the latest frameworks and technologies including Next.js, Flutter, and modern cloud infrastructure.',
  },
  {
    icon: Lightbulb,
    title: 'Solve Real Problems',
    description:
      'Work on meaningful challenges that directly impact how millions of travelers plan and experience their journeys.',
  },
  {
    icon: Users,
    title: 'Flexible & Creative Culture',
    description:
      'Enjoy a collaborative environment that values innovation, work-life balance, and creative thinking.',
  },
];

export function WhyWorkWithUs() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-200 to-blue-200" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Why Work{' '}
            <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              With Us?
            </span>
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Experience a workplace where innovation meets impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 ${
                  isVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95'
                }`}
                style={{
                  transitionDelay: `${(index + 2) * 150}ms`,
                }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-orange-600 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
