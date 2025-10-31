'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import * as Icons from 'lucide-react';
import type { BusinessModel } from '../data/businessModels';

interface BusinessCardProps {
  model: BusinessModel;
  index: number;
}

export default function BusinessCard({ model, index }: BusinessCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const IconComponent = (Icons as any)[model.icon] || Icons.Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center"
          >
            <IconComponent className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">{model.category}</h2>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">{model.description}</p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Hide' : 'Show'} details for ${model.category}`}
        >
          {isExpanded ? (
            <>
              <Icons.ChevronUp className="w-5 h-5" />
              Hide Details
            </>
          ) : (
            <>
              <Icons.ChevronDown className="w-5 h-5" />
              Explore Examples & UI/UX
            </>
          )}
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 space-y-6">
          {/* Examples */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icons.Lightbulb className="w-5 h-5 text-primary-500" />
              Business Examples
            </h3>
            {model.examples.map((example, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <h4 className="text-lg font-semibold text-primary-600 mb-2">
                  {idx + 1}. {example.name}
                </h4>
                <p className="text-gray-700 mb-3">{example.description}</p>

                <div className="space-y-3">
                  <DetailSection
                    icon={<Icons.Layout className="w-4 h-4" />}
                    title="UI/UX Considerations"
                    items={example.uiConsiderations}
                    color="blue"
                  />

                  <DetailSection
                    icon={<Icons.Zap className="w-4 h-4" />}
                    title="Key Features"
                    items={example.keyFeatures}
                    color="purple"
                  />

                  <DetailSection
                    icon={<Icons.GitBranch className="w-4 h-4" />}
                    title="User Flow"
                    items={example.userFlow}
                    color="green"
                  />

                  <DetailSection
                    icon={<Icons.MousePointer className="w-4 h-4" />}
                    title="Interactive Elements"
                    items={example.interactiveElements}
                    color="orange"
                  />

                  <DetailSection
                    icon={<Icons.Palette className="w-4 h-4" />}
                    title="Design Patterns"
                    items={example.designPatterns}
                    color="pink"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Accessibility Features */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
              <Icons.Eye className="w-5 h-5" />
              Accessibility Features (WCAG Compliance)
            </h3>
            <ul className="space-y-2">
              {model.accessibilityFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-green-700">
                  <Icons.Check className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Responsive Considerations */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
              <Icons.Smartphone className="w-5 h-5" />
              Responsive Design Considerations
            </h3>
            <ul className="space-y-2">
              {model.responsiveConsiderations.map((consideration, idx) => (
                <li key={idx} className="flex items-start gap-2 text-blue-700">
                  <Icons.Check className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{consideration}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface DetailSectionProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
}

function DetailSection({ icon, title, items, color }: DetailSectionProps) {
  const colorClasses = {
    blue: 'text-blue-700 bg-blue-100',
    purple: 'text-purple-700 bg-purple-100',
    green: 'text-green-700 bg-green-100',
    orange: 'text-orange-700 bg-orange-100',
    pink: 'text-pink-700 bg-pink-100',
  };

  return (
    <div className="mt-3">
      <h5 className={`text-sm font-semibold ${colorClasses[color]} px-3 py-2 rounded-md flex items-center gap-2 mb-2`}>
        {icon}
        {title}
      </h5>
      <ul className="space-y-1 ml-4">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-gray-400 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
