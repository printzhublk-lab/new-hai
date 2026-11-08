import { Product, DeliveryZone, Order, QuotationRequest, WholesaleEnquiry, AuditLog } from '../types';

export const HERO_IMAGES = {
  haiLogistic: '/src/assets/images/hai_logistic_hero_1794122585745.jpg',
  rivoraFloral: '/src/assets/images/rivora_floral_hero_1794122586337.jpg',
  ranDiriyaTea: '/src/assets/images/ran_diriya_ceylon_tea_1794122586212.jpg',
  rivoraHamper: '/src/assets/images/rivora_gift_hamper_1794122586933.jpg',
};

export const INITIAL_PRODUCTS: Product[] = [
  // --- RIVORA PRODUCTS ---
  {
    id: 'riv-01',
    businessId: 'rivora',
    name: 'Elysian Garden Ivory Rose Bouquet',
    category: 'Flower Bouquets',
    description: 'Hand-selected premium ivory garden roses, delicate white lisianthus, and fresh eucalyptus foliage wrapped in luxury matte linen paper with silk ribbon.',
    images: [HERO_IMAGES.rivoraFloral],
    basePrice: 12500,
    sku: 'RIV-FL-001',
    stock: 24,
    isAvailable: true,
    featured: true,
    variants: [
      { id: 'v-101', name: 'Classic (12 Stems)', price: 12500, sku: 'RIV-FL-001-A', stock: 12 },
      { id: 'v-102', name: 'Deluxe (18 Stems)', price: 17500, sku: 'RIV-FL-001-B', stock: 8 },
      { id: 'v-103', name: 'Grand Luxe (24 Stems + Vase)', price: 24000, sku: 'RIV-FL-001-C', stock: 4 }
    ],
    arrangementOptions: ['Hand-Tied Bouquet in Linen Wrap', 'Ceramic Tabletop Vase Included', 'Vintage Glass Urn'],
    includesVase: false,
  },
  {
    id: 'riv-02',
    businessId: 'rivora',
    name: 'The Aurora Artisan Celebration Hamper',
    category: 'Gift Collections',
    description: 'An exquisite celebratory collection featuring artisan mountain wildflower honey, handcrafted macarons, preserved botanical posy, and personalized calligraphy wax-sealed card.',
    images: [HERO_IMAGES.rivoraHamper],
    basePrice: 18500,
    discountedPrice: 16900,
    sku: 'RIV-GF-002',
    stock: 15,
    isAvailable: true,
    featured: true,
    variants: [
      { id: 'v-201', name: 'Signature Gift Box', price: 16900, sku: 'RIV-GF-002-S', stock: 10 },
      { id: 'v-202', name: 'Executive Hamper with French Press', price: 22500, sku: 'RIV-GF-002-E', stock: 5 }
    ],
    arrangementOptions: ['Sage Green Keepsake Box', 'Natural Pine Wood Crate'],
  },
  {
    id: 'riv-03',
    businessId: 'rivora',
    name: 'Blush Ranunculus & Pastel Peony Symphony',
    category: 'Anniversary Gifts',
    description: 'Romantic pastel arrangement with imported Dutch ranunculus, soft pink spray roses, waxflowers, and fragrant seasonal filler stems.',
    images: [HERO_IMAGES.rivoraFloral],
    basePrice: 15800,
    sku: 'RIV-FL-003',
    stock: 18,
    isAvailable: true,
    featured: true,
    variants: [
      { id: 'v-301', name: 'Standard Posy', price: 15800, sku: 'RIV-FL-003-A', stock: 10 },
      { id: 'v-302', name: 'Celebration Grandeur', price: 21000, sku: 'RIV-FL-003-B', stock: 8 }
    ],
    arrangementOptions: ['Linen Wrap with Satin Bow', 'Artisan Stoneware Vase'],
  },
  {
    id: 'riv-04',
    businessId: 'rivora',
    name: 'Rivora Signature Ceylon Spiced Latte & Macaron Set',
    category: 'Café Products and Menu',
    description: 'Freshly roasted single-estate espresso infused with Ceylon cardamom and cinnamon, accompanied by a curated box of 6 handcrafted French macarons.',
    images: [HERO_IMAGES.rivoraFloral],
    basePrice: 3800,
    sku: 'RIV-CF-004',
    stock: 40,
    isAvailable: true,
    featured: false,
    variants: [
      { id: 'v-401', name: 'Café Dine-In Experience Voucher', price: 3800, sku: 'RIV-CF-004-D', stock: 25 },
      { id: 'v-402', name: 'Takeaway Gift Presentation', price: 4200, sku: 'RIV-CF-004-T', stock: 15 }
    ],
  },

  // --- RAN DIRIYA PRODUCTS ---
  {
    id: 'rd-01',
    businessId: 'ran_diriya',
    name: 'Nuwara Eliya Single-Estate Orange Pekoe (OP1)',
    category: 'Ceylon Black Tea',
    description: 'Hand-picked from high-elevation misty hills in Nuwara Eliya at 6,200ft. Golden liquor, delicate floral muscatel notes, and exceptional smoothness in every cup.',
    images: [HERO_IMAGES.ranDiriyaTea],
    basePrice: 2800,
    sku: 'RD-TEA-001',
    stock: 120,
    isAvailable: true,
    featured: true,
    originRegion: 'Nuwara Eliya (High Grown, 6,200 ft)',
    ingredients: '100% Pure Ceylon Single-Estate Black Tea Leaves',
    exportGrade: 'Ceylon Lion Logo Certified OP1',
    storageInstructions: 'Store in airtight foil seal container in a cool, dark, dry place.',
    variants: [
      { id: 'rd-v-101', name: '100g Artisan Tin', price: 2800, sku: 'RD-TEA-001-100G', stock: 50, weightGrams: 100 },
      { id: 'rd-v-102', name: '250g Vacuum Foil Pouch', price: 5400, sku: 'RD-TEA-001-250G', stock: 45, weightGrams: 250 },
      { id: 'rd-v-103', name: '1kg Masterpack (Bulk/Export)', price: 18500, sku: 'RD-TEA-001-1KG', stock: 25, weightGrams: 1000 }
    ]
  },
  {
    id: 'rd-02',
    businessId: 'ran_diriya',
    name: 'Pure Ceylon Alba True Cinnamon Quills',
    category: 'Cinnamon',
    description: 'The highest and rarest grade of genuine Ceylon Cinnamon (Cinnamomum Verum). Slender, pencil-thin multi-layered quills hand-peeled in Mirissa, southern Sri Lanka.',
    images: [HERO_IMAGES.ranDiriyaTea],
    basePrice: 3400,
    sku: 'RD-SP-002',
    stock: 90,
    isAvailable: true,
    featured: true,
    originRegion: 'Mirissa, Southern Province (Coastal Rainforest Belt)',
    ingredients: '100% Pure Ceylon Alba True Cinnamon',
    exportGrade: 'Alba Grade Premium Export (Ultra-low Coumarin)',
    storageInstructions: 'Keep in dry airtight jar away from direct sun exposure.',
    variants: [
      { id: 'rd-v-201', name: '100g Glass Sealed Tube', price: 3400, sku: 'RD-SP-002-100G', stock: 40, weightGrams: 100 },
      { id: 'rd-v-202', name: '250g Foil Gift Pouch', price: 7200, sku: 'RD-SP-002-250G', stock: 35, weightGrams: 250 },
      { id: 'rd-v-203', name: '1kg Export Master Carton', price: 26000, sku: 'RD-SP-002-1KG', stock: 15, weightGrams: 1000 }
    ]
  },
  {
    id: 'rd-03',
    businessId: 'ran_diriya',
    name: 'Matale Grade-1 Tellicherry Black Pepper Bold',
    category: 'Black Pepper',
    description: 'Sun-dried high-piperine black peppercorns harvested from the spice gardens of Matale. Intense pungent aroma and sharp spicy burst.',
    images: [HERO_IMAGES.ranDiriyaTea],
    basePrice: 1950,
    sku: 'RD-SP-003',
    stock: 80,
    isAvailable: true,
    featured: true,
    originRegion: 'Matale Highlands, Central Province',
    ingredients: '100% Whole Sun-Dried Ceylon Black Peppercorns (550 G/L)',
    exportGrade: 'Export Grade 1 High Piperine Whole Peppercorn',
    variants: [
      { id: 'rd-v-301', name: '150g Spice Grinder Refill', price: 1950, sku: 'RD-SP-003-150G', stock: 40, weightGrams: 150 },
      { id: 'rd-v-302', name: '500g Vacuum Pack', price: 5200, sku: 'RD-SP-003-500G', stock: 25, weightGrams: 500 },
      { id: 'rd-v-303', name: '2kg Commercial Sack', price: 18000, sku: 'RD-SP-003-2KG', stock: 15, weightGrams: 2000 }
    ]
  },
  {
    id: 'rd-04',
    businessId: 'ran_diriya',
    name: 'Ceylon Spice Treasury Wooden Connoisseur Box',
    category: 'Spice Gift Collections and Export/Wholesale Products',
    description: 'Handcrafted mahogany wooden keepsake box containing 6 test tubes: Alba Cinnamon, Hand-sorted Green Cardamom, Grade 1 Cloves, Tellicherry Pepper, Mace, and Organic Nutmeg.',
    images: [HERO_IMAGES.ranDiriyaTea],
    basePrice: 14500,
    discountedPrice: 13200,
    sku: 'RD-BX-004',
    stock: 30,
    isAvailable: true,
    featured: true,
    originRegion: 'Multi-Region Sri Lankan Spice Heritage',
    variants: [
      { id: 'rd-v-401', name: 'Collector Wooden Box (6 Spices)', price: 13200, sku: 'RD-BX-004-STD', stock: 20 },
      { id: 'rd-v-402', name: 'Royal Export Hamper (+ Silver Tips Tea)', price: 19800, sku: 'RD-BX-004-LUX', stock: 10 }
    ]
  }
];

export const INITIAL_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'dz-colombo',
    businessId: 'rivora',
    name: 'Colombo 01-15 & Greater Colombo',
    coverageAreas: ['Colombo 1 to 15', 'Dehiwala', 'Mount Lavinia', 'Rajagiriya', 'Nawala', 'Battaramulla'],
    standardFeeLkr: 600,
    expressFeeLkr: 1200,
    freeDeliveryThresholdLkr: 15000,
  },
  {
    id: 'dz-islandwide',
    businessId: 'rivora',
    name: 'Western Province Suburbs & Outstations',
    coverageAreas: ['Gampaha', 'Kalutara', 'Negombo', 'Kandy Central'],
    standardFeeLkr: 1100,
    expressFeeLkr: 2200,
    freeDeliveryThresholdLkr: 25000,
  },
  {
    id: 'dz-rd-domestic',
    businessId: 'ran_diriya',
    name: 'Island-wide Sri Lanka Courier',
    coverageAreas: ['All 25 Districts of Sri Lanka'],
    standardFeeLkr: 450,
    expressFeeLkr: 900,
    freeDeliveryThresholdLkr: 8000,
  },
  {
    id: 'dz-rd-intl',
    businessId: 'ran_diriya',
    name: 'International Express Air Cargo (DHL / FedEx)',
    coverageAreas: ['United Kingdom', 'European Union', 'United States & Canada', 'Australia & New Zealand', 'United Arab Emirates & Gulf'],
    standardFeeLkr: 12500,
    expressFeeLkr: 18500,
    freeDeliveryThresholdLkr: 120000,
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'RIV-2026-8812',
    businessId: 'rivora',
    createdAt: '2026-11-06T14:20:00Z',
    updatedAt: '2026-11-07T09:15:00Z',
    status: 'Ready for Dispatch',
    items: [
      {
        id: 'item-1',
        productId: 'riv-01',
        businessId: 'rivora',
        name: 'Elysian Garden Ivory Rose Bouquet',
        category: 'Flower Bouquets',
        image: HERO_IMAGES.rivoraFloral,
        unitPrice: 17500,
        quantity: 1,
        selectedVariant: { id: 'v-102', name: 'Deluxe (18 Stems)', price: 17500, sku: 'RIV-FL-001-B', stock: 8 },
        personalization: {
          recipientName: 'Dr. Nirmal Senaratne',
          recipientPhone: '+94 77 123 4567',
          greetingCardMessage: 'Happy 50th Milestone Anniversary! Wishing you endless joy and celebration.',
          requestedDeliveryDate: '2026-11-08'
        }
      }
    ],
    subtotal: 17500,
    discountAmount: 0,
    deliveryDetails: {
      customerName: 'Ashani Perera',
      customerEmail: 'ashani.perera@gmail.com',
      customerPhone: '+94 71 889 9001',
      addressLine1: 'No 45, Horton Place',
      city: 'Colombo 07',
      district: 'Colombo',
      country: 'Sri Lanka',
      deliveryOption: 'express_same_day',
      deliveryFee: 1200,
      instructions: 'Please deliver to front security desk with fragile care.'
    },
    paymentMethod: 'payhere',
    paymentReference: 'PAYHERE-TXN-902148',
    paymentStatus: 'paid',
    totalAmount: 18700,
    trackingNumber: 'RIV-TRK-7741'
  },
  {
    id: 'RD-2026-4409',
    businessId: 'ran_diriya',
    createdAt: '2026-11-07T11:00:00Z',
    updatedAt: '2026-11-07T11:05:00Z',
    status: 'Payment Confirmed',
    items: [
      {
        id: 'item-2',
        productId: 'rd-01',
        businessId: 'ran_diriya',
        name: 'Nuwara Eliya Single-Estate Orange Pekoe (OP1)',
        category: 'Ceylon Black Tea',
        image: HERO_IMAGES.ranDiriyaTea,
        unitPrice: 5400,
        quantity: 2,
        selectedVariant: { id: 'rd-v-102', name: '250g Vacuum Foil Pouch', price: 5400, sku: 'RD-TEA-001-250G', stock: 45 }
      },
      {
        id: 'item-3',
        productId: 'rd-02',
        businessId: 'ran_diriya',
        name: 'Pure Ceylon Alba True Cinnamon Quills',
        category: 'Cinnamon',
        image: HERO_IMAGES.ranDiriyaTea,
        unitPrice: 7200,
        quantity: 1,
        selectedVariant: { id: 'rd-v-202', name: '250g Foil Gift Pouch', price: 7200, sku: 'RD-SP-002-250G', stock: 35 }
      }
    ],
    subtotal: 18000,
    discountAmount: 1000,
    couponCode: 'CEYLONHERITAGE',
    deliveryDetails: {
      customerName: 'Marcus Kensington',
      customerEmail: 'm.kensington@londontea.co.uk',
      customerPhone: '+44 20 7946 0912',
      addressLine1: '14 Berkeley Square, Mayfair',
      city: 'London',
      district: 'Greater London',
      country: 'United Kingdom',
      deliveryOption: 'international_express',
      deliveryFee: 12500,
      instructions: 'Signature required on arrival.'
    },
    paymentMethod: 'payhere',
    paymentReference: 'PAYHERE-INTL-4091',
    paymentStatus: 'paid',
    totalAmount: 29500,
    trackingNumber: 'DHL-EX-9902831'
  }
];

