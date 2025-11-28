import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function FloatingQuizButton() {
  return (
    <Link to="/quiz" className="fixed bottom-6 right-6 z-50 group">
      <Button 
        size="lg"
        className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-primary via-accent to-secondary hover:scale-110 transition-all duration-300 hover:shadow-primary/50 hover:shadow-xl animate-bounce"
      >
        <Sparkles className="h-8 w-8 text-white" />
      </Button>
    </Link>
  );
}
