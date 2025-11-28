import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function FloatingQuizButton() {
  return (
    <Link to="/quiz" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group">
      <Button 
        size="lg"
        className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary via-accent to-secondary hover:scale-110 transition-all duration-300 hover:shadow-primary/50 hover:shadow-xl animate-bounce"
      >
        <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
      </Button>
    </Link>
  );
}
