/**
 * IFAQA Herbal Remedies — Shared Domain Models & Schema Contracts
 * Location: shared/types/index.ts
 */

// --- Classical Unani Pharmaceutical Forms ---
export type RemedyForm =
  | 'Majun'
  | 'Safoof'
  | 'Sharbat'
  | 'Arq'
  | 'Hab'
  | 'Khamira'
  | 'Kushta'
  | 'Raughan'
  | 'Marham';

// --- Botanical Ingredient Interface ---
export interface HerbalIngredient {
  botanicalName: string;         // e.g. "Cuminum cyminum"
  commonName: string;            // e.g. "Zira Siyah / Caraway"
  partUsed: string;              // e.g. "Dried Seeds"
  proportion: string;            // e.g. "25%"
}

// --- Dosage Instructions Interface ---
export interface DosageInstructions {
  amount: string;                // e.g. "5 grams (half a teaspoon)"
  timing: string;                // e.g. "Twice daily after meals"
  anupana: string;               // Traditional vehicle: "With lukewarm spring water"
  contraindications: string[];   // Specific medical contraindications
}

// --- Packaging Specifications ---
export interface RemedyPackaging {
  size: string;                  // e.g. "250g", "500ml", "10g"
  containerType: string;         // e.g. "Amber Glass Jar with Gold Crest Lid"
}

// --- Master Herbal Remedy Contract ---
export interface HerbalRemedy {
  id: string;                    // Document ID (slug-based, e.g. "jawarish-kamuni-kabir")
  sku: string;                   // Unique SKU: "IFA-HAZ-001"
  name: string;                  // Primary English/Brand Name: "Jawarish Kamuni Kabir"
  urduName: string;              // Classical Arabic/Urdu Script: "جوارش کمونی کبیر"
  romanUrduName: string;         // Romanized Urdu: "Jawarish Kamuni Kabir"
  slug: string;                  // URL-safe Slug: "jawarish-kamuni-kabir"
  categoryId: AilmentCategoryId; // Foreign Key to Ailment Category
  categoryName: string;          // Denormalized Category Name for UI performance
  shortDescription: string;      // 1-2 sentence luxury teaser
  longDescription: string;       // In-depth botanical & clinical traditional description
  therapeuticIndications: string[];// Clinical indications list
  herbalIngredients: HerbalIngredient[];
  dosageInstructions: DosageInstructions;
  form: RemedyForm;
  packaging: RemedyPackaging;
  pricePKR: number;              // Base price in Pakistani Rupees (PKR)
  comparePricePKR?: number;      // Original strikethrough price in PKR
  priceUSD: number;              // International price in US Dollars (USD)
  stockQuantity: number;         // Current dispensary inventory
  isAvailable: boolean;          // General availability flag
  isFeatured: boolean;           // Showcase on homepage feature carousel
  isBestSeller: boolean;         // Best seller distinction
  rating: number;                // Aggregate rating (1.0 to 5.0)
  reviewCount: number;           // Approved review count
  images: string[];              // Gallery image URLs
  primaryImage: string;          // Hero display image URL
  createdAt?: string;            // ISO Timestamp or Firestore Timestamp
  updatedAt?: string;            // ISO Timestamp or Firestore Timestamp
}

// --- Ailment Category IDs (Classical Desi Dawakhana System) ---
export type AilmentCategoryId =
  | 'hazim'                      // Digestive & Gastrointestinal
  | 'muqawwi'                    // Vitality & Cognitive Energy
  | 'sual'                       // Respiratory, Bronchial & Cough
  | 'mafasil'                    // Joint Mobility & Musculoskeletal
  | 'jild'                       // Dermatological Health & Blood Purification
  | 'quwwat-e-mudafiat';         // Immunity, Longevity & Cardiac Health

