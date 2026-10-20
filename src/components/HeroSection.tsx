import React from 'react';
import { Search, MapPin, Users, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { PersonType, ExperienceCategory } from '../types';

interface HeroSectionProps {
  selectedPersonType: PersonType | 'all';
  onSelectPersonType: (type: PersonType | 'all') => void;
  selectedCategory: ExperienceCategory;
  onSelectCategory: (cat: ExperienceCategory) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedRegion: string;
  onSelectRegion: (reg: string) => void;
  onOpenQuiz: () => void;
  onOpenOrganizerHub: () => void;
}

const REGIONS = [
  'All Kenya',
  'Nairobi',
  'Mt. Kenya & Nanyuki',
  'Diani & South Coast',
  'Watamu & Malindi',
  'Lamu Archipelago',
  'Lake Naivasha & Rift Valley',
  'Masai Mara',
  'Sagana & Central',
  'Amboseli & Tsavo',
  'Limuru & Tigoni'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedPersonType,
  onSelectPersonType,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedRegion,
  onSelectRegion,
  onOpenQuiz,
  onOpenOrganizerHub,
}) => {
  return (
    <div className="relative bg-[#00272E] text-white overflow-hidden py-10 sm:py-14 border-b border-[#014856]">
      {/* Background with warm ambient lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=2000&q=80"
          alt="Kenyan Experience Outdoors"
          className="w-full h-full object-cover opacity-20 scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001D22] via-[#002B33]/85 to-[#002B33]/65" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Minimal Hero Header with Jumi Logo Theme Gradient */}
        <div className="max-w-2xl mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#014856]/80 text-[#FFC700] border border-[#00B69B]/35 mb-3 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00C49F] animate-pulse" />
            <span className="tracking-wide">Come Together · Travel · Connect · Explore · Kenya</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-display text-white">
            Unforgettable experiences across{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-[#00C49F] via-[#FFC700] to-[#FF5E1E]">
              Kenya
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-teal-100/90 font-normal">
            From Karen pottery & boardroom war games to Mt. Kenya pine cabins, Diani dhows & Mara safaris.
          </p>
        </div>

        {/* Compact Floating Search Bar (Airbnb Style) */}
        <div className="bg-white text-stone-900 rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-2xl border border-stone-200/40 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
            
            {/* 1. What / Search keyword */}
            <div className="px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-stone-200">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Activity
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Pottery, Safari, Rafting..."
                className="w-full text-xs font-semibold text-stone-900 focus:outline-none placeholder:text-stone-400 bg-transparent"
              />
            </div>

            {/* 2. Where / Location */}
            <div className="px-3 py-1.5 border-b sm:border-b-0 sm:border-r border-stone-200">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Where
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => onSelectRegion(e.target.value)}
                className="w-full text-xs font-semibold text-stone-900 focus:outline-none bg-transparent cursor-pointer"
              >
                {REGIONS.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Who */}
            <div className="px-3 py-1.5 border-b sm:border-b-0 border-stone-200">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Who's going
              </label>
              <select
                value={selectedPersonType}
                onChange={(e) => onSelectPersonType(e.target.value as PersonType | 'all')}
                className="w-full text-xs font-semibold text-stone-900 focus:outline-none bg-transparent cursor-pointer"
              >
                <option value="all">Any group size</option>
                <option value="solo">👤 Solo & Buddy Match</option>
                <option value="couples">👩‍❤️‍👨 For Two & Dates</option>
                <option value="families">👨‍👩‍👧‍👦 Families & Clans</option>
                <option value="groups_chamas">👥 Chamas & Groups</option>
              </select>
            </div>

            {/* 4. Search CTA Button styled with Brand Orange */}
            <div className="p-1">
              <button
                onClick={() => {
                  const el = document.getElementById('catalog-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl sm:rounded-full bg-gradient-to-r from-[#FF5E1E] to-[#FF8A00] hover:from-[#E04B10] hover:to-[#E57600] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98"
              >
                <Search className="w-3.5 h-3.5 text-white" />
                <span>Search</span>
              </button>
            </div>

          </div>
        </div>

        {/* Minimal Trending Shortcuts */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-400">
          <span className="text-[11px] font-medium text-stone-400">Popular:</span>
          <button 
            onClick={() => onSelectCategory('animals_nature')}
            className="hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full text-[11px]"
          >
            Nairobi Safari
          </button>
          <button 
            onClick={() => onSelectCategory('classes_courses')}
            className="hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full text-[11px]"
          >
            Pottery & Wine
          </button>
          <button 
            onClick={() => onSelectCategory('water_sports')}
            className="hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full text-[11px]"
          >
            Sagana Rafting
          </button>
          <button 
            onClick={() => onSelectCategory('getaways_retreats')}
            className="hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full text-[11px]"
          >
            Naivasha Campout
          </button>
          <button 
            onClick={onOpenOrganizerHub}
            className="hover:text-emerald-300 transition-colors bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-emerald-500/30"
          >
            ⚡ Chama Pole-Pole
          </button>
        </div>

      </div>
    </div>
  );
};
