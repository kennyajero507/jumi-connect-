import React, { useState } from 'react';
import { X, Check, Sparkles, Shield, Users, Award, Zap } from 'lucide-react';

interface JumiCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'KES' | 'USD';
}

export const JumiCircleModal: React.FC<JumiCircleModalProps> = ({
  isOpen,
  onClose,
  currency,
}) => {
  const [selectedTier, setSelectedTier] = useState<'explorer' | 'connector'>('connector');
  const [isJoined, setIsJoined] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-stone-950 font-black">
              C
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight font-display">
                The Jumi Circle Membership
              </h3>
              <p className="text-xs text-stone-300">
                Deliberately simple: 2 tiers to connect deeper across Kenya
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Tier Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Explorer Tier (Free) */}
            <div
              onClick={() => setSelectedTier('explorer')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                selectedTier === 'explorer'
                  ? 'bg-amber-50/50 border-amber-500 ring-2 ring-amber-500/20'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">🟢</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                    Community Funnel
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-stone-900">Explorer</h4>
                <p className="text-2xl font-black text-stone-900 mt-1">FREE</p>
                <p className="text-xs text-stone-500 mt-1">For casual explorers and newcomers</p>

                <ul className="mt-4 space-y-2 text-xs text-stone-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp / Telegram access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Public event announcements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Jumi Vibes™ quiz & basic points</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Access to Level 1 Fire & Chill</span>
                  </li>
                </ul>
              </div>

              <button
                className={`mt-5 w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTier === 'explorer'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                {selectedTier === 'explorer' ? '✓ Selected' : 'Choose Explorer'}
              </button>
            </div>

            {/* Connector Tier (Paid) */}
            <div
              onClick={() => setSelectedTier('connector')}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                selectedTier === 'connector'
                  ? 'bg-amber-50/50 border-amber-500 ring-2 ring-amber-500/20'
                  : 'bg-white border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="absolute -top-2.5 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                Most Popular
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">🔵</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    VIP Inner Circle
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-stone-900">Connector</h4>
                <p className="text-2xl font-black text-stone-900 mt-1">
                  {currency === 'KES' ? 'KSh 1,500' : '$12'}
                  <span className="text-xs text-stone-500 font-normal"> / month</span>
                </p>
                <p className="text-xs text-stone-500 mt-1">For frequent travelers and connectors</p>

                <ul className="mt-4 space-y-2 text-xs text-stone-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span><strong>15% discount</strong> on all experiences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span><strong>48-hr priority</strong> booking for Campout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>Member-only secret hangouts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span><strong>2× Jumi Points</strong> & Badges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-600" />
                    <span>Free priority Buddy Match™</span>
                  </li>
                </ul>
              </div>

              <button
                className={`mt-5 w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTier === 'connector'
                    ? 'bg-amber-500 text-stone-950 font-extrabold'
                    : 'bg-stone-100 text-stone-700'
                }`}
              >
                {selectedTier === 'connector' ? '✓ Selected' : 'Choose Connector'}
              </button>
            </div>

          </div>

          {/* Bottom Activation */}
          <div className="pt-2">
            {!isJoined ? (
              <button
                onClick={() => setIsJoined(true)}
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Join The Jumi Circle as {selectedTier === 'connector' ? 'Connector' : 'Explorer'}</span>
              </button>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs font-bold text-center">
                🎉 Welcome to The Jumi Circle! Your benefits and WhatsApp community invitation are active.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
