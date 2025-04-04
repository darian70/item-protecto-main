import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, Clock, AlertTriangle, CheckCircle, 
  ChevronRight, Calendar, Plus, Search
} from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';
import { mockProducts, getWarrantyStatus } from '@/lib/mockData';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from "@/components/ui/button";
import SearchBar from '@/components/SearchBar';

const Index: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, fetch from API
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(
      product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.brand.toLowerCase().includes(lowerQuery) ||
        product.model.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredProducts(filtered);
  };

  // Get counts for the dashboard
  const getExpiringCount = () => {
    return products.filter(p => {
      const warranties = p.warranties || [];
      return warranties.some(w => getWarrantyStatus(w.endDate) === 'expiring');
    }).length;
  };

  const getExpiredCount = () => {
    return products.filter(p => {
      const warranties = p.warranties || [];
      return warranties.every(w => getWarrantyStatus(w.endDate) === 'expired');
    }).length;
  };

  const getActiveCount = () => {
    return products.filter(p => {
      const warranties = p.warranties || [];
      return warranties.some(w => getWarrantyStatus(w.endDate) === 'active') &&
             !warranties.some(w => getWarrantyStatus(w.endDate) === 'expiring');
    }).length;
  };

  // Get next expiring warranty
  const getNextExpiring = () => {
    const activeWarranties = products
      .flatMap(p => p.warranties)
      .filter(w => getWarrantyStatus(w.endDate) !== 'expired')
      .sort((a, b) => a.endDate.getTime() - b.endDate.getTime());
    
    return activeWarranties.length > 0 ? activeWarranties[0] : null;
  };

  const nextExpiring = getNextExpiring();

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Mobile search */}
        {isMobile && (
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}

        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4 flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-muted-foreground">Active Warranties</p>
              <h3 className="text-2xl font-semibold">{getActiveCount()}</h3>
            </div>
          </div>
          
          <div className="glass rounded-xl p-4 flex items-center">
            <div className="p-3 rounded-full bg-amber-100">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
              <h3 className="text-2xl font-semibold">{getExpiringCount()}</h3>
            </div>
          </div>
          
          <div className="glass rounded-xl p-4 flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-muted-foreground">Expired</p>
              <h3 className="text-2xl font-semibold">{getExpiredCount()}</h3>
            </div>
          </div>
        </div>

        {/* Next warranty expiration */}
        {nextExpiring && (
          <div className="glass rounded-xl p-5 border-l-4 border-amber-500">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1.5" />
                  Next Warranty Expiration
                </p>
                <h3 className="mt-1 font-medium">{nextExpiring.provider} {nextExpiring.type} Warranty</h3>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  Expires on {formatDate(nextExpiring.endDate)}
                </div>
              </div>
              <Button
                className="mt-4 md:mt-0"
                size="sm"
                onClick={() => navigate(`/app/warranty/details/${nextExpiring.id}`)}
              >
                View Details
              </Button>
            </div>
          </div>
        )}

        {/* Recent Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">Your Products</h2>
              <Link to="/app/products/add">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
            <Link
              to="/app/products"
              className="flex items-center text-sm text-primary font-medium"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="glass rounded-xl p-8 text-center">
              {searchQuery ? (
                <div>
                  <p className="text-muted-foreground">No products match your search</p>
                  <Button 
                    onClick={() => handleSearch('')}
                    variant="link"
                    className="mt-2"
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-4">You haven't added any products yet</p>
                  <Link to="/app/products/add">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Product
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
