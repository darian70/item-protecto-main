import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddMethodSelector from './product/AddMethodSelector';
import ProductForm from './product/ProductForm';
import { Category, Product } from '@/lib/types';

interface AddProductModalProps {
  onProductAdded: (product: Omit<Product, 'id' | 'warranties'>) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onProductAdded }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'method' | 'details'>('method');
  const [productFormData, setProductFormData] = useState({
    name: '',
    brand: '',
    model: '',
    category: 'electronics' as Category,
    purchaseDate: '',
    purchasePrice: '',
    retailer: '',
    serialNumber: '',
    description: '',
    imageUrl: '',
    productUrl: '',
    warranty: null as any
  });
  
  const handleClose = () => {
    navigate('/app/products');
  };

  const handleManualAdd = () => {
    setStep('details');
  };

  const handleUrlUpload = (data: {
    productName: string;
    warrantyLength: string;
    purchaseDate: string;
    warrantyDetails: string;
  }) => {
    toast({
      title: "Warranty Information Found",
      description: "AI has extracted the warranty details",
      duration: 3000,
    });
    
    // Pre-fill form with the AI-extracted data
    setProductFormData(prev => ({
      ...prev,
      name: data.productName,
      purchaseDate: data.purchaseDate,
      description: `Warranty Length: ${data.warrantyLength}\n\nWarranty Details: ${data.warrantyDetails}`,
    }));
    setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert form data to match Product type
    const productData = {
      name: productFormData.name,
      brand: productFormData.brand,
      model: productFormData.model,
      category: productFormData.category,
      purchaseDate: new Date(productFormData.purchaseDate),
      purchasePrice: productFormData.purchasePrice ? parseFloat(productFormData.purchasePrice) : undefined,
      retailer: productFormData.retailer || undefined,
      serialNumber: productFormData.serialNumber || undefined,
      description: productFormData.description || undefined,
      imageUrl: productFormData.imageUrl || undefined,
      productUrl: productFormData.productUrl || undefined,
      warranties: productFormData.warranty ? [
        {
          ...productFormData.warranty,
          id: `w${Date.now()}`,
        }
      ] : []
    };
    
    // Pass the converted data to parent component
    onProductAdded(productData);
    
    toast({
      title: "Product added",
      description: "Your product has been added successfully.",
      duration: 3000,
    });
    navigate('/app/products');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductDetected = (productData: any) => {
    // Pre-fill the form with detected product data
    setProductFormData(prev => ({
      ...prev,
      name: productData.name || prev.name,
      brand: productData.brand || prev.brand,
      model: productData.model || prev.model,
      category: productData.category || prev.category,
      purchasePrice: productData.purchasePrice?.toString() || prev.purchasePrice,
      retailer: productData.retailer || prev.retailer,
      productUrl: productData.productUrl || prev.productUrl,
    }));
    
    // Move to the details step
    setStep('details');
  };

  return (
    <Dialog open={true} onOpenChange={() => handleClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        
        {step === 'method' ? (
          <AddMethodSelector
            onManualAdd={handleManualAdd}
            onUrlUpload={handleUrlUpload}
            onProductDetected={handleProductDetected}
          />
        ) : (
          <ProductForm
            productFormData={productFormData}
            handleInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
