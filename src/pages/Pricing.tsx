import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  description,
  features,
  recommended = false
}) => {
  const navigate = useNavigate();

  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Subscribe clicked:', { name, price });
    
    const baseUrl = window.location.origin;
    const targetPath = price === 'Free' ? '/signup' : '/payment';
    const fullUrl = `${baseUrl}${targetPath}`;
    
    console.log('Navigating to:', fullUrl);
    
    if (price === 'Free') {
      window.location.href = fullUrl;
    } else {
      const planData = {
        name,
        price,
        interval: 'month'
      };
      const searchParams = new URLSearchParams();
      searchParams.set('plan', JSON.stringify(planData));
      window.location.href = `${fullUrl}?${searchParams.toString()}`;
    }
  };

  return (
    <div className={`
      relative bg-background border rounded-xl p-6
      ${recommended ? 'border-primary shadow-lg' : ''}
      flex flex-col min-h-[600px]
    `}>
      {recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">${price}</span>
        {price !== 'Free' && <span className="text-muted-foreground">/month</span>}
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3 flex-grow mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8 relative z-10">
        <Button
          asChild
          size="lg"
          variant={recommended ? 'default' : 'outline'}
          className={`
            w-full h-14 text-lg font-medium relative
            ${recommended ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'hover:bg-muted'}
            transition-all duration-300 transform hover:scale-[1.02]
            before:absolute before:inset-0 before:rounded-md
            ${recommended ? 'before:bg-primary/10' : 'before:bg-muted/50'}
            before:opacity-0 hover:before:opacity-100 before:transition-opacity
            shadow-sm hover:shadow-lg
          `}
        >
          <Link
            to={price === 'Free' ? '/signup' : '/payment'}
            state={price !== 'Free' ? {
              plan: {
                name,
                price,
                interval: 'month'
              }
            } : undefined}
            className="relative z-10 flex items-center justify-center gap-2"
          >
            {price === 'Free' ? 'Get Started' : 'Subscribe Now'}
            {recommended && <ArrowRight className="w-5 h-5" />}
          </Link>
        </Button>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
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
          <Link to="/signup">
            <Button>Sign Up Free</Button>
          </Link>
        </div>
      </nav>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your needs. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingTier
              name="Basic"
              price="Free"
              description="Perfect for getting started with warranty management"
              features={[
                "Up to 10 products",
                "Basic warranty tracking",
                "Email notifications",
                "Manual product entry"
              ]}
            />

            <PricingTier
              name="Pro"
              price="9.99"
              description="Ideal for active warranty management"
              features={[
                "Unlimited products",
                "Advanced warranty tracking",
                "Priority notifications",
                "AI-powered insights",
                "URL import",
                "Export data"
              ]}
              recommended
            />

            <PricingTier
              name="Business"
              price="29.99"
              description="For teams and businesses"
              features={[
                "Everything in Pro",
                "Multiple users",
                "Team collaboration",
                "API access",
                "Advanced analytics",
                "Priority support"
              ]}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Your billing will be adjusted accordingly.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a contract?</h3>
              <p className="text-muted-foreground">
                No, all plans are month-to-month with no long-term commitment required.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, PayPal, and Apple Pay.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">
                Yes, we offer a 30-day money-back guarantee for all paid plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">WarrantyKeeper</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} WarrantyKeeper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;