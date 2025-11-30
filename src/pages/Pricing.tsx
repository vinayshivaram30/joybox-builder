import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import { Check, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import toyBlocks from "@/assets/toy-blocks.jpg";
import toyCraft from "@/assets/toy-craft.jpg";
import toyPuzzle from "@/assets/toy-puzzle.jpg";
import toyVehicles from "@/assets/toy-vehicles.jpg";
const Pricing = () => {
  const tiersAnim = useScrollAnimation(0.2);
  const comparisonAnim = useScrollAnimation(0.2);
  const boxAnim = useScrollAnimation(0.2);
  const faqAnim = useScrollAnimation(0.2);
  const toyParallax1 = useParallax(0.4);
  const toyParallax2 = useParallax(0.5);
  const toyParallax3 = useParallax(0.3);
  const toyParallax4 = useParallax(0.6);
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-3 sm:mb-4 leading-tight">
            Spend <span className="text-primary">less</span>. Play more.
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-0">
            Get premium toys worth ₹6,500 in every JoyBox at an affordable monthly price
          </p>
        </div>
      </section>
      
      {/* Pricing Tiers */}
      <section className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        {/* Trial Box */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="glass-card p-6 sm:p-8 border-2 border-accent/30 text-center">
            <div className="inline-block bg-accent/20 text-accent px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3">
              TRY BEFORE YOU COMMIT
            </div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl mb-1.5">Trial Box</h3>
            <div className="mb-4">
              <span className="text-4xl sm:text-5xl font-bold text-foreground">₹299</span>
              <span className="text-muted-foreground">/one-time</span>
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-4">
              Experience ToyLuv with a curated trial box. See the quality, hygiene, and joy firsthand.
            </p>
            
            <ul className="space-y-2 mb-6 text-left max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <Check className="text-accent flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">2 premium toys</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-accent flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Box value: ₹1,500+</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-accent flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Free delivery in Bengaluru</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-accent flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">No subscription required</span>
              </li>
            </ul>
            
            <Link to="/quiz">
              <Button variant="default" size="lg" className="w-full max-w-md">
                Try Trial Box
              </Button>
            </Link>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-center mb-6 sm:mb-8">
          Subscription Plans
        </h2>
        
        <div ref={tiersAnim.ref} className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-700 ${tiersAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Monthly Plan */}
          <div className="glass-card p-5 sm:p-6 md:p-8 hover-lift flex flex-col">
            <h3 className="font-heading font-bold text-xl sm:text-2xl mb-1.5">Monthly</h3>
            <div className="mb-4">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">₹999</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            
            <ul className="space-y-2 mb-6 flex-grow">
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">3-4 premium toys</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Box value: ₹6,500+</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">New JoyBox every 3 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Free delivery</span>
              </li>
            </ul>
            
            <Link to="/quiz" className="mt-auto">
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Quarterly Plan - Recommended */}
          <div className="glass-card p-5 sm:p-6 md:p-8 border-2 border-primary hover-lift relative flex flex-col">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
              Recommended
            </div>
            
            <h3 className="font-heading font-bold text-xl sm:text-2xl mb-1.5">Quarterly</h3>
            <div className="mb-4">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">₹899</span>
              <span className="text-muted-foreground">/month</span>
              <div className="text-xs sm:text-sm text-primary font-semibold mt-0.5">
                Save ₹300/quarter
              </div>
            </div>
            
            <ul className="space-y-2 mb-6 flex-grow">
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">3-4 premium toys</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Box value: ₹6,500+</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">New JoyBox every 3 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Priority delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-foreground font-semibold">1 extra month free</span>
              </li>
            </ul>
            
            <Link to="/quiz" className="mt-auto">
              <Button variant="cta" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Annual Plan */}
          <div className="glass-card p-5 sm:p-6 md:p-8 hover-lift flex flex-col">
            <h3 className="font-heading font-bold text-xl sm:text-2xl mb-1.5">Annual</h3>
            <div className="mb-4">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">₹799</span>
              <span className="text-muted-foreground">/month</span>
              <div className="text-xs sm:text-sm text-accent font-semibold mt-0.5">
                Save ₹2,400/year
              </div>
            </div>
            
            <ul className="space-y-2 mb-6 flex-grow">
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">3-4 premium toys</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Box value: ₹6,500+</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">New JoyBox every 3 weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">Priority delivery</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-foreground font-semibold">2 extra months free</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-foreground font-semibold">VIP support</span>
              </li>
            </ul>
            
            <Link to="/quiz" className="mt-auto">
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section ref={comparisonAnim.ref} className={`container mx-auto px-4 py-8 sm:py-10 md:py-12 transition-all duration-700 delay-200 ${comparisonAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center mb-6 sm:mb-8">
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
                    <td className="text-center p-4 font-semibold text-primary">₹799-999</td>
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
      <section ref={boxAnim.ref} className={`container mx-auto px-4 py-8 sm:py-10 md:py-12 transition-all duration-700 delay-300 ${boxAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center mb-2 sm:mb-3">
            What's Inside a JoyBox?
          </h2>
          <p className="text-center text-muted-foreground mb-6 sm:mb-8">
            Every box is curated for your child's development
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="glass-card p-3 sm:p-4 hover-lift">
              <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                <img src={toyBlocks} alt="Building blocks toy" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold mb-1 text-sm sm:text-base">Hands-On Play Toy</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5">
                Building blocks, toy bikes & cars, stacking toys, or construction sets
              </p>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Physical Development
              </span>
            </div>
            
            <div className="glass-card p-3 sm:p-4 hover-lift">
              <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                <img src={toyCraft} alt="Creative craft toy" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold mb-1 text-sm sm:text-base">Creativity Toy</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5">
                Art supplies, craft kits, or role-play items
              </p>
              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                Creative Expression
              </span>
            </div>
            
            <div className="glass-card p-3 sm:p-4 hover-lift">
              <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                <img src={toyPuzzle} alt="Educational puzzle toy" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold mb-1 text-sm sm:text-base">Problem-Solving Toy</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5">
                Puzzles, STEM toys, or logic games
              </p>
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                Cognitive Growth
              </span>
            </div>
            
            <div className="glass-card p-3 sm:p-4 hover-lift">
              <div className="aspect-square mb-2 overflow-hidden rounded-lg">
                <img src={toyVehicles} alt="Toy vehicles bikes cars trains" className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold mb-1 text-sm sm:text-base">Vehicle Toy</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5">
                Toy bikes, cars, trains, or transportation playsets
              </p>
              <span className="text-xs bg-coral/10 text-coral px-2 py-0.5 rounded-full">
                Imagination & Mobility
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section ref={faqAnim.ref} className={`container mx-auto px-4 py-8 sm:py-10 md:py-12 transition-all duration-700 delay-400 ${faqAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-center mb-2 sm:mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-muted-foreground mb-6 sm:mb-8">
            Everything you need to know about ToyLuv subscriptions
          </p>
          
          <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
            <AccordionItem value="item-1" className="glass-card px-4 sm:px-6 border-none">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                How does the subscription work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Choose your plan (Monthly, Quarterly, or Annual), take our 60-second Play Personality Quiz, and receive your first curated JoyBox within 48 hours. Every 3 weeks, we'll deliver a new box and pick up the previous one. You can pause or cancel anytime with no hidden fees.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="glass-card px-4 sm:px-6 border-none">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                What if my child doesn't like the toys?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                We offer a 100% satisfaction guarantee! If your child isn't excited about their JoyBox, contact us within 48 hours and we'll send a free replacement box with different toys. Our AI learns from your feedback to make better recommendations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="glass-card px-4 sm:px-6 border-none">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                How do you ensure toy hygiene?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Every toy undergoes our 4-step hospital-grade cleaning process: manual inspection for damage, ultrasonic deep cleaning (99.9% germ removal), medical-grade UV-C sterilization, and vacuum sealing. Each toy is treated as if it were new, ensuring your child's safety is never compromised.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="glass-card px-4 sm:px-6 border-none">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                What areas do you deliver to?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Currently, we serve all areas of Bengaluru with doorstep pickup and delivery within 48 hours. Our hyperlocal service means faster delivery, same-day exchanges, and better customer support. We're expanding to other cities soon - join our waitlist to be notified!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="glass-card px-4 sm:px-6 border-none">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                Can I cancel or pause my subscription?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes! You can pause your subscription for up to 3 months or cancel anytime without penalties. If you cancel, simply return the current JoyBox, and there are no additional charges. We believe in complete flexibility for busy parents.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="glass-card px-4 sm:px-6 border-none">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                What age groups do you cater to?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                We currently serve children aged 6 months to 8 years. Our AI curates age-appropriate toys based on developmental stages, ensuring safe, engaging, and educational play experiences. Each toy is selected to match your child's current skills and encourage growth.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="glass-card px-4 sm:px-6 border-none">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                What's the difference between the Trial Box and subscription plans?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                The Trial Box is a one-time purchase (₹299) with 2 toys worth ₹1,500+ to test our service. Subscription plans (starting at ₹999/month) include 3-4 premium toys worth ₹6,500+, regular exchanges every 3 weeks, priority delivery, and access to our full toy library. Trial Box users can upgrade to a subscription anytime.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="glass-card px-4 sm:px-6 border-none">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">
                How many toys will I receive in each JoyBox?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Each subscription JoyBox contains 3-4 premium toys worth ₹6,500+ in total. The exact number depends on the toy sizes and types selected for your child's age and interests. We focus on quality over quantity, ensuring each toy provides weeks of engaging play.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="max-w-3xl mx-auto glass-card p-6 sm:p-8 md:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-5">
            Take our 60-second quiz to discover your child's play personality and get personalized toy recommendations.
          </p>
          <Link to="/quiz">
            <Button variant="cta" size="lg">
              Take the Quiz Now
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Pricing;