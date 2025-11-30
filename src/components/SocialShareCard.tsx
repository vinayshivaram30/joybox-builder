import { PersonalityId } from "@/data/quizData";
import { PersonalityResultData } from "@/types/personality";

interface SocialShareCardProps {
  result: PersonalityResultData & { id: PersonalityId };
  childAge?: string;
  parentName?: string;
}

export const SocialShareCard = ({ result, childAge, parentName }: SocialShareCardProps) => {
  return (
    <div 
      id="social-share-card"
      className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-3xl p-8 max-w-2xl mx-auto border-2 border-primary/30 shadow-elegant"
      style={{ width: '600px', minHeight: '400px' }}
    >
      {/* Logo/Branding */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <img 
            src="/src/assets/toyluv-logo.svg" 
            alt="ToyLuv" 
            className="h-8"
          />
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          {parentName && `${parentName}'s Child`}
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4 animate-bounce">{result.emoji}</div>
        
        <h2 className="text-3xl font-heading font-bold text-foreground">
          {result.title}
        </h2>
        
        <p className="text-base text-muted-foreground max-w-md mx-auto">
          {result.description}
        </p>

        {childAge && (
          <div className="inline-block bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary">
            Age: {childAge}
          </div>
        )}

        {/* Toy Categories */}
        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          {result.toyCategories.slice(0, 3).map((category, index) => (
            <div
              key={index}
              className="bg-background/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-border/50 flex items-center gap-2"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm font-medium text-foreground">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          Discover the perfect toys for your child's personality at ToyLuv
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          toyluv.app
        </p>
      </div>
    </div>
  );
};
