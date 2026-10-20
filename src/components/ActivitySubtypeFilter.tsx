import React from 'react';
import { ACTIVITY_SUBTYPES } from '../data/categories';
import { ActivitySubtype } from '../types';

interface ActivitySubtypeFilterProps {
  selectedSubtype: ActivitySubtype | 'all';
  onSelectSubtype: (subtype: ActivitySubtype | 'all') => void;
  activeCount: number;
}

export const ActivitySubtypeFilter: React.FC<ActivitySubtypeFilterProps> = ({
  selectedSubtype,
  onSelectSubtype,
  activeCount,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
      <span className="text-xs font-bold uppercase tracking-wider text-stone-500 whitespace-nowrap mr-1">
        Activity:
      </span>
      <button
        onClick={() => onSelectSubtype('all')}
        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
          selectedSubtype === 'all'
            ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-xs'
            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:text-stone-900'
        }`}
      >
        All Activities ({activeCount})
      </button>

      {ACTIVITY_SUBTYPES.map((sub) => {
        const isSelected = selectedSubtype === sub.id;
        return (
          <button
            key={sub.id}
            onClick={() => onSelectSubtype(sub.id)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-xs'
                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:text-stone-950'
            }`}
          >
            <span>{sub.icon}</span>
            <span>{sub.label}</span>
          </button>
        );
      })}
    </div>
  );
};
