import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Users, 
  Gift, 
  Compass, 
  Menu, 
  X, 
  ChevronDown, 
  Check, 
  ShieldCheck,
  Heart,
  Calendar,
  Briefcase
} from 'lucide-react';
import { JumiLogo } from './JumiLogo';
import { CATEGORIES_LIST, PERSON_TYPES_META } from '../data/categories';
import { ExperienceCategory, PersonType } from '../types';

interface NavbarProps {
  selectedCategory: ExperienceCategory;
  onSelectCategory: (cat: ExperienceCategory) => void;
  selectedPersonType: PersonType | 'all';
  onSelectPersonType: (type: PersonType | 'all') => void;
  currency: 'KES' | 'USD';
  onToggleCurrency: () => void;
  onOpenQuiz: () => void;
  onOpenOrganizerHub: () => void;
  onOpenGiftModal: () => void;
  onOpenCircleModal: () => void;
  savedCount: number;
  onOpenSavedDrawer: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedPersonType,
  onSelectPersonType,
  currency,
  onToggleCurrency,
  onOpenQuiz,
  onOpenOrganizerHub,
  onOpenGiftModal,
  onOpenCircleModal,
  savedCount,
  onOpenSavedDrawer,
  searchQuery,
  onSearchChange
}) => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isPersonMenuOpen, setIsPersonMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top announcement banner using brand teal #014856 & gold #FFA700 */}
      <div className="bg-[#014856] text-white text-xs py-1.5 px-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#FFA700] text-[#01353F] uppercase tracking-wider">
              Come Together
            </span>
            <span className="hidden sm:inline text-teal-100 font-medium">Chamas, Squads & Teams: Pay Pole-Pole in 3-6 monthly M-Pesa installments!</span>
            <span className="sm:hidden text-teal-100 font-medium">Pay Pole-Pole in monthly installments!</span>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-medium">
            <button 
              onClick={onOpenOrganizerHub}
              className="text-amber-300 hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#FFA700]" />
              <span>Chama & HR Organizer Hub</span>
            </button>
            <span className="text-teal-800">|</span>
            <button 
              onClick={onToggleCurrency}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px] font-semibold text-white"
            >
              <span>{currency === 'KES' ? '🇰🇪 KES (KSh)' : '🇺🇸 USD ($)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('featured');
                onSelectPersonType('all');
              }}
              className="group flex items-center transition-transform hover:scale-102"
            >
              <JumiLogo size="md" showTagline={true} />
            </a>

            {/* Desktop Experience Dropdown Trigger */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => {
                  setIsCategoryMenuOpen(!isCategoryMenuOpen);
                  setIsPersonMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isCategoryMenuOpen 
                    ? 'bg-amber-50 text-amber-900 border border-amber-300' 
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Browse All Experiences</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega menu dropdown */}
              {isCategoryMenuOpen && (
                <div className="absolute left-0 mt-2 w-[720px] bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 grid grid-cols-3 gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-3 pb-3 mb-1 border-b border-stone-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Experience Taxonomy</h4>
                      <p className="text-xs text-stone-500">Curated adventures across Kenya with trusted local hosts</p>
                    </div>
                    <button
                      onClick={() => {
                        onSelectCategory('featured');
                        setIsCategoryMenuOpen(false);
                      }}
                      className="text-xs text-amber-700 font-semibold hover:underline"
                    >
                      View All Featured ({CATEGORIES_LIST.find(c => c.id === 'featured')?.count})
                    </button>
                  </div>
                  {CATEGORIES_LIST.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 group ${
                        selectedCategory === cat.id 
                          ? 'bg-amber-50/80 border border-amber-200' 
                          : 'hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-xs font-bold truncate ${selectedCategory === cat.id ? 'text-amber-950' : 'text-stone-800'}`}>
                            {cat.name}
                          </p>
                          <span className="text-[10px] text-stone-600 ml-1">({cat.count})</span>
                        </div>
                        <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 leading-snug">
                          {cat.shortDescription}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Who is it for? Dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => {
                  setIsPersonMenuOpen(!isPersonMenuOpen);
                  setIsCategoryMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isPersonMenuOpen 
                    ? 'bg-amber-50 text-amber-900 border border-amber-300' 
                    : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <Users className="w-4 h-4 text-amber-600" />
                <span>Who It's For</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform ${isPersonMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isPersonMenuOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="pb-2 mb-2 border-b border-stone-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-stone-400">Filter by Travelers</p>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onSelectPersonType('all');
                        setIsPersonMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        selectedPersonType === 'all' ? 'bg-amber-100 text-amber-900' : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span>All Travelers & Groups</span>
                      {selectedPersonType === 'all' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </button>
                    {PERSON_TYPES_META.map((meta) => (
                      <button
                        key={meta.id}
                        onClick={() => {
                          onSelectPersonType(meta.id);
                          setIsPersonMenuOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                          selectedPersonType === meta.id ? 'bg-amber-50 border border-amber-200' : 'hover:bg-stone-50'
                        }`}
                      >
                        <span className="text-lg">{meta.icon}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-stone-900">{meta.title}</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">{meta.subtitle}</p>
                          <span className="inline-block mt-1 text-[10px] font-semibold text-amber-700 bg-amber-100/60 px-1.5 py-0.5 rounded">
                            {meta.badge}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Naivasha, pottery, rafting, quad..."
              className="w-full pl-9 pr-4 py-2 bg-stone-100 hover:bg-stone-50 focus:bg-white text-xs rounded-full border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all placeholder:text-stone-400 font-medium"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Action buttons on right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Jumi Vibes Quiz with official JuMi gradient */}
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#0066FF] via-[#00B69B] to-[#FF8A00] hover:opacity-95 shadow-xs transition-all hover:scale-102"
              title="Take the Jumi Vibes Quiz"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="hidden sm:inline">Jumi Vibes Quiz</span>
              <span className="sm:hidden">Quiz</span>
            </button>

            {/* Gift a Jumi */}
            <button
              onClick={onOpenGiftModal}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <Gift className="w-3.5 h-3.5 text-orange-600" />
              <span>Gift a Jumi</span>
            </button>

            {/* Jumi Circle Member tier */}
            <button
              onClick={onOpenCircleModal}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Jumi Circle</span>
            </button>

            {/* Saved drawer trigger */}
            <button
              onClick={onOpenSavedDrawer}
              className="relative p-2 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="View Shortlist / Bookings"
            >
              <Heart className="w-5 h-5 text-stone-700" />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Naivasha, pottery, rafting, quad..."
              className="w-full pl-9 pr-4 py-2 bg-stone-100 text-xs rounded-full border border-stone-200 outline-none"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Mobile drawer menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-200 space-y-3 pb-2 animate-in fade-in duration-200">
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-2">Browse by Traveler</p>
              <div className="grid grid-cols-2 gap-1.5">
                {PERSON_TYPES_META.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onSelectPersonType(p.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                      selectedPersonType === p.id ? 'bg-amber-100 text-amber-950 font-bold' : 'bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span className="truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenOrganizerHub();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-lg bg-stone-900 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Chama & Corporate Organizer Toolkit</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onOpenGiftModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg border border-stone-300 text-xs font-semibold text-stone-800 flex items-center justify-center gap-1.5"
                >
                  <Gift className="w-3.5 h-3.5 text-orange-600" />
                  <span>Gift a Jumi</span>
                </button>
                <button
                  onClick={() => {
                    onOpenCircleModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg border border-stone-300 text-xs font-semibold text-stone-800 flex items-center justify-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Jumi Circle</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
