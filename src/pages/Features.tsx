import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Brain, Droplets, Zap, CheckCircle, Shield, TruckIcon } from "lucide-react";
import { ElectroBorder } from "@/components/ui/electro-border";
import { InteractiveGradient } from "@/components/ui/interactive-gradient";

const Features = () => {
  const aiAnim = useScrollAnimation(0.2);
  const hygieneAnim = useScrollAnimation(0.2);
  const logisticsAnim = useScrollAnimation(0.2);
  const trustAnim = useScrollAnimation(0.2);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            How ToyLuv makes playtime{" "}
            <span className="text-primary">smarter</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            The science, hygiene, and logistics behind every JoyBox
          </p>
        </div>
      </section>
      
      {/* AI Curation Engine */}
      <section 
        ref={aiAnim.ref}
        className={`container mx-auto px-4 py-16 transition-all duration-700 ${
          aiAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Brain className="text-primary" size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              AI Curation Engine
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our Play Personality Test analyzes developmental data points to match toys perfectly to your child
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ElectroBorder borderColor="#FF6B6B" borderWidth={2} radius="1rem" glow={true} aura={true}>
              <div className="p-6">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-heading font-bold text-xl mb-2">Play Schema</h3>
                <p className="text-muted-foreground">
                  We identify whether your child is a builder, explorer, artist, or problem-solver to curate the right toy types.
                </p>
              </div>
            </ElectroBorder>
            
            <ElectroBorder borderColor="#8B5CF6" borderWidth={2} radius="1rem" glow={true} aura={true}>
              <div className="p-6">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="font-heading font-bold text-xl mb-2">Interests</h3>
                <p className="text-muted-foreground">
                  From vehicles to animals, art to science - we match toys to what genuinely excites your child.
                </p>
              </div>
            </ElectroBorder>
            
            <ElectroBorder borderColor="#14B8A6" borderWidth={2} radius="1rem" glow={true} aura={true}>
              <div className="p-6">
                <div className="text-4xl mb-3">⏱️</div>
                <h3 className="font-heading font-bold text-xl mb-2">Attention Span</h3>
                <p className="text-muted-foreground">
                  Quick play or deep focus? We select complexity levels that keep your child engaged without frustration.
                </p>
              </div>
            </ElectroBorder>
          </div>
          
          <div className="mt-8">
            <ElectroBorder borderColor="#3B82F6" borderWidth={2} radius="1rem" glow={true} aura={true}>
              <div className="p-8">
                <p className="text-center text-foreground">
                  <span className="font-semibold">60 seconds of questions</span> → 
                  <span className="font-semibold"> 12+ data points</span> → 
                  <span className="font-semibold"> Personalized JoyBox</span>
                </p>
              </div>
            </ElectroBorder>
          </div>
        </div>
      </section>
      
      {/* Hygiene Shield */}
      <section 
        ref={hygieneAnim.ref}
        className={`container mx-auto px-4 py-16 bg-muted/30 rounded-3xl my-16 transition-all duration-700 delay-200 ${
          hygieneAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="text-secondary" size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Hygiene Shield
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every toy goes through our 4-step hospital-grade cleaning process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InteractiveGradient 
              color="#64748B" 
              glowColor="#64748B40"
              borderRadius="1rem"
              followMouse={true}
              hoverOnly={true}
              intensity={80}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">1. Inspection</h3>
                <p className="text-sm text-muted-foreground">
                  Manual quality check for damage, wear, and safety
                </p>
              </div>
            </InteractiveGradient>
            
            <InteractiveGradient 
              color="#3B82F6" 
              glowColor="#3B82F640"
              borderRadius="1rem"
              followMouse={true}
              hoverOnly={true}
              intensity={80}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <Droplets className="text-secondary" size={24} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">2. Ultrasonic Clean</h3>
                <p className="text-sm text-muted-foreground">
                  Deep cleaning removes 99.9% of germs and bacteria
                </p>
              </div>
            </InteractiveGradient>
            
            <InteractiveGradient 
              color="#8B5CF6" 
              glowColor="#8B5CF640"
              borderRadius="1rem"
              followMouse={true}
              hoverOnly={true}
              intensity={80}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-secondary" size={24} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">3. UV-C Sterilization</h3>
                <p className="text-sm text-muted-foreground">
                  Medical-grade UV light kills remaining pathogens
                </p>
              </div>
            </InteractiveGradient>
            
            <InteractiveGradient 
              color="#14B8A6" 
              glowColor="#14B8A640"
              borderRadius="1rem"
              followMouse={true}
              hoverOnly={true}
              intensity={80}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">4. Vacuum Seal</h3>
                <p className="text-sm text-muted-foreground">
                  Sealed packaging ensures hygiene until delivery
                </p>
              </div>
            </InteractiveGradient>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Hospital-grade standards.</span> Safer than new toys from stores.
            </p>
          </div>
        </div>
      </section>
      
      {/* Logistics Flow */}
      <section 
        ref={logisticsAnim.ref}
        className={`container mx-auto px-4 py-16 transition-all duration-700 delay-300 ${
          logisticsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mx-auto mb-4">
              <TruckIcon className="text-coral" size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Seamless Logistics
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hyperlocal Bengaluru service means fast delivery and easy swaps
            </p>
          </div>
          
          <div className="space-y-6">
            <InteractiveGradient 
              color="#8B5CF6" 
              glowColor="#8B5CF640"
              borderRadius="1rem"
              followMouse={true}
              hoverOnly={true}
              intensity={80}
            >
              <div className="p-6 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2">Step 1: Complete Quiz</h3>
                  <p className="text-muted-foreground">
                    Take our 60-second Play Personality Test and receive your personalized JoyBox preview
                  </p>
                </div>
              </div>
            </InteractiveGradient>
            
            <InteractiveGradient 
              color="#3B82F6" 
              glowColor="#3B82F640"
              borderRadius="1rem"
              followMouse={true}
              hoverOnly={true}
              intensity={80}
            >
              <div className="p-6 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🚚</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2">Step 2: First Delivery</h3>
                  <p className="text-muted-foreground">
                    Your first JoyBox arrives within 48 hours at your doorstep in sealed, hygienic packaging
                  </p>
                </div>
              </div>
            </InteractiveGradient>
            
            <InteractiveGradient 
              color="#14B8A6" 
              glowColor="#14B8A640"
              borderRadius="1rem"
              followMouse={true}
              hoverOnly={true}
              intensity={80}
            >
              <div className="p-6 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2">Step 3: Monthly Swap</h3>
                  <p className="text-muted-foreground">
                    Every month, we pick up the old box and deliver a new one with fresh toys - same day service
                  </p>
                </div>
              </div>
            </InteractiveGradient>
            
            <InteractiveGradient 
              color="#FF6B6B" 
              glowColor="#FF6B6B40"
              borderRadius="1rem"
              followMouse={true}
              hoverOnly={true}
              intensity={80}
            >
              <div className="p-6 flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">♻️</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2">Step 4: Repeat JoyLoop</h3>
                  <p className="text-muted-foreground">
                    Your child gets variety, you get convenience, and the planet gets sustainability
                  </p>
                </div>
              </div>
            </InteractiveGradient>
          </div>
        </div>
      </section>
      
      {/* Trust & Safety */}
      <section 
        ref={trustAnim.ref}
        className={`container mx-auto px-4 py-16 transition-all duration-700 delay-400 ${
          trustAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Trust & Safety Guaranteed
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <CheckCircle className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-heading font-bold mb-2">Safety Certified</h3>
              <p className="text-sm text-muted-foreground">
                All toys meet international safety standards
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <CheckCircle className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-heading font-bold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                Not happy? Free swap within 48 hours
              </p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <CheckCircle className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-heading font-bold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
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
