import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Bot, Clock, Package, ChevronRight, Check, 
  Users, Star, Sparkles, ArrowRight, BarChart3
} from 'lucide-react';
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
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/pricing">Pricing</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI-Powered Warranty Management</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Never Lose Track of Your Product Warranties
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                WarrantyKeeper helps you manage all your product warranties in one place, 
                with AI-powered insights and timely reminders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link to="/signup">
                    Create Free Account
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Link to="/pricing">
                    View Pricing
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-32 h-32 text-primary/20" />
                </div>
                <div className="relative grid grid-cols-2 gap-4">
                  {[
                    { icon: Package, label: 'Product Tracking' },
                    { icon: Bot, label: 'AI Assistant' },
                    { icon: Clock, label: 'Expiry Alerts' },
                    { icon: BarChart3, label: 'Analytics' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="glass rounded-xl p-4 flex flex-col items-center justify-center text-center"
                    >
                      <item.icon className="w-8 h-8 mb-2 text-primary" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '100K+', label: 'Products Tracked' },
              { number: '50K+', label: 'Warranties Managed' },
              { number: '99%', label: 'User Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Stay Protected</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you manage and protect your investments with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Smart Product Management",
                description: "Add products easily with manual entry, URL import, or our intelligent AI detection system. Keep all your product information organized in one place.",
                features: ["Automatic data extraction", "Multiple import options", "Organized categories"]
              },
              {
                icon: Bot,
                title: "AI-Powered Assistant",
                description: "Get instant warranty information and smart recommendations using our advanced AI assistant. Never miss important details again.",
                features: ["Warranty analysis", "Smart recommendations", "24/7 assistance"]
              },
              {
                icon: Clock,
                title: "Proactive Tracking",
                description: "Stay ahead with automated reminders and comprehensive warranty tracking. Get notified before warranties expire.",
                features: ["Expiration alerts", "Coverage tracking", "Renewal reminders"]
              }
            ].map((feature, index) => (
              <div key={index} className="glass rounded-xl p-8 hover:shadow-lg transition-all">
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-primary mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose WarrantyKeeper */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose WarrantyKeeper</h2>
            <p className="text-xl text-muted-foreground">
              Simple, smart, and secure warranty management for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your warranty information is protected with industry-standard security.
                We prioritize your privacy and data protection.
              </p>
            </div>

            <div className="bg-background rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-6">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Our AI assistant helps you understand warranty terms, get recommendations,
                and make informed decisions about your product protection.
              </p>
            </div>

            <div className="bg-background rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-6">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Never Miss a Deadline</h3>
              <p className="text-muted-foreground">
                Get timely reminders before warranties expire. Stay on top of your
                coverage and protect your investments effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="relative">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of users who trust WarrantyKeeper to protect their investments.
                  Start managing your warranties today!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/signup">
                    <Button size="lg" className="w-full sm:w-auto">
                      Create Free Account
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">WarrantyKeeper</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Protecting your investments with smart warranty management.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/signin" className="hover:text-foreground">Dashboard</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground">About</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
                <li><a href="#privacy" className="hover:text-foreground">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#twitter" className="hover:text-foreground">Twitter</a></li>
                <li><a href="#github" className="hover:text-foreground">GitHub</a></li>
                <li><a href="#discord" className="hover:text-foreground">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} WarrantyKeeper. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#cookies" className="text-sm text-muted-foreground hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;