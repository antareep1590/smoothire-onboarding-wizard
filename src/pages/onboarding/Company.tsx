import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { Upload, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STEPS = ["Welcome", "Questions", "Company", "Payment", "Done"];

export default function Company() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    location: "",
    companyType: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>(["Technology", "Sales"]);
  const [newSkill, setNewSkill] = useState("");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/payment");
  };

  return (
    <ProgressBar currentStep={3} steps={STEPS}>
      <div className="container max-w-4xl mx-auto px-6 py-12 lg:py-16">
        <div className="bg-card rounded-xl shadow-card p-8 lg:p-12 border border-border">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-3 tracking-tight">Company Details</h1>
            <p className="text-base text-muted-foreground">
              Tell us about your organization to personalize your experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Your company name"
                  />
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Primary Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Right Column - Logo Upload */}
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-border rounded-lg bg-muted/50 h-full min-h-[300px]">
                  <div className="w-32 h-32 rounded-lg flex items-center justify-center bg-background">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain rounded-lg" />
                    ) : (
                      <Building2 className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>
                  <Label htmlFor="logo" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-md hover:bg-muted transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">Upload Logo</span>
                    </div>
                  </Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Company Type */}
            <div className="space-y-2">
              <Label htmlFor="companyType">Type *</Label>
              <Select
                value={formData.companyType}
                onValueChange={(value) => setFormData({ ...formData, companyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staffing">Staffing Agency</SelectItem>
                  <SelectItem value="recruitment">Recruitment Agency / Consulting</SelectItem>
                  <SelectItem value="corporate">Corporate/In-house</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Skills/Industries */}
            <div className="space-y-2">
              <Label>Skills Typically Hired</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill and press Enter"
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                E.g., Technology, Sales, Marketing, Finance, Healthcare
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/onboarding/questionnaire")}
                className="flex-1 max-w-xs"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1 max-w-xs" disabled={!formData.companyName || !formData.companyType}>
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProgressBar>
  );
}
