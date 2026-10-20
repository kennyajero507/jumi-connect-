import React, { useState } from 'react';
import { X, Gift, Sparkles, Check, Copy, Share2, Download } from 'lucide-react';
import { JumiLogo } from './JumiLogo';

interface GiftJumiModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'KES' | 'USD';
}

const GIFT_PRESETS = [
  { title: 'Karen Pottery & Wine Date', amountKes: 4800, amountUsd: 38, icon: '🎨' },
  { title: 'Sagana River Rafting Day', amountKes: 7800, amountUsd: 60, icon: '🌊' },
  { title: 'Lake Naivasha Campout Pass', amountKes: 14500, amountUsd: 110, icon: '🏕️' },
  { title: 'Couples Romantic Getaway', amountKes: 25000, amountUsd: 190, icon: '👩‍❤️‍👨' },
];

export const GiftJumiModal: React.FC<GiftJumiModalProps> = ({
  isOpen,
  onClose,
  currency,
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [recipientName, setRecipientName] = useState('Wangari Muthoni');
  const [senderName, setSenderName] = useState('Brian & the Crew');
  const [message, setMessage] = useState('Happy Birthday! Pack your bags and get ready to disconnect.');
  const [isCopied, setIsCopied] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('JUMI-GIFT-KE-8492');

  if (!isOpen) return null;

  const currentPreset = GIFT_PRESETS[selectedPresetIndex];
  const amount = currency === 'KES' ? currentPreset.amountKes : currentPreset.amountUsd;
  const currencySymbol = currency === 'KES' ? 'KSh ' : '$';

  const handleCopyCode = () => {
    const giftDetails = `🎁 JUMI CONNECT EXPERIENCE GIFT VOUCHER
Recipient: ${recipientName}
From: ${senderName}
Experience: ${currentPreset.title}
Value: ${currencySymbol}${amount.toLocaleString()}
Voucher Code: ${generatedCode}
Message: "${message}"

Redeem anytime within 12 months at https://jumi.co.ke/redeem?code=${generatedCode}`;

    navigator.clipboard.writeText(giftDetails);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-stone-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header styled in brand teal #014856 */}
        <div className="bg-[#014856] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#FFA700]" />
            <div>
              <h3 className="font-extrabold text-sm tracking-tight font-display text-white">
                Gift a Jumi™ Experience Voucher
              </h3>
              <p className="text-[11px] text-teal-100">
                Give memories, connection, and adventure. Recipient picks their own date.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Preset selection */}
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Select Experience Voucher
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {GIFT_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPresetIndex(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedPresetIndex === idx
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-xl block mb-1">{preset.icon}</span>
                  <p className="text-xs font-extrabold truncate">{preset.title}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {currencySymbol}{(currency === 'KES' ? preset.amountKes : preset.amountUsd).toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-600 block mb-1">Your Name / Sender</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-stone-600 block mb-1">Personal Message</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Digital Gift Voucher Card Preview with Official Brand Gradient & Logo */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#014856] via-[#0055D4] to-[#FF5E1E] text-white p-5 shadow-lg overflow-hidden">
            <div className="absolute right-[-20px] bottom-[-20px] w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFC700] bg-black/25 px-2 py-0.5 rounded">
                  Official Jumi Experience Voucher
                </span>
                <h4 className="text-lg font-black mt-2 font-display">{currentPreset.title}</h4>
              </div>
              <div className="bg-white/95 rounded-lg px-2 py-1 shadow-sm">
                <JumiLogo size="sm" showTagline={false} />
              </div>
            </div>

            <div className="my-3 pt-3 border-t border-white/20 text-xs flex justify-between items-baseline">
              <div>
                <p className="text-[10px] text-amber-200 uppercase">For</p>
                <p className="font-extrabold text-sm">{recipientName || 'Lucky Explorer'}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-amber-200 uppercase">Value</p>
                <p className="font-black text-lg">{currencySymbol}{amount.toLocaleString()}</p>
              </div>
            </div>

            <p className="text-[11px] italic text-amber-100/90 mb-3 line-clamp-2">
              "{message}"
            </p>

            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[11px]">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-amber-200 block">Voucher Code</span>
                <span className="font-mono font-bold tracking-wider">{generatedCode}</span>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-semibold">Valid 12 Months</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleCopyCode}
              className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <Copy className="w-4 h-4 text-amber-400" />
              <span>{isCopied ? '✓ Voucher Details Copied!' : 'Copy Digital Voucher & Link'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
