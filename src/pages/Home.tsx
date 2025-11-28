import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";
import heroImage from "@/assets/hero-toys.jpg";
import logoSvg from "@/assets/toyluv-logo.svg";
import { Sparkles, Shield, TruckIcon, Star, CheckCircle, ClipboardList, Package, RefreshCw, Wallet, Brain, Leaf } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";
import { OrbitCard } from "@/components/ui/orbit-card";
import { GlowingCards, GlowingCard } from "@/components/ui/glowing-cards";
import { SlidingLogoMarquee } from "@/components/ui/sliding-logo-marquee";
import { TrustedUsers } from "@/components/TrustedUsers";
import { FloatingQuizButton } from "@/components/FloatingQuizButton";
const Home = () => {
  const heroParallax = useParallax(0.3);
  const valuePropsAnim = useScrollAnimation(0.2);
  const showcaseAnim = useScrollAnimation(0.2);
  const testimonialsAnim = useScrollAnimation(0.2);
  return <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingQuizButton />
      
      {/* Hero Section - Full Width */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary/15 via-background to-accent/15 overflow-hidden">
        <ParticlesBackground colors={['#e91e63', '#00bcd4', '#ffc107']} size={3} countDesktop={80} countTablet={60} countMobile={40} zIndex={0} height="100%" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <img src={logoSvg} alt="ToyLuv" className="h-24 md:h-32 w-auto mx-auto mb-8 drop-shadow-2xl animate-float" loading="eager" />
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Making playtime{" "}
              <span className="text-primary">smarter</span> with every box
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              AI-curated, hygienic, high-value toys. Now in Bengaluru.
            </p>
            
            <Link to="/quiz">
              <Button size="lg" className="px-16 py-8 h-auto mb-8 bg-gradient-to-r from-primary via-accent to-secondary hover:scale-105 transition-all duration-300 shadow-2xl shadow-primary/30 text-primary-foreground font-bold text-2xl">
                Find Your Child's Toy Personality 
                <Sparkles className="ml-2 animate-pulse mx-[5px]" />
              </Button>
            </Link>
            
            <TrustedUsers avatars={["https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael", "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh", "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"]} rating={5} totalUsersText={2500} caption="Loved by" starColorClass="text-yellow-500" ringColors={["ring-primary", "ring-secondary", "ring-accent", "ring-coral", "ring-primary"]} className="mb-12" />
          </div>
        </div>
      </section>
      
      {/* Value Proposition Grid */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div ref={valuePropsAnim.ref} className={`transition-all duration-700 max-w-6xl mx-auto ${valuePropsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <GlowingCards enableGlow={true} glowRadius={20} glowOpacity={0.8} gap="1.5rem" padding="0">
              <GlowingCard glowColor="#e91e63">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Sparkles className="text-primary" size={24} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">AI Curation</h3>
                <p className="text-muted-foreground">
                  Toys matched to your child's unique play personality and developmental stage.
                </p>
              </GlowingCard>
              
              <GlowingCard glowColor="#00bcd4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Shield className="text-secondary" size={24} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Hygiene Shield</h3>
                <p className="text-muted-foreground">
                  Hospital-grade cleaning with UV-C sterilization and vacuum sealing.
                </p>
              </GlowingCard>
              
              <GlowingCard glowColor="#ffc107">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-accent/20">
                  <CheckCircle size={24} className="text-accent" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Eco-Friendly Play</h3>
                <p className="text-muted-foreground">
                  Sustainable toy rotation every month. Zero clutter. Maximum variety. Planet-friendly joy.
                </p>
              </GlowingCard>
              
              <GlowingCard glowColor="#ff7043">
                <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center mb-4">
                  <TruckIcon className="text-coral" size={24} />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">Bengaluru Delivery</h3>
                <p className="text-muted-foreground">
                  Hyperlocal service. Doorstep pickup and delivery within 48 hours.
                </p>
              </GlowingCard>
            </GlowingCards>
          </div>
        </div>
      </section>
      
      {/* The JoyLoop */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            The JoyLoop
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to endless play possibilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="text-primary" size={40} />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Profile</h3>
            <p className="text-muted-foreground">
              Take our 60-second AI quiz to discover your child's play personality
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <Package className="text-secondary" size={40} />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Play</h3>
            <p className="text-muted-foreground">
              Receive curated JoyBox with 3-4 premium toys worth ₹4,500+
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 bg-muted">
              <RefreshCw className="text-accent" size={40} />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Refresh</h3>
            <p className="text-muted-foreground">
              A new JoyBox every 3 weeks at your doorstep. Keep the fun fresh, home clutter-free
            </p>
          </div>
        </div>
      </section>
      
      {/* Toy Brands */}
      <section ref={showcaseAnim.ref} className={`container mx-auto px-4 py-16 bg-muted/30 rounded-3xl transition-all duration-700 delay-200 ${showcaseAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Premium Brands You Trust
          </h2>
          <p className="text-lg text-muted-foreground">
            We partner with the world's best toy makers
          </p>
        </div>
        
        <SlidingLogoMarquee items={[{
        id: "melissa",
        content: <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-6 shadow-md min-w-[200px]">
                  <div className="text-xl font-bold text-[#E85D75]">Melissa & Doug</div>
                </div>
      }, {
        id: "hape",
        content: <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-6 shadow-md min-w-[200px]">
                  <div className="text-xl font-bold text-[#FF6B35]">Hape</div>
                </div>
      }, {
        id: "fisher",
        content: <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-6 shadow-md min-w-[200px]">
                  <div className="text-xl font-bold text-[#00539B]">Fisher-Price</div>
                </div>
      }, {
        id: "lego",
        content: <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-6 shadow-md min-w-[200px]">
                  <div className="text-xl font-bold text-[#FFCF00]">LEGO</div>
                </div>
      }, {
        id: "hasbro",
        content: <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-6 shadow-md min-w-[200px]">
                  <div className="text-xl font-bold text-[#0072BC]">Hasbro</div>
                </div>
      }, {
        id: "mattel",
        content: <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-6 shadow-md min-w-[200px]">
                  <div className="text-xl font-bold text-[#E4032E]">Mattel</div>
                </div>
      }, {
        id: "playmobil",
        content: <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-6 shadow-md min-w-[200px]">
                  <div className="text-xl font-bold text-[#0066CC]">Playmobil</div>
                </div>
      }, {
        id: "vtech",
        content: <div className="bg-white dark:bg-gray-800 rounded-xl px-8 py-6 shadow-md min-w-[200px]">
                  <div className="text-xl font-bold text-[#E31837]">VTech</div>
                </div>
      }]} speed={40} pauseOnHover={true} enableBlur={true} height="140px" gap="2rem" showControls={false} />
      </section>
      
      {/* Community Proof */}
      <section ref={testimonialsAnim.ref} className={`container mx-auto px-4 py-16 transition-all duration-700 delay-300 ${testimonialsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Loved by Bengaluru Parents
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="glass-card p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="fill-yellow-500 text-yellow-500" size={16} />)}
            </div>
            <p className="text-foreground mb-4">
              "My daughter was bored of her toys. ToyLuv's AI matched her perfectly. Now she's excited every month!"
            </p>
            <p className="text-sm font-semibold">— Priya M., Koramangala</p>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="fill-yellow-500 text-yellow-500" size={16} />)}
            </div>
            <p className="text-foreground mb-4">
              "Finally, no more toy clutter! The hygiene standards are incredible. Worth every rupee."
            </p>
            <p className="text-sm font-semibold">— Rahul K., Indiranagar</p>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="fill-yellow-500 text-yellow-500" size={16} />)}
            </div>
            <p className="text-foreground mb-4">
              "Best investment in my son's development. He learns while playing with different toys monthly."
            </p>
            <p className="text-sm font-semibold">— Ananya S., Whitefield</p>
          </div>
        </div>
      </section>
      
      {/* Why Parents Choose ToyLuv */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Why Parents Choose ToyLuv
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Save Up to 80%</h3>
                <p className="text-muted-foreground">
                  Get ₹4,500+ worth of toys for just ₹999/month. No storage, no waste.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-secondary/20">
                <Brain className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Developmental Match</h3>
                <p className="text-muted-foreground">
                  Our AI ensures every toy supports your child's growth at the right stage.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6 items-start">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-accent/20">
                <Leaf className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Eco-Sensitive Rotation</h3>
                <p className="text-muted-foreground">
                  Join the circular economy. Toys rotate between families sustainably - one toy reaches 12+ children per year, reducing waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <OrbitCard className="max-w-3xl mx-auto">
            <div className="text-center p-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Start the JoyLoop?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discover your child's play personality in 60 seconds
              </p>
              <Link to="/quiz">
                <Button size="lg" className="text-xl px-12 py-6 h-auto bg-gradient-to-r from-primary via-accent to-secondary hover:scale-105 transition-all shadow-xl text-primary-foreground font-bold">
                  Take the Quiz Now
                  <Sparkles className="ml-2" />
                </Button>
              </Link>
            </div>
          </OrbitCard>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Home;