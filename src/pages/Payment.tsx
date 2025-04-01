import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Shield, CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [plan, setPlan] = useState({
    name: 'Pro',
    price: '9.99',
    interval: 'month'
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const planParam = searchParams.get('plan');
    if (planParam) {
      try {
        const planData = JSON.parse(decodeURIComponent(planParam));
        setPlan(planData);
      } catch (error) {
        console.error('Error parsing plan data:', error);
        navigate('/pricing');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/app'); // Redirect to dashboard after payment
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground rounded-md p-1.5">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg">WarrantyKeeper</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3">Complete Your Purchase</h1>
            <p className="text-muted-foreground">
              You're signing up for the {plan.name} plan at ${plan.price}/{plan.interval}
            </p>
          </div>

          {/* Payment Form */}
          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card Details */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="pl-10"
                      required
                    />
                    <CreditCard className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium mb-2">
                      Expiry Date
                    </label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium mb-2">
                      CVC
                    </label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Billing Info */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name on Card
                  </label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  <>Pay ${plan.price}</>
                )}
              </Button>

              {/* Security Note */}
              <div className="flex items-center justify-center text-sm text-muted-foreground mt-4">
                <Lock className="w-4 h-4 mr-2" />
                Secured by Stripe. We never store your card details.
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            By completing your purchase, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;