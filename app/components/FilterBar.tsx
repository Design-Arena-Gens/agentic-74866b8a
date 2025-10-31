'use client';

import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string | null) => void;
  categories: string[];
  activeCategory: string | null;
}

export default function FilterBar({ onSearch, onCategoryFilter, categories, activeCategory }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search business models, features, or UI patterns..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-4 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors text-gray-800 placeholder-gray-400"
          aria-label="Search business models"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryFilter(null)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            activeCategory === null
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
          }`}
          aria-pressed={activeCategory === null}
        >
          All Categories
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryFilter(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              activeCategory === category
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-300'
            }`}
            aria-pressed={activeCategory === category}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
