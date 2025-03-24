import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import AiChat from "./pages/AiChat";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* App routes */}
          <Route path="/app" element={<Index />} />
          <Route path="/app/products" element={<Products />} />
          <Route path="/app/products/add" element={<Products />} />
          <Route path="/app/details/:id" element={<Details />} />
          <Route path="/app/ai-chat" element={<AiChat />} />
          <Route path="/app/settings" element={<Settings />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
