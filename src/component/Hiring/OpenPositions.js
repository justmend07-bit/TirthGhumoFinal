import { Briefcase } from 'lucide-react';
import { useScrollAnimation } from '@/Hooks/useScrollAnimation';

const positions = [
  {
    title: 'Next.js Developer',
    summary:
      'Build scalable web applications using Next.js, React, and TypeScript for our travel platform.',
  },
  {
    title: 'Flutter Developer',
    summary:
      'Create beautiful cross-platform mobile experiences for travelers worldwide.',
  },
  {
    title: 'Android Developer',
    summary:
      'Develop native Android applications with modern architecture and best practices.',
  },
  {
    title: 'Frontend Developer',
    summary:
      'Craft pixel-perfect, responsive user interfaces with modern JavaScript frameworks.',
  },
  {
    title: 'UI/UX Designer',
    summary:
      'Design intuitive, delightful user experiences that make travel planning effortless.',
  },
  {
    title: 'Business Development Consultant',
    summary:
      'Drive growth through strategic partnerships and innovative business solutions.',
  },
  {
    title: 'Google Ads Manager',
    summary:
      'Optimize and scale our Google Ads campaigns to reach millions of travelers.',
  },
  {
    title: 'Meta Ads Manager',
    summary:
      'Create and manage high-performing campaigns across Facebook and Instagram.',
  },
  {
    title: 'Backend Developer (FastAPI / Node.js)',
    summary:
      'Build robust APIs and services powering our travel technology infrastructure.',
  },
  {
    title: 'Content Creator / Social Media Manager',
    summary:
      'Tell our story and engage our community through compelling content and social media.',
  },
];


export function OpenPositions({ onApplyClick }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Open{' '}
            <span className="bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
              Positions
            </span>
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            Find your perfect role in our growing team
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {positions.map((position, index) => (
            <div
              key={index}
              className={`group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${(index + 2) * 100}ms`,
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {position.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {position.summary}
              </p>
              <button
                onClick={() => onApplyClick(position.title)}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg group-hover:scale-105"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}