
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Settings, Search, Plus, MenuIcon, X, Bot } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: <Home className="w-5 h-5" /> },
    { name: 'Products', path: '/app/products', icon: <Package className="w-5 h-5" /> },
    { name: 'AI Assistant', path: '/app/ai-chat', icon: <Bot className="w-5 h-5" /> },
    { name: 'Settings', path: '/app/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  React.useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile header */}
      {isMobile && (
        <header className="fixed top-0 inset-x-0 h-16 z-50 glass border-b flex items-center justify-between px-4">
          <Link to="/" className="flex items-center animate-fade-in">
            <div className="bg-primary text-primary-foreground rounded-md p-1.5">
              <Package className="w-5 h-5" />
            </div>
            <span className="ml-2 font-semibold">WarrantyKeeper</span>
          </Link>
          <button 
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </header>
      )}

      {/* Mobile menu overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar for desktop / Mobile menu */}
      <aside 
        className={`
          ${isMobile ? 'fixed right-0 top-0 h-full z-50 w-64 translate-x-full shadow-xl' : 'w-64 border-r'} 
          ${mobileMenuOpen && isMobile ? 'translate-x-0' : ''} 
          bg-sidebar border-sidebar-border transition-transform duration-300 ease-in-out
        `}
      >
        {/* Sidebar header for desktop */}
        {!isMobile && (
          <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center animate-fade-in">
              <div className="bg-primary text-primary-foreground rounded-md p-1.5">
                <Package className="w-5 h-5" />
              </div>
              <span className="ml-2 font-semibold">WarrantyKeeper</span>
            </Link>
          </div>
        )}

        {/* Mobile menu header */}
        {isMobile && (
          <div className="h-16 flex items-center justify-between px-6">
            <span className="font-semibold">Menu</span>
            <button 
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
              onClick={toggleMobileMenu}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="px-3 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all
                    ${isActive(item.path) 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'}
                  `}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className={`
        flex-1 flex flex-col overflow-hidden
        ${isMobile ? 'pt-16' : ''}
      `}>
        {/* Top header with search (desktop only) */}
        {!isMobile && (
          <header className="h-16 flex items-center justify-between px-6 border-b">
            <h1 className="text-xl font-semibold">{
              navItems.find(item => isActive(item.path))?.name || 'Warranty Keeper'
            }</h1>
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field pl-10 w-64"
                />
              </div>
            </div>
          </header>
        )}

        {/* Scrollable content area */}
        <div className="flex-1 overflow-auto py-6 px-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
