import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { HeroSection } from './components/HeroSection';
import { DiscoverExperienceStrip } from './components/DiscoverExperienceStrip';
import { AirbnbExperienceShelf } from './components/AirbnbExperienceShelf';
import { PersonTypeFilter } from './components/PersonTypeFilter';
import { ActivitySubtypeFilter } from './components/ActivitySubtypeFilter';
import { ClassBentoUnwindBanner } from './components/ClassBentoUnwindBanner';
import { ExperienceCard } from './components/ExperienceCard';
import { ExperienceDrawer } from './components/ExperienceDrawer';
import { JumiVibesQuizModal } from './components/JumiVibesQuizModal';
import { ChamaCorporateModal } from './components/ChamaCorporateModal';
import { GiftJumiModal } from './components/GiftJumiModal';
import { JumiCircleModal } from './components/JumiCircleModal';
import { SavedDrawer } from './components/SavedDrawer';
import { Footer } from './components/Footer';

import { EXPERIENCES_DATA } from './data/experiences';
import { CATEGORIES_LIST } from './data/categories';
import { Experience, ExperienceCategory, PersonType, ActivitySubtype, JumiVibe } from './types';
import { Sparkles, RotateCcw, CheckCircle, ArrowRight, Compass, LayoutGrid } from 'lucide-react';

