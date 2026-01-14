'use client';

import { useState, useMemo } from 'react';
import { Compass } from 'lucide-react';
import travelPackages from '@/data/packagesData';
import { PackageCard } from './packageCard';
import { SearchBar } from './Hero';
import { useDebounce } from '@/Hooks/useDebounce';
import Image from 'next/image';

export default function PackagesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const filteredPackages = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return travelPackages;
    }

    const query = debouncedSearchQuery.toLowerCase();

    return travelPackages.filter((pkg) => {
      const matchesTitle = pkg.title.toLowerCase().includes(query);
      const matchesLocation = pkg.location.toLowerCase().includes(query);
      const matchesDuration = pkg.duration.toLowerCase().includes(query);
      const matchesTags = pkg.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );

      return matchesTitle || matchesLocation || matchesDuration || matchesTags;
    });
  }, [debouncedSearchQuery]);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Discover Your Journey
          </h1>
          <p className="text-xl md:text-2xl text-amber-50 max-w-2xl mx-auto">
            Explore handcrafted travel experiences across India's most sacred and breathtaking destinations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Search Bar */}
        <div className="mb-10">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Section Header */}
        <div className="flex items-end justify-between mb-8 px-1">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {debouncedSearchQuery.trim() ? 'Search Results' : 'Curated Holiday Packages'}
            </h2>
            <p className="text-gray-500 mt-1">
              {debouncedSearchQuery.trim() 
                ? `Found ${filteredPackages.length} matching ${filteredPackages.length === 1 ? 'package' : 'packages'}`
                : 'Based on your search for sacred journeys'}
            </p>
          </div>
          <p className="text-sm font-semibold text-orange-600">
            {filteredPackages.length} {filteredPackages.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        {/* Results */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-12 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="w-10 h-10 text-orange-600" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No packages found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search terms or clear the search to see all packages
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-6 px-6 py-2.5 bg-orange-600 text-white text-sm font-bold rounded-xl hover:bg-orange-700 transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        )}
      </main>

      
    </>
  );
}