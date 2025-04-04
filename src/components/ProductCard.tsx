import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Package, Check, X, AlertCircle } from 'lucide-react';
import { Product } from '@/lib/types';
import { getWarrantyStatus } from '@/lib/mockData';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Get the status of the most recent warranty
  const getOverallStatus = () => {
    if (product.warranties.length === 0) return 'unknown';
    
    const statuses = product.warranties.map(w => getWarrantyStatus(w.endDate));
    if (statuses.includes('expired')) {
      return 'expired';
    } else if (statuses.includes('expiring')) {
      return 'expiring';
    } else {
      return 'active';
    }
  };

  const productStatus = getOverallStatus();
  
  // Format purchase date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Get the most recent valid warranty end date
  const getNextExpiryDate = () => {
    const validWarranties = product.warranties
      .filter(w => getWarrantyStatus(w.endDate) !== 'expired')
      .sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
    
    return validWarranties.length > 0 ? validWarranties[0].endDate : null;
  };

  const nextExpiry = getNextExpiryDate();

  // Status icon based on warranty status
  const StatusIcon = () => {
    switch(productStatus) {
      case 'active':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'expiring':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'expired':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Link 
      to={`/app/products/${product.id}`}
      className="block"
    >
      <div className="glass card-hover rounded-xl overflow-hidden">
        <div className="aspect-square bg-muted relative">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <Package className="w-8 h-8 text-muted-foreground/50" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <div className={`
              flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${productStatus === 'active' ? 'bg-green-100 text-green-800' : 
                productStatus === 'expiring' ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'}
            `}>
              <StatusIcon />
              <span className="ml-1 capitalize">{productStatus}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-foreground">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand} • {product.model}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground mt-1" />
          </div>
          <div className="mt-3 flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            <span>Purchased: {formatDate(product.purchaseDate)}</span>
          </div>
          {nextExpiry && (
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              <span>Next expiry: {formatDate(nextExpiry)}</span>
            </div>
          )}
          <div className="mt-3 flex items-center gap-1">
            {product.warranties.map((warranty, index) => (
              <div 
                key={warranty.id}
                className={`
                  h-1.5 flex-1 rounded-full 
                  ${getWarrantyStatus(warranty.endDate) === 'active' ? 'bg-green-500' : 
                    getWarrantyStatus(warranty.endDate) === 'expiring' ? 'bg-amber-500' : 
                    'bg-red-500'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
