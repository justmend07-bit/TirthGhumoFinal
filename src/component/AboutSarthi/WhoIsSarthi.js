import { Users, Heart, Shield } from 'lucide-react';

function WhoIsSarthi() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Who is a Saarthi?
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            A Saarthi is a trusted travel companion who accompanies elders from their home to the destination and safely back.
            <span className="block mt-4 font-semibold text-orange-600">
              Not an attendant or babysitter — but someone who supports with respect, patience, and presence just like their own children..
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Companion</h3>
            <p className="text-gray-600 leading-relaxed">
              Walking together as equals, sharing the journey with patience and understanding
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Respectful</h3>
            <p className="text-gray-600 leading-relaxed">
              Treating every elder with dignity, as you would your own family
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted</h3>
            <p className="text-gray-600 leading-relaxed">
              A reliable presence that brings comfort and confidence throughout the journey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoIsSarthi;
