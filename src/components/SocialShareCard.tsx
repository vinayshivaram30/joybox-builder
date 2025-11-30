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
      className="bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-2xl mx-auto border-2 border-primary/30 shadow-elegant"
      style={{ minHeight: '350px' }}
    >
      {/* Logo/Branding */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <img 
            src="/src/assets/toyluv-logo.svg" 
            alt="ToyLuv" 
            className="h-6 sm:h-8"
          />
        </div>
        <div className="text-xs sm:text-sm font-medium text-muted-foreground">
          {parentName && `${parentName}'s Child`}
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 animate-bounce">{result.emoji}</div>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground px-2">
          {result.title}
        </h2>
        
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-2">
          {result.description}
        </p>

        {childAge && (
          <div className="inline-block bg-primary/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
            Age: {childAge}
          </div>
        )}

        {/* Toy Categories */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 flex-wrap px-2">
          {result.toyCategories.slice(0, 3).map((category, index) => (
            <div
              key={index}
              className="bg-background/50 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 border border-border/50 flex items-center gap-1.5 sm:gap-2"
            >
              <span className="text-xl sm:text-2xl">{category.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-foreground">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/50 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground px-2">
          Discover the perfect toys for your child's personality at ToyLuv
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          toyluv.app
        </p>
      </div>
    </div>
  );
};
