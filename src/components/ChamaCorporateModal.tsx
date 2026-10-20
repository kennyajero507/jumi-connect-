import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  Calculator, 
  Share2, 
  Check, 
  Copy, 
  Users, 
  FileText, 
  ShieldCheck, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface ChamaCorporateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'KES' | 'USD';
}

interface GroupPreset {
  id: string;
  name: string;
  category: string;
  perPersonKes: number;
  perPersonUsd: number;
  defaultMonths: number;
  highlight: string;
}

const PRESETS: GroupPreset[] = [
  {
    id: 'diani-villa',
    name: 'Diani Beach Private 5-Bed Villa (3D/2N + SGR + Private Chef)',
    category: 'Chamas, Families & Executive Retreats',
    perPersonKes: 28500,
    perPersonUsd: 220,
    defaultMonths: 4,
    highlight: 'Private pool, dedicated Swahili chef, First-Class SGR train tickets',
  },
  {
    id: 'naivasha-campout',
    name: 'Lake Naivasha "No Signal" Weekend (2D/1N Flagship Campout)',
    category: 'Friend Squads, Church Youth & Young Pros',
    perPersonKes: 14500,
    perPersonUsd: 110,
    defaultMonths: 3,
    highlight: 'Campfire choma, hippo boat safari, overland bus from Nairobi',
  },
  {
    id: 'sagana-rafting',
    name: 'Sagana River Rafting & Waterfall Plunge (Day Expedition)',
    category: 'Corporate Team Building & Hiking Collectives',
    perPersonKes: 7800,
    perPersonUsd: 60,
    defaultMonths: 2,
    highlight: 'Grade III & IV rapids, waterfall cliff jump, riverside BBQ feast',
  },
  {
    id: 'limuru-firepit',
    name: 'The Jumi Firepit & Pine Forest Sundowner',
    category: 'Social Circles & Community Mixers',
    perPersonKes: 3200,
    perPersonUsd: 25,
    defaultMonths: 2,
    highlight: 'Acoustic indie artists, roasted goat choma & hot spiced cider',
  },
];

export const ChamaCorporateModal: React.FC<ChamaCorporateModalProps> = ({
  isOpen,
  onClose,
  currency,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState('diani-villa');
  const [headcount, setHeadcount] = useState(12);
  const [savingsMonths, setSavingsMonths] = useState(4);
  const [groupType, setGroupType] = useState('Chama / Investment Club');
  const [organizerName, setOrganizerName] = useState('Chama Chairperson');
  const [copiedPitch, setCopiedPitch] = useState(false);

  if (!isOpen) return null;

  const currentPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];
  const unitPrice = currency === 'KES' ? currentPreset.perPersonKes : currentPreset.perPersonUsd;
  const currencySymbol = currency === 'KES' ? 'KSh ' : '$';

  const totalCost = unitPrice * headcount;
  const monthlyContributionPerPerson = Math.round(unitPrice / savingsMonths);
  const totalMonthlyPool = monthlyContributionPerPerson * headcount;

  const handleCopyPitch = () => {
    const pitch = `*OFFICIAL GROUP RETREAT PROPOSAL* 🇰🇪✈️
Prepared by: *${organizerName}* for *${groupType}*

📍 *Destination & Experience:*
${currentPreset.name}

🌟 *Key Highlights:*
• ${currentPreset.highlight}
• Group transport & experienced Jumi team lead included
• Full security, transparent supplier invoicing & flexible cancellation

👥 *Group Size:* ${headcount} members
💰 *Total Experience Cost:* ${currencySymbol}${unitPrice.toLocaleString()} per member

💳 *POLE-POLE SAVINGS PLAN (${savingsMonths} Months):*
Instead of one heavy payment, members contribute in monthly installments:
👉 *Monthly contribution per member:* ${currencySymbol}${monthlyContributionPerPerson.toLocaleString()} / month
🗓️ *Payment Schedule:* 1st of every month for ${savingsMonths} months via group treasurer M-Pesa Till.

Let’s lock in our booking date with Jumi Connect before slots fill up!
Please react with 👍 to confirm your slot on the master list.`;

    navigator.clipboard.writeText(pitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Brand Teal #014856 */}
        <div className="bg-[#014856] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-[#FFA700]" />
            <div>
              <h3 className="font-extrabold text-sm tracking-tight font-display text-white">
                Chama & Corporate Organizer Toolkit
              </h3>
              <p className="text-[11px] text-teal-100 font-normal">
                Pole-Pole savings calculator & WhatsApp pitch generator for group leaders
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-teal-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Target Group Types Pills */}
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Select Your Group Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                'Chama / Investment Club',
                'Corporate / HR Team',
                'SACCO Cooperative',
                'Church / Youth Ministry',
                'Extended Family Clan',
                'Friend Squad & Hiking Club'
              ].map((gt) => (
                <button
                  key={gt}
                  onClick={() => setGroupType(gt)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    groupType === gt
                      ? 'bg-amber-50 border-amber-500 font-bold text-amber-950'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-[11px] leading-tight block">{gt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Select Experience Preset */}
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Choose Target Experience
            </label>
            <div className="space-y-2">
              {PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                const cost = currency === 'KES' ? preset.perPersonKes : preset.perPersonUsd;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      setSelectedPresetId(preset.id);
                      setSavingsMonths(preset.defaultMonths);
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/10'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-extrabold text-stone-900">{preset.name}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{preset.highlight}</p>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="text-sm font-extrabold text-stone-900">
                        {currencySymbol}{cost.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-stone-500 block">/ person</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sliders for Headcount & Months */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold text-stone-700">Members Traveling:</span>
                <span className="font-extrabold text-amber-600 text-sm">{headcount} people</span>
              </div>
              <input
                type="range"
                min="4"
                max="45"
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <span className="text-[10px] text-stone-400">Min 4 to 45 members</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="font-bold text-stone-700">Pole-Pole Savings Window:</span>
                <span className="font-extrabold text-emerald-600 text-sm">{savingsMonths} months</span>
              </div>
              <input
                type="range"
                min="2"
                max="6"
                value={savingsMonths}
                onChange={(e) => setSavingsMonths(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <span className="text-[10px] text-stone-400">2 to 6 months savings schedule</span>
            </div>
          </div>

          {/* Dynamic Calculation Result Box */}
          <div className="p-4 bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl shadow-md space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                  Pole-Pole Member Contribution
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold mt-0.5 text-white">
                  {currencySymbol}{monthlyContributionPerPerson.toLocaleString()}
                  <span className="text-xs text-stone-400 font-normal"> / month / member</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase text-stone-400">Total Group Value</span>
                <p className="text-base font-bold text-stone-200">
                  {currencySymbol}{totalCost.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 text-xs text-stone-300 gap-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>KRA tax-compliant corporate invoicing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-sky-400" />
                <span>Group treasurer M-Pesa split tracking</span>
              </div>
            </div>
          </div>

          {/* Action: Copy WhatsApp pitch */}
          <div className="space-y-2">
            <button
              onClick={handleCopyPitch}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-98 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedPitch ? '✓ Copied to Clipboard! Ready to Paste in WhatsApp' : 'Export Ready-Made Pitch to WhatsApp Group'}</span>
            </button>
            <p className="text-[11px] text-center text-stone-500">
              Formulated specifically to help Chama Chairs, HR managers, and squad leads present transparent proposals to members.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
