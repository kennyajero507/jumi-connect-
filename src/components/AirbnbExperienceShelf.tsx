import React, { useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Experience } from '../types';

interface AirbnbExperienceShelfProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  badgeType: 'trending' | 'weekendSlot' | 'workshop' | 'unwind' | 'cabin' | 'business';
  experiences: Experience[];
  currency: 'KES' | 'USD';
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectExperience: (experience: Experience) => void;
  onViewAll?: () => void;
}

export const AirbnbExperienceShelf: React.FC<AirbnbExperienceShelfProps> = ({
  title,
  subtitle,
  actionText,
  badgeType,
  experiences,
  currency,
  savedIds,
  onToggleSave,
  onSelectExperience,
  onViewAll,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const currencySymbol = currency === 'KES' ? 'KSh ' : '$';

  return (
    <section className="py-6 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header matching Airbnb format */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 group cursor-pointer" onClick={onViewAll}>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-display hover:text-[#014856] transition-colors">
                {title}
              </h2>
              {actionText && (
                <button
                  onClick={onViewAll}
                  className="flex items-center gap-1 text-sm font-semibold text-[#014856] hover:text-[#FF5E1E] transition-colors"
                >
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-stone-500 font-normal mt-0.5">{subtitle}</p>
            )}
          </div>

          {/* Left / Right Carousel Navigation Controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 flex items-center justify-center text-stone-700 shadow-2xs transition-all active:scale-95"
              aria-label="Previous experiences"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 flex items-center justify-center text-stone-700 shadow-2xs transition-all active:scale-95"
              aria-label="Next experiences"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Scroller */}
        <div
          ref={scrollContainerRef}
          className="flex items-start gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {experiences.map((exp) => {
            const isSaved = savedIds.includes(exp.id);
            const price = currency === 'KES' ? exp.priceKes : exp.priceUsd;

            // Determine badge label - prioritize exp.badge if explicitly assigned!
            let badgeLabel = exp.badge || 'Trending';
            if (!exp.badge) {
              if (badgeType === 'weekendSlot') {
                badgeLabel = exp.weekendSlot || 'This Weekend';
              } else if (badgeType === 'workshop') {
                badgeLabel = 'Workshop';
              } else if (badgeType === 'unwind') {
                badgeLabel = 'Getaway';
              } else if (badgeType === 'cabin') {
                badgeLabel = 'Cabin & Camp';
              } else if (badgeType === 'business') {
                badgeLabel = 'Strategy';
              }
            }

            return (
              <div
                key={exp.id}
                onClick={() => onSelectExperience(exp)}
                className="w-[245px] sm:w-[265px] md:w-[280px] shrink-0 cursor-pointer group flex flex-col"
              >
                {/* Image Container with Airbnb-style rounded corners & badges */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 shadow-xs border border-stone-200/50">
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Left Badge (e.g. Design Thinking, Communication Game, Investor Syndicate, A-Frame Cabin) */}
                  <div className="absolute top-3 left-3 z-10 max-w-[80%]">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 backdrop-blur-md text-stone-900 shadow-sm border border-black/5 truncate">
                      {badgeLabel}
                    </span>
                  </div>

                  {/* Top Right Save / Heart Icon */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(exp.id);
                    }}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full text-white hover:scale-110 active:scale-90 transition-all drop-shadow-md"
                    aria-label="Save to shortlist"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isSaved
                          ? 'fill-rose-500 text-rose-500 stroke-rose-500'
                          : 'fill-black/30 stroke-white stroke-2'
                      }`}
                    />
                  </button>
                </div>

                {/* Information below image - matching Airbnb exact typography */}
                <div className="mt-2.5 space-y-0.5">
                  <h3 className="text-sm font-semibold text-stone-900 group-hover:text-[#014856] transition-colors line-clamp-1 leading-snug">
                    {exp.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-stone-700 font-normal">
                    <span>
                      From <strong className="font-semibold text-stone-900">{currencySymbol}{price.toLocaleString()}</strong> / guest
                    </span>
                    <span className="text-stone-400">·</span>
                    <span className="flex items-center gap-0.5 font-medium text-stone-900">
                      ★ {exp.rating.toFixed(2)}
                    </span>
                    <span className="text-stone-400 text-[11px]">({exp.reviewCount})</span>
                  </div>

                  {/* Region & Location tag */}
                  <p className="text-[11px] text-stone-500 truncate pt-0.5 font-medium">
                    📍 {exp.region} · {exp.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
