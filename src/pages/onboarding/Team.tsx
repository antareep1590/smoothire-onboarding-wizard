import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, MapPin, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const STEPS = ["Welcome", "Questions", "Company", "Team", "Payment", "Done"];

interface Contact {
  id: string;
  name: string;
  email: string;
  role: string;
  location: string;
  phone: string;
  isYou?: boolean;
}

export default function Team() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      location: "New York, US",
      phone: "+1 234 567 8900",
      isYou: true,
    },
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
    phone: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      setContacts([
        ...contacts,
        {
          ...newContact,
          id: Date.now().toString(),
        },
      ]);
      setNewContact({ name: "", email: "", role: "", location: "", phone: "" });
      setIsDialogOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/payment");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <ProgressBar currentStep={4} steps={STEPS}>
      <div className="container max-w-4xl mx-auto px-6 py-12 lg:py-16">
        <div className="bg-card rounded-xl shadow-card p-8 lg:p-12 border border-border">
          <div className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-3 tracking-tight">Add Your Team</h1>
            <p className="text-base text-muted-foreground">
              Invite your team members to collaborate on recruiting.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="p-6 hover:shadow-elevated transition-shadow">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-14 h-14 bg-primary text-primary-foreground">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {getInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        {contact.isYou && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            You
                          </Badge>
                        )}
                        <Badge variant="outline">{contact.role || "Member"}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{contact.email}</span>
                        </div>
                        {contact.location && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{contact.location}</span>
                          </div>
                        )}
                        {contact.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Add Contact Card */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Card className="p-6 border-dashed border-2 hover:bg-muted/50 hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">Add Point of Contact</span>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Name *</Label>
                      <Input
                        id="contactName"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactRole">Role</Label>
                      <Input
                        id="contactRole"
                        value={newContact.role}
                        onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                        placeholder="e.g., Recruiter, Manager"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactLocation">Location</Label>
                      <Input
                        id="contactLocation"
                        value={newContact.location}
                        onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone</Label>
                      <Input
                        id="contactPhone"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleAddContact}
                      disabled={!newContact.name || !newContact.email}
                      className="flex-1"
                    >
                      Add Contact
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/onboarding/company")}
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
