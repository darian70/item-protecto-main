import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, DollarSign, MapPin, Package, 
  Edit, Trash2, Download, Mail, Phone, Globe, FileText 
} from 'lucide-react';
import { Product, Warranty } from '@/lib/types';
import WarrantyStatus from './WarrantyStatus';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getWarrantyStatus } from '@/lib/mockData';
import WarrantyChatBox from './product/WarrantyChatBox';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const navigate = useNavigate();
  const [warranties, setWarranties] = useState<Warranty[]>(product.warranties);
  
  // Format dates
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Format currency
  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleWarrantyDataDetected = (newWarrantyData: Partial<Warranty>) => {
    // Create a new warranty with the detected data
    const newWarranty: Warranty = {
      id: (warranties.length + 1).toString(),
      type: newWarrantyData.type || 'manufacturer',
      provider: newWarrantyData.provider || '',
      startDate: newWarrantyData.startDate || new Date(),
      endDate: newWarrantyData.endDate || new Date(),
      coverageDetails: newWarrantyData.coverageDetails || '',
      contactInfo: newWarrantyData.contactInfo || {
        phone: '',
        email: '',
        website: ''
      },
      documents: []
    };

    // Add the new warranty to the list
    setWarranties(prev => [...prev, newWarranty]);

    // Show success message
    toast({
      title: "Warranty Added",
      description: "New warranty information has been added from AI analysis.",
      duration: 3000,
    });
  };
  
  const handleEditClick = () => {
    toast({
      title: "Edit mode",
      description: "Product editing is not available in this demo.",
      duration: 3000,
    });
  };
  
  const handleDeleteClick = () => {
    toast({
      title: "Delete confirmation",
      description: "This action would delete the product in a real app.",
      duration: 3000,
    });
  };
  
  const handleDownloadWarranty = (warranty: Warranty) => {
    toast({
      title: "Warranty document",
      description: "Downloading warranty document...",
      duration: 3000,
    });
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="w-full md:w-1/3">
          <div className="glass rounded-xl overflow-hidden">
            {product.imageUrl ? (
              <div className="aspect-w-1 aspect-h-1">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-w-1 aspect-h-1 bg-muted flex items-center justify-center">
                <Package className="w-12 h-12 text-muted-foreground/50" />
              </div>
            )}
            
            <div className="p-4">
              <h1 className="text-xl font-semibold">{product.name}</h1>
              <p className="text-muted-foreground">{product.brand} • {product.model}</p>
              
              {product.description && (
                <p className="mt-3 text-sm">{product.description}</p>
              )}
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>Purchased on {formatDate(product.purchaseDate)}</span>
                </div>
                
                {product.retailer && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>From {product.retailer}</span>
                  </div>
                )}
                
                {product.purchasePrice !== undefined && (
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>{formatCurrency(product.purchasePrice)}</span>
                  </div>
                )}
                
                {product.serialNumber && (
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>S/N: {product.serialNumber}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex space-x-2">
                <Button
                  onClick={handleEditClick}
                  variant="outline"
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                
                <Button
                  onClick={handleDeleteClick}
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Warranty Information</h2>
          
          {warranties.length === 0 ? (
            <div className="glass rounded-xl p-6 text-center mt-4">
              <p className="text-muted-foreground">No warranty information available</p>
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {warranties.map((warranty) => (
                <div 
                  key={warranty.id}
                  className={`
                    glass rounded-xl overflow-hidden transition-all
                    ${getWarrantyStatus(warranty.endDate) === 'active' ? 'border-l-4 border-l-green-500' : 
                      getWarrantyStatus(warranty.endDate) === 'expiring' ? 'border-l-4 border-l-amber-500' : 
                      'border-l-4 border-l-red-500'}
                  `}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{warranty.provider} {warranty.type.charAt(0).toUpperCase() + warranty.type.slice(1)} Warranty</h3>
                        </div>
                        <div className="mt-1">
                          <WarrantyStatus warranty={warranty} showDetails={true} />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadWarranty(warranty)}
                        className="h-8"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        {warranty.documents?.length ? 'Download' : 'Request'}
                      </Button>
                    </div>
                    
                    {warranty.coverageDetails && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium">Coverage Details</h4>
                        <p className="text-sm text-muted-foreground mt-1">{warranty.coverageDetails}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 border-t pt-4">
                      <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {warranty.contactInfo.phone && (
                          <a href={`tel:${warranty.contactInfo.phone}`} className="flex items-center text-sm text-primary">
                            <Phone className="w-4 h-4 mr-1.5" />
                            {warranty.contactInfo.phone}
                          </a>
                        )}
                        
                        {warranty.contactInfo.email && (
                          <a href={`mailto:${warranty.contactInfo.email}`} className="flex items-center text-sm text-primary">
                            <Mail className="w-4 h-4 mr-1.5" />
                            {warranty.contactInfo.email}
                          </a>
                        )}
                        
                        {warranty.contactInfo.website && (
                          <a href={warranty.contactInfo.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-primary">
                            <Globe className="w-4 h-4 mr-1.5" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {warranty.documents && warranty.documents.length > 0 && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">Documents</h4>
                        <div className="space-y-2">
                          {warranty.documents.map((doc, index) => (
                            <button
                              key={index}
                              className="flex items-center text-sm text-primary w-full text-left hover:underline"
                              onClick={() => handleDownloadWarranty(warranty)}
                            >
                              <FileText className="w-4 h-4 mr-1.5" />
                              {doc}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI Chat Box for Warranty Analysis */}
          <div className="mt-6">
            <WarrantyChatBox onWarrantyDataDetected={handleWarrantyDataDetected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
