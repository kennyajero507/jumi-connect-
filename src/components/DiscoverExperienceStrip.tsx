import React from 'react';
import { ExperienceCategory } from '../types';

interface DiscoverExperienceStripProps {
  onSelectCategory: (cat: ExperienceCategory | string) => void;
  selectedCategory: string;
}

interface TileItem {
  id: string;
  categoryKey?: ExperienceCategory;
  label: string;
  bgColor: string;
  textColor: string;
  accentBorder: string;
  iconSvg: React.ReactNode;
}

export const DiscoverExperienceStrip: React.FC<DiscoverExperienceStripProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const TILES: TileItem[] = [
    {
      id: 'art',
      categoryKey: 'classes_courses',
      label: 'Art',
      bgColor: 'bg-[#98d5f5]',
      textColor: 'text-stone-900',
      accentBorder: 'border-sky-300',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="24" width="40" height="48" rx="8" fill="#FFF2F2" />
          <path d="M20 54C28 48 36 58 44 50C52 42 56 52 60 48V72H20V54Z" fill="#FFAAA6" />
          <path d="M20 62C30 56 40 64 50 58C55 55 58 60 60 58V72H20V62Z" fill="#4B3869" />
          <circle cx="40" cy="18" r="6" fill="#D9534F" />
          <rect x="36" y="8" width="8" height="12" rx="4" fill="#FFE3E3" />
        </svg>
      ),
    },
    {
      id: 'beauty_fragrance',
      categoryKey: 'classes_courses',
      label: 'Beauty & Fragrance',
      bgColor: 'bg-[#ff6565]',
      textColor: 'text-white',
      accentBorder: 'border-rose-400',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="38" width="36" height="32" rx="6" fill="#FFF0F0" fillOpacity="0.85" />
          <rect x="26" y="48" width="28" height="18" rx="3" fill="#FFE27A" />
          <path d="M38 12L42 12V34L38 34Z" fill="#FFD54F" />
          <path d="M46 12C46 8 34 8 34 12V18H46V12Z" fill="#1C1C1C" />
          <path d="M34 18H46V24H34V18Z" fill="#FFB74D" />
          <circle cx="40" cy="30" r="3" fill="#FFF9C4" />
        </svg>
      ),
    },
    {
      id: 'cooking',
      categoryKey: 'food_drinks',
      label: 'Cooking',
      bgColor: 'bg-[#e5be85]',
      textColor: 'text-stone-900',
      accentBorder: 'border-amber-300',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="54" rx="26" ry="14" fill="#DE6B48" />
          <ellipse cx="40" cy="52" rx="23" ry="11" fill="#FF8A65" />
          <path d="M14 54L4 62" stroke="#B25032" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="36" cy="46" rx="8" ry="6" fill="#FFF59D" />
          <circle cx="48" cy="48" r="5" fill="#81C784" />
          <ellipse cx="44" cy="43" rx="4" ry="7" fill="#6A1B9A" />
        </svg>
      ),
    },
    {
      id: 'craft',
      categoryKey: 'classes_courses',
      label: 'Craft',
      bgColor: 'bg-[#0f1f4b]',
      textColor: 'text-white',
      accentBorder: 'border-slate-700',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="38" cy="50" r="16" stroke="#E0E0E0" strokeWidth="5" />
          <circle cx="28" cy="40" r="4" fill="#FF80AB" />
          <circle cx="38" cy="36" r="4" fill="#FFD700" />
          <circle cx="48" cy="40" r="4" fill="#FF80AB" />
          <path d="M50 20L62 42M62 20L50 42" stroke="#B0BEC5" strokeWidth="4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'flowers_plants',
      categoryKey: 'classes_courses',
      label: 'Flowers & Plants',
      bgColor: 'bg-[#5b6329]',
      textColor: 'text-white',
      accentBorder: 'border-lime-700',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34 26C30 18 42 16 44 26C46 36 34 38 34 26Z" fill="#81D4FA" />
          <path d="M38 34C38 48 42 62 42 62" stroke="#A7D129" strokeWidth="3" />
          <ellipse cx="50" cy="38" rx="7" ry="3" transform="rotate(-30 50 38)" fill="#C5E1A5" />
          <ellipse cx="54" cy="50" rx="8" ry="4" transform="rotate(-25 54 50)" fill="#A7D129" />
          <circle cx="58" cy="62" r="5" stroke="#E0E0E0" strokeWidth="3" />
          <path d="M55 58L46 48M48 64L38 52" stroke="#E0E0E0" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'paint_sip',
      categoryKey: 'classes_courses',
      label: 'Paint & Sip',
      bgColor: 'bg-[#fba2c4]',
      textColor: 'text-stone-900',
      accentBorder: 'border-pink-300',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26 68L36 24M54 68L44 24M40 20V68" stroke="#D7CCC8" strokeWidth="3" strokeLinecap="round" />
          <rect x="22" y="26" width="36" height="26" rx="2" fill="#791A3E" />
          <path d="M22 34L46 52M32 26L58 46M22 44L36 52" stroke="#F48FB1" strokeWidth="3" />
          <circle cx="34" cy="34" r="2.5" fill="#FFE082" />
          <circle cx="44" cy="40" r="2" fill="#FFE082" />
          <path d="M20 62L48 38" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'pottery',
      categoryKey: 'classes_courses',
      label: 'Pottery',
      bgColor: 'bg-[#2b5df0]',
      textColor: 'text-white',
      accentBorder: 'border-blue-400',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="40" cy="62" rx="22" ry="5" fill="#3E2723" />
          <rect x="36" y="62" width="8" height="10" fill="#2E1C14" />
          <ellipse cx="40" cy="72" rx="14" ry="3" fill="#2E1C14" />
          <path d="M30 30C28 42 32 54 40 54C48 54 52 42 50 30C48 24 32 24 30 30Z" fill="#F5F5F0" />
          <path d="M26 38C34 40 46 40 54 38" stroke="#E0E0E0" strokeWidth="1.5" />
          <ellipse cx="40" cy="26" rx="10" ry="3" fill="#D7CCC8" />
          <path d="M24 46C32 44 48 44 56 46" stroke="#BBDEFB" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      ),
    },
    // USER REQUESTED LAYERS:
    {
      id: 'business_games',
      categoryKey: 'business_games',
      label: 'Business Games',
      bgColor: 'bg-[#3b154c]',
      textColor: 'text-white',
      accentBorder: 'border-purple-600',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="22" y="24" width="36" height="36" rx="6" fill="#F3E5F5" fillOpacity="0.2" />
          <circle cx="40" cy="30" r="5" fill="#FBC02D" />
          <path d="M35 38H45L43 54H37L35 38Z" fill="#FBC02D" />
          <rect x="30" y="54" width="20" height="5" rx="2" fill="#E65100" />
          <path d="M24 64H56" stroke="#BA68C8" strokeWidth="3" strokeLinecap="round" />
          <path d="M28 48L32 44M52 48L48 44" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'founder_retreats',
      categoryKey: 'founder_retreats',
      label: 'Founder & Retreats',
      bgColor: 'bg-[#1b4332]',
      textColor: 'text-white',
      accentBorder: 'border-emerald-600',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 58L34 32L46 50L54 38L66 58H18Z" fill="#2D6A4F" />
          <path d="M34 32L40 42L48 30L62 54" stroke="#74C69D" strokeWidth="2" strokeLinecap="round" />
          <circle cx="40" cy="62" r="3" fill="#FFB703" />
          <path d="M37 66L43 62M43 66L37 62" stroke="#FB8500" strokeWidth="2" />
          <circle cx="58" cy="24" r="5" fill="#FFEAA7" />
        </svg>
      ),
    },
    {
      id: 'cabins_camping',
      categoryKey: 'getaways_retreats',
      label: 'Cabins & Camping',
      bgColor: 'bg-[#2d4a3e]',
      textColor: 'text-white',
      accentBorder: 'border-emerald-700',
      iconSvg: (
        <svg className="w-14 h-14" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 18L18 58H62L40 18Z" fill="#8D5B4C" />
          <path d="M40 18L26 58H54L40 18Z" fill="#B98068" />
          <rect x="34" y="44" width="12" height="14" rx="2" fill="#FFEAA7" />
          <path d="M40 44V58" stroke="#8D5B4C" strokeWidth="2" />
          <circle cx="56" cy="22" r="4" fill="#FFEAA7" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-8 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header matching Image 1 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#014856] tracking-tight font-display">
            Discover a memorable experience
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-normal">
            Handpicked creative workshops, mountain cabins, business war games & retreats across Kenya
          </p>
        </div>

        {/* Visual Category Tiles Row matching Image 1 */}
        <div className="flex items-center gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 px-1">
          {TILES.map((tile) => {
            const isSelected = selectedCategory === tile.categoryKey;
            return (
              <button
                key={tile.id}
                onClick={() => onSelectCategory(tile.categoryKey || tile.id)}
                className={`flex flex-col items-center justify-between p-3.5 rounded-2xl w-[120px] sm:w-[130px] h-[135px] sm:h-[142px] shrink-0 transition-all duration-200 group cursor-pointer ${tile.bgColor} shadow-sm hover:shadow-lg hover:-translate-y-1 ${
                  isSelected ? 'ring-3 ring-amber-500 scale-102 shadow-md' : ''
                }`}
              >
                {/* Tile Label at top */}
                <span className={`text-xs sm:text-[13px] font-bold text-center leading-tight tracking-tight ${tile.textColor}`}>
                  {tile.label}
                </span>

                {/* Illustrated SVG Icon in center */}
                <div className="flex-1 flex items-center justify-center group-hover:scale-108 transition-transform duration-300">
                  {tile.iconSvg}
                </div>

                {/* Subtle indicator bar */}
                <div className="w-8 h-1 rounded-full bg-white/30 group-hover:bg-white/60 transition-colors" />
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
