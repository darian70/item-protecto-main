import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bot, Clock, Package, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground rounded-md p-1.5">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg">WarrantyKeeper</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link to="/app">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Never Lose Track of Your Product Warranties
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            WarrantyKeeper helps you manage all your product warranties in one place, with AI-powered insights and timely reminders.
          </p>
          <Link to="/app">
            <Button size="lg" className="text-lg px-8">
              Start Managing Warranties
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Stay Protected</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Product Management</h3>
              <p className="text-muted-foreground">
                Easily add and organize your products with manual entry, URL import, or our smart AI detection system.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-muted-foreground">
                Get instant warranty information and recommendations using our AI-powered chat assistant.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warranty Tracking</h3>
              <p className="text-muted-foreground">
                Never miss a warranty expiration with automated reminders and expiration tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust WarrantyKeeper to protect their investments.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/app">
              <Button size="lg">Get Started for Free</Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline">View Pricing</Button>
            </Link>
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

export default Landing;