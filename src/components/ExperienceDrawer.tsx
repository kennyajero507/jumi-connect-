import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Star, 
  Check, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Share2, 
  Smartphone, 
  CreditCard, 
  FileText, 
  Car, 
  ChevronRight,
  Info,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { Experience, PersonType } from '../types';

interface ExperienceDrawerProps {
  experience: Experience | null;
  onClose: () => void;
  currency: 'KES' | 'USD';
  onBookSuccess: (experienceTitle: string, guestCount: number, totalAmount: number) => void;
}

export const ExperienceDrawer: React.FC<ExperienceDrawerProps> = ({
  experience,
  onClose,
  currency,
  onBookSuccess,
}) => {
  if (!experience) return null;

  // Active gallery image
  const [selectedImage, setSelectedImage] = useState(experience.imageUrl);

  // Booking config
  const [guestCount, setGuestCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2026-10-24 (Next Saturday)');
  const [enableBuddyMatch, setEnableBuddyMatch] = useState(false);
  const [usePolePole, setUsePolePole] = useState(false);
  const [polePoleDuration, setPolePoleDuration] = useState(experience.polePoleMonths || 3);
  const [transportOption, setTransportOption] = useState<'self' | 'shuttle' | 'cruiser'>('shuttle');
  
  // Checkout flow state
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('0712 345 678');
  const [guestEmail, setGuestEmail] = useState('');
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Calculations
  const unitPrice = currency === 'KES' ? experience.priceKes : experience.priceUsd;
  const currencySymbol = currency === 'KES' ? 'KSh ' : '$';

  // Transport add-on
  const transportCost = transportOption === 'shuttle' 
    ? (currency === 'KES' ? 1500 : 12) 
    : transportOption === 'cruiser' 
    ? (currency === 'KES' ? 3500 : 28) 
    : 0;

  const totalBase = (unitPrice + transportCost) * guestCount;
  const monthlyPolePoleAmount = usePolePole ? Math.round(totalBase / polePoleDuration) : null;
  const totalPoints = experience.jumiPointsEarned * guestCount;

  // Available upcoming weekend dates
  const AVAILABLE_DATES = [
    '2026-10-24 (Next Saturday)',
    '2026-10-31 (End of Month)',
    '2026-11-07 (First Saturday)',
    '2026-11-14 (Mid-Month)',
    '2026-12-12 (Jamhuri Weekend Special)',
  ];

  // Handler for copying WhatsApp group pitch
  const handleCopyWhatsAppPitch = () => {
    const pitchText = `*Hey Squad / Chama! Check out this Jumi Connect Experience:* 🇰🇪✨

*${experience.title}*
📍 *Location:* ${experience.location}
⏳ *Duration:* ${experience.duration}
💰 *Cost:* ${currencySymbol}${unitPrice.toLocaleString()} per person ${experience.polePoleEligible ? `(or Pole-Pole: ${currencySymbol}${Math.round(unitPrice / (experience.polePoleMonths || 3)).toLocaleString()}/mo over ${experience.polePoleMonths} months)` : ''}

*What we get:*
${experience.highlights.map(h => `• ${h}`).join('\n')}

*The Vibe:* ${experience.jumiLevel} (${experience.vibeTags.join(', ')})
Organizer booking link: https://jumi.co.ke/experiences/${experience.id}

Who is in? Reply with 👍 to confirm slots before they sell out!`;

    navigator.clipboard.writeText(pitchText);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 3000);
  };

  const handleCopyMeetingPoint = () => {
    navigator.clipboard.writeText(experience.meetingPoint);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleStartBooking = () => {
    setCheckoutStep('payment');
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
      onBookSuccess(experience.title, guestCount, totalBase);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-5 py-3.5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {experience.categoryLabel}
            </span>
            <span className="text-xs font-bold text-stone-500">
              {experience.jumiLevel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyWhatsAppPitch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors"
              title="Copy WhatsApp Pitch for Group"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{copiedPitch ? 'Copied to WhatsApp!' : 'Chama Pitch'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-5 sm:p-6 space-y-6 flex-1">
          
          {checkoutStep === 'details' && (
            <>
              {/* Media Gallery */}
              <div className="space-y-2">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                  <img
                    src={selectedImage}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{experience.region} · {experience.location}</span>
                  </div>
                </div>

                {experience.galleryUrls && experience.galleryUrls.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                    {experience.galleryUrls.map((url, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(url)}
                        className={`w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                          selectedImage === url ? 'border-amber-500 scale-102 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Ratings */}
              <div>
                <div className="flex items-center gap-2 mb-1 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-stone-900">{experience.rating.toFixed(2)}</span>
                    <span className="text-stone-500 font-medium">({experience.reviewCount} reviews)</span>
                  </div>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-600 font-semibold">{experience.duration}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    +{totalPoints} Points
                  </span>
                </div>

                <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight font-display">
                  {experience.title}
                </h1>
                <p className="mt-2 text-stone-600 text-sm leading-relaxed">
                  {experience.description}
                </p>
              </div>

              {/* Vibe & Persona Badges */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  The Experience Blueprint
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {experience.vibeTags.map((vibe) => (
                    <span key={vibe} className="px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      ✨ {vibe}
                    </span>
                  ))}
                  {experience.hasBuddyMatch && (
                    <span className="px-2.5 py-1 rounded-full font-bold bg-sky-100 text-sky-900 border border-sky-300">
                      👥 Buddy Match™ Ready
                    </span>
                  )}
                  {experience.polePoleEligible && (
                    <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                      💳 Pole-Pole Up to {experience.polePoleMonths} Months
                    </span>
                  )}
                </div>
              </div>

              {/* What's Included & Highlights */}
              <div className="space-y-4">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                  What Makes It Unforgettable
                </h3>
                <ul className="grid grid-cols-1 gap-2.5">
                  {experience.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700 font-medium">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary Timeline */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                  Itinerary & Experience Flow
                </h3>
                <div className="space-y-3 pl-2 border-l-2 border-amber-400">
                  {experience.itinerary.map((step, idx) => (
                    <div key={idx} className="relative pl-4">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white" />
                      <p className="text-[11px] font-bold text-amber-700">{step.time}</p>
                      <h4 className="text-xs font-bold text-stone-900 mt-0.5">{step.title}</h4>
                      <p className="text-xs text-stone-600 mt-0.5">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & What to bring */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                  <h4 className="text-xs font-bold text-emerald-900 mb-2">What is Included</h4>
                  <ul className="space-y-1.5 text-[11px] text-stone-700">
                    {experience.whatsIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <h4 className="text-xs font-bold text-stone-900 mb-2">What to Bring</h4>
                  <ul className="space-y-1.5 text-[11px] text-stone-600">
                    {experience.whatToBring.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Meeting Point with Copy */}
              <div className="p-4 bg-stone-100 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="text-[10px] font-bold uppercase text-stone-500">Departure & Meeting Point</p>
                  <p className="text-stone-900 font-semibold mt-0.5">{experience.meetingPoint}</p>
                </div>
                <button
                  onClick={handleCopyMeetingPoint}
                  className="px-2.5 py-1.5 bg-white rounded-lg border border-stone-300 text-stone-700 text-[11px] font-semibold hover:bg-stone-50 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedAddress ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Host Profile */}
              <div className="p-4 rounded-xl border border-stone-200 flex items-start gap-3.5">
                <img
                  src={experience.host.avatar}
                  alt={experience.host.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-stone-900">{experience.host.name}</span>
                    {experience.host.verified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-stone-500 text-[11px]">{experience.host.role}</p>
                  <p className="text-stone-600 mt-1">{experience.host.bio}</p>
                </div>
              </div>

              {/* BOOKING CONFIGURATOR */}
              <div className="pt-4 border-t-2 border-stone-100 space-y-4">
                <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider">
                  Configure Your Booking
                </h3>

                {/* Date Picker */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Select Departure Slot
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  >
                    {AVAILABLE_DATES.map((date) => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                </div>

                {/* Guests Stepper */}
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div>
                    <p className="text-xs font-bold text-stone-900">Number of Explorers</p>
                    <p className="text-[11px] text-stone-500">Solo, pair, or your whole squad/chama</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-8 h-8 rounded-full bg-white border border-stone-300 font-bold text-stone-700 hover:bg-stone-100 flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="font-extrabold text-sm w-6 text-center">{guestCount}</span>
                    <button
                      onClick={() => setGuestCount(guestCount + 1)}
                      className="w-8 h-8 rounded-full bg-stone-900 text-white font-bold hover:bg-stone-800 flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Transport Options */}
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Transport Arrangement from Nairobi
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setTransportOption('self')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        transportOption === 'self' 
                          ? 'bg-amber-50 border-amber-500 font-bold text-stone-900' 
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      <p className="font-bold text-[11px]">Self-Drive</p>
                      <p className="text-[10px] text-stone-500">Meet at venue</p>
                      <p className="text-[10px] text-emerald-700 font-bold mt-1">Free</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTransportOption('shuttle')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        transportOption === 'shuttle' 
                          ? 'bg-amber-50 border-amber-500 font-bold text-stone-900' 
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      <p className="font-bold text-[11px]">Jumi Overland</p>
                      <p className="text-[10px] text-stone-500">Bus & playlist</p>
                      <p className="text-[10px] text-stone-700 font-bold mt-1">+{currencySymbol}{currency === 'KES' ? '1,500' : '12'}</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTransportOption('cruiser')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        transportOption === 'cruiser' 
                          ? 'bg-amber-50 border-amber-500 font-bold text-stone-900' 
                          : 'bg-white border-stone-200 text-stone-600'
                      }`}
                    >
                      <p className="font-bold text-[11px]">4x4 Landcruiser</p>
                      <p className="text-[10px] text-stone-500">Open-top safari</p>
                      <p className="text-[10px] text-stone-700 font-bold mt-1">+{currencySymbol}{currency === 'KES' ? '3,500' : '28'}</p>
                    </button>
                  </div>
                </div>

                {/* SOLO TRAVELER: Buddy Match Feature */}
                {experience.hasBuddyMatch && guestCount === 1 && (
                  <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="buddyMatchToggle"
                        checked={enableBuddyMatch}
                        onChange={(e) => setEnableBuddyMatch(e.target.checked)}
                        className="w-4 h-4 text-sky-600 rounded mt-0.5 cursor-pointer"
                      />
                      <label htmlFor="buddyMatchToggle" className="cursor-pointer">
                        <span className="text-xs font-bold text-sky-950 block">
                          Activate Buddy Match™ (Free Solo Feature)
                        </span>
                        <span className="text-[11px] text-sky-800 block mt-0.5 leading-snug">
                          Coming alone? We'll match you with a compatible attendee of similar vibe before the event so you know someone before arriving.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* GROUP / CHAMA: Pole-Pole Installment Feature */}
                {experience.polePoleEligible && (
                  <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="polePoleToggle"
                        checked={usePolePole}
                        onChange={(e) => setUsePolePole(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded mt-0.5 cursor-pointer"
                      />
                      <label htmlFor="polePoleToggle" className="cursor-pointer">
                        <span className="text-xs font-bold text-emerald-950 block">
                          Pay Pole-Pole in M-Pesa Installments
                        </span>
                        <span className="text-[11px] text-emerald-800 block mt-0.5 leading-snug">
                          Break your payment down into manageable monthly M-Pesa deductions over {experience.polePoleMonths} months.
                        </span>
                      </label>
                    </div>

                    {usePolePole && (
                      <div className="mt-3 pt-3 border-t border-emerald-200/80 flex items-center justify-between text-xs">
                        <span className="text-emerald-900 font-semibold">
                          Monthly Installment:
                        </span>
                        <span className="text-sm font-extrabold text-emerald-950">
                          {currencySymbol}{monthlyPolePoleAmount?.toLocaleString()} / month
                        </span>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </>
          )}

          {/* STEP 2: PAYMENT & M-PESA CHECKOUT SIMULATION */}
          {checkoutStep === 'payment' && (
            <div className="space-y-4">
              <button
                onClick={() => setCheckoutStep('details')}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-semibold"
              >
                ← Back to Details
              </button>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <h3 className="text-sm font-bold text-amber-950">Order Summary</h3>
                <div className="mt-2 text-xs space-y-1 text-stone-700">
                  <div className="flex justify-between">
                    <span>{experience.title} × {guestCount}</span>
                    <span className="font-bold">{currencySymbol}{(unitPrice * guestCount).toLocaleString()}</span>
                  </div>
                  {transportCost > 0 && (
                    <div className="flex justify-between text-stone-500">
                      <span>Transport ({transportOption}) × {guestCount}</span>
                      <span>{currencySymbol}{(transportCost * guestCount).toLocaleString()}</span>
                    </div>
                  )}
                  {enableBuddyMatch && (
                    <div className="flex justify-between text-sky-700 font-semibold">
                      <span>Buddy Match™ Service</span>
                      <span>FREE</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-amber-200 flex justify-between text-sm font-extrabold text-stone-900">
                    <span>Total Amount</span>
                    <span>{currencySymbol}{totalBase.toLocaleString()}</span>
                  </div>
                  {usePolePole && (
                    <div className="pt-1 text-emerald-700 text-xs font-bold flex justify-between">
                      <span>Due Today (Installment 1 of {polePoleDuration})</span>
                      <span>{currencySymbol}{monthlyPolePoleAmount?.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSimulatePayment} className="space-y-3">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Traveler Contact
                </h4>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Achieng Omondi"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 block">M-Pesa Mobile Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="07XX XXX XXX"
                      className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                    />
                    <Smartphone className="w-4 h-4 text-emerald-600 absolute left-2.5 top-2.5" />
                  </div>
                  <p className="text-[10px] text-stone-500 mt-1">
                    An automated M-Pesa STK push prompt will be sent directly to this number.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 block">Email for Tickets & WhatsApp Link</label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="achieng@example.com"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-98 transition-all"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Pay {currencySymbol}{usePolePole ? monthlyPolePoleAmount?.toLocaleString() : totalBase.toLocaleString()} via M-Pesa</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: PROCESSING STK PUSH */}
          {checkoutStep === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-stone-900">Sending M-Pesa STK Push...</h3>
                <p className="text-xs text-stone-500 mt-1">
                  Please check your phone ({guestPhone}) and enter your M-Pesa PIN to complete payment.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: BOOKING SUCCESS */}
          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-stone-900">You're In! Welcome to Jumi.</h3>
                <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                  Your reservation for <strong>{guestCount} explorer{guestCount > 1 ? 's' : ''}</strong> is confirmed. A receipt and private WhatsApp community link has been sent to <strong>{guestEmail || 'your email'}</strong>.
                </p>
              </div>

              {enableBuddyMatch && (
                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 max-w-sm mx-auto text-left">
                  <p className="font-bold">🎉 Buddy Match™ Initiated</p>
                  <p className="text-[11px] mt-0.5 text-sky-800">
                    Our community lead will introduce you to your event buddy via WhatsApp 48 hours prior to departure.
                  </p>
                </div>
              )}

              <div className="pt-4 flex flex-col gap-2 max-w-xs mx-auto">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
                >
                  Done & Return to Catalog
                </button>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM STICKY ACTION BAR (ONLY IN DETAILS STEP) */}
        {checkoutStep === 'details' && (
          <div className="sticky bottom-0 z-20 bg-white border-t border-stone-200 px-5 py-4 flex items-center justify-between gap-4 shadow-lg">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-stone-950">
                  {currencySymbol}{totalBase.toLocaleString()}
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  total for {guestCount} {guestCount === 1 ? 'person' : 'people'}
                </span>
              </div>
              {usePolePole && monthlyPolePoleAmount && (
                <p className="text-xs font-bold text-emerald-700">
                  Pole-Pole: {currencySymbol}{monthlyPolePoleAmount.toLocaleString()}/mo ({polePoleDuration} mos)
                </p>
              )}
            </div>

            <button
              onClick={handleStartBooking}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#014856] via-[#0055D4] to-[#FF5E1E] hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-md shadow-[#014856]/20 active:scale-98 transition-all flex items-center gap-1.5"
            >
              <span>Instant Reserve Slot</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