export default function App() {
  // Navigation & Filter States
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory>('featured');
  const [selectedPersonType, setSelectedPersonType] = useState<PersonType | 'all'>('all');
  const [selectedSubtype, setSelectedSubtype] = useState<ActivitySubtype | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Kenya');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');

  // View mode: 'shelves' (Airbnb style) or 'catalog'
  const [viewMode, setViewMode] = useState<'shelves' | 'catalog'>('shelves');

  // Saved / Shortlist state
  const [savedIds, setSavedIds] = useState<string[]>(['jumi-campout-naivasha']);

  // Modals & Drawers state
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isOrganizerHubOpen, setIsOrganizerHubOpen] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isCircleModalOpen, setIsCircleModalOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Active Vibe filter from quiz
  const [activeVibeFilter, setActiveVibeFilter] = useState<JumiVibe | null>(null);

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'KES' ? 'USD' : 'KES'));
  };

  const toggleSave = (id: string) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleBookSuccess = (title: string, count: number, total: number) => {
    showToast(`🎉 Reservation confirmed for ${count} guest(s) on "${title}"! M-Pesa receipt sent.`);
  };

  // Pre-filtered subsets for Airbnb Experience Shelves (Covering all of Kenya)
  const popularAcrossKenya = useMemo(() => {
    return EXPERIENCES_DATA.filter((e) => e.isTrendingAcrossKenya || e.isTrendingInNairobi || e.isBestseller);
  }, []);

  const experiencesThisWeekend = useMemo(() => {
    return EXPERIENCES_DATA.filter((e) => e.weekendSlot);
  }, []);

  const businessGamesAndRetreats = useMemo(() => {
    return EXPERIENCES_DATA.filter((e) => e.category === 'business_games' || e.category === 'founder_retreats');
  }, []);

  const classBentoWorkshops = useMemo(() => {
    return EXPERIENCES_DATA.filter((e) => e.isClassBentoWorkshop || e.category === 'classes_courses' || e.activitySubtype === 'creative_craft');
  }, []);

  const nairobiUnwindEscapes = useMemo(() => {
    return EXPERIENCES_DATA.filter((e) => (e.category === 'getaways_retreats' || e.category === 'water_sports' || e.category === 'driving_quads') && !e.isCabinOrCamping);
  }, []);

  // Cabins, glamping & wilderness camping across Kenya
  const cabinsAndCampingExperiences = useMemo(() => {
    return EXPERIENCES_DATA.filter((e) => e.isCabinOrCamping || (e.category === 'getaways_retreats' && (e.title.toLowerCase().includes('cabin') || e.title.toLowerCase().includes('camp') || e.title.toLowerCase().includes('glamp') || e.title.toLowerCase().includes('chalet') || e.title.toLowerCase().includes('pod'))));
  }, []);

  // Filter logic for main catalog (Full Kenya coverage)
  const filteredExperiences = useMemo(() => {
    return EXPERIENCES_DATA.filter((exp) => {
      // 1. Category filter
      if (selectedCategory !== 'featured') {
        if (exp.category !== selectedCategory) return false;
      }

      // 2. Person Type filter (Solo, Couples, Families, Groups/Chamas)
      if (selectedPersonType !== 'all') {
        if (!exp.personType.includes(selectedPersonType)) return false;
      }

      // 3. Activity Subtype filter
      if (selectedSubtype !== 'all') {
        if (exp.activitySubtype !== selectedSubtype) return false;
      }

      // 4. Region filter with flexible Kenya-wide matching
      if (selectedRegion !== 'All Kenya') {
        const sel = selectedRegion.toLowerCase();
        const expReg = exp.region.toLowerCase();
        const expLoc = exp.location.toLowerCase();
        const matches =
          expReg.includes(sel) ||
          sel.includes(expReg) ||
          expLoc.includes(sel) ||
          (sel.includes('nanyuki') && (expReg.includes('nanyuki') || expReg.includes('mt. kenya'))) ||
          (sel.includes('diani') && (expReg.includes('diani') || expLoc.includes('diani') || expLoc.includes('wasini'))) ||
          (sel.includes('watamu') && (expReg.includes('watamu') || expReg.includes('malindi'))) ||
          (sel.includes('naivasha') && (expReg.includes('naivasha') || expReg.includes('rift valley') || expLoc.includes('elementaita'))) ||
          (sel.includes('mara') && expReg.includes('mara')) ||
          (sel.includes('sagana') && expReg.includes('sagana')) ||
          (sel.includes('tsavo') && (expReg.includes('tsavo') || expReg.includes('amboseli')));
        if (!matches) return false;
      }

      // 5. Active Vibe filter (from quiz)
      if (activeVibeFilter) {
        if (!exp.vibeTags.includes(activeVibeFilter)) return false;
      }

      // 6. Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = exp.title.toLowerCase().includes(query);
        const matchTagline = exp.tagline.toLowerCase().includes(query);
        const matchLocation = exp.location.toLowerCase().includes(query);
        const matchRegion = exp.region.toLowerCase().includes(query);
        const matchHost = exp.host.name.toLowerCase().includes(query);
        if (!matchTitle && !matchTagline && !matchLocation && !matchRegion && !matchHost) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedPersonType, selectedSubtype, selectedRegion, activeVibeFilter, searchQuery]);

  const savedExperiencesList = useMemo(() => {
    return EXPERIENCES_DATA.filter((e) => savedIds.includes(e.id));
  }, [savedIds]);

  const handleResetFilters = () => {
    setSelectedCategory('featured');
    setSelectedPersonType('all');
    setSelectedSubtype('all');
    setSelectedRegion('All Kenya');
    setSearchQuery('');
    setActiveVibeFilter(null);
  };

  const handleSelectCategoryFromTile = (cat: string) => {
    setSelectedCategory(cat as ExperienceCategory);
    setViewMode('catalog');
    const el = document.getElementById('catalog-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentCategoryMeta = CATEGORIES_LIST.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-white flex flex-col text-stone-900 selection:bg-amber-500 selection:text-white font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-stone-900 text-white text-xs font-semibold py-3 px-4 rounded-2xl shadow-2xl flex items-center gap-2 border border-stone-700 animate-in slide-in-from-top-5 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setViewMode('catalog');
        }}
        selectedPersonType={selectedPersonType}
        onSelectPersonType={(p) => {
          setSelectedPersonType(p);
          setViewMode('catalog');
        }}
        currency={currency}
        onToggleCurrency={toggleCurrency}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenOrganizerHub={() => setIsOrganizerHubOpen(true)}
        onOpenGiftModal={() => setIsGiftModalOpen(true)}
        onOpenCircleModal={() => setIsCircleModalOpen(true)}
        savedCount={savedIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) setViewMode('catalog');
        }}
      />

      {/* Category Horizontal Navigation Strip */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveVibeFilter(null);
          setViewMode('catalog');
        }}
      />

      {/* Minimalist Hero Section (Reduced words + compact search) */}
      <HeroSection
        selectedPersonType={selectedPersonType}
        onSelectPersonType={(p) => {
          setSelectedPersonType(p);
          setViewMode('catalog');
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setViewMode('catalog');
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q) setViewMode('catalog');
        }}
        selectedRegion={selectedRegion}
        onSelectRegion={(r) => {
          setSelectedRegion(r);
          setViewMode('catalog');
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenOrganizerHub={() => setIsOrganizerHubOpen(true)}
      />

      {/* IMAGE 1: "Discover a memorable experience" Visual Category Tiles Row */}
      <DiscoverExperienceStrip
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategoryFromTile}
      />

      {/* View Switcher: Curated Airbnb Shelves vs Full Catalog */}
      <div className="border-b border-stone-200/80 bg-stone-50/70 py-3 sticky top-[113px] z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('shelves')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                viewMode === 'shelves'
                  ? 'bg-[#014856] text-white shadow-2xs'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
              }`}
            >
              Airbnb-Style Shelves
            </button>
            <button
              onClick={() => setViewMode('catalog')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                viewMode === 'catalog'
                  ? 'bg-[#014856] text-white shadow-2xs'
                  : 'bg-white text-stone-700 hover:text-stone-900 border border-stone-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Grid Catalog ({filteredExperiences.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setIsQuizOpen(true)}
              className="hidden sm:flex items-center gap-1 text-amber-700 hover:text-amber-800 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vibe Quiz</span>
            </button>
            <span className="hidden sm:inline text-stone-300">|</span>
            <button
              onClick={() => setIsOrganizerHubOpen(true)}
              className="text-stone-600 hover:text-stone-900 font-medium"
            >
              Chama & Corporate Toolkit
            </button>
          </div>
        </div>
      </div>

      {/* CONDITIONAL DISPLAY: AIRBNB-STYLE SHELVES */}
      {viewMode === 'shelves' && (
        <div className="divide-y divide-stone-100">
          
          {/* AIRBNB SHELF 1: Top-rated experiences across Kenya (Covering whole of Kenya) */}
          <AirbnbExperienceShelf
            title="Top experiences across Kenya"
            actionText="View all Kenya"
            subtitle="Curated wildlife safaris, coastal ocean expeditions, mountain trails & highland escapes"
            badgeType="trending"
            experiences={popularAcrossKenya}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectExperience={(exp) => setActiveExperience(exp)}
            onViewAll={() => {
              setSelectedRegion('All Kenya');
              setViewMode('catalog');
            }}
          />

          {/* AIRBNB SHELF 2: Experiences this weekend → (From Screenshot) */}
          <AirbnbExperienceShelf
            title="Experiences this weekend"
            actionText="View all"
            subtitle="Instant bookable departure slots for this upcoming Saturday & Sunday"
            badgeType="weekendSlot"
            experiences={experiencesThisWeekend}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectExperience={(exp) => setActiveExperience(exp)}
            onViewAll={() => {
              setViewMode('catalog');
            }}
          />

          {/* BUSINESS GAMES & EXECUTIVE OFFSITES (Heading is clean; cards feature Design Thinking, Communication Games, Investor War Room, etc.) */}
          <AirbnbExperienceShelf
            title="Business games, strategy & executive offsites"
            actionText="Explore offsites"
            subtitle="Gamified boardroom simulations, team dynamics, and leadership retreats"
            badgeType="business"
            experiences={businessGamesAndRetreats}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectExperience={(exp) => setActiveExperience(exp)}
            onViewAll={() => {
              setSelectedCategory('business_games');
              setViewMode('catalog');
            }}
          />

          {/* CLASSBENTO INSPIRED SHELF: Top-rated Craft & Creative Workshops */}
          <AirbnbExperienceShelf
            title="Top-rated craft & culinary workshops"
            actionText="Browse classes"
            subtitle="Hands-on pottery, candle making, and barista masterclasses hosted by independent artisans"
            badgeType="workshop"
            experiences={classBentoWorkshops}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectExperience={(exp) => setActiveExperience(exp)}
            onViewAll={() => {
              setSelectedCategory('classes_courses');
              setViewMode('catalog');
            }}
          />

          {/* NAIROBI UNWIND INSPIRED SHELF: Weekend Escapes & Adventure */}
          <AirbnbExperienceShelf
            title="Nairobi Unwind: Weekend getaways & retreats"
            actionText="Explore getaways"
            subtitle="Lake Naivasha campouts, Sagana river rafting, and Champagne Ridge sunsets"
            badgeType="unwind"
            experiences={nairobiUnwindEscapes}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectExperience={(exp) => setActiveExperience(exp)}
            onViewAll={() => {
              setSelectedCategory('getaways_retreats');
              setViewMode('catalog');
            }}
          />

          {/* CABINS & CAMPING: Handpicked across Kenya (Placed right after Nairobi Unwind) */}
          <AirbnbExperienceShelf
            title="Cabins, glamping & wilderness camping"
            actionText="Explore stays"
            subtitle="Handcrafted pine A-frames, cloud forest glass cabins, and off-grid starlight camps across Kenya"
            badgeType="cabin"
            experiences={cabinsAndCampingExperiences}
            currency={currency}
            savedIds={savedIds}
            onToggleSave={toggleSave}
            onSelectExperience={(exp) => setActiveExperience(exp)}
            onViewAll={() => {
              setSelectedCategory('getaways_retreats');
              setViewMode('catalog');
            }}
          />

        </div>
      )}

      {/* ClassBento & Nairobi Unwind Concept Feature Banner */}
      <ClassBentoUnwindBanner
        onOpenOrganizerHub={() => setIsOrganizerHubOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setViewMode('catalog');
        }}
        onOpenGiftModal={() => setIsGiftModalOpen(true)}
      />

      {/* Sorted by Persons / Group Size (Core Requested Taxonomy) */}
      <PersonTypeFilter
        selectedPersonType={selectedPersonType}
        onSelectPersonType={(p) => {
          setSelectedPersonType(p);
          setActiveVibeFilter(null);
          setViewMode('catalog');
        }}
        onOpenOrganizerHub={() => setIsOrganizerHubOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Catalog Grid View (Filtered & Searchable) */}
      <main id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
        
        {/* Active Filter Bar and Activity Subtype Pills */}
        <div className="space-y-3">
          
          {/* Active Vibe Banner (if set by quiz) */}
          {activeVibeFilter && (
            <div className="bg-amber-500 text-stone-950 p-3.5 rounded-2xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-stone-950" />
                <span className="text-xs font-bold tracking-wide">
                  Filtering for Your Vibe: <strong>{activeVibeFilter}</strong>
                </span>
              </div>
              <button
                onClick={() => setActiveVibeFilter(null)}
                className="text-xs font-bold underline hover:text-white transition-colors"
              >
                Clear Vibe Filter
              </button>
            </div>
          )}

          {/* Catalog Header with Counts */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentCategoryMeta?.icon}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight font-display">
                  {currentCategoryMeta?.name || 'All Experiences'}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                  {filteredExperiences.length} available
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {currentCategoryMeta?.shortDescription}
              </p>
            </div>

            {/* Quick Reset if filters applied */}
            {(selectedCategory !== 'featured' || selectedPersonType !== 'all' || selectedSubtype !== 'all' || selectedRegion !== 'All Kenya' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          {/* Activity Subtypes Row */}
          <ActivitySubtypeFilter
            selectedSubtype={selectedSubtype}
            onSelectSubtype={setSelectedSubtype}
            activeCount={EXPERIENCES_DATA.length}
          />
        </div>

        {/* Catalog Grid */}
        {filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredExperiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                currency={currency}
                isSaved={savedIds.includes(experience.id)}
                onToggleSave={toggleSave}
                onSelect={(exp) => setActiveExperience(exp)}
                onQuickBook={(exp) => setActiveExperience(exp)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-white rounded-3xl border border-stone-200/80 p-8 max-w-lg mx-auto shadow-2xs">
            <Compass className="w-12 h-12 text-stone-400 mx-auto stroke-1 mb-3" />
            <h3 className="text-base font-bold text-stone-900">No matching experiences found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              We couldn't find any experiences matching your exact combination of filters and location.
            </p>
            <div className="mt-5">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Chama & Corporate Callout Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#00272E] via-[#014856] to-[#00272E] text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#00B69B]/35">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFC700] bg-black/25 px-2.5 py-0.5 rounded border border-[#FFC700]/30">
                Organized Groups In Kenya
              </span>
              <span className="text-xs text-teal-200 font-medium">Chamas · SACCOs · Corporate · Churches</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-white">
              Are you the group organizer? Let Jumi do the heavy lifting.
            </h3>
            <p className="text-xs text-teal-100/90 leading-relaxed font-normal">
              One decision-maker books for 20+ members. Use our ready-made WhatsApp itinerary flyers, M-Pesa group split-billing, and 3-to-6 month "Pole-Pole" installment payment schedules.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setIsOrganizerHubOpen(true)}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#FF5E1E] to-[#FF8A00] hover:opacity-95 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-98"
            >
              <span>Launch Organizer Hub</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setIsGiftModalOpen(true)}
              className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20 text-center"
            >
              Gift a Jumi Voucher
            </button>
          </div>
        </div>

      </main>

      {/* Experience Details & Booking Drawer */}
      <ExperienceDrawer
        experience={activeExperience}
        onClose={() => setActiveExperience(null)}
        currency={currency}
        onBookSuccess={handleBookSuccess}
      />

      {/* Jumi Vibes Quiz Modal */}
      <JumiVibesQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectVibe={(vibe) => {
          setActiveVibeFilter(vibe);
          showToast(`✨ Filtered catalog for ${vibe}!`);
        }}
      />

      {/* Chama & Corporate Organizer Hub Modal */}
      <ChamaCorporateModal
        isOpen={isOrganizerHubOpen}
        onClose={() => setIsOrganizerHubOpen(false)}
        currency={currency}
      />

      {/* Gift a Jumi Modal */}
      <GiftJumiModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        currency={currency}
      />

      {/* Jumi Circle Modal */}
      <JumiCircleModal
        isOpen={isCircleModalOpen}
        onClose={() => setIsCircleModalOpen(false)}
        currency={currency}
      />

      {/* Saved / Shortlist Drawer */}
      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedExperiences={savedExperiencesList}
        onRemove={toggleSave}
        onSelectExperience={(exp) => setActiveExperience(exp)}
        currency={currency}
      />

      {/* Global Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onSelectPersonType={setSelectedPersonType}
        onOpenOrganizerHub={() => setIsOrganizerHubOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenGiftModal={() => setIsGiftModalOpen(true)}
        onOpenCircleModal={() => setIsCircleModalOpen(true)}
      />

    </div>
  );
}
