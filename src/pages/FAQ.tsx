import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is ToyLuv?",
      answer: "ToyLuv is a premium toy subscription service for families in Bengaluru. We deliver curated, hygienic toys through an affordable monthly plan, helping parents provide variety without the clutter."
    },
    {
      question: "How does the subscription work?",
      answer: "Choose a plan, take our AI Play Personality Test to help us understand your child's play style, and we'll deliver a curated JoyBox with toys matched to your child's interests and age. Every cycle, we'll swap the toys for fresh ones."
    },
    {
      question: "How many toys do I get in each JoyBox?",
      answer: "Each JoyBox contains 3 premium toys carefully selected based on your child's Play Personality, age, and developmental needs."
    },
    {
      question: "How often can I swap toys?",
      answer: "You can swap toys based on your subscription plan cycle. Most plans allow monthly swaps, giving your child fresh toys regularly without the hassle of storage or waste."
    },
    {
      question: "Are the toys clean and safe?",
      answer: "Yes! Every toy goes through our strict multi-step cleaning, sanitizing, and quality check process. Toys are checked for safety and damage, cleaned with child-safe methods, sanitized using industry-grade processes, and sealed specifically for your child. Toys that don't meet our standards are removed from circulation."
    },
    {
      question: "What is the AI Play Personality Test?",
      answer: "It's a simple 60-second test that helps us understand how your child likes to play. The test analyzes your child's interests, learning style, and developmental stage to recommend toys that match their unique personality."
    },
    {
      question: "What age groups do you serve?",
      answer: "ToyLuv serves children across various age groups, from infants to early school age. Our collection is curated for different developmental stages to ensure age-appropriate play experiences."
    },
    {
      question: "What if my child damages a toy?",
      answer: "Normal wear and tear is expected and completely okay. However, if a toy is significantly damaged or has missing pieces, please let us know. We understand that accidents happen and will work with you to find a solution."
    },
    {
      question: "Can I choose specific toys?",
      answer: "Yes! Based on your child's Play Personality profile, you can select from our curated recommendations that match their interests and developmental needs."
    },
    {
      question: "Do you deliver outside Bengaluru?",
      answer: "Currently, ToyLuv operates exclusively in Bengaluru. We're focusing on delivering the best experience to families in our city before expanding to other locations."
    },
    {
      question: "How do pickups and deliveries work?",
      answer: "When it's time for a swap, simply schedule a pickup through your account. Our team will collect your current JoyBox and deliver your fresh set of toys at a convenient time for you."
    },
    {
      question: "What types of toys do you offer?",
      answer: "Our collection focuses on four main categories: Builders and problem solvers (blocks, puzzles, STEM kits), Imaginative storytellers (role-play toys, creative tools), Active explorers (movement-based toys, sports), and Social connectors (games that support sharing and communication)."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. We want you to be completely satisfied with ToyLuv, so there are no long-term commitments."
    },
    {
      question: "What happens if a toy is lost?",
      answer: "We understand that things can get misplaced. Please contact our support team, and we'll work with you to resolve the situation fairly."
    },
    {
      question: "How do I get started?",
      answer: "Simply sign up on our website, take the AI Play Personality Test for your child, choose your subscription plan, and we'll deliver your first JoyBox to your doorstep!"
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
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Everything you need to know about ToyLuv
            </motion.p>
          </div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Still have questions section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-8 border border-primary/20"
          >
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              We're here to help! Get in touch with our team.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
