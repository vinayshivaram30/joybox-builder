import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function FloatingQuizButton() {
  return (
    <Link to="/quiz" className="fixed bottom-24 right-6 z-50 group">
      <Button 
        size="lg"
        className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-br from-primary via-accent to-secondary hover:scale-110 transition-all duration-300 hover:shadow-primary/50 hover:shadow-xl"
      >
        <Sparkles className="h-7 w-7 text-white" />
      </Button>
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-background text-foreground px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium">
        Take Quiz
      </span>
    </Link>
  );
}