export const INITIAL_QUOTATIONS: QuotationRequest[] = [
  {
    id: 'QUOTE-2026-104',
    createdAt: '2026-11-05T16:45:00Z',
    businessId: 'hai_logistic',
    companyName: 'Lanka Garments Exports PLC',
    contactPerson: 'Prasanna Wickramasinghe',
    email: 'prasanna.w@lankagarments.lk',
    phone: '+94 11 234 5678',
    serviceType: 'Sea Freight',
    originPort: 'Colombo Sea Port (SCT), Sri Lanka',
    destinationPort: 'Hamburg Port, Germany',
    cargoType: 'Finished Apparel & Textiles (FCL)',
    estimatedWeightKg: 14500,
    estimatedVolumeCbm: 58,
    timeline: 'Mid-December 2026 Sailing',
    additionalDetails: 'Requires customs brokerage and export documentation assistance.',
    status: 'Quoted',
    quoteAmountLkr: 1850000
  },
  {
    id: 'QUOTE-2026-105',
    createdAt: '2026-11-07T08:30:00Z',
    businessId: 'hai_logistic',
    companyName: 'BioHealth Pharma Solutions',
    contactPerson: 'Nadeesha Gunawardena',
    email: 'n.guna@biohealth.lk',
    phone: '+94 77 901 2345',
    serviceType: 'Cold Chain',
    originPort: 'Bandaranaike International Airport (CMB)',
    destinationPort: 'Dubai International (DXB)',
    cargoType: 'Temperature-Sensitive Vaccines (2°C - 8°C)',
    estimatedWeightKg: 850,
    estimatedVolumeCbm: 4.2,
    timeline: 'Immediate / Next flight available',
    additionalDetails: 'Full data logger tracking required throughout transit.',
    status: 'New'
  }
];

