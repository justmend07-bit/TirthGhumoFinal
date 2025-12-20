'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/ui/button'
import { ArrowRight, Search } from 'lucide-react'
import packages from '@/data/package'

export default function HeroSection({ onSearch }) {
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

  // 🔍 SEARCH LOGIC (from your Hero, unchanged in spirit)
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
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          <h1
            className={`mb-6 text-5xl font-bold leading-tight text-white transition-all duration-700 ease-out md:text-6xl lg:text-7xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Discover Your Next
            <span className="block bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
              Great Adventure
            </span>
          </h1>

          <p
            className={`mb-10 text-xl text-amber-50/90 transition-all duration-700 ease-out md:text-2xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            Curated luxury travel experiences for the discerning explorer
          </p>

          {/* 🔍 SEARCH BOX (styled to match Hero UI) */}
          <div
            className={`mx-auto flex max-w-2xl items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-2xl transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Search className="h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search destination or package"
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none"
              value={query}
              onChange={handleInputChange}
            />

            <Button
              onClick={() => {
                runSearch(query)
                scrollToPackages()
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700"
            >
              Search
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50 to-transparent" />
    </section>
  )
}
