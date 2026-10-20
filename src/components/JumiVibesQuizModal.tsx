import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { JumiVibe } from '../types';

interface JumiVibesQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVibe: (vibe: JumiVibe) => void;
}

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    description: string;
    vibe: JumiVibe;
    emoji: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "It's Saturday 4:00 PM in Kenya. Where would your soul rather be?",
    options: [
      {
        emoji: '🌅',
        label: 'By a calm lake with chilled wine',
        description: 'Watching hippos and flamingos as the golden sun dips into the horizon',
        vibe: 'Sunset Chaser',
      },
      {
        emoji: '🔥',
        label: 'Sitting around cedar embers talking life',
        description: 'Deep, honest conversations with acoustic strings and roasted nyama choma',
        vibe: 'Firepit Philosopher',
      },
      {
        emoji: '🥾',
        label: 'Summiting a volcanic crater or charging rapids',
        description: 'Conquering Longonot or surfing Grade IV white water in Sagana',
        vibe: 'Trailblazer',
      },
      {
        emoji: '🌙',
        label: 'On a rooftop with cocktails & city beats',
        description: 'Vibrant Nairobi skyline, playful tabletop games, and upbeat social energy',
        vibe: 'Night Owl',
      },
    ],
  },
  {
    id: 2,
    question: "What's your go-to weekend fuel?",
    options: [
      {
        emoji: '🥥',
        label: 'Fresh coastal madafu & tropical passion',
        description: 'Light, crisp, and refreshing while soaking in nature',
        vibe: 'Sunset Chaser',
      },
      {
        emoji: '☕',
        label: 'Hot single-origin highland pour-over or spiced tea',
        description: 'Sipped slowly out of a ceramic mug while exchanging ideas',
        vibe: 'Firepit Philosopher',
      },
      {
        emoji: '⚡',
        label: 'Electrolytes & trail fuel for the climb',
        description: 'Energy-packed and ready for whatever terrain lies ahead',
        vibe: 'Trailblazer',
      },
      {
        emoji: '🍸',
        label: 'Craft botanic gin cocktail or spiced mocktail',
        description: 'Playful, artisanal, and setting the tone for the night',
        vibe: 'Night Owl',
      },
    ],
  },
  {
    id: 3,
    question: "When you leave a Jumi trip, what feels most rewarding?",
    options: [
      {
        emoji: '📸',
        label: 'Having paused and soaked in breathtaking scenery',
        description: 'Unwinding mind and body away from notifications',
        vibe: 'Sunset Chaser',
      },
      {
        emoji: '💬',
        label: 'One real, heartfelt conversation with a stranger',
        description: 'Feeling heard, understood, and genuinely connected',
        vibe: 'Firepit Philosopher',
      },
      {
        emoji: '🏆',
        label: 'The physical high of pushing past my comfort zone',
        description: 'Mud on my boots, adrenaline in my veins, summit reached',
        vibe: 'Trailblazer',
      },
      {
        emoji: '🎉',
        label: 'Laughing until my ribs hurt with a bunch of fun people',
        description: 'New inside jokes, funny stories, and a wider circle',
        vibe: 'Night Owl',
      },
    ],
  },
];

