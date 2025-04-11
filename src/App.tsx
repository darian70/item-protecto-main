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
import WarrantyDetails from "./pages/WarrantyDetails";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AiChat from "./pages/AiChat";
import Settings from "./pages/Settings";
import Payment from "./pages/Payment";
import ForgotPassword from "./pages/ForgotPassword";

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
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />

          {/* App routes */}
          <Route path="/app" element={<Index />} />
          <Route path="/app/products" element={<Products />} />
          <Route path="/app/products/add" element={<Products />} />
          <Route path="/app/products/:id" element={<Details />} />
          <Route path="/app/details/:id" element={<Details />} />
          <Route path="/app/warranty/details/:id" element={<WarrantyDetails />} />
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
