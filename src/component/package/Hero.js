'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Search } from 'lucide-react'

// Mock packages data for demo
const packages = [
  { id: 1, title: 'Bali Adventure' },
  { id: 2, title: 'Paris Getaway' },
  { id: 3, title: 'Tokyo Explorer' },
]

export default function HeroSection({ onSearch = () => {} }) {
  const [isVisible, setIsVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [typingTimeout, setTypingTimeout] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToPackages = () => {
    const section = document.getElementById('packages-section')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const runSearch = (text) => {
    if (!text.trim()) {
      onSearch(packages)
      return
    }

    const results = packages.filter((pkg) =>
      pkg.title.toLowerCase().includes(text.toLowerCase())
    )

    onSearch(results)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (typingTimeout) clearTimeout(typingTimeout)

    const timeout = setTimeout(() => {
      runSearch(value)
    }, 500)

    setTypingTimeout(timeout)
  }

  return (
    <section className="relative h-[70vh] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 via-orange-900/60 to-amber-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-3 sm:px-6 lg:px-8 text-center">
        <div className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl">
          <h1
            className={`mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Discover Your Next
            <span className="block bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent mt-1 sm:mt-2">
              Great Adventure
            </span>
          </h1>

          <p
            className={`mb-6 sm:mb-8 lg:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl text-amber-50/90 transition-all duration-700 ease-out px-2 sm:px-4 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Curated luxury travel experiences for the discerning explorer
          </p>

          {/* Search Box - Fully Responsive */}
          <div
            className={`mx-auto w-full max-w-2xl px-2 sm:px-0 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Mobile Layout (< 640px) */}
            <div className="sm:hidden flex flex-col gap-3 rounded-xl bg-white/95 p-3 shadow-2xl">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                  value={query}
                  onChange={handleInputChange}
                />
              </div>
              <button
                onClick={() => {
                  runSearch(query)
                  scrollToPackages()
                }}
                className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 text-sm py-2.5 font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Tablet & Desktop Layout (>= 640px) */}
            <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 p-3 md:p-4 shadow-2xl">
              <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search destination or package"
                className="flex-1 bg-transparent text-sm md:text-base text-gray-800 placeholder-gray-400 outline-none min-w-0"
                value={query}
                onChange={handleInputChange}
              />
              <button
                onClick={() => {
                  runSearch(query)
                  scrollToPackages()
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 whitespace-nowrap text-sm md:text-base px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold transition-all active:scale-95 flex items-center gap-2"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-amber-50 to-transparent" />
    </section>
  )
}