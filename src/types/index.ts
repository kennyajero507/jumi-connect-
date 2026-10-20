export type PersonType = 'solo' | 'couples' | 'families' | 'groups_chamas';

export type ExperienceCategory = 
  | 'featured'
  | 'things_to_do'
  | 'food_drinks'
  | 'driving_quads'
  | 'flying_aerial'
  | 'getaways_retreats'
  | 'cruises_waterfront'
  | 'spa_wellness'
  | 'classes_courses'
  | 'animals_nature'
  | 'days_out_tours'
  | 'water_sports'
  | 'attractions_theme_parks'
  | 'adventure_outdoor'
  | 'music_culture'
  | 'business_games'
  | 'founder_retreats';

export type ActivitySubtype =
  | 'creative_craft'
  | 'culinary_tasting'
  | 'adrenaline_outdoor'
  | 'relaxation_escape'
  | 'social_nightlife'
  | 'wildlife_marine';

export type JumiLevel = 
  | 'Level 1: Fire & Chill'
  | 'Level 2: Off The Grid'
  | 'Level 3: No Signal Weekend'
  | 'Level 4: Jumi Fest'
  | 'Curated Masterclass';

export type JumiVibe = 
  | 'Sunset Chaser' 
  | 'Firepit Philosopher' 
  | 'Trailblazer' 
  | 'Night Owl';

export interface Experience {
  id: string;
  title: string;
  tagline: string;
  category: ExperienceCategory;
  categoryLabel: string;
  personType: PersonType[];
  activitySubtype: ActivitySubtype;
  jumiLevel: JumiLevel;
  location: string;
  region: string; // e.g., 'Nairobi', 'Naivasha', 'Sagana', 'Diani', 'Kajiado', 'Nanyuki'
  priceKes: number;
  priceUsd: number;
  duration: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  galleryUrls: string[];
  vibeTags: JumiVibe[];
  jumiPointsEarned: number;
  badge?: string;
  isBestseller?: boolean;
  hasBuddyMatch?: boolean;
  polePoleEligible?: boolean;
  polePoleMonths?: number;
  minGroupSize?: number;
  maxGroupSize?: number;
  weekendSlot?: string; // e.g. "Sat · 8:00 AM", "Sat · 10:30 AM", "Sun · 2:00 PM"
  isTrendingInNairobi?: boolean;
  isTrendingAcrossKenya?: boolean;
  isClassBentoWorkshop?: boolean;
  isCabinOrCamping?: boolean; // Cabins, A-frames, glamping & wilderness camping
  description: string;
  highlights: string[];
  itinerary: {
    time: string;
    title: string;
    description: string;
  }[];
  whatsIncluded: string[];
  whatToBring: string[];
  host: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    verified: boolean;
  };
  meetingPoint: string;
}

export interface Booking {
  experienceId: string;
  date: string;
  personCount: number;
  personType: PersonType;
  enableBuddyMatch: boolean;
  buddyNotes?: string;
  usePolePole: boolean;
  polePoleMonths: number;
  transportOption: 'self_drive' | 'jumi_shuttle' | 'safari_landcruiser';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  paymentMethod: 'mpesa' | 'card' | 'chama_invoice';
  totalKes: number;
  totalUsd: number;
}

export interface VoucherGift {
  id: string;
  title: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  personalMessage: string;
  amountKes: number;
  voucherCode: string;
  category: string;
}
