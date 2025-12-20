"use client";
import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          >
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              Tirth Ghumo
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-gradient-to-r from-orange-400 to-amber-400 mx-auto mb-8 rounded-full"
          ></motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            India's first complete pilgrimage and spiritual travel ecosystem — a one-stop solution designed to make your Tirth Yatra meaningful, safe, and completely hassle-free.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Headquartered in Bhopal, we are among the fastest-growing spiritual travel startups in India, blessed to have already served <span className="font-semibold text-orange-400">1,800+ happy yatris</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-6 md:gap-12"
          >
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-lg">
              <MapPin className="w-6 h-6 text-orange-600" />
              <span className="text-gray-700 font-medium">Bhopal, India</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-full shadow-lg">
              <Users className="w-6 h-6 text-orange-600" />
              <span className="text-gray-700 font-medium">1,800+ Yatris Served</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
