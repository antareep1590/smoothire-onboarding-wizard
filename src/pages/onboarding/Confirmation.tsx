import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Rocket, BookOpen, Headphones } from "lucide-react";

const STEPS = ["Welcome", "Questions", "Company", "Team", "Payment", "Done"];

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <ProgressBar currentStep={6} steps={STEPS}>
      <div className="container max-w-4xl mx-auto px-6 py-12 lg:py-16">
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
              Welcome to Smoothire!
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your account is all set up and ready to go. Let's revolutionize your hiring process together.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4 pt-8">
            <Card className="p-6 text-center hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Start posting jobs and managing candidates
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <p className="text-sm text-muted-foreground">
                Explore guides and best practices
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elevated transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Headphones className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-sm text-muted-foreground">
                Get help from our expert team
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="px-8"
            >
              Go to Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://docs.example.com", "_blank")}
              className="px-8"
            >
              View Quickstart Guide
            </Button>
          </div>

          {/* Additional Info */}
          <Card className="p-6 bg-muted/50 border-border max-w-2xl mx-auto mt-8">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Need help getting started?</strong> Our support team is here 24/7. 
              You can reach us at{" "}
              <a href="mailto:support@smoothire.com" className="text-primary hover:underline">
                support@smoothire.com
              </a>{" "}
              or through the help widget in your dashboard.
            </p>
          </Card>
        </div>
      </div>
    </ProgressBar>
  );
}
