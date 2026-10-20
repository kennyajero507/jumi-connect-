import React from 'react';
import { PERSON_TYPES_META } from '../data/categories';
import { PersonType } from '../types';
import { Users, User, Heart, Sparkles, Shield, ArrowRight } from 'lucide-react';

interface PersonTypeFilterProps {
  selectedPersonType: PersonType | 'all';
  onSelectPersonType: (type: PersonType | 'all') => void;
  onOpenOrganizerHub: () => void;
  onOpenQuiz: () => void;
}

export const PersonTypeFilter: React.FC<PersonTypeFilterProps> = ({
  selectedPersonType,
  onSelectPersonType,
  onOpenOrganizerHub,
  onOpenQuiz
}) => {
  return (
    <div className="bg-stone-100/60 border-b border-stone-200/70 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading with context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100/80 px-2 py-0.5 rounded">
                Curated By Group Size
              </span>
              <span className="text-xs text-stone-600 font-medium hidden md:inline">
                • Filter experiences tailored to who is traveling with you
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#014856] tracking-tight mt-1 font-display">
              Who are you planning for?
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => onSelectPersonType('all')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all ${
                selectedPersonType === 'all'
                  ? 'bg-[#014856] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              Show All Types
            </button>
          </div>
        </div>

        {/* 4 Interactive Persona Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {PERSON_TYPES_META.map((meta) => {
            const isSelected = selectedPersonType === meta.id;
            return (
              <div
                key={meta.id}
                onClick={() => onSelectPersonType(meta.id)}
                className={`relative cursor-pointer rounded-2xl p-4 transition-all duration-200 border text-left group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#00B69B] shadow-md ring-2 ring-[#00B69B]/25 translate-y-[-2px]'
                    : 'bg-white/90 border-stone-200/90 hover:border-stone-300 hover:shadow-xs hover:bg-white'
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-stone-100 group-hover:scale-110 transition-transform">
                      {meta.icon}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                      isSelected
                        ? 'bg-teal-50 text-[#014856] border-[#00B69B]/40'
                        : 'bg-stone-100 text-stone-600 border-stone-200'
                    }`}>
                      {meta.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`text-sm font-extrabold tracking-tight transition-colors ${
                    isSelected ? 'text-amber-900' : 'text-stone-900 group-hover:text-amber-700'
                  }`}>
                    {meta.title}
                  </h3>
                  
                  <p className="text-xs text-stone-600 font-medium mt-1 line-clamp-2 leading-relaxed">
                    {meta.subtitle}
                  </p>
                </div>

                {/* Micro perk at bottom */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <p className="text-[11px] text-stone-600 font-medium line-clamp-2">
                    <strong className="text-stone-700">Perk:</strong> {meta.perk}
                  </p>
                  
                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold">
                    <span className={isSelected ? 'text-amber-700' : 'text-stone-600 group-hover:text-stone-800'}>
                      {isSelected ? '✓ Active Filter' : 'Select'}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'text-amber-600 translate-x-1' : 'text-stone-400 group-hover:translate-x-1'
                    }`} />
                  </div>
                </div>

                {/* Special Helper CTA for Solo (Buddy Match) or Chama (Organizer Hub) */}
                {isSelected && meta.id === 'solo' && (
                  <div className="mt-3 p-2 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
                    <span>💡 Match with a fellow explorer</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuiz();
                      }}
                      className="text-[10px] font-bold underline text-amber-800 hover:text-amber-950"
                    >
                      Take Vibe Quiz
                    </button>
                  </div>
                )}

                {isSelected && meta.id === 'groups_chamas' && (
                  <div className="mt-3 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center justify-between">
                    <span>⚡ Chama Pole-Pole & WhatsApp Flyer</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenOrganizerHub();
                      }}
                      className="text-[10px] font-bold underline text-emerald-800 hover:text-emerald-950"
                    >
                      Open Hub
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
