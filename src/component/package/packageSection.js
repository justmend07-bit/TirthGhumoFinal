import PackageCard from "@/component/package/packageCard";

export default function PackagesSection({ data }) {
  return (
    <section className="mt-16">
      <h2 className="mb-10 bg-gradient-to-r from-amber-500 to-orange-700 bg-clip-text text-4xl font-bold text-transparent md:text-5xl text-center">
              Featured Destinations
            </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}
