import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { HelpCircle } from "lucide-react";

const STEPS = ["Welcome", "Questions", "Company", "Team", "Payment", "Done"];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    goal: "",
    criteria: "",
    painPoints: "",
    teamSize: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/company");
  };

  return (
    <ProgressBar currentStep={2} steps={STEPS}>
      <div className="container max-w-4xl mx-auto px-6 py-12 lg:py-16">
        <div className="bg-card rounded-xl shadow-card p-8 lg:p-12 border border-border">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-3 tracking-tight">Tell us about your needs</h1>
            <p className="text-base text-muted-foreground">
              Help us understand your recruiting goals so we can tailor Smoothire to your needs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Question 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-base font-semibold">What's your primary goal with a new ATS?</Label>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <RadioGroup
                value={formData.goal}
                onValueChange={(value) => setFormData({ ...formData, goal: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="streamline" id="streamline" />
                  <Label htmlFor="streamline" className="cursor-pointer flex-1 font-normal">
                    Streamline our hiring process
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="collaboration" id="collaboration" />
                  <Label htmlFor="collaboration" className="cursor-pointer flex-1 font-normal">
                    Improve team collaboration
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="insights" id="insights" />
                  <Label htmlFor="insights" className="cursor-pointer flex-1 font-normal">
                    Get better hiring insights and analytics
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="experience" id="experience" />
                  <Label htmlFor="experience" className="cursor-pointer flex-1 font-normal">
                    Enhance candidate experience
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Question 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-base font-semibold">What are your main evaluation criteria for an ATS?</Label>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <Textarea
                placeholder="E.g., ease of use, integrations, pricing, reporting capabilities..."
                value={formData.criteria}
                onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                className="min-h-[120px]"
              />
            </div>

            {/* Question 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-base font-semibold">What are your current process pain points?</Label>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <Textarea
                placeholder="Tell us about the challenges you're facing with your current recruiting process..."
                value={formData.painPoints}
                onChange={(e) => setFormData({ ...formData, painPoints: e.target.value })}
                className="min-h-[120px]"
              />
            </div>

            {/* Question 4 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="teamSize" className="text-base font-semibold">
                  How many recruiters will need access?
                </Label>
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input
                id="teamSize"
                type="number"
                min="1"
                placeholder="Number of team members"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="max-w-xs"
              />
              <p className="text-sm text-muted-foreground">
                This helps us recommend the right plan and features for your team.
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/onboarding/welcome")}
                className="flex-1 max-w-xs"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1 max-w-xs">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProgressBar>
  );
}
