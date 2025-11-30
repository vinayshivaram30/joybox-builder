import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Brain, Droplets, Zap, CheckCircle, Shield, TruckIcon } from "lucide-react";

const Features = () => {
  const aiAnim = useScrollAnimation(0.2);
  const hygieneAnim = useScrollAnimation(0.2);
  const logisticsAnim = useScrollAnimation(0.2);
  const trustAnim = useScrollAnimation(0.2);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 lg:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-6xl font-heading font-bold text-foreground mb-3 sm:mb-4 md:mb-5 leading-tight">
            How ToyLuv makes playtime{" "}
            <span className="text-primary">smarter</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-0">
            The science, hygiene, and logistics behind every JoyBox
          </p>
        </div>
      </section>
      
      {/* AI Curation Engine */}
      <section 
        ref={aiAnim.ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14 transition-all duration-700 ${
          aiAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Brain className="text-primary" size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-5xl font-heading font-bold mb-2 sm:mb-3 md:mb-4">
              AI Curation Engine
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Our Play Personality Test analyzes developmental data points to match toys perfectly to your child
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <div className="p-4 sm:p-5 md:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-3">🎯</div>
              <h3 className="font-heading font-bold text-lg sm:text-xl md:text-[1.35rem] mb-1.5 md:mb-2">Play Schema</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                We identify whether your child is a builder, explorer, artist, or problem-solver to curate the right toy types.
              </p>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-3">🎨</div>
              <h3 className="font-heading font-bold text-lg sm:text-xl md:text-[1.35rem] mb-1.5 md:mb-2">Interests</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                From vehicles to animals, art to science - we match toys to what genuinely excites your child.
              </p>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors sm:col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-3">⏱️</div>
              <h3 className="font-heading font-bold text-lg sm:text-xl md:text-[1.35rem] mb-1.5 md:mb-2">Attention Span</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Quick play or deep focus? We select complexity levels that keep your child engaged without frustration.
              </p>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-7 md:mt-8">
            <div className="p-5 sm:p-6 md:p-7 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
              <p className="text-center text-sm sm:text-base md:text-lg text-foreground">
                <span className="font-semibold">60 seconds of questions</span> → 
                <span className="font-semibold"> 12+ data points</span> → 
                <span className="font-semibold"> Personalized JoyBox</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Hygiene Shield */}
      <section 
        ref={hygieneAnim.ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14 bg-muted/30 rounded-3xl my-8 sm:my-10 md:my-12 lg:my-16 transition-all duration-700 delay-200 ${
          hygieneAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Shield className="text-secondary" size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-5xl font-heading font-bold mb-2 sm:mb-3 md:mb-4">
              Hygiene Shield
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Every toy goes through our 4-step hospital-grade cleaning process
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <div className="p-4 sm:p-5 md:p-6 h-full flex flex-col items-center text-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl md:text-3xl">🔍</span>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">1. Inspection</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Manual quality check for damage, wear, and safety
              </p>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 h-full flex flex-col items-center text-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-3 md:mb-4">
                <Droplets className="text-secondary" size={20} />
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">2. Ultrasonic Clean</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Deep cleaning removes 99.9% of germs and bacteria
              </p>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 h-full flex flex-col items-center text-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-3 md:mb-4">
                <Zap className="text-secondary" size={20} />
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">3. UV-C Sterilization</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Medical-grade UV light kills remaining pathogens
              </p>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 h-full flex flex-col items-center text-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl md:text-3xl">📦</span>
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">4. Vacuum Seal</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Sealed packaging ensures hygiene until delivery
              </p>
            </div>
          </div>
          
          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Hospital-grade standards.</span> Safer than new toys from stores.
            </p>
          </div>
        </div>
      </section>
      
      {/* Logistics Flow */}
      <section 
        ref={logisticsAnim.ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14 transition-all duration-700 delay-300 ${
          logisticsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
              <TruckIcon className="text-coral" size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-5xl font-heading font-bold mb-2 sm:mb-3 md:mb-4">
              Seamless Logistics
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Hyperlocal Bengaluru service means fast delivery and seamless exchanges
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="p-4 sm:p-5 md:p-6 flex gap-4 sm:gap-5 md:gap-6 items-start rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl md:text-3xl">📅</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">Step 1: Complete Quiz</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Take our 60-second Play Personality Test and receive your personalized JoyBox preview
                </p>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 flex gap-4 sm:gap-5 md:gap-6 items-start rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl md:text-3xl">🚚</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">Step 2: First Delivery</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Your first JoyBox arrives within 48 hours at your doorstep in sealed, hygienic packaging
                </p>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 flex gap-4 sm:gap-5 md:gap-6 items-start rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl md:text-3xl">🔄</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">Step 3: New JoyBox Every 3 Weeks</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Every 3 weeks, we pick up the old box and deliver a fresh JoyBox with new toys - same day service
                </p>
              </div>
            </div>
            
            <div className="p-4 sm:p-5 md:p-6 flex gap-4 sm:gap-5 md:gap-6 items-start rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-coral/50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl sm:text-2xl md:text-3xl">♻️</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">Step 4: Repeat JoyLoop</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Your child gets variety, you get convenience, and the planet gets sustainability
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust & Safety */}
      <section 
        ref={trustAnim.ref}
        className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:py-14 transition-all duration-700 delay-400 ${
          trustAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-5xl font-heading font-bold mb-2 sm:mb-3 md:mb-4">
              Trust & Safety Guaranteed
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <div className="glass-card p-4 sm:p-5 md:p-6 text-center sm:col-span-2 lg:col-span-1">
              <CheckCircle className="text-primary mx-auto mb-2.5 md:mb-3" size={28} />
              <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">Safety Certified</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                All toys meet international safety standards
              </p>
            </div>
            
            <div className="glass-card p-4 sm:p-5 md:p-6 text-center">
              <CheckCircle className="text-primary mx-auto mb-2.5 md:mb-3" size={28} />
              <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">Quality Guarantee</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Not happy? Free replacement within 48 hours
              </p>
            </div>
            
            <div className="glass-card p-4 sm:p-5 md:p-6 text-center">
              <CheckCircle className="text-primary mx-auto mb-2.5 md:mb-3" size={28} />
              <h3 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-1.5 md:mb-2">Secure Payments</h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                SSL encrypted, zero data sharing
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Features;