const VIBE_DETAILS: Record<JumiVibe, {
  badge: string;
  tagline: string;
  description: string;
  recommendedTypes: string;
  color: string;
}> = {
  'Sunset Chaser': {
    badge: '🌅 The Sunset Chaser',
    tagline: 'Scenic vistas, slow living & visual beauty',
    description: 'You travel to uncompress from city density. You appreciate golden hour reflections on Lake Naivasha, leisurely dhow sails in Lamu, and calm garden sanctuaries.',
    recommendedTypes: 'Glamping, Waterfront Boat Cruises, Tea Tastings & Karen Sound Baths',
    color: 'from-amber-500 to-orange-500 text-amber-950',
  },
  'Firepit Philosopher': {
    badge: '🔥 The Firepit Philosopher',
    tagline: 'Soulful conversation, acoustic sessions & deep community',
    description: 'You believe travel is fundamentally about who sits across the fire with you. You thrive in unhurried settings where people trade stories beneath the stars.',
    recommendedTypes: 'Jumi Campout: No Signal Weekend, Jumi Firepit Music, Swahili Cooking',
    color: 'from-orange-600 to-rose-600 text-white',
  },
  'Trailblazer': {
    badge: '🥾 The Trailblazer',
    tagline: 'High adrenaline, physical thrill & wild terrains',
    description: 'You are allergic to sitting still. You want red dust on your jacket, cold river spray in your face, and the satisfaction of reaching the top ridge.',
    recommendedTypes: 'Sagana River Rafting, Mount Longonot Trek, Kajiado Quad Biking, Kereita Ziplines',
    color: 'from-emerald-600 to-teal-700 text-white',
  },
  'Night Owl': {
    badge: '🌙 The Night Owl',
    tagline: 'Social electricity, upbeat gatherings & city nights',
    description: 'You love the buzz of group dynamics. Whether it is a secret rooftop games night in Westlands or an evening mixer, you shine when laughter flows freely.',
    recommendedTypes: 'Secret Rooftop Games Night, Firepit Afters, Sunset Cocktails',
    color: 'from-purple-600 to-indigo-700 text-white',
  },
};

export const JumiVibesQuizModal: React.FC<JumiVibesQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectVibe,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<JumiVibe[]>([]);
  const [resultVibe, setResultVibe] = useState<JumiVibe | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (vibe: JumiVibe) => {
    const nextAnswers = [...answers, vibe];
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate majority vibe
      const counts: Record<string, number> = {};
      nextAnswers.forEach((v) => {
        counts[v] = (counts[v] || 0) + 1;
      });
      const topVibe = Object.keys(counts).reduce((a, b) =>
        counts[a] > counts[b] ? a : b
      ) as JumiVibe;

      setResultVibe(topVibe);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultVibe(null);
  };

  const handleApplyVibe = () => {
    if (resultVibe) {
      onSelectVibe(resultVibe);
      onClose();
    }
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-extrabold text-sm tracking-tight font-display">
              Jumi Vibes™ Discovery Quiz
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {!resultVibe ? (
            <div className="space-y-5">
              {/* Progress counter */}
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                <div className="flex gap-1.5">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentStep
                          ? 'w-6 bg-amber-500'
                          : i < currentStep
                          ? 'w-3 bg-stone-900'
                          : 'w-3 bg-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question text */}
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-snug">
                {currentQ.question}
              </h2>

              {/* Option cards */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.vibe)}
                    className="w-full text-left p-3.5 rounded-2xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 hover:shadow-sm transition-all group flex items-start gap-3"
                  >
                    <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                      {opt.emoji}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-stone-900 group-hover:text-amber-950">
                        {opt.label}
                      </p>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-5 text-center">
              <div className="py-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                  Your Jumi Vibe Archetype
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 font-display">
                  {VIBE_DETAILS[resultVibe].badge}
                </h2>
                <p className="text-xs font-bold text-stone-500 mt-1">
                  {VIBE_DETAILS[resultVibe].tagline}
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-left text-xs space-y-2">
                <p className="text-stone-700 leading-relaxed">
                  {VIBE_DETAILS[resultVibe].description}
                </p>
                <div className="pt-2 border-t border-stone-200">
                  <p className="font-bold text-stone-900">Recommended for your vibe:</p>
                  <p className="text-amber-800 font-semibold mt-0.5">
                    {VIBE_DETAILS[resultVibe].recommendedTypes}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 text-left flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Buddy Match™ Activated:</strong> When you book solo, we'll connect you with fellow {resultVibe} attendees!
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 font-bold text-xs hover:bg-stone-50 flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                <button
                  onClick={handleApplyVibe}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Filter Experiences for {resultVibe}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
