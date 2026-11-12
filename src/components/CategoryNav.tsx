import React from 'react';
import { CATEGORIES } from '../data/kathaData';
import { DietaryType } from '../types/restaurant';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
  dietaryFilter: DietaryType | 'all';
  onSelectDietaryFilter: (filter: DietaryType | 'all') => void;
  bestsellerOnly: boolean;
  onToggleBestsellerOnly: () => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  dietaryFilter,
  onSelectDietaryFilter,
  bestsellerOnly,
  onToggleBestsellerOnly,
}) => {
  return (
    <div className="sticky top-0 z-40 bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#EAE3D9] py-2 sm:py-2.5 shadow-xs transition-all">
      <div className="max-w-5xl mx-auto px-4 space-y-2">
        {/* Horizontal Category Carousel with smooth pill styling */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#8C4A2F] text-white shadow-xs font-semibold scale-102'
                    : 'bg-white text-[#736B63] hover:text-[#1E1B18] hover:border-[#8C4A2F]/40 border border-[#EAE3D9]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Dietary Filters & Bestsellers Bar */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#EAE3D9]/60 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {/* All */}
            <button
              onClick={() => onSelectDietaryFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs font-medium ${
                dietaryFilter === 'all'
                  ? 'bg-[#1E1B18] text-white shadow-2xs'
                  : 'bg-white text-[#736B63] border border-[#EAE3D9] hover:text-[#1E1B18]'
              }`}
            >
              All
            </button>

            {/* Veg Symbol Only */}
            <button
              onClick={() => onSelectDietaryFilter(dietaryFilter === 'veg' ? 'all' : 'veg')}
              title="Vegetarian Only"
              aria-label="Vegetarian Only"
              className={`p-1.5 sm:px-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                dietaryFilter === 'veg'
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-white border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 border-2 rounded-xs flex items-center justify-center ${
                  dietaryFilter === 'veg' ? 'border-white' : 'border-emerald-600'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full inline-block ${
                    dietaryFilter === 'veg' ? 'bg-white' : 'bg-emerald-600'
                  }`}
                />
              </span>
            </button>

            {/* Non-Veg Symbol Only */}
            <button
              onClick={() => onSelectDietaryFilter(dietaryFilter === 'non-veg' ? 'all' : 'non-veg')}
              title="Non-Vegetarian"
              aria-label="Non-Vegetarian"
              className={`p-1.5 sm:px-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                dietaryFilter === 'non-veg'
                  ? 'bg-red-800 text-white shadow-2xs'
                  : 'bg-white border border-red-300 hover:bg-red-50'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 border-2 rounded-xs flex items-center justify-center ${
                  dietaryFilter === 'non-veg' ? 'border-white' : 'border-red-700'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full inline-block ${
                    dietaryFilter === 'non-veg' ? 'bg-white' : 'bg-red-700'
                  }`}
                />
              </span>
            </button>

            {/* Vegan Symbol Only */}
            <button
              onClick={() => onSelectDietaryFilter(dietaryFilter === 'vegan' ? 'all' : 'vegan')}
              title="Vegan"
              aria-label="Vegan"
              className={`p-1.5 sm:px-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center text-xs leading-none ${
                dietaryFilter === 'vegan'
                  ? 'bg-amber-800 text-white shadow-2xs'
                  : 'bg-white border border-amber-300 hover:bg-amber-50'
              }`}
            >
              <span className="text-sm">🌱</span>
            </button>
          </div>

          {/* Bestseller Check Toggle */}
          <button
            onClick={onToggleBestsellerOnly}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              bestsellerOnly
                ? 'bg-[#C28E5C] text-white font-medium shadow-2xs'
                : 'bg-white text-[#736B63] border border-[#EAE3D9] hover:text-[#1E1B18]'
            }`}
          >
            <span>★</span>
            <span className="font-medium">Bestsellers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
