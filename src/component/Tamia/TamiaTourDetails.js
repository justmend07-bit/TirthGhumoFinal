import Link from "next/link";
import {
  Utensils,
  Mountain,
  Tent,
  Activity,
  Sunrise,
  Droplets,
  TreePine,
  Phone,
  ChevronLeft,
} from "lucide-react";

export default function TourDetailsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="hover:bg-orange-700 p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>

          <div>
            <h1 className="text-xl font-bold">
              Tamia & Patalkot Adventure
            </h1>
            <p className="text-orange-100 text-sm">1N / 2D Tour Package</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 pb-28">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Mountain className="w-48 h-48" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-3">
              Tamia & Patalkot – 1N / 2D Adventure Tour
            </h2>

            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm font-medium mb-1">Departure</p>
              <p className="text-2xl font-bold">
                29 December – 1st Batch
              </p>
              <p className="text-sm mt-2 text-orange-100">
                Trip starts once group is finalized
              </p>
            </div>
          </div>
        </div>

        {/* Included */}
        <Section title="What's Included">
          <Feature icon={Tent} title="Accommodation" desc="1N / 2D campsite stay" />
          <Feature icon={Utensils} title="Meals" desc="Breakfast, Lunch & Dinner" />
          <Feature icon={Mountain} title="Sightseeing" desc="Major attractions covered" />
          <Feature icon={Activity} title="Adventure" desc="Trekking & river crossing" />
        </Section>

        {/* Highlights */}
        <Section title="Tour Highlights">
          {[
            { icon: Droplets, name: "Satdhara River", desc: "Seven water streams" },
            { icon: Sunrise, name: "Anhoni Hot Spring", desc: "Natural thermal spring" },
            { icon: Droplets, name: "Jhingriya Waterfall", desc: "Waterfall trek" },
            { icon: TreePine, name: "Patalkot Valley", desc: "Tribal villages" },
            { icon: Sunrise, name: "Sunset Point", desc: "Scenic sunset views" },
            { icon: Mountain, name: "Tamia Mountain", desc: "Mountain landscapes" },
          ].map((h, i) => (
            <Highlight key={i} {...h} />
          ))}
        </Section>

        {/* Contact */}
        <section className="bg-orange-100 rounded-xl p-6 border">
          <div className="flex gap-4">
            <Phone className="w-6 h-6 text-orange-600 mt-1" />
            <div>
              <h4 className="font-bold mb-1">Need more info?</h4>
              <p className="text-gray-700 mb-2">
                Contact Tirth Ghumo for details
              </p>
              <a
                href="tel:6260499299"
                className="text-orange-600 font-bold text-lg"
              >
                6260499299
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/tamia/Register"
            className="block text-center bg-gradient-to-r from-orange-600 to-orange-500
              text-white py-4 rounded-full font-bold text-lg"
          >
            Register for Tamia Tour
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-8 bg-orange-600 rounded" />
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="bg-orange-50 p-6 rounded-xl border">
      <Icon className="w-8 h-8 text-orange-600 mb-3" />
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Highlight({ icon: Icon, name, desc }) {
  return (
    <div className="flex gap-4 p-4 border rounded-xl hover:shadow-md transition">
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-orange-600" />
      </div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