export const INITIAL_WHOLESALE: WholesaleEnquiry[] = [
  {
    id: 'WHL-2026-052',
    createdAt: '2026-11-04T10:15:00Z',
    businessId: 'ran_diriya',
    buyerName: 'Heinrich Becker',
    companyName: 'Alpen Gewürzhandel GmbH',
    country: 'Germany',
    email: 'h.becker@alpengewuerz.de',
    phone: '+49 89 2018 3901',
    productInterests: ['Pure Ceylon Alba Cinnamon', 'Matale Black Pepper (Whole)', 'Green Cardamom'],
    estimatedVolume: '2 Metric Tons (FCL 20ft container every 2 months)',
    packagingPreference: '25kg Kraft paper poly-lined export sacks',
    portOfDischarge: 'Hamburg Port, Germany',
    comments: 'Requesting phytosanitary certificate, lab analysis on coumarin content, and 500g initial evaluation sample.',
    status: 'Sample Sent'
  },
  {
    id: 'WHL-2026-053',
    createdAt: '2026-11-07T12:00:00Z',
    businessId: 'ran_diriya',
    buyerName: 'Farhan Al-Maktoum',
    companyName: 'Golden Crescent Trading LLC',
    country: 'United Arab Emirates',
    email: 'farhan@goldencrescent.ae',
    phone: '+971 4 398 2211',
    productInterests: ['Nuwara Eliya OP1 Black Tea', 'Ruhuna Low Grown BOPF'],
    estimatedVolume: '5 Metric Tons quarterly',
    packagingPreference: '50kg Bulk Wooden tea chests + 250g retail private label',
    portOfDischarge: 'Jebel Ali Port, Dubai',
    comments: 'Looking for long-term contract pricing and customized blending options.',
    status: 'New'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-11-07T09:15:00Z',
    actor: 'Super Admin',
    role: 'super_admin',
    action: 'Order Status Update',
    details: 'Updated status of order RIV-2026-8812 to "Ready for Dispatch"',
    businessId: 'rivora'
  },
  {
    id: 'log-02',
    timestamp: '2026-11-06T17:30:00Z',
    actor: 'Logistics Manager',
    role: 'logistics_manager',
    action: 'Quotation Issued',
    details: 'Generated quote of LKR 1,850,000 for Lanka Garments Exports PLC (QUOTE-2026-104)',
    businessId: 'hai_logistic'
  },
  {
    id: 'log-03',
    timestamp: '2026-11-05T14:10:00Z',
    actor: 'Ran Diriya Manager',
    role: 'ran_diriya_manager',
    action: 'Wholesale Lead Status',
    details: 'Marked enquiry WHL-2026-052 as "Sample Sent" with DHL tracking ref #99281',
    businessId: 'ran_diriya'
  }
];
