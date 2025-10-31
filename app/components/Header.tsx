'use client';

import { motion } from 'framer-motion';
import { Sparkles, Globe, TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 px-4 mb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-12 h-12 text-yellow-300" aria-hidden="true" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Online Business Models Catalog
          </h1>

          <p className="text-xl md:text-2xl text-primary-100 mb-6 max-w-3xl mx-auto">
            Comprehensive guide to browser-based business models with detailed UI/UX considerations
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <Globe className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium">12 Business Categories</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
            >
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium">30+ Detailed Examples</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
