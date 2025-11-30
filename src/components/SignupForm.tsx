import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface SignupFormProps {
  onSubmit: (data: { name: string; email: string; phone: string; pincode: string }) => void;
  isLoading?: boolean;
}

export const SignupForm = ({ onSubmit, isLoading = false }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
      onSubmit(formData);
    }
  };

  return (
    <div className="glass-card p-4 sm:p-6 md:p-8 max-w-xl mx-auto animate-slide-in">
      <h3 className="text-xl sm:text-2xl font-heading font-bold text-center mb-4 sm:mb-6 px-2">
        One Last Step! 🎉
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <Label htmlFor="name" className="text-sm sm:text-base font-semibold">
            Parent's Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1.5 sm:mt-2 h-11 sm:h-12 rounded-xl border-2 text-sm sm:text-base"
          />
          {errors.name && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm sm:text-base font-semibold">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1.5 sm:mt-2 h-11 sm:h-12 rounded-xl border-2 text-sm sm:text-base"
          />
          {errors.email && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm sm:text-base font-semibold">
            WhatsApp Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="10 digit mobile number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
            className="mt-1.5 sm:mt-2 h-11 sm:h-12 rounded-xl border-2 text-sm sm:text-base"
          />
          {errors.phone && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="pincode" className="text-sm sm:text-base font-semibold">
            Bengaluru Pincode
          </Label>
          <Input
            id="pincode"
            type="tel"
            placeholder="6 digit pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
            className="mt-1.5 sm:mt-2 h-11 sm:h-12 rounded-xl border-2 text-sm sm:text-base"
          />
          {errors.pincode && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.pincode}</p>
          )}
        </div>

        <Button 
          type="submit" 
          variant="cta" 
          size="lg" 
          className="w-full mt-5 sm:mt-6 h-12 sm:h-14 text-sm sm:text-base"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "View My Child's Box"}
        </Button>
      </form>
    </div>
  );
};
