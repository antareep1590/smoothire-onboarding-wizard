import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { Card } from "@/components/ui/card";
import { Check, CreditCard, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Welcome", "Questions", "Company", "Payment", "Done"];

type PlanType = "pro" | "pro-plus";

const PLAN_FEATURES = {
  pro: [
    "Full access to all features",
    "Unlimited job postings",
    "Collaborative hiring tools",
    "Advanced analytics & reporting",
    "Priority customer support",
  ],
  "pro-plus": [
    "Everything in Pro, plus:",
    "Advanced AI-powered candidate matching",
    "Custom branding & white-label options",
    "Dedicated account manager",
    "API access & integrations",
    "Advanced security & compliance",
  ],
};

export default function Payment() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("pro");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const trialDuration = selectedPlan === "pro" ? "14 days" : "14 days";
  const userLimit = selectedPlan === "pro" ? "2 users" : "5 users";
  const planName = selectedPlan === "pro" ? "Pro" : "Pro+";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/confirmation");
  };

  const handleSkip = () => {
    navigate("/onboarding/confirmation");
  };

  return (
    <ProgressBar currentStep={4} steps={STEPS}>
      <div className="container max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* Plan Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Select Your Trial Plan</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card
              className={cn(
                "p-6 cursor-pointer transition-all border-2",
                selectedPlan === "pro"
                  ? "border-success bg-success/5"
                  : "border-border hover:border-muted-foreground/30"
              )}
              onClick={() => setSelectedPlan("pro")}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-foreground">Pro Free Trial</h3>
                {selectedPlan === "pro" && (
                  <Check className="w-6 h-6 text-success flex-shrink-0" />
                )}
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Duration:</span> {trialDuration}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Users:</span> Up to 2 users
                </p>
              </div>
              <p className="text-sm text-muted-foreground">Perfect for small teams getting started with hiring.</p>
            </Card>

            <Card
              className={cn(
                "p-6 cursor-pointer transition-all border-2",
                selectedPlan === "pro-plus"
                  ? "border-success bg-success/5"
                  : "border-border hover:border-muted-foreground/30"
              )}
              onClick={() => setSelectedPlan("pro-plus")}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-foreground">Pro+ Free Trial</h3>
                {selectedPlan === "pro-plus" && (
                  <Check className="w-6 h-6 text-success flex-shrink-0" />
                )}
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Duration:</span> {selectedPlan === "pro-plus" ? "14 days" : trialDuration}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Users:</span> Up to 5 users
                </p>
              </div>
              <p className="text-sm text-muted-foreground">Advanced features for growing teams with extra needs.</p>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Trial Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-3 tracking-tight">Start Your Free Trial</h1>
              <p className="text-base text-muted-foreground">
                You'll experience all {planName} features during your free trial for {trialDuration}.
              </p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <h3 className="font-semibold text-lg mb-4">What's included in your {planName} trial:</h3>
              <ul className="space-y-3">
                {PLAN_FEATURES[selectedPlan].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 border-muted">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-muted-foreground mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">No charges until trial ends</h4>
                  <p className="text-sm text-muted-foreground">
                    We'll send you a reminder before your trial ends. Cancel anytime during the trial period with no charges.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex gap-2 text-sm text-muted-foreground">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
            </div>
          </div>

          {/* Right Side - Payment Form */}
          <div className="bg-card rounded-xl shadow-card p-8 lg:p-10 border border-border">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Payment Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  value={paymentData.nameOnCard}
                  onChange={(e) => setPaymentData({ ...paymentData, nameOnCard: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button type="submit" className="w-full">
                  Start Free Trial
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSkip}
                  className="w-full"
                >
                  Skip for Now
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground pt-2">
                By starting your trial, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>

        <div className="flex gap-4 pt-8 max-w-md mx-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/onboarding/team")}
            className="flex-1"
          >
            Back
          </Button>
        </div>
      </div>
    </ProgressBar>
  );
}
