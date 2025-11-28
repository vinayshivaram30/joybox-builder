import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Heart } from "lucide-react";
import { TeamCarousel, TeamMember } from "@/components/TeamCarousel";
import vinayPhoto from "@/assets/vinay-photo.png";
import santoshPhoto from "@/assets/santosh-photo.png";
import nileshPhoto from "@/assets/nilesh-photo.png";

const About = () => {
  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Santosh",
      role: "Product experience and customer insights",
      image: santoshPhoto,
      bio: "Passionate about creating solutions that truly make parenting easier and more joyful."
    },
    {
      id: "2",
      name: "Nilesh",
      role: "Operations and logistics",
      image: nileshPhoto,
      bio: "Ensures every JoyBox is delivered on time, sanitized, and perfectly packed."
    },
    {
      id: "3",
      name: "Vinay",
      role: "Technology and Play Personality Engine",
      image: vinayPhoto,
      bio: "Builds the systems that help ToyLuv personalize toys for every child."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              About ToyLuv
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              A premium toy subscription service for families in Bengaluru
            </motion.p>
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl mb-12"
          >
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              ToyLuv is a premium toy subscription service for families in Bengaluru. Parents get access to high quality, age fit, hygienic toys through an affordable monthly plan, without adding clutter at home.
            </p>
            
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              Instead of buying toys that lose excitement after a few days, ToyLuv delivers a fresh JoyBox every cycle. Each box is curated using your child's Play Personality and cleaned to the highest standards before it reaches your doorstep.
            </p>

            <p className="text-lg text-foreground/90 leading-relaxed font-semibold">
              We want playtime to feel meaningful, safe, and joyful.
            </p>
          </motion.div>

          {/* What makes ToyLuv different */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">What makes ToyLuv different</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                <h3 className="text-xl font-semibold mb-3">Better play</h3>
                <p className="text-muted-foreground">
                  We use the AI Play Personality Test to understand how your child likes to play. This helps us curate toys that match their interests and learning needs.
                </p>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20">
                <h3 className="text-xl font-semibold mb-3">Cleaner toys</h3>
                <p className="text-muted-foreground">
                  Every toy goes through a strict multi step cleaning, sanitizing, and quality check process. Only toys that pass our standards are delivered to families.
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border border-secondary/20">
                <h3 className="text-xl font-semibold mb-3">Less waste</h3>
                <p className="text-muted-foreground">
                  Kids outgrow toys quickly. By swapping instead of buying, families reduce clutter and cut down on plastic waste while getting more variety for their child.
                </p>
              </div>
            </div>
          </motion.div>

          {/* How ToyLuv works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">How ToyLuv works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create your child's Play Profile</h3>
                  <p className="text-muted-foreground">Take our simple 60 second AI Play Personality Test. It helps us understand your child's play style.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Get a curated JoyBox</h3>
                  <p className="text-muted-foreground">We sanitize, pack, and deliver toys that match your child's profile. Everything is prepared specifically for your family.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Swap every cycle</h3>
                  <p className="text-muted-foreground">When your child is ready for new toys, schedule a pickup. We collect the old box and deliver a fresh one. No storage, no waste, no guesswork.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Our approach to toys */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-6">Our approach to toys and learning</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Every toy in our library is shortlisted through research on child development, motor skills, problem solving, creativity, and social learning.
            </p>
            <p className="text-lg font-semibold mb-4">Our collection focuses on:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card/30 rounded-xl p-4 border border-border/30">
                <h4 className="font-semibold mb-2">Builders and problem solvers</h4>
                <p className="text-sm text-muted-foreground">Blocks, puzzles, and early STEM kits.</p>
              </div>
              <div className="bg-card/30 rounded-xl p-4 border border-border/30">
                <h4 className="font-semibold mb-2">Imaginative storytellers</h4>
                <p className="text-sm text-muted-foreground">Role play toys, character sets, and creative tools.</p>
              </div>
              <div className="bg-card/30 rounded-xl p-4 border border-border/30">
                <h4 className="font-semibold mb-2">Active explorers</h4>
                <p className="text-sm text-muted-foreground">Movement based toys, soft sports, and ride ons.</p>
              </div>
              <div className="bg-card/30 rounded-xl p-4 border border-border/30">
                <h4 className="font-semibold mb-2">Social connectors</h4>
                <p className="text-sm text-muted-foreground">Games that support sharing, turn taking, and communication.</p>
              </div>
            </div>
          </motion.div>

          {/* Hygiene promise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-br from-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 border border-secondary/20 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our hygiene promise</h2>
            <p className="text-lg text-muted-foreground mb-6 text-center">Each toy is:</p>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span>Checked for safety and damage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span>Cleaned with child safe methods</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span>Sanitized using industry grade processes</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span>Sealed and packed for your child alone</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-center italic">
              Toys that do not meet our standards are removed from circulation.
            </p>
          </motion.div>

          {/* Why parents choose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Why parents choose ToyLuv</h2>
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50">
              <ul className="space-y-3 max-w-2xl mx-auto">
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">Variety without the cost of buying</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">Toys matched to your child's stage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">Less clutter at home</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">Clean, safe, child ready toys</span>
                </li>
                <li className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-lg">Simple delivery and pickup in Bengaluru</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">The Team Behind ToyLuv</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
              ToyLuv was started by three friends who believe play should be smarter, easier, and healthier for modern families.
            </p>
            
            <h3 className="text-2xl font-semibold mb-6 text-center">Founders</h3>
          </motion.div>

          {/* Team Carousel */}
          <TeamCarousel 
            members={teamMembers}
            title="OUR TEAM"
            titleSize="xl"
            titleColor="hsl(var(--primary))"
            cardWidth={350}
            cardHeight={450}
            cardRadius={24}
            showArrows={true}
            showDots={true}
            autoPlay={5000}
            pauseOnHover={true}
            infoPosition="bottom"
            infoTextColor="hsl(var(--foreground))"
            sideCardScale={0.85}
            sideCardOpacity={0.6}
            grayscaleEffect={true}
            cardClassName="border-4 border-primary/20 shadow-2xl"
            className="mb-16"
          />

          {/* Our team support text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 mb-12"
          >
            <h4 className="text-xl font-semibold mb-3 text-center">Our team</h4>
            <p className="text-muted-foreground text-center">
              Alongside the founders, ToyLuv is supported by a small team of curators, hygiene specialists, and delivery partners dedicated to giving families a smooth, safe, and delightful experience.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-12 border border-primary/20 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Our mission</h2>
            <p className="text-xl text-foreground/90 leading-relaxed">
              To make meaningful play accessible to every child,<br />
              and to help parents enjoy a lighter, happier home.
            </p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
