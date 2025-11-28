import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { Check, X, Shield } from "lucide-react";
import toyBlocks from "@/assets/toy-blocks.jpg";
import toyCraft from "@/assets/toy-craft.jpg";
import toyPuzzle from "@/assets/toy-puzzle.jpg";

const Pricing = () => {
  const tiersAnim = useScrollAnimation(0.2);
  const comparisonAnim = useScrollAnimation(0.2);
  const boxAnim = useScrollAnimation(0.2);
  const toyParallax1 = useParallax(0.4);
  const toyParallax2 = useParallax(0.5);
  const toyParallax3 = useParallax(0.3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            Spend <span className="text-primary">less</span>. Play more.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Get premium toys worth ₹4,500 in every JoyBox at an affordable monthly price
          </p>
        </div>
      </section>
      
      {/* Pricing Tiers */}
      <section className="container mx-auto px-4 py-16">
        <div 
          ref={tiersAnim.ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-700 ${
            tiersAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Monthly Plan */}
          <div className="glass-card p-8 hover-lift">
            <h3 className="font-heading font-bold text-2xl mb-2">Monthly</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">₹1,499</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">3-4 premium toys</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Box value: ₹4,500+</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Monthly swap</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Free delivery</span>
              </li>
            </ul>
            
            <Link to="/quiz">
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Quarterly Plan - Recommended */}
          <div className="glass-card p-8 border-2 border-primary hover-lift relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              Recommended
            </div>
            
            <h3 className="font-heading font-bold text-2xl mb-2">Quarterly</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">₹1,299</span>
              <span className="text-muted-foreground">/month</span>
              <div className="text-sm text-primary font-semibold mt-1">
                Save ₹600/quarter
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">3-4 premium toys</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Box value: ₹4,500+</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Monthly swap</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Priority delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-foreground font-semibold">Free bonus box</span>
              </li>
            </ul>
            
            <Link to="/quiz">
              <Button variant="cta" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Annual Plan */}
          <div className="glass-card p-8 hover-lift">
            <h3 className="font-heading font-bold text-2xl mb-2">Annual</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">₹999</span>
              <span className="text-muted-foreground">/month</span>
              <div className="text-sm text-accent font-semibold mt-1">
                Save ₹6,000/year
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">3-4 premium toys</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Box value: ₹4,500+</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Monthly swap</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Priority delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-foreground font-semibold">2 free bonus boxes</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-foreground font-semibold">VIP support</span>
              </li>
            </ul>
            
            <Link to="/quiz">
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section 
        ref={comparisonAnim.ref}
        className={`container mx-auto px-4 py-16 transition-all duration-700 delay-200 ${
          comparisonAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            ToyLuv vs Buying Toys
          </h2>
          
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-heading font-bold">Feature</th>
                    <th className="text-center p-4 font-heading font-bold">Buying Toys</th>
                    <th className="text-center p-4 font-heading font-bold text-primary">ToyLuv</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-4">Monthly Cost</td>
                    <td className="text-center p-4 text-muted-foreground">₹3,000+</td>
                    <td className="text-center p-4 font-semibold text-primary">₹999-1,499</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Clutter</td>
                    <td className="text-center p-4">
                      <X className="text-destructive mx-auto" size={20} />
                    </td>
                    <td className="text-center p-4">
                      <Check className="text-primary mx-auto" size={20} />
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Hygiene Standards</td>
                    <td className="text-center p-4 text-muted-foreground">Unknown</td>
                    <td className="text-center p-4 font-semibold">Hospital-grade</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Variety</td>
                    <td className="text-center p-4 text-muted-foreground">Limited</td>
                    <td className="text-center p-4 font-semibold">New toys monthly</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-4">Environmental Impact</td>
                    <td className="text-center p-4">
                      <X className="text-destructive mx-auto" size={20} />
                    </td>
                    <td className="text-center p-4">
                      <Check className="text-primary mx-auto" size={20} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      {/* What's Inside a JoyBox */}
      <section 
        ref={boxAnim.ref}
        className={`container mx-auto px-4 py-16 transition-all duration-700 delay-300 ${
          boxAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            What's Inside a JoyBox?
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Every box is curated for your child's development
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-4 hover-lift">
              <div className="aspect-square rounded-xl mb-3 overflow-hidden">
                <div ref={toyParallax1} className="parallax-slow h-full">
                  <img
                    src={toyBlocks}
                    alt="Building blocks toy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="font-semibold mb-1">Motor Skills Toy</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Building blocks, stacking toys, or construction sets
              </p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                Physical Development
              </span>
            </div>
            
            <div className="glass-card p-4 hover-lift">
              <div className="aspect-square rounded-xl mb-3 overflow-hidden">
                <div ref={toyParallax2} className="parallax-slow h-full">
                  <img
                    src={toyCraft}
                    alt="Creative craft toy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="font-semibold mb-1">Creativity Toy</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Art supplies, craft kits, or role-play items
              </p>
              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                Creative Expression
              </span>
            </div>
            
            <div className="glass-card p-4 hover-lift">
              <div className="aspect-square rounded-xl mb-3 overflow-hidden">
                <div ref={toyParallax3} className="parallax-slow h-full">
                  <img
                    src={toyPuzzle}
                    alt="Educational puzzle toy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h4 className="font-semibold mb-1">Problem-Solving Toy</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Puzzles, STEM toys, or logic games
              </p>
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                Cognitive Growth
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Guarantee */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 text-center">
          <Shield className="text-primary mx-auto mb-4" size={48} />
          <h2 className="text-3xl font-heading font-bold mb-4">
            Our Happiness Guarantee
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Not happy with your first box? We'll swap it for free within 48 hours. No questions asked.
          </p>
          <Link to="/quiz">
            <Button variant="cta" size="lg">
              Start Risk-Free Trial
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing;
