import React from 'react';
import { Palette, Sparkles, HeartHandshake, CheckCircle2, ArrowRight, ShieldCheck, Calendar, GlassWater } from 'lucide-react';

interface ClassBentoUnwindBannerProps {
  onOpenOrganizerHub: () => void;
  onSelectCategory: (cat: any) => void;
  onOpenGiftModal: () => void;
}

export const ClassBentoUnwindBanner: React.FC<ClassBentoUnwindBannerProps> = ({
  onOpenOrganizerHub,
  onSelectCategory,
  onOpenGiftModal,
}) => {
  return (
    <div className="py-8 bg-stone-100/60 border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Feature Grid combining ClassBento & Nairobi Unwind core guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: ClassBento Workshop & Team Building */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <Palette className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                ClassBento Model · Workshops
              </span>
              <h3 className="text-base font-bold text-stone-900 mt-2 font-display">
                Creative Team Building & Private Groups
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Pottery throwing, coffee cupping, botanical candle making & culinary classes. Host at our partner studios in Karen & Tigoni or at your office.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500">All materials & tools included</span>
              <button
                onClick={onOpenOrganizerHub}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <span>Book Group</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Nairobi Unwind Weekend Escape */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <GlassWater className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Unwind Kenya · Getaways & Cabins
              </span>
              <h3 className="text-base font-bold text-stone-900 mt-2 font-display">
                Curated Kenya Weekend & Holiday Escapes
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Tired of the same routine? Discover Mt. Kenya river cabins, Aberdare treehouses, Diani dhow sails, and Lake Naivasha stargazing campouts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500">Across Nairobi, Coast, Rift & Central</span>
              <button
                onClick={() => onSelectCategory('getaways_retreats')}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>View Escapes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Social Good & Mental Wellbeing Promise */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Wellbeing & Artisan Impact
              </span>
              <h3 className="text-base font-bold text-stone-900 mt-2 font-display">
                Supporting Local Artisans & Clean Minds
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Every booking directly sustains Kenyan independent artisans, naturalists, and local conservation initiatives. Unplug from screens and connect.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500">100% verified local hosts</span>
              <button
                onClick={onOpenGiftModal}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Gift Voucher</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
