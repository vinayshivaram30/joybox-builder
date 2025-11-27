import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { Shield, TruckIcon, Check } from "lucide-react";
import toyBlocks from "@/assets/toy-blocks.jpg";
import toyCraft from "@/assets/toy-craft.jpg";
import toyPuzzle from "@/assets/toy-puzzle.jpg";

const Signup = () => {
  const boxAnim = useScrollAnimation(0.2);
  const formAnim = useScrollAnimation(0.2);
  const toyParallax1 = useParallax(0.4);
  const toyParallax2 = useParallax(0.5);
  const toyParallax3 = useParallax(0.3);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
  });
  const [selectedPlan, setSelectedPlan] = useState("quarterly");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10 digit mobile number";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6 digit pincode";
    } else if (!formData.pincode.startsWith("56")) {
      newErrors.pincode = "We currently deliver only in Bengaluru";
      toast.error("We'll notify you when we launch in your area", {
        description: "Currently serving Bengaluru only",
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("JoyBox activated! 🎉", {
        description: "Delivery scheduled within 2 days",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4 leading-tight">
            Great news! We found the right toys for your child.
          </h1>
          <p className="text-xl text-muted-foreground">
            Personalized JoyBox preview based on their Play Personality
          </p>
        </div>

        {/* JoyBox Preview */}
        <div 
          ref={boxAnim.ref}
          className={`max-w-5xl mx-auto mb-12 transition-all duration-700 ${
            boxAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-8">
              Your Child's Personalized JoyBox
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-4 border-2 border-primary/10">
                <div className="aspect-square bg-muted rounded-xl mb-3 overflow-hidden">
                  <div ref={toyParallax1} className="parallax-slow h-full">
                    <img
                      src={toyBlocks}
                      alt="Motor skill toy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h4 className="font-semibold mb-1">Motor Skills Toy</h4>
                <p className="text-sm text-muted-foreground">Building & Construction</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border-2 border-primary/10">
                <div className="aspect-square bg-muted rounded-xl mb-3 overflow-hidden">
                  <div ref={toyParallax2} className="parallax-slow h-full">
                    <img
                      src={toyPuzzle}
                      alt="Problem solver toy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h4 className="font-semibold mb-1">Problem Solver</h4>
                <p className="text-sm text-muted-foreground">Puzzles & Logic</p>
              </div>

              <div className="bg-white rounded-2xl p-4 border-2 border-primary/10">
                <div className="aspect-square bg-muted rounded-xl mb-3 overflow-hidden">
                  <div ref={toyParallax3} className="parallax-slow h-full">
                    <img
                      src={toyCraft}
                      alt="Creativity toy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h4 className="font-semibold mb-1">Creativity Toy</h4>
                <p className="text-sm text-muted-foreground">Arts & Crafts</p>
              </div>
            </div>

            <div className="bg-accent/10 rounded-2xl p-6 border-2 border-accent/20 text-center">
              <p className="text-lg mb-2">
                <span className="font-heading font-semibold">Box Value:</span>{" "}
                <span className="text-2xl font-bold text-foreground">₹4,500+</span>
              </p>
              <p className="text-lg">
                <span className="font-heading font-semibold">Your Price:</span>{" "}
                <span className="text-2xl font-bold text-primary">₹1,299/month</span>
                <span className="text-sm text-muted-foreground ml-2">(Quarterly Plan)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Signup Form & Plan Selection */}
        <div 
          ref={formAnim.ref}
          className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${
            formAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-card p-8 md:p-12">
            <h3 className="text-2xl font-heading font-bold text-center mb-8">
              Complete Your Signup
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              <div>
                <Label htmlFor="name" className="text-base font-semibold">
                  Parent's Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 h-12 rounded-xl border-2"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-semibold">
                  WhatsApp Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="10 digit mobile number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                    })
                  }
                  className="mt-2 h-12 rounded-xl border-2"
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="pincode" className="text-base font-semibold">
                  Bengaluru Pincode
                </Label>
                <Input
                  id="pincode"
                  type="tel"
                  placeholder="6 digit pincode"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                    })
                  }
                  className="mt-2 h-12 rounded-xl border-2"
                />
                {errors.pincode && (
                  <p className="text-destructive text-sm mt-1">{errors.pincode}</p>
                )}
              </div>

              {/* Plan Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Choose Your Plan
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan("monthly")}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedPlan === "monthly"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold">Monthly</p>
                    <p className="text-2xl font-bold">₹1,499</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan("quarterly")}
                    className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                      selectedPlan === "quarterly"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="absolute -top-2 right-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-semibold">
                      Best Value
                    </div>
                    <p className="font-semibold">Quarterly</p>
                    <p className="text-2xl font-bold">₹1,299</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan("annual")}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedPlan === "annual"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold">Annual</p>
                    <p className="text-2xl font-bold">₹999</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 py-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="text-primary" size={20} />
                  <span>SSL Secure</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="text-primary" size={20} />
                  <span>Sanitized Toys</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TruckIcon className="text-primary" size={20} />
                  <span>Free Pickup & Drop</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="cta" size="lg" className="w-full">
                Activate My JoyBox
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Delivery scheduled within 2 days • Cancel anytime
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
