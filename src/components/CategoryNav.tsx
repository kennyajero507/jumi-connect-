import React from 'react';
import { CATEGORIES_LIST } from '../data/categories';
import { ExperienceCategory } from '../types';

interface CategoryNavProps {
  selectedCategory: ExperienceCategory;
  onSelectCategory: (cat: ExperienceCategory) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white border-b border-stone-200/80 sticky top-[69px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isSelected
                    ? 'bg-[#014856] text-white shadow-xs ring-1 ring-[#014856] scale-102'
                    : 'bg-stone-100/90 text-stone-700 hover:bg-stone-200/80 hover:text-stone-900'
                }`}
              >
                <span className="text-sm leading-none">{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold leading-none ${
                    isSelected
                      ? 'bg-[#003844] text-[#FFC700]'
                      : 'bg-stone-200/80 text-stone-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
