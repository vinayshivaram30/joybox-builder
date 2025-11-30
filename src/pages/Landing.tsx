import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { Star, Sparkles, Shield, RefreshCw, TruckIcon } from "lucide-react";
import WaitlistDialog from "@/components/WaitlistDialog";
import heroImage from "@/assets/hero-toys.jpg";

const Landing = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const heroParallax = useParallax(0.3);
  const benefitsAnim = useScrollAnimation(0.2);
  const proofAnim = useScrollAnimation(0.2);

  return (
    <div className="min-h-screen bg-background">
      {/* No navigation - conversion focused */}
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Playtime works better when toys match your child.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Our AI Play Personality Test helps you pick toys that match how your child learns, grows, and plays.
          </p>
          
          <Link to="/quiz">
            <Button size="lg" className="h-auto mb-4 bg-gradient-to-r from-primary via-accent to-secondary hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/30 text-primary-foreground font-bold text-base sm:text-lg md:text-xl px-6 py-4 sm:px-10 sm:py-6 md:px-14 md:py-7">
              Find Your Kid&apos;s Toy Personality
              <Sparkles className="ml-2 animate-pulse" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground mb-8">
            60-second quiz • Personalized results • No payment needed
          </p>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
            <div ref={heroParallax} className="parallax-slow">
              <img
                src={heroImage}
                alt="Happy child playing with organized toys"
                className="w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* The Problem */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Sound familiar?
          </h2>
          
          <div className="space-y-4 text-lg text-muted-foreground mb-8">
            <p className="flex items-center gap-3 justify-center">
              <span className="text-2xl">😓</span>
              <span>Spent thousands on toys. Kid plays with the box.</span>
            </p>
            <p className="flex items-center gap-3 justify-center">
              <span className="text-2xl">📦</span>
              <span>Home is drowning in clutter. No storage left.</span>
            </p>
            <p className="flex items-center gap-3 justify-center">
              <span className="text-2xl">🗑️</span>
              <span>Guilt about throwing away expensive, barely-used toys.</span>
            </p>
          </div>
        </div>
      </section>
      
      {/* The Offer */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center bg-accent/5 border-2 border-accent/20">
          <div className="inline-block bg-coral text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            LIMITED TIME OFFER
          </div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Get ₹6,500 worth of toys
          </h2>
          <p className="text-2xl md:text-4xl font-heading font-bold text-primary mb-6">
            For just ₹999/month
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            3-4 premium toys, AI-matched to your child, delivered monthly. No commitment. Cancel anytime.
          </p>
          
          <Button 
            variant="cta" 
            size="lg" 
            className="text-xl px-12 h-16"
            onClick={() => setWaitlistOpen(true)}
          >
            Join Our Exclusive Waitlist
          </Button>
        </div>
      </section>
      
      {/* Why It Works */}
      <section 
        ref={benefitsAnim.ref}
        className={`container mx-auto px-4 py-12 transition-all duration-700 ${
          benefitsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-12">
            Why Bengaluru Parents Love ToyLuv
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 flex gap-4 items-start hover-lift">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">AI-Matched Toys</h3>
                <p className="text-muted-foreground">
                  Our 60-second quiz identifies your child's play personality and curates toys they'll actually love
                </p>
              </div>
            </div>
            
            <div className="glass-card p-6 flex gap-4 items-start hover-lift">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Shield className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Hospital-Grade Hygiene</h3>
                <p className="text-muted-foreground">
                  UV-C sterilization, ultrasonic cleaning, and vacuum-sealed packaging. Safer than store-bought.
                </p>
              </div>
            </div>
            
            <div className="glass-card p-6 flex gap-4 items-start hover-lift">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <TruckIcon className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Doorstep Delivery</h3>
                <p className="text-muted-foreground">
                  A new JoyBox every 3 weeks at your doorstep. Anywhere in Bengaluru.
                </p>
              </div>
            </div>
            
            <div className="glass-card p-6 flex gap-4 items-start hover-lift">
              <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="text-coral" size={24} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Zero Clutter</h3>
                <p className="text-muted-foreground">
                  No accumulation. No storage issues. Just fresh, engaging toys every month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section 
        ref={proofAnim.ref}
        className={`container mx-auto px-4 py-12 transition-all duration-700 delay-200 ${
          proofAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-accent text-accent" size={24} />
              ))}
            </div>
            <p className="text-lg font-semibold">
              Rated 4.9/5 by 500+ Bengaluru parents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-accent text-accent" size={16} />
                ))}
              </div>
              <p className="text-foreground mb-4">
                "My 3-year-old was bored within days of getting new toys. With ToyLuv, she's excited every month. The AI really works!"
              </p>
              <p className="text-sm font-semibold">— Priya M., Koramangala</p>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-accent text-accent" size={16} />
                ))}
              </div>
              <p className="text-foreground mb-4">
                "Saved me ₹2,000+ per month. No more toy graveyard at home. The hygiene standards are incredible."
              </p>
              <p className="text-sm font-semibold">— Rahul K., Indiranagar</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="container mx-auto px-4 py-12 mb-20">
        <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to end toy boredom forever?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join the waitlist and be first to get AI-matched toys your child will love
          </p>
          <Button 
            variant="cta" 
            size="lg" 
            className="text-xl px-12 h-16"
            onClick={() => setWaitlistOpen(true)}
          >
            Claim Your Spot Now ✨
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Early bird perks • Exclusive discounts • Priority access
          </p>
        </div>
      </section>
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-border md:hidden z-50">
        <Button 
          variant="cta" 
          size="lg" 
          className="w-full"
          onClick={() => setWaitlistOpen(true)}
        >
          Join Waitlist
        </Button>
      </div>

      <WaitlistDialog 
        open={waitlistOpen} 
        onOpenChange={setWaitlistOpen}
      />
    </div>
  );
};

export default Landing;
