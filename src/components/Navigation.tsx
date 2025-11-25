import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-heading font-bold text-2xl text-primary">
            ToyLuv
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={`font-medium transition-colors ${isActive('/features') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              How It Works
            </Link>
            <Link 
              to="/pricing" 
              className={`font-medium transition-colors ${isActive('/pricing') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Pricing
            </Link>
            <Link to="/quiz">
              <Button variant="cta" size="sm">
                Take Quiz
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Link to="/quiz">
              <Button variant="cta" size="sm">
                Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
