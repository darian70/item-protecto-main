import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, DollarSign, MapPin, Package,
  Edit, Trash2, Download, Mail, Phone, Globe, FileText,
  Bot
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
  const [warranties, setWarranties] = useState<Warranty[]>(product.warranties ?? []);


  const formatDate = (date: Date | string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return 'Invalid Date';

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(parsedDate);
  };


  const formatCurrency = (amount?: number) => {
    if (amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleWarrantyDataDetected = (newWarrantyData: Partial<Warranty>) => {
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

    setWarranties(prev => [...prev, newWarranty]);

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
    <div className="animate-fade-in flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-4 max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 h-fit sticky top-4">
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

            <div className="lg:col-span-8 flex flex-col lg:flex-row gap-8 mt-8">
              <div className="flex-1 flex flex-col">
                <div className="glass rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 border-b pb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    Warranty Information
                  </h2>

                  <div className="space-y-4">
                    {warranties.length === 0 ? (
                      <div className="glass rounded-xl p-6 text-center mt-4">
                        <p className="text-muted-foreground">No warranty information available</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {warranties.map((warranty) => (
                          <div
                            key={warranty.id}
                            className={`
                              glass rounded-xl overflow-hidden transition-all h-full
                              ${getWarrantyStatus(warranty.endDate) === 'active' ? 'border-l-4 border-l-green-500' :
                                getWarrantyStatus(warranty.endDate) === 'expiring' ? 'border-l-4 border-l-amber-500' :
                                  'border-l-4 border-l-red-500'}
                            `}
                          >
                            <div className="p-4 h-full flex flex-col min-h-[280px]">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <div className="flex items-center">
                                    <h3 className="font-medium">
                                      {warranty.provider} {warranty.type.charAt(0).toUpperCase() + warranty.type.slice(1)} Warranty
                                    </h3>
                                  </div>
                                  <div className="mt-1">
                                    <WarrantyStatus warranty={warranty} showDetails={true} />
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDownloadWarranty(warranty)}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>

                              <div className="flex-1">
                                <div className="space-y-4">
                                  {warranty.coverageDetails && (
                                    <div>
                                      <h4 className="text-sm font-medium flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Coverage Details
                                      </h4>
                                      <p className="mt-1 text-sm text-muted-foreground">
                                        {warranty.coverageDetails}
                                      </p>
                                    </div>
                                  )}

                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                                    <div className="space-y-2">
                                      {warranty.contactInfo.phone && (
                                        <div className="flex items-center text-sm">
                                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                                          <a href={`tel:${warranty.contactInfo.phone}`} className="hover:underline">
                                            {warranty.contactInfo.phone}
                                          </a>
                                        </div>
                                      )}

                                      {warranty.contactInfo.email && (
                                        <div className="flex items-center text-sm">
                                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                                          <a href={`mailto:${warranty.contactInfo.email}`} className="hover:underline">
                                            {warranty.contactInfo.email}
                                          </a>
                                        </div>
                                      )}

                                      {warranty.contactInfo.website && (
                                        <div className="flex items-center text-sm">
                                          <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                                          <a href={warranty.contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            Visit Website
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:w-[400px]">
                <WarrantyChatBox
                  product={product}
                  onWarrantyDataDetected={handleWarrantyDataDetected}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
