
export default function PackageCard({ pkg }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={pkg.image}
        alt={pkg.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-lg font-bold">{pkg.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{pkg.subtext}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {pkg.tags.map((t, idx) => (
            <span
              key={idx}
              className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-4 text-gray-700 text-sm">
          Starts from <span className="font-semibold">{pkg.price}</span>
        </p>

        {
            pkg.available ?<a href={`${pkg.url}`} > <button className="mt-4 bg-orange-600 w-full text-white py-2 rounded-lg cursor-pointer">Book Now </button></a>
          
         :<a href="#"> <button disabled className="mt-4 bg-gray-500 w-full text-white py-2 rounded-lg">Coming Soon...</button></a>
        }
      </div>
    </div>
  );
}
