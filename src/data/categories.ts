import { ExperienceCategory, PersonType, ActivitySubtype } from '../types';

export interface CategoryMeta {
  id: ExperienceCategory;
  name: string;
  icon: string;
  shortDescription: string;
  count: number;
}

export const CATEGORIES_LIST: CategoryMeta[] = [
  {
    id: 'featured',
    name: 'Featured',
    icon: '⭐',
    shortDescription: 'Best-sellers, trending Jumi Campouts & weekend escapes',
    count: 14,
  },
  {
    id: 'things_to_do',
    name: 'Things to do',
    icon: '🎯',
    shortDescription: 'Urban adventures, secret rooftop socials & city game quests',
    count: 9,
  },
  {
    id: 'food_drinks',
    name: 'Food & drinks',
    icon: '🍽️',
    shortDescription: 'Coffee cupping, Swahili cooking, mixology & nyama choma BBQs',
    count: 12,
  },
  {
    id: 'driving_quads',
    name: 'Driving & Quads',
    icon: '🏎️',
    shortDescription: 'Quad biking in Kajiado, off-road 4x4 trails & go-kart racing',
    count: 7,
  },
  {
    id: 'flying_aerial',
    name: 'Flying & Aerial',
    icon: '🪂',
    shortDescription: 'Rift Valley hot air balloons, ziplining & scenic helicopter flips',
    count: 5,
  },
  {
    id: 'getaways_retreats',
    name: 'Getaways & retreats',
    icon: '🏕️',
    shortDescription: 'Naivasha glamping, luxury beach villas & highland retreats',
    count: 11,
  },
  {
    id: 'cruises_waterfront',
    name: 'Cruises & waterfront',
    icon: '🛥️',
    shortDescription: 'Lake Naivasha hippo boat tours & Lamu sunset dhow sailing',
    count: 6,
  },
  {
    id: 'spa_wellness',
    name: 'Spa & wellness',
    icon: '🌿',
    shortDescription: 'Karen forest sound baths, outdoor yoga & therapeutic massage',
    count: 8,
  },
  {
    id: 'classes_courses',
    name: 'Classes & courses',
    icon: '🎨',
    shortDescription: 'Pottery wheel, paint & sip, candle making & coffee barista classes',
    count: 10,
  },
  {
    id: 'animals_nature',
    name: 'Animals & nature',
    icon: '🐾',
    shortDescription: 'Nairobi National Park safaris, Giraffe Sanctuary & bird walks',
    count: 7,
  },
  {
    id: 'days_out_tours',
    name: 'Days out & tours',
    icon: '🥾',
    shortDescription: 'Karura Forest walks, Ngong Hills trails & Mount Longonot crater',
    count: 8,
  },
  {
    id: 'water_sports',
    name: 'Water sports',
    icon: '🌊',
    shortDescription: 'Sagana white-water rafting, Crescent Island kayaking & jet skis',
    count: 6,
  },
  {
    id: 'attractions_theme_parks',
    name: 'Attractions & parks',
    icon: '🎢',
    shortDescription: 'High-rope challenge parks, bowling lounges & gaming complexes',
    count: 5,
  },
  {
    id: 'adventure_outdoor',
    name: 'Adventure & outdoor',
    icon: '⛺',
    shortDescription: 'Kereita forest canopy zip, rock climbing & No Signal campouts',
    count: 12,
  },
  {
    id: 'music_culture',
    name: 'Music & culture',
    icon: '🎶',
    shortDescription: 'Acoustic firepit jams, poetry under the stars & cultural food walks',
    count: 8,
  },
  {
    id: 'business_games',
    name: 'Business Games & Strategy',
    icon: '♟️',
    shortDescription: 'War room simulations, corporate strategy games & team challenges',
    count: 6,
  },
  {
    id: 'founder_retreats',
    name: 'Founder & Exec Retreats',
    icon: '🏔️',
    shortDescription: 'Tech founders fireside, investor summits & highland offsites',
    count: 5,
  },
];

export interface PersonTypeMeta {
  id: PersonType;
  title: string;
  label: string;
  icon: string;
  badge: string;
  subtitle: string;
  idealFor: string;
  perk: string;
}

export const PERSON_TYPES_META: PersonTypeMeta[] = [
  {
    id: 'solo',
    title: 'For One (Solo Explorer)',
    label: 'Solo & Open Match',
    icon: '👤',
    badge: 'Buddy Match™ Ready',
    subtitle: 'Come alone. Never feel lonely. Leave with friends.',
    idealFor: 'Solo travelers, expats, remote workers, students, young professionals',
    perk: 'Free automated Buddy Match before arrival so you know someone in advance',
  },
  {
    id: 'couples',
    title: 'For Two (Couples & Dates)',
    label: 'Couples & Duos',
    icon: '👩‍❤️‍👨',
    badge: 'Romance & Duos',
    subtitle: 'Intimate escapes, creative date nights & weekend surprises',
    idealFor: 'Anniversaries, babymoons, birthdays, first dates, weekend getaways',
    perk: 'Complimentary wine pairing or private photographer option',
  },
  {
    id: 'families',
    title: 'For Families & Clans',
    label: 'Families & Clans',
    icon: '👨‍👩‍👧‍👦',
    badge: 'All-Ages Friendly',
    subtitle: 'Multi-generational bonding with comfort for kids and elders',
    idealFor: 'Family reunions, holiday trips (December/Easter), milestone celebrations',
    perk: 'Private transport, child-safe itineraries, and senior accessibility support',
  },
  {
    id: 'groups_chamas',
    title: 'For Groups & Chamas',
    label: 'Chamas, SACCOs & Squads',
    icon: '👥',
    badge: 'Pole-Pole Savings',
    subtitle: 'Friend squads, Chamas, SACCOs, church fellowships & corporate teams',
    idealFor: 'Chama annual retreats, SACCO vacations, corporate team building, friends',
    perk: 'Pay Pole-Pole over 2 to 6 months + WhatsApp Itinerary pitch generator',
  },
];

export interface ActivitySubtypeMeta {
  id: ActivitySubtype;
  label: string;
  icon: string;
  color: string;
}

export const ACTIVITY_SUBTYPES: ActivitySubtypeMeta[] = [
  { id: 'creative_craft', label: 'Creative & Craft', icon: '🎨', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'culinary_tasting', label: 'Culinary & Tastings', icon: '🍷', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'adrenaline_outdoor', label: 'Adrenaline & Outdoors', icon: '⚡', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'relaxation_escape', label: 'Relaxation & Escape', icon: '🌿', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'social_nightlife', label: 'Social & Campfires', icon: '🔥', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'wildlife_marine', label: 'Wildlife & Safari', icon: '🦒', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
];
