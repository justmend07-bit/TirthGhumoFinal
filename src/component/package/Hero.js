import { Search } from 'lucide-react';

export function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center px-6 py-4">
            <Search className="w-6 h-6 text-orange-500 flex-shrink-0" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search by destination, duration, or activity..."
              className="flex-1 ml-4 text-lg text-gray-800 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      
    </div>
  );
}
