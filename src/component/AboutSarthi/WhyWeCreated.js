import { Sparkles } from 'lucide-react';

function WhyWeCreated() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Why We Created Saarthi
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-orange-600" />
            </div>

            <div>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Many elders dream of visiting sacred places, reuniting with loved ones, or simply experiencing the joy of travel. Yet, they often hesitate — not because they lack the desire, but because they lack a trustworthy companion.
              </p>

              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Family members are busy with their own lives. Friends may have their own limitations. And the thought of traveling alone can feel overwhelming.
              </p>

              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Saarthi was born from this simple truth: every elder deserves the freedom to travel with dignity and confidence.
              </p>

              <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                We connect elders with young, compassionate companions who walk beside them — not ahead, not behind, but together.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mt-8">
            <p className="text-lg text-gray-700 text-center italic">
              "Travel should never be limited by age. With the right companion, every journey becomes possible."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyWeCreated;
