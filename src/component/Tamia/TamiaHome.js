import Link from "next/link";
import { Mountain, Users, Shield } from "lucide-react";
import Navbar from "@/component/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white ">
        <Navbar />
      

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-50 to-amber-50 py-30 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel with <span className="text-orange-600">Aastha Bhi</span>,{" "}
            <span className="text-orange-600">Suvidha Bhi</span>
          </h2>

          <p className="text-xl text-gray-700 mb-8">
            Spiritual & adventure journeys made comfortable
          </p>

          <Link
            href="/tamia/TourDetails"
            className="inline-block bg-gradient-to-r from-orange-600 to-orange-500
              text-white px-8 py-4 rounded-full font-semibold text-lg
              hover:shadow-lg transform hover:-translate-y-0.5
              transition-all duration-200"
          >
            Explore Tours
          </Link>
        </div>
      </section>

      {/* Featured Tour */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Tour
          </h3>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64 bg-gradient-to-br from-orange-400 to-amber-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <Mountain className="w-32 h-32 text-white opacity-20" />
              </div>
              <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-full font-semibold">
                1N / 2D Adventure
              </div>
            </div>

            <div className="p-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                Tamia & Patalkot Adventure Tour
              </h4>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Experience the untouched beauty of Tamia and Patalkot Valley.
                Trek through pristine forests, waterfalls, tribal villages,
                and camp under the stars.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {["Trekking", "Valley Crossing", "Camping", "Bonfire & DJ"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Departure</p>
                  <p className="text-orange-600 font-semibold">
                    29 December – 1st Batch
                  </p>
                </div>

                <Link
                  href="/tamia/TourDetails"
                  className="bg-orange-600 text-white px-6 py-3 rounded-full
                    font-semibold hover:bg-orange-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Tirth Ghumo?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature icon={Users} title="1500+ Happy Travelers" desc="Trusted across India" />
            <Feature icon={Shield} title="Experienced Team" desc="Professional guides & support" />
            <Feature icon={Mountain} title="Verified Trips" desc="Safe & organized journeys" />
          </div>
        </div>
      </section>

       
      
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow">
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-orange-600" />
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
