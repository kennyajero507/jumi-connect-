import React from 'react';
import { Star, MapPin, Clock, Heart, Users, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { Experience } from '../types';
import { ACTIVITY_SUBTYPES } from '../data/categories';

interface ExperienceCardProps {
  experience: Experience;
  currency: 'KES' | 'USD';
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (experience: Experience) => void;
  onQuickBook: (experience: Experience) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  currency,
  isSaved,
  onToggleSave,
  onSelect,
  onQuickBook,
}) => {
  const price = currency === 'KES' ? experience.priceKes : experience.priceUsd;
  const currencySymbol = currency === 'KES' ? 'KSh ' : '$';
  
  // Calculate pole-pole monthly installment if eligible
  const monthlyInstallment = experience.polePoleEligible && experience.polePoleMonths
    ? Math.round(price / experience.polePoleMonths)
    : null;

  const activityMeta = ACTIVITY_SUBTYPES.find(a => a.id === experience.activitySubtype);

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-stone-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelect(experience)}>
        <img
          src={experience.imageUrl}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 items-start">
            {experience.badge && (
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-stone-950 shadow-xs">
                {experience.badge}
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-stone-900/80 backdrop-blur-xs text-white">
              {experience.jumiLevel}
            </span>
          </div>

          {/* Save / Shortlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(experience.id);
            }}
            aria-label={isSaved ? "Remove from shortlist" : "Save to shortlist"}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-sm transition-transform active:scale-90"
          >
            <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-stone-700'}`} />
          </button>
        </div>

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-stone-200 text-[11px] drop-shadow-xs max-w-[65%]">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{experience.region} · {experience.location}</span>
          </div>

          <div className="flex items-center gap-1 bg-stone-900/80 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-semibold text-amber-300">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{experience.rating.toFixed(2)}</span>
            <span className="text-stone-400">({experience.reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags row: Group Size and Activity */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {activityMeta && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${activityMeta.color}`}>
                {activityMeta.icon} {activityMeta.label}
              </span>
            )}

            {experience.hasBuddyMatch && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                👤 Buddy Match™
              </span>
            )}

            {experience.polePoleEligible && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ⚡ Pole-Pole
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <h3 
            onClick={() => onSelect(experience)}
            className="font-extrabold text-stone-900 text-base group-hover:text-[#014856] transition-colors cursor-pointer line-clamp-1 leading-snug"
          >
            {experience.title}
          </h3>
          <p className="text-xs text-stone-500 font-medium mt-1 line-clamp-2 leading-relaxed">
            {experience.tagline}
          </p>

          {/* Duration & Host badge */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 font-medium pt-2 border-t border-stone-100">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <img 
                src={experience.host.avatar} 
                alt={experience.host.name} 
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="truncate max-w-[110px]">{experience.host.name}</span>
            </div>
          </div>
        </div>

        {/* Pricing and Action row */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-stone-950">
                {currencySymbol}{price.toLocaleString()}
              </span>
              <span className="text-[11px] font-medium text-stone-500">/ person</span>
            </div>

            {/* Pole-Pole monthly installment note if eligible */}
            {monthlyInstallment && (
              <p className="text-[10px] font-bold text-emerald-700 mt-0.5">
                or {currencySymbol}{monthlyInstallment.toLocaleString()}/mo ({experience.polePoleMonths} mos)
              </p>
            )}

            <div className="flex items-center gap-1 text-[10px] text-amber-700 font-semibold mt-0.5">
              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
              <span>+{experience.jumiPointsEarned} Jumi Points</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelect(experience)}
              className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3 h-3 text-stone-300" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
