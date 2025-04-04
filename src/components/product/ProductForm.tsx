import React from 'react';
import { Link, AlertCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Category } from '@/lib/types';
import ImageUploader from '../ImageUploader';
import WarrantySection from './WarrantySection';

interface ProductFormProps {
  productFormData: {
    name: string;
    brand: string;
    model: string;
    category: Category;
    purchaseDate: string;
    purchasePrice: string;
    retailer: string;
    serialNumber: string;
    description: string;
    imageUrl: string;
    productUrl: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  productFormData, 
  handleInputChange, 
  onSubmit, 
  onCancel 
}) => {
  // All available categories
  const categories: Category[] = [
    'electronics',
    'appliances',
    'furniture',
    'automotive',
    'clothing',
    'sports',
    'jewelry',
    'tools',
    'other'
  ];

  return (
    <form onSubmit={onSubmit}>
      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Input
                type="text"
                name="name"
                value={productFormData.name}
                onChange={handleInputChange}
                className="w-full"
                placeholder="e.g. MacBook Pro"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Brand</label>
              <Input
                type="text"
                name="brand"
                value={productFormData.brand}
                onChange={handleInputChange}
                className="w-full"
                placeholder="e.g. Apple"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Model</label>
              <Input
                type="text"
                name="model"
                value={productFormData.model}
                onChange={handleInputChange}
                className="w-full"
                placeholder="e.g. MacBook Pro 14-inch"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Serial Number</label>
              <Input
                type="text"
                name="serialNumber"
                value={productFormData.serialNumber}
                onChange={handleInputChange}
                className="w-full"
                placeholder="e.g. FVFG123456789"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select 
                className="input-field w-full"
                name="category"
                value={productFormData.category}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Purchase Date</label>
              <Input
                type="date"
                name="purchaseDate"
                value={productFormData.purchaseDate}
                onChange={handleInputChange}
                className="w-full"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Purchase Price</label>
              <Input
                type="number"
                step="0.01"
                name="purchasePrice"
                value={productFormData.purchasePrice}
                onChange={handleInputChange}
                className="w-full"
                placeholder="0.00"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Retailer</label>
              <Input
                type="text"
                name="retailer"
                value={productFormData.retailer}
                onChange={handleInputChange}
                className="w-full"
                placeholder="e.g. Apple Store"
              />
            </div>
          </div>
          
          {/* Product URL */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Product URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="url"
                name="productUrl"
                value={productFormData.productUrl}
                onChange={handleInputChange}
                className="w-full pl-10"
                placeholder="https://store.com/product"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Link to the product page where you purchased the item</p>
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="input-field w-full"
              rows={3}
              name="description"
              value={productFormData.description}
              onChange={handleInputChange}
              placeholder="Add any additional details about your product..."
            />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium mb-1">Product Image</label>
            <ImageUploader onImageUpload={() => {}} />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">AI Warranty Detection</h4>
              <p className="text-xs text-blue-700 mt-1">
                Upload an image of your receipt or product to automatically detect warranty information. Our AI will analyze the details and pre-fill warranty information for you.
              </p>
            </div>
          </div>
          
          <WarrantySection 
            onWarrantyChange={(warranty) => {
              handleInputChange({
                target: {
                  name: 'warranty',
                  value: warranty
                }
              } as any);
            }}
          />
        </div>
      </div>
      
      <div className="border-t p-4 flex justify-end space-x-2">
        <button
          type="button"
          className="btn-outline"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          Save Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
