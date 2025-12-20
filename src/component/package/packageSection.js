import PackageCard from "@/component/package/packageCard";

export default function PackagesSection({ data }) {
  return (
    <section id="packages-section" className="px-3 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-amber-50/50">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="mb-8 sm:mb-10 lg:mb-12 bg-gradient-to-r from-amber-500 to-orange-700 bg-clip-text text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent text-center px-4">
          Featured Destinations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {data.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-base sm:text-lg text-gray-600">No packages found. Try a different search.</p>
          </div>
        )}
      </div>
    </section>
  )
}
