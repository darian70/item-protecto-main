import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Bot, Clock, Package, ChevronRight, Check,
  Users, Star, Sparkles, ArrowRight, BarChart3, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b backdrop-blur-md bg-background/70 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground rounded-md p-1.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">WarrantyKeeper</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-300"
            >
              <Link to="/pricing">Pricing</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all duration-300"
            >
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-primary/20 to-accent/10 animate-gradient" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-conic from-secondary/40 via-primary/30 to-accent/20 blur-3xl opacity-40 animate-slow-spin" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,var(--primary-50),transparent)] opacity-30" />
        
        {/* Content Container */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Column - Text Content */}
            <div className="flex-1 text-center md:text-left relative z-10">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in hover:bg-primary/20 transition-colors group cursor-pointer">
                <Sparkles className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                <span className="text-sm font-semibold tracking-wide">AI-Powered Warranty Management</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-up">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-[length:200%_auto]">
                  Never Lose Track
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary animate-gradient bg-[length:200%_auto] [animation-delay:0.2s]">
                  of Your Product Warranties
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground/90 mb-10 animate-fade-up delay-100 leading-relaxed max-w-2xl">
                WarrantyKeeper helps you manage all your product warranties in one place,
                with <span className="text-primary font-medium">AI-powered insights</span> and <span className="text-primary font-medium">timely reminders</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-up delay-200">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/signup">
                    Create Free Account
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="flex-1 relative z-10">
              <div className="relative">
                {/* Floating Elements */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse delay-300" />
                
                {/* Dashboard Preview */}
                <div className="relative rounded-2xl bg-gradient-to-br from-background via-muted to-muted/80 shadow-2xl border border-primary/10 animate-float overflow-hidden">
                  {/* Window Controls */}
                  <div className="h-12 bg-background/80 backdrop-blur-sm border-b border-primary/5 flex items-center px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                    </div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {[
                        { icon: Package, label: 'Products', value: '24' },
                        { icon: Clock, label: 'Active', value: '18' },
                        { icon: Bot, label: 'Expiring', value: '3' },
                        { icon: BarChart3, label: 'Total Value', value: '$12.4k' }
                      ].map((stat, index) => (
                        <div
                          key={index}
                          className="bg-background/50 backdrop-blur-sm rounded-xl p-4 hover:bg-background/80 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-primary/5 hover:border-primary/10 group"
                        >
                          <stat.icon className="w-8 h-8 mb-3 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">{stat.value}</div>
                          <div className="text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Products */}
                    <div className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-primary/5">
                      <h3 className="text-sm font-medium mb-4 flex items-center">
                        <Package className="w-4 h-4 mr-2 text-primary/70" />
                        Recent Products
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: 'MacBook Pro M2', date: 'Jan 26, 2025', status: 'active' },
                          { name: 'Samsung QLED TV', date: 'Nov 27, 2024', status: 'expiring' },
                          { name: 'Sony Headphones', date: 'Dec 15, 2024', status: 'active' }
                        ].map((product, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-background/80 transition-all duration-300 group border border-transparent hover:border-primary/10"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <Package className="w-5 h-5 text-primary/70 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                              </div>
                              <div>
                                <div className="font-medium group-hover:text-primary transition-colors">{product.name}</div>
                                <div className="text-sm text-muted-foreground/80">{product.date}</div>
                              </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.status === 'active'
                                ? 'bg-green-100/50 text-green-700 group-hover:bg-green-100'
                                : 'bg-yellow-100/50 text-yellow-700 group-hover:bg-yellow-100'
                            } transition-colors`}>
                              {product.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Discover Hidden Product Benefits</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI technology helps you uncover valuable warranties and consumer benefits you might not know about
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hidden Warranty Discovery</h3>
              <p className="text-muted-foreground mb-6">
                Our AI scans your products and identifies hidden warranties, extended coverage options,
                and manufacturer guarantees you might have missed. Many products come with additional
                protection you didn't know about!
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  Credit card extended warranties
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  Store protection plans
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  Manufacturer satisfaction guarantees
                </li>
              </ul>
            </div>

            <div className="bg-background rounded-xl p-8 hover:shadow-lg transition-all">
              <div className="p-3 bg-primary/10 rounded-full w-fit mb-6">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Consumer Benefits Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Beyond warranties, we help you discover additional consumer benefits and protections
                that come with your purchases. Get the most value from your products with our
                comprehensive analysis.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  Price protection benefits
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  Return period extensions
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-primary mr-2" />
                  Repair and replacement options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,var(--primary-50),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 text-primary mb-6 border border-primary/10">
              <Star className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Premium Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
              Everything You Need to Stay Protected
            </h2>
            <p className="text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed">
              Powerful features to help you manage and protect your investments with ease.
              Built for <span className="text-primary font-medium">simplicity</span> and <span className="text-primary font-medium">efficiency</span>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Hidden Warranty Discovery",
                description: "Our AI technology automatically scans your products and discovers hidden warranties, extended coverage options, and benefits you might have missed.",
                features: ["Credit card extended warranties", "Store protection plans", "Manufacturer guarantees"],
                preview: (
                  <div className="relative">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse" />
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-primary/20 rounded w-2/3" />
                          <div className="h-2 bg-primary/10 rounded w-1/2 mt-2" />
                        </div>
                      </div>
                      <div className="p-3 bg-background/50 rounded-lg border border-primary/10">
                        <div className="text-xs text-primary mb-1">Hidden Warranty Found!</div>
                        <div className="text-sm">Your credit card provides an additional year of coverage</div>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                icon: Bot,
                title: "AI-Powered Analysis",
                description: "Our intelligent assistant analyzes your purchases to uncover valuable benefits and protections you didn't know you had.",
                features: ["Smart benefit detection", "Coverage recommendations", "Value optimization"],
                preview: (
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 bg-muted rounded-lg p-2 text-sm">
                        I found several benefits for your recent purchase!
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 opacity-50">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                    </div>
                  </div>
                )
              },
              {
                icon: Clock,
                title: "Smart Notifications",
                description: "Stay ahead with intelligent reminders about your coverage. We'll notify you about expiring warranties and opportunities to extend protection.",
                features: ["Timely alerts", "Coverage optimization", "Renewal recommendations"],
                preview: (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-background/50 border border-yellow-500/20">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-yellow-500" />
                        <div>
                          <div className="text-sm font-medium">TV Warranty Expiring</div>
                          <div className="text-xs text-muted-foreground">30 days remaining - Extend now</div>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-background/50 border border-green-500/20">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="text-sm font-medium">Extended Coverage Available</div>
                          <div className="text-xs text-muted-foreground">Special offer expires soon</div>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                  </div>
                )
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass rounded-xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-background/90 hover:via-background/95 hover:to-background/80 group relative overflow-hidden border border-primary/5 hover:border-primary/20 hover:backdrop-blur-xl"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
                
                {/* Feature Preview */}
                <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 mb-6 group-hover:bg-background/80 transition-all relative min-h-[160px] flex items-center">
                  {index === 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-primary/20 rounded w-2/3" />
                          <div className="h-2 bg-primary/10 rounded w-1/2 mt-2" />
                        </div>
                      </div>
                      <div className="h-[1px] bg-border" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Serial Number</span>
                        <span>Purchase Date</span>
                        <span>Status</span>
                      </div>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 bg-muted rounded-lg p-2 text-sm">
                          I can help you track and manage your warranties
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 opacity-50">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="space-y-2">
                      {[
                        { name: 'TV Warranty', days: 30, color: 'yellow' },
                        { name: 'Laptop Coverage', days: 60, color: 'green' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-background/50">
                          <div>
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">Expires in {item.days} days</div>
                          </div>
                          <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
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

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto">
          <div className="glass rounded-3xl p-16 relative overflow-hidden border border-primary/20 hover:border-primary/30 transition-all duration-500 group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_100px,var(--secondary-50),transparent)]" />
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-primary/20 to-accent/10 animate-gradient" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.1)_50%,transparent_75%,transparent_100%)] bg-[length:16px_16px] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="max-w-2xl mx-auto text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 text-primary mb-6 border border-primary/10">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Join 10,000+ Users</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/70">
                  Ready to Protect Your Investments?
                </h2>
                <p className="text-xl text-muted-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of users who trust WarrantyKeeper to safeguard their purchases.
                  Start your <span className="text-primary font-medium">free account</span> today and never miss a warranty again!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link to="/signup">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-8 h-14 text-lg font-medium hover:scale-105 transition-all duration-500 bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Get Started Free
                        <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto px-8 h-14 text-lg font-medium bg-background/50 backdrop-blur-sm hover:bg-background/80 hover:border-primary/30 transition-all duration-500 hover:shadow-lg"
                    >
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