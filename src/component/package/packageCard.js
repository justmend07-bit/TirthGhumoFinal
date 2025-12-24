import { MapPin, Calendar, Users, Star } from 'lucide-react'

export default function PackageCard({ pkg }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 w-full">
      {/* Image */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={pkg.image || 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={pkg.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-amber-500 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold text-white shadow-lg">
          {pkg.price || '999'}
        </div>

        {/* Rating */}
        {pkg.rating && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 sm:px-3 sm:py-1 backdrop-blur-sm">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-500 text-amber-500" />
            <span className="text-xs sm:text-sm font-semibold text-gray-800">{pkg.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl font-bold text-gray-800 line-clamp-2">
          {pkg.title}
        </h3>

        <div className="mb-3 sm:mb-4 flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
          <span className="line-clamp-1">{pkg.location || 'Exotic Destination'}</span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
            <span className="truncate">{pkg.duration || '7 Days'}</span>
          </div>
          {/* <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
            <span className="truncate">{pkg.groupSize || ''}</span>
          </div> */}
        </div>

        {/* Description */}
        {pkg.description && (
          <p className="mb-4 text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">
            {pkg.description}
          </p>
        )}

        {/* CTA Button */}
        {pkg.available ? (
          <a href={pkg.url} >
          <button className="w-full rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold text-white transition-all hover:from-amber-600 hover:to-orange-700 hover:shadow-lg active:scale-95">
            View Details
          </button>
        </a>
        ): (
          <button disabled className="w-full rounded-lg sm:rounded-xl bg-gray-300 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold text-gray-500 cursor-not-allowed">
            Sold Out
          </button>
        )}
      </div>
    </div>
  )
}
