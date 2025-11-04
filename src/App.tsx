import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Welcome from "./pages/onboarding/Welcome";
import Questionnaire from "./pages/onboarding/Questionnaire";
import Company from "./pages/onboarding/Company";
import Team from "./pages/onboarding/Team";
import Payment from "./pages/onboarding/Payment";
import Confirmation from "./pages/onboarding/Confirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding/welcome" element={<Welcome />} />
          <Route path="/onboarding/questionnaire" element={<Questionnaire />} />
          <Route path="/onboarding/company" element={<Company />} />
          <Route path="/onboarding/team" element={<Team />} />
          <Route path="/onboarding/payment" element={<Payment />} />
          <Route path="/onboarding/confirmation" element={<Confirmation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
