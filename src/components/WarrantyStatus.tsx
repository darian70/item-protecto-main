
import React from 'react';
import { Warranty } from '@/lib/types';
import { getWarrantyStatus } from '@/lib/mockData';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface WarrantyStatusProps {
  warranty: Warranty;
  showDetails?: boolean;
}

const WarrantyStatus: React.FC<WarrantyStatusProps> = ({ 
  warranty, 
  showDetails = false 
}) => {
  const status = getWarrantyStatus(warranty.endDate);
  
  // Format dates
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Calculate days until expiration
  const getDaysUntilExpiration = () => {
    const now = new Date();
    const diffTime = warranty.endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysUntilExpiration = getDaysUntilExpiration();
  const expired = daysUntilExpiration < 0;
  
  // Status content based on status
  const statusContent = () => {
    switch(status) {
      case 'active':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-4 h-4 mr-1.5" />
            <span className="font-medium">Active</span>
            {showDetails && (
              <span className="ml-1.5 text-sm text-muted-foreground">
                ({Math.abs(daysUntilExpiration)} days remaining)
              </span>
            )}
          </div>
        );
      case 'expiring':
        return (
          <div className="flex items-center text-amber-600">
            <AlertCircle className="w-4 h-4 mr-1.5" />
            <span className="font-medium">Expiring Soon</span>
            {showDetails && (
              <span className="ml-1.5 text-sm text-muted-foreground">
                ({Math.abs(daysUntilExpiration)} days remaining)
              </span>
            )}
          </div>
        );
      case 'expired':
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="w-4 h-4 mr-1.5" />
            <span className="font-medium">Expired</span>
            {showDetails && (
              <span className="ml-1.5 text-sm text-muted-foreground">
                ({Math.abs(daysUntilExpiration)} days ago)
              </span>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="warranty-status">
      {statusContent()}
      {showDetails && (
        <div className="text-sm text-muted-foreground mt-1">
          <div>Start: {formatDate(warranty.startDate)}</div>
          <div>End: {formatDate(warranty.endDate)}</div>
        </div>
      )}
    </div>
  );
};

export default WarrantyStatus;
