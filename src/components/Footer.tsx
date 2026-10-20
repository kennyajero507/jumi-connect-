import React from 'react';
import { Sparkles, Heart, ShieldCheck, Mail, Phone, MapPin, Instagram, Compass } from 'lucide-react';
import { JumiLogo } from './JumiLogo';
import { ExperienceCategory, PersonType } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ExperienceCategory) => void;
  onSelectPersonType: (type: PersonType) => void;
  onOpenOrganizerHub: () => void;
  onOpenQuiz: () => void;
  onOpenGiftModal: () => void;
  onOpenCircleModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectPersonType,
  onOpenOrganizerHub,
  onOpenQuiz,
  onOpenGiftModal,
  onOpenCircleModal,
}) => {
  return (
    <footer className="bg-[#001D22] text-stone-300 pt-16 pb-12 border-t border-[#014856]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Top Brand Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-[#014856]/80">
          <div>
            <div className="mb-2">
              <JumiLogo size="lg" showTagline={true} lightMode={true} />
            </div>
            <p className="mt-3 text-teal-100/70 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
              Kenya’s premier social-travel and lifestyle community. Come alone. Come with friends. Either way, you belong.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenOrganizerHub}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5E1E] to-[#FF8A00] hover:opacity-95 text-white text-xs font-bold transition-all shadow-md"
            >
              Chama & Corporate Hub
            </button>
            <button
              onClick={onOpenQuiz}
              className="px-4 py-2.5 rounded-xl bg-[#014856] hover:bg-[#025b6d] text-[#FFC700] text-xs font-bold transition-all border border-[#00B69B]/40"
            >
              Take Jumi Vibes Quiz
            </button>
            <button
              onClick={onOpenCircleModal}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
            >
              Join Jumi Circle
            </button>
          </div>
        </div>

        {/* 4 Multi-Column Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          
          {/* Column 1: The Four Levels */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-widest text-amber-400 text-[11px]">
              The Four Levels of Jumi
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onSelectCategory('things_to_do')} className="hover:text-white transition-colors text-left">
                  <strong>Level 1:</strong> Jumi Hangouts (Fire & Chill)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('days_out_tours')} className="hover:text-white transition-colors text-left">
                  <strong>Level 2:</strong> Jumi Day Trips (Off The Grid)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('getaways_retreats')} className="hover:text-white transition-colors text-left">
                  <strong>Level 3:</strong> Jumi Campout (No Signal Weekend)
                </button>
              </li>
              <li>
                <span className="text-stone-500">
                  <strong>Level 4:</strong> Jumi Fest (Annual Gathering)
                </span>
              </li>
              <li>
                <button onClick={onOpenGiftModal} className="hover:text-amber-400 transition-colors text-left mt-2 block">
                  🎁 Gift a Jumi Digital Vouchers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Kenyan Group Travel */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-widest text-amber-400 text-[11px]">
              Kenyan Group Markets
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onSelectPersonType('groups_chamas')} className="hover:text-white transition-colors text-left">
                  Chamas & Investment Groups
                </button>
              </li>
              <li>
                <button onClick={onOpenOrganizerHub} className="hover:text-white transition-colors text-left">
                  Corporate Teams & Work Offsites
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPersonType('groups_chamas')} className="hover:text-white transition-colors text-left">
                  SACCOs & Trade Cooperatives
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPersonType('groups_chamas')} className="hover:text-white transition-colors text-left">
                  Church & Youth Fellowships
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPersonType('families')} className="hover:text-white transition-colors text-left">
                  Multi-Gen Families & Clans
                </button>
              </li>
              <li>
                <button onClick={() => onSelectPersonType('solo')} className="hover:text-white transition-colors text-left">
                  Solo Travelers & Buddy Match™
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Experience Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-widest text-amber-400 text-[11px]">
              Experiences Across Kenya
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onSelectCategory('getaways_retreats')} className="hover:text-white transition-colors text-left">
                  Naivasha Glamping & Hippo Cruises
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('water_sports')} className="hover:text-white transition-colors text-left">
                  Sagana White-Water Rafting
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('classes_courses')} className="hover:text-white transition-colors text-left">
                  Karen Pottery & Natural Wine
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('driving_quads')} className="hover:text-white transition-colors text-left">
                  Kajiado Rift Valley Quad Biking
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cruises_waterfront')} className="hover:text-white transition-colors text-left">
                  Lamu Sunset Dhow Sailing
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('animals_nature')} className="hover:text-white transition-colors text-left">
                  Nairobi National Park Twilight Safaris
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Verification */}
          <div className="space-y-3">
            <h4 className="font-extrabold uppercase tracking-widest text-amber-400 text-[11px]">
              Community HQ & Support
            </h4>
            <div className="space-y-2 text-stone-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Westlands & Karen, Nairobi, Kenya</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+254 (0) 700 JUMI KE (5864 53)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>community@jumi.co.ke</span>
              </p>
              <div className="pt-2 flex items-center gap-2 text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>M-Pesa Verified Merchant & KRA LPO Certified</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-800 text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Jumi Connect Kenya. All Rights Reserved. "Come alone. Come with friends. Either way, you belong."</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-300">Terms of Booking</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-300">Host Guidelines</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
