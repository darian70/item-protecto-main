import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Warranty } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WarrantySectionProps {
  onWarrantyChange: (warranty: Partial<Warranty>) => void;
}

const WarrantySection: React.FC<WarrantySectionProps> = ({ onWarrantyChange }) => {
  const [warrantyData, setWarrantyData] = useState<Partial<Warranty>>({
    type: 'manufacturer',
    provider: '',
    startDate: new Date(),
    endDate: new Date(),
    coverageDetails: '',
    contactInfo: {
      phone: '',
      email: '',
      website: ''
    }
  });

  const handleWarrantyChange = (field: string, value: any) => {
    const updatedData = {
      ...warrantyData,
      [field]: value
    };
    setWarrantyData(updatedData);
    onWarrantyChange(updatedData);
  };

  return (
    <div className="border-t pt-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Warranty Information</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-sm text-primary font-medium flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Warranty
        </Button>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Manufacturer Warranty</h4>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-xs font-medium mb-1">Provider</label>
              <Input
                type="text"
                value={warrantyData.provider}
                onChange={(e) => handleWarrantyChange('provider', e.target.value)}
                className="w-full"
                placeholder="e.g. Apple"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-xs font-medium mb-1">Type</label>
              <select 
                value={warrantyData.type}
                onChange={(e) => handleWarrantyChange('type', e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="manufacturer">Manufacturer</option>
                <option value="retailer">Retailer</option>
                <option value="extended">Extended</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="form-group">
              <label className="block text-xs font-medium mb-1">Start Date</label>
              <Input
                type="date"
                value={warrantyData.startDate?.toISOString().split('T')[0]}
                onChange={(e) => handleWarrantyChange('startDate', new Date(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-xs font-medium mb-1">End Date</label>
              <Input
                type="date"
                value={warrantyData.endDate?.toISOString().split('T')[0]}
                onChange={(e) => handleWarrantyChange('endDate', new Date(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="block text-xs font-medium mb-1">Coverage Details</label>
            <textarea
              value={warrantyData.coverageDetails}
              onChange={(e) => handleWarrantyChange('coverageDetails', e.target.value)}
              className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter warranty coverage details..."
            />
          </div>

          <div className="mt-3 space-y-3">
            <h5 className="text-sm font-medium">Contact Information</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="block text-xs font-medium mb-1">Phone</label>
                <Input
                  type="tel"
                  value={warrantyData.contactInfo?.phone}
                  onChange={(e) => handleWarrantyChange('contactInfo', { ...warrantyData.contactInfo, phone: e.target.value })}
                  className="w-full"
                  placeholder="e.g. +1 (555) 123-4567"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-xs font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={warrantyData.contactInfo?.email}
                  onChange={(e) => handleWarrantyChange('contactInfo', { ...warrantyData.contactInfo, email: e.target.value })}
                  className="w-full"
                  placeholder="e.g. support@company.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-xs font-medium mb-1">Website</label>
              <Input
                type="url"
                value={warrantyData.contactInfo?.website}
                onChange={(e) => handleWarrantyChange('contactInfo', { ...warrantyData.contactInfo, website: e.target.value })}
                className="w-full"
                placeholder="e.g. https://support.company.com"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantySection;
