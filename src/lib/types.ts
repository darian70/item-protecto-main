
export type Warranty = {
  id: string;
  type: 'manufacturer' | 'retailer' | 'extended';
  provider: string;
  startDate: Date;
  endDate: Date;
  coverageDetails: string;
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  documents?: string[];
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  purchaseDate: Date;
  purchasePrice?: number;
  retailer?: string;
  serialNumber?: string;
  description?: string;
  imageUrl?: string;
  productUrl?: string;  // Added field for product URL
  warranties: Warranty[];
};

export type WarrantyStatus = 'active' | 'expiring' | 'expired';

export type Category = 
  | 'electronics'
  | 'appliances'
  | 'furniture'
  | 'automotive'
  | 'clothing'
  | 'sports'
  | 'jewelry'
  | 'tools'
  | 'other';
