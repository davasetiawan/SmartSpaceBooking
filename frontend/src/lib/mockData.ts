export interface Space {
  id: string;
  name: string;
  category: 'Focus Pod' | 'Personal Desk' | 'Executive Studio' | 'Boardroom' | 'Solarium Garden' | 'Library Lounge' | 'Amphitheater';
  location: string;
  city: 'Jakarta' | 'Bandung' | 'Bali' | 'Surabaya';
  capacity: number;
  hourlyRate: number;
  dailyRate: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  amenities: string[];
  isAvailable: boolean;
  statusText?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  spaceId: string;
  spaceName: string;
  spaceCategory: string;
  location: string;
  imageUrl: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  date: string;
  timeSlot: string;
  durationHours: number;
  totalAmount: number;
  status: 'active' | 'pending' | 'finished' | 'cancelled';
  keycardPin: string;
  assignedSeat: string;
  addOns: string[];
  createdAt: string;
  qrPayload: string;
}

export interface Voucher {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  maxDiscount?: number;
  validUntil: string;
  usageCount: number;
  quota: number;
  isActive: boolean;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  tier: 'Architect' | 'Resident' | 'Atelier' | 'Nomad';
  totalBookings: number;
  lifetimeSpend: number;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
}

export const INITIAL_SPACES: Space[] = [
  {
    id: 'sp-1',
    name: 'The Travertine Executive Studio',
    category: 'Executive Studio',
    location: 'SCBD Lot 8, Jakarta',
    city: 'Jakarta',
    capacity: 4,
    hourlyRate: 175000,
    dailyRate: 1200000,
    rating: 4.96,
    reviewsCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    description: 'Minimalist Scandinavian & Japanese bespoke sanctuary with travertine marble credenza, oak work desk, and floor-to-ceiling sheer glass curtain.',
    amenities: ['Ergonomic Herman Miller Chair', '4K Presentation Display', 'Private Barista Access', 'Acoustic Soundproofing', 'Ultra-Fast 1Gbps Fiber'],
    isAvailable: true,
    statusText: 'Tersedia Hari Ini'
  },
  {
    id: 'sp-2',
    name: 'Nordic Oak Boardroom Salon',
    category: 'Boardroom',
    location: 'Dago Atas Heritage, Bandung',
    city: 'Bandung',
    capacity: 12,
    hourlyRate: 350000,
    dailyRate: 2400000,
    rating: 4.98,
    reviewsCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1400&q=85',
    description: 'Monolithic warm travertine conference table, concealed brass cable management, linen upholstered chairs overlooking bamboo courtyards.',
    amenities: ['12 Executive Seats', 'Smart Video Bar Conference', 'Travertine Island', 'Direct Courtyard Access', 'Private Pantry'],
    isAvailable: true,
    statusText: 'Tersedia'
  },
  {
    id: 'sp-3',
    name: 'Solarium Greenery Glasshouse',
    category: 'Solarium Garden',
    location: 'Batu Bolong, Canggu Bali',
    city: 'Bali',
    capacity: 6,
    hourlyRate: 200000,
    dailyRate: 1450000,
    rating: 4.92,
    reviewsCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=85',
    description: 'Black steel glass pergola with dappled golden hour sunlight, lush potted fiddle-leaf figs, woven rattan seating, limestone paved floor.',
    amenities: ['Natural Ambient Light', 'Tropical Greenery Framing', 'Outdoor Terrace Lounge', 'Specialty Pour-over Station', 'Pet-Friendly Area'],
    isAvailable: true,
    statusText: 'Tersedia'
  },
  {
    id: 'sp-4',
    name: 'Sunken Wabi-Sabi Rooftop Salon',
    category: 'Solarium Garden',
    location: 'Senopati, Jakarta Selatan',
    city: 'Jakarta',
    capacity: 8,
    hourlyRate: 250000,
    dailyRate: 1800000,
    rating: 4.99,
    reviewsCount: 76,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85',
    description: 'Curved panoramic glass pavilion overlooking morning mist, sunken seating lounge with caramel linen cushions, raw clay plaster walls.',
    amenities: ['Sunken Lounge Pit', 'Yakisugi Timber Coffee Table', 'Washi Lantern Lighting', 'Panoramic City View', 'Quiet Zone'],
    isAvailable: false,
    statusText: 'Terisi Hingga 15:00'
  },
  {
    id: 'sp-5',
    name: 'Architectural Mezzanine Library',
    category: 'Library Lounge',
    location: 'Pakuwon City, Surabaya',
    city: 'Surabaya',
    capacity: 10,
    hourlyRate: 150000,
    dailyRate: 950000,
    rating: 4.89,
    reviewsCount: 160,
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85',
    description: 'Floor-to-ceiling blonde oak timber bookshelves, curated design monographs, curved cream modular sofa, individual reading lamps.',
    amenities: ['Curated Book Library', 'Individual Focus Lamps', 'High Ceiling Acoustic', 'Herringbone Flooring', 'High-Speed Wi-Fi 6'],
    isAvailable: true,
    statusText: 'Tersedia'
  },
  {
    id: 'sp-6',
    name: 'Acoustic Bouclé Focus Pod',
    category: 'Focus Pod',
    location: 'SCBD Lot 8, Jakarta',
    city: 'Jakarta',
    capacity: 1,
    hourlyRate: 75000,
    dailyRate: 500000,
    rating: 4.95,
    reviewsCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
    description: 'Curved acoustic oak wood nook, plush bouclé seat bench, floating travertine stone laptop shelf, private dimmable brass lighting.',
    amenities: ['100% Sound Isolation', 'Floating Travertine Desk', 'USB-C Fast Charging', 'Ergonomic Bouclé Seat', 'Private Air Flow'],
    isAvailable: true,
    statusText: 'Tersedia'
  },
  {
    id: 'sp-7',
    name: 'Minimalist Personal Workstation',
    category: 'Personal Desk',
    location: 'Canggu Sanctuary, Bali',
    city: 'Bali',
    capacity: 1,
    hourlyRate: 50000,
    dailyRate: 320000,
    rating: 4.88,
    reviewsCount: 420,
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85',
    description: 'Solid blonde oak desk, ambient morning sunlight, brass desk lamp, ergonomic chair, calm Scandinavian aesthetic.',
    amenities: ['Ergonomic Task Chair', 'Dedicated Power Outlets', 'High-Speed LAN/Wi-Fi', 'Free Flow Artisan Tea', 'Locker Storage'],
    isAvailable: true,
    statusText: 'Tersedia'
  },
  {
    id: 'sp-8',
    name: 'Oak & Travertine Amphitheater',
    category: 'Amphitheater',
    location: 'Dago Heritage, Bandung',
    city: 'Bandung',
    capacity: 28,
    hourlyRate: 650000,
    dailyRate: 4500000,
    rating: 4.97,
    reviewsCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85',
    description: 'Tiered gently curved stepped seating platforms in honey oak and micro-cement, camel linen cushions, recessed floor up-lighting.',
    amenities: ['Laser 4K Projection System', 'Wireless Microphones', 'Tiered Cushion Seating', 'Catering Prep Kitchen', 'Acoustic Soundstage'],
    isAvailable: true,
    statusText: 'Tersedia'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    bookingCode: 'WM-2026-8902',
    spaceId: 'sp-1',
    spaceName: 'The Travertine Executive Studio',
    spaceCategory: 'Executive Studio',
    location: 'SCBD Lot 8, Jakarta',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    guestName: 'Pradnya Paramita',
    guestEmail: 'pradnya.paramita@archstudio.id',
    guestPhone: '+62 812-8923-1100',
    date: '2026-09-18',
    timeSlot: '09:00 - 13:00 WIB',
    durationHours: 4,
    totalAmount: 700000,
    status: 'active',
    keycardPin: '8942',
    assignedSeat: 'STUDIO-01',
    addOns: ['Single Origin Pour-over (2x)', 'Presentation Screen Adapter'],
    createdAt: '2026-09-17 18:30 WIB',
    qrPayload: 'WM-PASS-2026-8902-PRADNYA-STUDIO01-VERIFIED'
  },
  {
    id: 'bk-102',
    bookingCode: 'WM-2026-8903',
    spaceId: 'sp-2',
    spaceName: 'Nordic Oak Boardroom Salon',
    spaceCategory: 'Boardroom',
    location: 'Dago Atas Heritage, Bandung',
    imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1400&q=85',
    guestName: 'Dava Setiawan',
    guestEmail: 'dava.setiawan@ateliertech.co',
    guestPhone: '+62 811-9821-4433',
    date: '2026-09-19',
    timeSlot: '13:00 - 17:00 WIB',
    durationHours: 4,
    totalAmount: 1400000,
    status: 'pending',
    keycardPin: '4120',
    assignedSeat: 'BOARDROOM-A',
    addOns: ['Conference Video Kit', 'Artisan Coffee Barista Setup'],
    createdAt: '2026-09-18 08:15 WIB',
    qrPayload: 'WM-PASS-2026-8903-DAVA-BOARDROOMA-PENDING'
  },
  {
    id: 'bk-103',
    bookingCode: 'WM-2026-8840',
    spaceId: 'sp-3',
    spaceName: 'Solarium Greenery Glasshouse',
    spaceCategory: 'Solarium Garden',
    location: 'Batu Bolong, Canggu Bali',
    imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=85',
    guestName: 'Elena Rostova',
    guestEmail: 'elena@rostova-design.com',
    guestPhone: '+62 813-7721-9988',
    date: '2026-09-15',
    timeSlot: '10:00 - 18:00 WIB',
    durationHours: 8,
    totalAmount: 1450000,
    status: 'finished',
    keycardPin: '9012',
    assignedSeat: 'SOLARIUM-04',
    addOns: ['Fresh Coconut Refresher (4x)'],
    createdAt: '2026-09-14 11:00 WIB',
    qrPayload: 'WM-PASS-2026-8840-ELENA-FINISHED'
  },
  {
    id: 'bk-104',
    bookingCode: 'WM-2026-8812',
    spaceId: 'sp-6',
    spaceName: 'Acoustic Bouclé Focus Pod',
    spaceCategory: 'Focus Pod',
    location: 'SCBD Lot 8, Jakarta',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
    guestName: 'Raden Wijaya',
    guestEmail: 'raden.wijaya@invest.co.id',
    guestPhone: '+62 818-4422-0011',
    date: '2026-09-12',
    timeSlot: '14:00 - 16:00 WIB',
    durationHours: 2,
    totalAmount: 150000,
    status: 'cancelled',
    keycardPin: '1288',
    assignedSeat: 'POD-B02',
    addOns: [],
    createdAt: '2026-09-11 16:20 WIB',
    qrPayload: 'WM-PASS-2026-8812-CANCELLED'
  }
];

