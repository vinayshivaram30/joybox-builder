import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { Star, Sparkles, Shield, RefreshCw, TruckIcon } from "lucide-react";
import heroImage from "@/assets/hero-toys.jpg";

const Landing = () => {
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
            Is your child <span className="text-coral">bored</span> of their toys?
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Join Bengaluru parents using AI-curated toys to keep kids engaged
          </p>
          
          <Link to="/quiz">
            <Button variant="cta" size="lg" className="text-xl px-12 h-16 mb-8">
              Take the 60-Second Quiz ✨
            </Button>
          </Link>
          
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
          
          <Link to="/quiz">
            <Button variant="cta" size="lg" className="text-xl px-12 h-16">
              Claim Your First Box
            </Button>
          </Link>
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
            Ready to end toy boredom?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Take our 60-second quiz. Get your child's personalized JoyBox preview. No payment needed.
          </p>
          <Link to="/quiz">
            <Button variant="cta" size="lg" className="text-xl px-12 h-16">
              Start the Quiz Now ✨
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            No commitment • Cancel anytime • Free delivery in Bengaluru
          </p>
        </div>
      </section>
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-border md:hidden z-50">
        <Link to="/quiz" className="block">
          <Button variant="cta" size="lg" className="w-full">
            Start Quiz Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
