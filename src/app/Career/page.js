
import Navbar from '@/component/navbar';
import Link from 'next/link';
import { Briefcase, Heart, Code, Palette, FileText, Video } from 'lucide-react';

function CareersPage() {

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            Careers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you want to grow with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Student Positions Card */}
          {/* Student Positions Card (Saarthi Color Scheme) */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 text-center">
            <div className="p-8 sm:p-10 flex flex-col items-center">

              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl mb-6">
                <Briefcase className="w-8 h-8 text-orange-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Student Positions
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Apply for creative and technical roles like Web Developer, Graphic Designer,
                Content Creator, Video Editor, and more.
              </p>

              {/* Role Tags */}
              <div className="flex flex-wrap gap-3 mb-8 justify-center py-7">
                <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
                  <Code className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-700 font-medium">Tech</span>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                  <Palette className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-700 font-medium">Design</span>
                </div>

                <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-700 font-medium">Content</span>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg">
                  <Video className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-amber-700 font-medium">Video</span>
                </div>
              </div>

              {/* CTA */}
              <Link href={'/Career/Hiring'} className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-700 hover:to-amber-700  transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
                Apply Now
              </Link>
            </div>
          </div>


          {/* Sarthi Program Card */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 text-center">
            <div className="p-8 sm:p-10 flex flex-col items-center">

              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl mb-6">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Saarthi Program
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Become a travel companion for elders and help them journey with dignity and comfort.
              </p>

              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl mb-8">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Be the reason an elder travels with confidence again. Experience meaningful journeys while making a real difference.
                  </p>
                </div>
              </div>

              <a
                href='/Career/Sarthi'
                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Saarthi
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CareersPage;
