export type BusinessId = 'hai_logistic' | 'rivora' | 'ran_diriya';

export type UserRole = 
  | 'super_admin' 
  | 'logistics_manager' 
  | 'rivora_manager' 
  | 'ran_diriya_manager' 
  | 'order_staff';

export type OrderStatus = 
  | 'Pending' 
  | 'Awaiting Payment' 
  | 'Payment Confirmed' 
  | 'Processing' 
  | 'Ready for Dispatch' 
  | 'Dispatched' 
  | 'Delivered' 
  | 'Cancelled' 
  | 'Refunded';

export type PaymentMethod = 'payhere' | 'cod' | 'bank_transfer';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Standard Bouquet", "Luxury 24-Stem", "100g Tin", "1kg Vacuum Pack"
  price: number;
  sku: string;
  stock: number;
  weightGrams?: number;
}

export interface Product {
  id: string;
  businessId: 'rivora' | 'ran_diriya';
  name: string;
  category: string;
  description: string;
  images: string[];
  basePrice: number;
  discountedPrice?: number;
  sku: string;
  stock: number;
  isAvailable: boolean;
  featured?: boolean;
  variants: ProductVariant[];
  // Rivora specific
  arrangementOptions?: string[];
  includesVase?: boolean;
  // Ran Diriya specific
  originRegion?: string;
  ingredients?: string;
  exportGrade?: string;
  storageInstructions?: string;
}

export interface PersonalizationDetails {
  recipientName?: string;
  recipientPhone?: string;
  greetingCardMessage?: string;
  requestedDeliveryDate?: string;
  deliveryInstructions?: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  businessId: 'rivora' | 'ran_diriya';
  name: string;
  category: string;
  image: string;
  unitPrice: number;
  quantity: number;
  selectedVariant?: ProductVariant;
  personalization?: PersonalizationDetails;
}

export interface DeliveryDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  postalCode?: string;
  country: string;
  deliveryOption: 'standard' | 'express_same_day' | 'international_express';
  deliveryFee: number;
  instructions?: string;
}

export interface Order {
  id: string;
  businessId: 'rivora' | 'ran_diriya';
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  deliveryDetails: DeliveryDetails;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  totalAmount: number;
  notes?: string;
  trackingNumber?: string;
}

export interface QuotationRequest {
  id: string;
  createdAt: string;
  businessId: 'hai_logistic';
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceType: 'Sea Freight' | 'Air Freight' | 'Customs Brokerage' | 'Cold Chain' | 'Warehousing' | 'Project Cargo';
  originPort: string;
  destinationPort: string;
  cargoType: string;
  estimatedWeightKg: number;
  estimatedVolumeCbm: number;
  timeline: string;
  additionalDetails?: string;
  status: 'New' | 'Under Review' | 'Quoted' | 'Accepted' | 'Declined';
  quoteAmountLkr?: number;
}

export interface WholesaleEnquiry {
  id: string;
  createdAt: string;
  businessId: 'ran_diriya';
  buyerName: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  productInterests: string[];
  estimatedVolume: string; // e.g., "500kg monthly", "20ft Container"
  packagingPreference: string;
  portOfDischarge?: string;
  comments?: string;
  status: 'New' | 'Sample Sent' | 'Negotiating' | 'Contract Signed' | 'Closed';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  details: string;
  businessId?: BusinessId | 'all';
}

export interface DeliveryZone {
  id: string;
  businessId: 'rivora' | 'ran_diriya';
  name: string;
  coverageAreas: string[];
  standardFeeLkr: number;
  expressFeeLkr: number;
  freeDeliveryThresholdLkr: number;
}
