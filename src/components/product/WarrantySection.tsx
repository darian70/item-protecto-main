import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Warranty } from '@/lib/types';

const WarrantySection: React.FC = () => {
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

  return (
    <div className="border-t pt-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Warranty Information</h3>
        <button
          type="button"
          className="text-sm text-primary font-medium flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Warranty
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Manufacturer Warranty</h4>
            <button
              type="button"
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-xs font-medium mb-1">Provider</label>
              <input
                type="text"
                value={warrantyData.provider}
                onChange={(e) => setWarrantyData(prev => ({
                  ...prev,
                  provider: e.target.value
                }))}
                className="input-field w-full"
                placeholder="e.g. Apple"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-xs font-medium mb-1">Type</label>
              <select 
                value={warrantyData.type}
                onChange={(e) => setWarrantyData(prev => ({
                  ...prev,
                  type: e.target.value as Warranty['type']
                }))}
                className="input-field w-full"
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
              <input
                type="date"
                value={warrantyData.startDate?.toISOString().split('T')[0]}
                onChange={(e) => setWarrantyData(prev => ({
                  ...prev,
                  startDate: new Date(e.target.value)
                }))}
                className="input-field w-full"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-xs font-medium mb-1">End Date</label>
              <input
                type="date"
                value={warrantyData.endDate?.toISOString().split('T')[0]}
                onChange={(e) => setWarrantyData(prev => ({
                  ...prev,
                  endDate: new Date(e.target.value)
                }))}
                className="input-field w-full"
              />
            </div>
          </div>
          
          <div className="form-group mt-3">
            <label className="block text-xs font-medium mb-1">Coverage Details</label>
            <textarea
              value={warrantyData.coverageDetails}
              onChange={(e) => setWarrantyData(prev => ({
                ...prev,
                coverageDetails: e.target.value
              }))}
              className="input-field w-full"
              rows={2}
              placeholder="Describe what this warranty covers..."
            />
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md mt-3">
            <h5 className="text-xs font-medium mb-2">Contact Information</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="form-group">
                <label className="block text-xs mb-1">Phone</label>
                <input
                  type="tel"
                  value={warrantyData.contactInfo?.phone}
                  onChange={(e) => setWarrantyData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      phone: e.target.value
                    }
                  }))}
                  className="input-field w-full text-xs"
                  placeholder="Phone number"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-xs mb-1">Email</label>
                <input
                  type="email"
                  value={warrantyData.contactInfo?.email}
                  onChange={(e) => setWarrantyData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      email: e.target.value
                    }
                  }))}
                  className="input-field w-full text-xs"
                  placeholder="Email address"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-xs mb-1">Website</label>
                <input
                  type="url"
                  value={warrantyData.contactInfo?.website}
                  onChange={(e) => setWarrantyData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      website: e.target.value
                    }
                  }))}
                  className="input-field w-full text-xs"
                  placeholder="Website URL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantySection;
