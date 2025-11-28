import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function FloatingQuizButton() {
  return (
    <Link to="/landing" className="fixed bottom-6 right-6 z-50 animate-bounce">
      <Button 
        size="lg"
        className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-accent to-yellow-500 text-foreground hover:scale-110 transition-all duration-300 hover:shadow-accent/50 hover:shadow-xl"
      >
        <Sparkles className="h-8 w-8" />
      </Button>
    </Link>
  );
}
