
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductDetails from '@/components/ProductDetails';
import { Product } from '@/lib/types';
import { mockProducts } from '@/lib/mockData';
import { Button } from "@/components/ui/button";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch from API
    const foundProduct = mockProducts.find(p => p.id === id);
    setProduct(foundProduct || null);
    setLoading(false);
  }, [id]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse-subtle">Loading product details...</div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="text-lg font-medium mb-2">Product Not Found</h2>
            <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/products')}>
              View All Products
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-4"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        
        <ProductDetails product={product} />
      </div>
    </Layout>
  );
};

export default Details;
