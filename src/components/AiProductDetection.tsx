
import React, { useState } from 'react';
import { Sparkles, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface AiProductDetectionProps {
  onProductDetected: (productData: any) => void;
}

const AiProductDetection: React.FC<AiProductDetectionProps> = ({ onProductDetected }) => {
  const { toast } = useToast();
  const [productUrl, setProductUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productUrl) {
      toast({
        title: "No URL provided",
        description: "Please enter a product URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, this would call an AI service to fetch product details
      // Here we're simulating the process with a timeout and mock data
      toast({
        title: "Processing URL",
        description: "Analyzing product information...",
      });

      // Simulate API call
      setTimeout(() => {
        // Mock data for demonstration
        const detectedProduct = {
          name: "Smart TV 4K Ultra HD",
          brand: "TechBrand",
          model: "STV-4000",
          category: "electronics",
          purchasePrice: 699.99,
          retailer: "ElectronicsWorld",
          productUrl: productUrl,
          warranties: [
            {
              id: "auto-warranty-1",
              type: "manufacturer",
              provider: "TechBrand",
              startDate: new Date(),
              endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 2), // 2 years
              coverageDetails: "Standard manufacturer warranty covering hardware defects and malfunctions.",
              contactInfo: {
                phone: "1-800-TECH-SUPPORT",
                email: "warranty@techbrand.com",
                website: "https://techbrand.com/warranty"
              }
            }
          ]
        };

        onProductDetected(detectedProduct);

        toast({
          title: "Product detected",
          description: "Successfully retrieved product information",
          variant: "default",
        });

        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error detecting product:', error);
      toast({
        title: "Detection failed",
        description: "Could not retrieve product information. Please try again or enter details manually.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-primary">
        <Sparkles className="h-5 w-5" />
        <h3 className="font-medium">AI Product Detection</h3>
      </div>
      
      <form onSubmit={handleUrlSubmit} className="space-y-3">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Product URL</label>
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="url"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                placeholder="https://store.com/product"
                className="pl-10"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="shrink-0"
            >
              {isLoading ? "Detecting..." : "Detect"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Paste a product URL to automatically detect product information and warranty details
          </p>
        </div>
      </form>
    </div>
  );
};

export default AiProductDetection;
