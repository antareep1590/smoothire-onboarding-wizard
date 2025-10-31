import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Smoothire
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Simplify your hiring, collaborate with ease, get insights that matter.
          </p>
        </div>
        
        <Button
          size="lg"
          onClick={() => navigate("/onboarding/welcome")}
          className="group px-8"
        >
          Start Your Journey
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
