'use client';

import { useState, useMemo } from 'react';
import { businessModels } from './data/businessModels';
import BusinessCard from './components/BusinessCard';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import { motion } from 'framer-motion';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    return businessModels.map(model => model.category);
  }, []);

  const filteredModels = useMemo(() => {
    return businessModels.filter(model => {
      // Category filter
      if (activeCategory && model.category !== activeCategory) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          model.category,
          model.description,
          ...model.examples.flatMap(ex => [
            ex.name,
            ex.description,
            ...ex.uiConsiderations,
            ...ex.keyFeatures,
            ...ex.userFlow,
            ...ex.interactiveElements,
            ...ex.designPatterns
          ]),
          ...model.accessibilityFeatures,
          ...model.responsiveConsiderations
        ].join(' ').toLowerCase();

        return searchableText.includes(query);
      }

      return true;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <FilterBar
          onSearch={setSearchQuery}
          onCategoryFilter={setActiveCategory}
          categories={categories}
          activeCategory={activeCategory}
        />

        {filteredModels.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-2xl text-gray-600">No business models found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory(null);
              }}
              className="mt-4 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-gray-600"
            >
              Showing {filteredModels.length} of {businessModels.length} business {filteredModels.length === 1 ? 'model' : 'models'}
            </motion.div>

            <div className="grid grid-cols-1 gap-8">
              {filteredModels.map((model, index) => (
                <BusinessCard key={model.id} model={model} index={index} />
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            Comprehensive online business models catalog with UI/UX best practices
          </p>
          <p className="text-gray-400 mt-2 text-sm">
            Designed for browser-based platforms with responsive design, accessibility, and modern user experience patterns
          </p>
        </div>
      </footer>
    </main>
  );
}