// --- Ailment Category Contract ---
export interface AilmentCategory {
  id: AilmentCategoryId | (string & {});
  name: string;                  // e.g. "Digestive & Gastrointestinal"
  urduName: string;              // e.g. "ہاضمہ اور معدہ"
  romanName: string;             // e.g. "Hazim"
  slug: string;                  // e.g. "hazim"
  tagline: string;               // e.g. "Restoring gastrointestinal equilibrium and metabolic fire"
  description: string;           // Medical category overview
  iconIdentifier: string;        // 3D icon / botanical emblem identifier
  bannerImage: string;           // Header artwork URL
  displayOrder: number;          // Visual sorting sequence (1 to 6)
  remedyCount: number;           // Count of active formulations
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// --- Promotional Hero Banners Contract ---
export type BannerPlacement = 'hero' | 'announcement_bar' | 'mid_page_feature';
export type BannerGradient = 'mauve-reserve' | 'steel-night' | 'none';
export type BannerTextAlignment = 'left' | 'center' | 'right';

export interface PromotionalBanner {
  id: string;                    // e.g. "banner-winter-respiratory-2026"
  headline: string;              // e.g. "Imperial Dawakhana Formulations"
  subheadline: string;           // e.g. "Formulated with 24K Gold Calx & Wild Himalayan Saffron"
  badgeText: string;             // e.g. "HERITAGE HARVEST 2026" (Rendered as Architectural Badge)
  ctaText: string;               // e.g. "Explore Elixirs"
  ctaLink: string;               // e.g. "/catalog/muqawwi"
  imageUrl: string;              // Banner image asset URL
  gradientOverlay: BannerGradient;
  textAlignment: BannerTextAlignment;
  placement: BannerPlacement;
  isActive: boolean;
  priorityOrder: number;
  startsAt?: string;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

// --- Customer Order Item Contract ---
export interface OrderItem {
  remedyId: string;
  sku: string;
  name: string;
  urduName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
  size?: string;
}

// --- Shipping Address Contract ---
export interface ShippingAddress {
  recipientName: string;
  streetAddress: string;
  apartmentSuite?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  deliveryInstructions?: string;
}

// --- Order Lifecycle & Payment Status ---
export type OrderStatus =
  | 'placed'                     // Order submitted by customer
  | 'confirmed'                  // Approved by dispensary admin
  | 'dispensing'                 // Formulated & compounded by Hakeem
  | 'dispatched'                 // Handed to courier partner
  | 'delivered'                  // Confirmed receipt by recipient
  | 'cancelled';                 // Cancelled or refunded

export type PaymentMethod =
  | 'cash_on_delivery'
  | 'bank_transfer'
  | 'credit_card';

export type PaymentStatus =
  | 'pending'
  | 'verified'
  | 'failed'
  | 'refunded';

// --- Master Customer Order Contract ---
export interface CustomerOrder {
  id: string;                    // Firestore Document ID
  orderNumber: string;           // Human-readable reference: "IFA202610492"
  customerId: string;            // Firebase Auth UID or "guest"
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalAmount: number;
  currency: 'PKR' | 'USD';
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Customer Profile Contract ---
export interface SavedAddress extends ShippingAddress {
  id: string;
  label: string;                 // "Home", "Dawakhana / Clinic", "Office"
  isDefault: boolean;
}

export interface CustomerProfile {
  id: string;                    // Firebase Auth UID
  phoneNumber: string;
  fullName: string;
  email?: string;
  savedAddresses: SavedAddress[];
  totalOrdersCount: number;
  lifetimeSpend: number;
  createdAt: string;
  lastActiveAt: string;
}

// --- Customer Review Contract ---
export interface CustomerReview {
  id: string;
  remedyId: string;
  customerId: string;
  customerName: string;
  rating: number;                // 1 to 5
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  approved: boolean;             // Moderation flag (default false)
  createdAt: string;
}

// --- Admin System User Contract ---
export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'super_admin' | 'chief_hakeem' | 'dispensary_staff';
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}


export interface CartItem extends OrderItem {
  remedy?: HerbalRemedy;
  maxStock: number;
  unitPriceUSD: number;
}
