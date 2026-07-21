export type StepCategory = 'cameras' | 'plans' | 'sensors' | 'accessories';

export interface Variant {
  id: string;
  label: string;
  swatchColor: string;
  image?: string; // overrides product.image when selected
}

export interface Product {
  id: string;
  name: string;
  description: string;
  badge?: string;
  image: string;        // default / fallback image path (served from /public)
  variants: Variant[];
  comparePrice?: number;
  price: number;        // 0 = FREE
  category: StepCategory;
  required?: boolean;
  isMonthly?: boolean;
  priceDisplay?: string;
  listHeader?: string;
  features?: string[];
}

export const STEPS = [
  { id: 1, label: 'Choose your cameras', nextLabel: 'Choose your plan', category: 'cameras' as StepCategory },
  { id: 2, label: 'Choose your plan', nextLabel: 'Choose your sensors', category: 'plans' as StepCategory },
  { id: 3, label: 'Choose your sensors', nextLabel: 'Add extra protection', category: 'sensors' as StepCategory },
  { id: 4, label: 'Add extra protection', nextLabel: '', category: null },
] as const;

export const PRODUCTS: Product[] = [
  // ── Cameras ──────────────────────────────────────────────
  {
    id: 'cam-v4',
    name: 'Wyze Cam v4',
    description: 'The clearest Wyze Cam ever made.',
    badge: 'Save 22%',
    image: '/Wyze-Cam-v4.png',
    variants: [
      { id: 'white', label: 'White', swatchColor: '#FFFFFF', image: '/Wyze-Cam-v4-white.png' },
      { id: 'grey', label: 'Grey', swatchColor: '#8B8B8B', image: '/Wyze-Cam-v4-grey.png' },
      { id: 'black', label: 'Black', swatchColor: '#1F1F1F', image: '/Wyze-Cam-v4-black.png' },
    ],
    comparePrice: 35.98,
    price: 27.98,
    category: 'cameras',
  },
  {
    id: 'cam-pan-v3',
    name: 'Wyze Cam Pan v3',
    description: '360° pan and 180° tilt security camera.',
    badge: 'Save 12%',
    image: '/Wyze-Cam-Pan-v3.png',
    variants: [
      { id: 'white', label: 'White', swatchColor: '#FFFFFF', image: '/Wyze-Cam-Pan-v3-white.png' },
      { id: 'black', label: 'Black', swatchColor: '#1F1F1F', image: '/Wyze-Cam-Pan-v3-black.png' },
    ],
    comparePrice: 39.98,
    price: 34.98,
    category: 'cameras',
  },
  {
    id: 'cam-floodlight-v2',
    name: 'Wyze Cam Floodlight v2',
    description: '2K floodlight camera with a 160° wide-angle view for your garage.',
    badge: 'Save 22%',
    image: '/Wyze-Cam-Floodlight-v2.png',
    variants: [
      { id: 'white', label: 'White', swatchColor: '#FFFFFF', image: '/Wyze-Cam-Floodlight-v2-white.png' },
      { id: 'black', label: 'Black', swatchColor: '#1F1F1F', image: '/Wyze-Cam-Floodlight-v2-black.png' },
    ],
    comparePrice: 89.98,
    price: 69.98,
    category: 'cameras',
  },
  {
    id: 'duo-cam-doorbell',
    name: 'Wyze Duo Cam Doorbell',
    description: 'Two cameras. Two views. Double the porch protection.',
    image: '/Wyze-Duo-Cam-Doorbell.png',
    variants: [],
    price: 69.98,
    category: 'cameras',
  },
  {
    id: 'battery-cam-pro',
    name: 'Wyze Battery Cam Pro',
    description: 'Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.',
    image: '/Wyze-Battery-Cam-Pro.png',
    variants: [
      { id: 'white', label: 'White', swatchColor: '#FFFFFF', image: '/Wyze-Battery-Cam-Pro-white.png' },
      { id: 'black', label: 'Black', swatchColor: '#1F1F1F', image: '/Wyze-Battery-Cam-Pro-black.png' },
    ],
    price: 89.98,
    category: 'cameras',
  },

  // ── Plans ─────────────────────────────────────────────────
  {
    id: 'cam-plus',
    name: 'Cam Plus',
    description: 'For a single camera. DIY self-monitoring.',
    badge: 'For a single camera',
    image: '/icons/wyze-plan-icon.svg',
    variants: [],
    price: 2.99,
    priceDisplay: '$2.99/mo*',
    listHeader: 'DIY self-monitoring with:',
    features: [
      '14-day event video recordings saved in the cloud',
      'Person, vehicle, package, and pet detection and alerts',
      'Glass break, Crying, and barking detection and alerts',
      'Animated Alerts',
      'Access to My Day insights',
    ],
    category: 'plans',
    isMonthly: true,
  },
  {
    id: 'cam-unlimited',
    name: 'Cam Unlimited',
    description: 'Covers all your cameras. Unlimited cameras, AI detection, and cloud storage.',
    badge: 'Covers all your cameras',
    image: '/icons/wyze-plan-icon.svg',
    variants: [],
    comparePrice: 12.99,
    price: 9.99,
    priceDisplay: '$9.99/mo',
    listHeader: 'Everything in Cam Plus, and:',
    features: [
      'The brand-new multi-cam timeline for live view and events',
      'Smart Arm/Disarm modes',
      'Friendly Faces detections and unknown faces alerts',
      'Animated Alerts',
    ],
    category: 'plans',
    isMonthly: true,
  },
  {
    id: 'cam-unlimited-pro',
    name: 'Cam Unlimited Pro',
    description: 'Covers all your cameras. Professional dispatch and extra benefits.',
    badge: 'Covers all your cameras',
    image: '/icons/wyze-plan-icon.svg',
    variants: [],
    price: 19.99,
    priceDisplay: '$19.99/mo',
    listHeader: 'Everything in Cam Unlimited, and:',
    features: [
      'Get a detailed understanding of what\'s happening from your notifications with Descriptive Alerts',
      'Quickly find specific events in your video history with AI Video Search',
      'Get access to the option to save up to 60-day event video recording',
      'Send emergency services to your home even when you\'re away with 24/7 Emergency Dispatch',
    ],
    category: 'plans',
    isMonthly: true,
  },

  // ── Sensors ───────────────────────────────────────────────
  {
    id: 'sense-motion',
    name: 'Wyze Sense Motion Sensor',
    description: 'Detects motion up to 26 ft away with a 110° field of view.',
    image: '/Wyze-Sense-Motion-Sensor.png',
    variants: [],
    price: 29.99,
    category: 'sensors',
  },
  {
    id: 'sense-hub',
    name: 'Wyze Sense Hub',
    description: 'Required hub for all Wyze Sense sensors.',
    image: '/Wyze-Sense-Hub.png',
    variants: [],
    comparePrice: 29.92,
    price: 0,
    category: 'sensors',
    required: true,
  },

  // ── Accessories ───────────────────────────────────────────
  {
    id: 'microsd-256',
    name: 'Wyze MicroSD Card (256GB)',
    description: 'High-endurance storage for continuous local recording.',
    image: '/Wyze-MicroSD-Card-256GB.png',
    variants: [],
    price: 20.98,
    category: 'accessories',
  },
];

export const INITIAL_QUANTITIES: Record<string, Record<string, number>> = {
  'cam-v4': { 'white': 1 },
  'cam-pan-v3': { 'white': 2 },
  'cam-floodlight-v2': { 'white': 0, 'black': 0 },
  'duo-cam-doorbell': { '': 0 },
  'battery-cam-pro': { 'white': 0, 'black': 0 },
  'cam-plus': { '': 0 },
  'cam-unlimited': { '': 1 },
  'cam-unlimited-pro': { '': 0 },
  'sense-motion': { '': 2 },
  'sense-hub': { '': 1 },
  'microsd-256': { '': 2 },
};

export const INITIAL_ACTIVE_VARIANTS: Record<string, string> = {
  'cam-v4': 'white',
  'cam-pan-v3': 'white',
  'cam-floodlight-v2': 'white',
  'duo-cam-doorbell': '',
  'battery-cam-pro': 'white',
  'cam-plus': '',
  'cam-unlimited': '',
  'cam-unlimited-pro': '',
  'sense-motion': '',
  'sense-hub': '',
  'microsd-256': '',
};