export const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 'vc-1',
    code: 'SONDERLUXURY',
    discountType: 'percentage',
    discountValue: 20,
    minSpend: 200000,
    maxDiscount: 150000,
    validUntil: '2026-10-31',
    usageCount: 42,
    quota: 100,
    isActive: true
  },
  {
    id: 'vc-2',
    code: 'ATELIER50K',
    discountType: 'fixed',
    discountValue: 50000,
    minSpend: 150000,
    validUntil: '2026-12-31',
    usageCount: 88,
    quota: 250,
    isActive: true
  },
  {
    id: 'vc-3',
    code: 'WELCOMEARCH',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 100000,
    maxDiscount: 100000,
    validUntil: '2026-09-30',
    usageCount: 119,
    quota: 200,
    isActive: true
  }
];

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mb-1',
    name: 'Pradnya Paramita',
    email: 'pradnya.paramita@archstudio.id',
    phone: '+62 812-8923-1100',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    tier: 'Architect',
    totalBookings: 24,
    lifetimeSpend: 14500000,
    status: 'active',
    joinedDate: '2025-11-12'
  },
  {
    id: 'mb-2',
    name: 'Dava Setiawan',
    email: 'dava.setiawan@ateliertech.co',
    phone: '+62 811-9821-4433',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tier: 'Resident',
    totalBookings: 18,
    lifetimeSpend: 9800000,
    status: 'active',
    joinedDate: '2026-01-08'
  },
  {
    id: 'mb-3',
    name: 'Elena Rostova',
    email: 'elena@rostova-design.com',
    phone: '+62 813-7721-9988',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    tier: 'Atelier',
    totalBookings: 32,
    lifetimeSpend: 22400000,
    status: 'active',
    joinedDate: '2025-08-19'
  },
  {
    id: 'mb-4',
    name: 'Raden Wijaya',
    email: 'raden.wijaya@invest.co.id',
    phone: '+62 818-4422-0011',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    tier: 'Nomad',
    totalBookings: 5,
    lifetimeSpend: 1850000,
    status: 'active',
    joinedDate: '2026-05-14'
  }
];

export const PROPERTY_PROFILE = {
  name: 'WorkMates Sanctuary SCBD & Network',
  tagline: 'Sonder-Inspired Architectural Workspaces',
  flagshipAddress: 'SCBD Lot 8, Jl. Jend. Sudirman Kav 52-53, Jakarta Selatan, 12190',
  operatingHours: 'Senin - Minggu: 07:00 - 22:00 WIB (24/7 untuk Member Resident)',
  conciergePhone: '+62 21 5599 8800',
  conciergeEmail: 'concierge@workmates.id',
  wifiSSID: 'WorkMates_Private_5G',
  wifiKey: 'ArchitecturalCalm2026',
  totalLocations: 4,
  cities: ['Jakarta', 'Bandung', 'Bali', 'Surabaya'],
  totalDesks: 148,
  privateStudiosCount: 16,
  meetingSalonsCount: 8
};
