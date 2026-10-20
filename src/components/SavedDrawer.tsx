import React from 'react';
import { X, Heart, Trash2, ArrowRight, MapPin } from 'lucide-react';
import { Experience } from '../types';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedExperiences: Experience[];
  onRemove: (id: string) => void;
  onSelectExperience: (experience: Experience) => void;
  currency: 'KES' | 'USD';
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedExperiences,
  onRemove,
  onSelectExperience,
  currency,
}) => {
  if (!isOpen) return null;

  const currencySymbol = currency === 'KES' ? 'KSh ' : '$';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-extrabold text-stone-900 text-sm">
              Your Shortlist ({savedExperiences.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {savedExperiences.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <Heart className="w-12 h-12 mx-auto stroke-1 mb-2 text-stone-300" />
              <p className="text-sm font-semibold text-stone-700">No experiences saved yet</p>
              <p className="text-xs text-stone-500 mt-1">
                Click the heart icon on any experience card to build your squad shortlist.
              </p>
            </div>
          ) : (
            savedExperiences.map((exp) => {
              const price = currency === 'KES' ? exp.priceKes : exp.priceUsd;
              return (
                <div
                  key={exp.id}
                  className="p-3 rounded-2xl border border-stone-200 hover:border-amber-400 flex items-center gap-3 group transition-all"
                >
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectExperience(exp);
                      onClose();
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        onSelectExperience(exp);
                        onClose();
                      }}
                      className="text-xs font-bold text-stone-900 truncate group-hover:text-amber-600 cursor-pointer"
                    >
                      {exp.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{exp.location}</span>
                    </p>
                    <p className="text-xs font-extrabold text-stone-900 mt-1">
                      {currencySymbol}{price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 items-end">
                    <button
                      onClick={() => onRemove(exp.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectExperience(exp);
                        onClose();
                      }}
                      className="text-[10px] font-bold text-amber-700 hover:underline"
                    >
                      Book →
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {savedExperiences.length > 0 && (
          <div className="p-5 border-t border-stone-200">
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
            >
              Continue Browsing Experiences
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
