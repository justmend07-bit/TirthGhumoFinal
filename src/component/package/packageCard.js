import { MapPin, Clock, Tag } from 'lucide-react';

export function PackageCard({
  id,
  title,
  subtext,
  isPopular,
  image,
  tags,
  price,
  available,
  url,
  location,
  duration,
}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {isPopular && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            Popular
          </div>
        )}

        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
          {price}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {subtext}
        </p>

        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700 mb-4">
          <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
          <span className="text-sm">{duration}</span>
        </div>

        {/* <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Tag className="w-4 h-4 text-orange-500 flex-shrink-0" />
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium border border-amber-200"
            >
              {tag}
            </span>
          ))}
        </div> */}

        <a
          disabled={!available}
          href={available ? url : '#'}
          className={`mt-auto w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${available
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 hover:shadow-lg transform hover:scale-105 text-center cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed text-center '
            }`}
        >
          {available ? 'View Details' : 'coming soon...'}
        </a>
      </div>
    </div>
  );
}
