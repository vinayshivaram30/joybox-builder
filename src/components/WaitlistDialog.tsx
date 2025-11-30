import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Heart, Gift, Loader2, CheckCircle2, Star, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPlan?: string;
  defaultPersonalityType?: string;
}

const WaitlistDialog = ({ open, onOpenChange, defaultPlan, defaultPersonalityType }: WaitlistDialogProps) => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [interestedPlan, setInterestedPlan] = useState(defaultPlan || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const refParam = searchParams.get("ref");
    if (refParam) {
      setReferredBy(refParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !parentName) {
      toast({
        title: "Missing Information",
        description: "Please provide at least your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: waitlistData, error } = await supabase.from("waitlist").insert({
        email,
        parent_name: parentName,
        child_age: childAge,
        interested_plan: interestedPlan,
        personality_type: defaultPersonalityType,
        phone_number: phoneNumber,
        referred_by: referredBy,
      }).select("referral_code").single();

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already on the List! 🎉",
            description: "You're already part of our exclusive waitlist. We'll notify you soon!",
          });
          setIsSuccess(true);
        } else {
          throw error;
        }
      } else {
        const generatedReferralCode = waitlistData?.referral_code || "";
        setReferralCode(generatedReferralCode);

        // Send welcome email
        try {
          await supabase.functions.invoke("send-waitlist-welcome", {
            body: {
              parentName,
              email,
              interestedPlan,
              personalityType: defaultPersonalityType,
              referralCode: generatedReferralCode,
              childAge,
            },
          });
        } catch (emailError) {
          console.error("Error sending welcome email:", emailError);
          // Don't fail the whole process if email fails
        }

        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setEmail("");
    setParentName("");
    setChildAge("");
    setInterestedPlan(defaultPlan || "");
    setPhoneNumber("");
    setReferralCode("");
    onOpenChange(false);
  };

  if (isSuccess) {
    const referralLink = `${window.location.origin}/?ref=${referralCode}`;

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="relative">
              <CheckCircle2 className="h-20 w-20 text-primary animate-bounce" />
              <Sparkles className="h-6 w-6 text-accent absolute -top-2 -right-2 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <DialogTitle className="text-2xl">You're In! 🎉</DialogTitle>
              <DialogDescription className="text-base">
                Welcome to the ToyLuv family! You're now part of an exclusive community 
                of parents who believe in the power of personalized play.
              </DialogDescription>
            </div>

            <div className="bg-accent/10 rounded-lg p-4 space-y-2 w-full">
              <div className="flex items-center gap-2 justify-center text-sm">
                <Gift className="h-4 w-4 text-accent" />
                <span className="font-medium">Early bird perks coming your way</span>
              </div>
              <div className="space-y-1 text-left text-xs">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                  <span>Priority access when we launch</span>
                </div>
                <div className="flex items-start gap-2">
                  <Star className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                  <span>Exclusive 20% discount on first month</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                  <span>Free trial box upgrade</span>
                </div>
                <div className="flex items-start gap-2">
                  <Gift className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                  <span>First pick of premium toys</span>
                </div>
              </div>
            </div>

            {referralCode && (
              <div className="bg-primary/10 rounded-xl p-4 border-2 border-primary/30 w-full space-y-3">
                <h4 className="font-semibold text-primary text-sm">🚀 Your Referral Code</h4>
                <p className="text-2xl font-bold text-primary tracking-wider">{referralCode}</p>
                <p className="text-xs text-muted-foreground">Share this code with friends and earn rewards!</p>
                
                <div className="text-xs text-left space-y-2 pt-2 border-t border-primary/20">
                  <p className="font-semibold">Referral Rewards:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-1">
                      <span>•</span>
                      <span>3 friends = Free extra toy</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span>•</span>
                      <span>5 friends = 1 month free</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span>•</span>
                      <span>10 friends = 2 months free + VIP status</span>
                    </li>
                  </ul>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(referralLink);
                    toast({ title: "Copied!", description: "Share link copied to clipboard" });
                  }}
                >
                  Copy Share Link
                </Button>
              </div>
            )}

            <div className="flex flex-col gap-2 w-full pt-4">
              <Button onClick={handleClose} size="lg" className="w-full">
                <Heart className="h-4 w-4 mr-2" />
                Awesome, Thanks!
              </Button>
              <p className="text-xs text-muted-foreground">
                We'll keep you updated via email. Get ready for something amazing! ✨
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            <DialogTitle className="text-2xl">Join Our Exclusive Waitlist</DialogTitle>
          </div>
          <DialogDescription>
            Be among the first to experience personalized toy subscriptions when we launch! 
            Early members get special perks and exclusive discounts. 🎁
            {referredBy && (
              <span className="block mt-2 text-sm font-semibold text-primary">
                ✨ You were referred by a friend! Extra perks await!
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parent-name">Parent Name *</Label>
            <Input
              id="parent-name"
              placeholder="Your name"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="child-age">Child's Age</Label>
            <Input
              id="child-age"
              placeholder="e.g., 3 years"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp Number (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan">Interested Plan</Label>
            <Select value={interestedPlan} onValueChange={setInterestedPlan}>
              <SelectTrigger id="plan">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trial">Trial Box</SelectItem>
                <SelectItem value="monthly">Monthly Plan</SelectItem>
                <SelectItem value="quarterly">Quarterly Plan</SelectItem>
                <SelectItem value="annual">Annual Plan</SelectItem>
                <SelectItem value="not-sure">Not Sure Yet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-accent/20 rounded-lg p-3 space-y-1">
            <p className="text-sm font-medium flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Early Bird Benefits:
            </p>
            <ul className="text-xs space-y-1 ml-6 list-disc text-muted-foreground">
              <li>First access when we launch</li>
              <li>Exclusive launch discounts</li>
              <li>Priority customer support</li>
              <li>Special welcome gift with first box</li>
            </ul>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Joining...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Reserve My Spot
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            No credit card required. We'll notify you when we launch! 🚀
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistDialog;