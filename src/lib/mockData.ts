
import { Product, Category } from './types';

// Helper to create dates relative to current date
const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const daysBeforeNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro M2',
    brand: 'Apple',
    model: 'MacBook Pro 14"',
    category: 'electronics',
    purchaseDate: daysBeforeNow(60),
    purchasePrice: 1999.99,
    retailer: 'Apple Store',
    serialNumber: 'FVFC123456789',
    description: 'Space Gray, 16GB RAM, 512GB SSD',
    imageUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    warranties: [
      {
        id: 'w1',
        type: 'manufacturer',
        provider: 'Apple',
        startDate: daysBeforeNow(60),
        endDate: daysFromNow(305),
        coverageDetails: 'Standard manufacturer warranty covering manufacturing defects and hardware failures.',
        contactInfo: {
          phone: '1-800-275-2273',
          email: 'support@apple.com',
          website: 'https://support.apple.com',
        },
        documents: ['AppleCare_receipt.pdf'],
      },
      {
        id: 'w2',
        type: 'extended',
        provider: 'AppleCare+',
        startDate: daysBeforeNow(60),
        endDate: daysFromNow(1035),
        coverageDetails: 'Extended warranty covering accidental damage and hardware failures for 3 years.',
        contactInfo: {
          phone: '1-800-275-2273',
          email: 'support@apple.com',
          website: 'https://support.apple.com/applecare',
        },
        documents: ['AppleCare_terms.pdf'],
      },
    ],
  },
  {
    id: '2',
    name: 'Samsung 65" QLED TV',
    brand: 'Samsung',
    model: 'QN65Q80C',
    category: 'electronics',
    purchaseDate: daysBeforeNow(120),
    purchasePrice: 1299.99,
    retailer: 'Best Buy',
    serialNumber: 'SAMSQ65X123456',
    description: '4K QLED Smart TV with Quantum HDR',
    imageUrl: 'https://images.pexels.com/photos/1682519/pexels-photo-1682519.jpeg',
    warranties: [
      {
        id: 'w3',
        type: 'manufacturer',
        provider: 'Samsung',
        startDate: daysBeforeNow(120),
        endDate: daysFromNow(245),
        coverageDetails: 'Standard manufacturer warranty covering manufacturing defects for 1 year.',
        contactInfo: {
          phone: '1-800-726-7864',
          email: 'support@samsung.com',
          website: 'https://www.samsung.com/support',
        },
      },
      {
        id: 'w4',
        type: 'retailer',
        provider: 'Best Buy',
        startDate: daysBeforeNow(120),
        endDate: daysBeforeNow(30),
        coverageDetails: 'Return and exchange policy within 90 days of purchase.',
        contactInfo: {
          phone: '1-888-237-8289',
          website: 'https://www.bestbuy.com/support',
        },
      },
    ],
  },
  {
    id: '3',
    name: 'KitchenAid Stand Mixer',
    brand: 'KitchenAid',
    model: 'Artisan 5KSM175PS',
    category: 'appliances',
    purchaseDate: daysBeforeNow(300),
    purchasePrice: 429.99,
    retailer: 'Williams-Sonoma',
    serialNumber: 'WS123456789',
    description: '5-Quart Stand Mixer, Empire Red',
    imageUrl: 'https://images.pexels.com/photos/4112598/pexels-photo-4112598.jpeg',
    warranties: [
      {
        id: 'w5',
        type: 'manufacturer',
        provider: 'KitchenAid',
        startDate: daysBeforeNow(300),
        endDate: daysFromNow(430),
        coverageDetails: 'Limited warranty covering parts and labor for manufacturing defects for 2 years.',
        contactInfo: {
          phone: '1-800-541-6390',
          email: 'customer_care@kitchenaid.com',
          website: 'https://www.kitchenaid.com/support',
        },
      },
    ],
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    brand: 'Sony',
    model: 'WH-1000XM5',
    category: 'electronics',
    purchaseDate: daysBeforeNow(45),
    purchasePrice: 349.99,
    retailer: 'Amazon',
    serialNumber: 'SNY987654321',
    description: 'Noise Cancelling Wireless Headphones, Black',
    imageUrl: 'https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg',
    warranties: [
      {
        id: 'w6',
        type: 'manufacturer',
        provider: 'Sony',
        startDate: daysBeforeNow(45),
        endDate: daysFromNow(320),
        coverageDetails: 'Standard manufacturer warranty covering manufacturing defects for 1 year.',
        contactInfo: {
          phone: '1-239-245-6354',
          email: 'support@sony.com',
          website: 'https://www.sony.com/electronics/support',
        },
      },
      {
        id: 'w7',
        type: 'retailer',
        provider: 'Amazon',
        startDate: daysBeforeNow(45),
        endDate: daysFromNow(15),
        coverageDetails: 'Return policy for 60 days from date of purchase.',
        contactInfo: {
          website: 'https://www.amazon.com/help',
        },
      },
    ],
  },
  {
    id: '5',
    name: 'Dyson V15 Vacuum',
    brand: 'Dyson',
    model: 'V15 Detect',
    category: 'appliances',
    purchaseDate: daysBeforeNow(180),
    purchasePrice: 749.99,
    retailer: 'Dyson Online Store',
    serialNumber: 'DYS2023V15XYZ',
    description: 'Cordless vacuum with laser dust detection',
    imageUrl: 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg',
    warranties: [
      {
        id: 'w8',
        type: 'manufacturer',
        provider: 'Dyson',
        startDate: daysBeforeNow(180),
        endDate: daysFromNow(550),
        coverageDetails: 'Standard manufacturer warranty covering parts and labor for 2 years.',
        contactInfo: {
          phone: '1-866-693-9766',
          email: 'support@dyson.com',
          website: 'https://www.dyson.com/support',
        },
        documents: ['dyson_warranty_card.pdf'],
      },
    ],
  }
];

export const getWarrantyStatus = (endDate: Date): 'active' | 'expiring' | 'expired' => {
  const now = new Date();
  const daysUntilExpiration = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiration < 0) return 'expired';
  if (daysUntilExpiration <= 30) return 'expiring';
  return 'active';
};

export const categoryIcons: Record<Category, string> = {
  electronics: 'Laptop',
  appliances: 'Refrigerator',
  furniture: 'Armchair',
  automotive: 'Car',
  clothing: 'Shirt',
  sports: 'Dumbbell',
  jewelry: 'Watch',
  tools: 'Hammer',
  other: 'Package'
};
