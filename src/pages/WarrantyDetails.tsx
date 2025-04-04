import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { mockProducts } from '@/lib/mockData';
import { AlertTriangle, Calendar, ArrowLeft, Download, Bell, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const WarrantyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.warranties?.some(w => w.id === id));
  const warranty = product?.warranties?.find(w => w.id === id);

  if (!product || !warranty) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-xl font-semibold mb-4">Warranty not found</h2>
          <Button onClick={() => navigate('/app')}>Return to Dashboard</Button>
        </div>
      </Layout>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const daysUntilExpiration = Math.ceil(
    (warranty.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <Card className="p-6">
          <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Model:</strong> {product.model}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>
        </Card>

        {/* Warranty Status */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Warranty Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{warranty.type} Warranty</p>
                <p className="text-sm text-muted-foreground">Provider: {warranty.provider}</p>
              </div>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Set Reminder
              </Button>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-amber-50 text-amber-900 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-medium">Expires in {daysUntilExpiration} days</p>
                <p className="text-sm">
                  Valid until {formatDate(warranty.endDate)}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Coverage Details</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Manufacturing defects</li>
                <li>Hardware malfunctions</li>
                <li>Parts and labor</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Documents</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Warranty Certificate.pdf
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Purchase Receipt.pdf
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default WarrantyDetails;
