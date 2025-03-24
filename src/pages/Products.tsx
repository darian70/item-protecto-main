
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package, Grid3X3, List, Plus } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/lib/types';
import { mockProducts, categoryIcons } from '@/lib/mockData';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from '@/components/SearchBar';
import { Button } from "@/components/ui/button";
import AddProductModal from '@/components/AddProductModal';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // State for modal visibility
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Handle modal visibility based on route
  useEffect(() => {
    setShowAddModal(location.pathname === '/app/products/add');
  }, [location.pathname]);

  useEffect(() => {
    // In a real app, fetch from API
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts(query, selectedCategory);
  };

  const handleCategoryChange = (category: Category | 'all') => {
    setSelectedCategory(category);
    filterProducts(searchQuery, category);
  };

  const filterProducts = (query: string, category: Category | 'all') => {
    let filtered = products;
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    // Filter by search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(lowerQuery) ||
          product.brand.toLowerCase().includes(lowerQuery) ||
          product.model.toLowerCase().includes(lowerQuery)
      );
    }
    
    setFilteredProducts(filtered);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  // Get categories from products for the filter
  const getCategories = (): Category[] => {
    const categories = new Set<Category>();
    products.forEach(p => {
      if (p.category) categories.add(p.category as Category);
    });
    return Array.from(categories);
  };

  const categories = getCategories();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-64">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="flex items-center space-x-2 self-end">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="h-9 w-9"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="h-9 w-9"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => navigate('/app/products/add')}
              className="ml-2"
              variant="default"
              type="button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 md:flex-wrap">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`
              flex items-center px-3 py-1.5 rounded-full text-sm whitespace-nowrap
              ${selectedCategory === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'}
            `}
          >
            <Package className="w-3.5 h-3.5 mr-1.5" />
            All Items
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                flex items-center px-3 py-1.5 rounded-full text-sm whitespace-nowrap
                ${selectedCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'}
              `}
            >
              <Package className="w-3.5 h-3.5 mr-1.5" />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Products grid/list */}
        {filteredProducts.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-muted-foreground mb-4">No products found</p>
            {searchQuery || selectedCategory !== 'all' ? (
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setFilteredProducts(products);
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/app/products/add')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            )}
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in"
              : "space-y-3 animate-fade-in"
          }>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      {showAddModal && (
        <AddProductModal
          onProductAdded={(newProduct) => {
            const productWithId: Product = {
              ...newProduct,
              id: (products.length + 1).toString(), // Simple ID generation
              warranties: [] // Initialize empty warranties array
            };
            const updatedProducts = [...products, productWithId];
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
          }}
        />
      )}
    </Layout>
  );
};

export default Products;
