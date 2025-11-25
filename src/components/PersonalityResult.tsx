import { Button } from "@/components/ui/button";

export interface PersonalityResultData {
  title: string;
  description: string;
  emoji: string;
  toyCategories: Array<{
    name: string;
    icon: string;
  }>;
}

interface PersonalityResultProps {
  result: PersonalityResultData;
  onContinue: () => void;
}

export const PersonalityResult = ({ result, onContinue }: PersonalityResultProps) => {
  return (
    <div className="max-w-2xl mx-auto animate-confetti">
      <div className="glass-card p-8 md:p-12 text-center">
        <div className="text-7xl mb-6 animate-scale-up">{result.emoji}</div>
        
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          {result.title}
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
          {result.description}
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
            Perfect Toy Matches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {result.toyCategories.map((category, index) => (
              <div
                key={index}
                className="bg-primary/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-primary/20 hover-lift"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="font-semibold text-foreground">{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="cta"
          size="lg"
          onClick={onContinue}
          className="w-full md:w-auto min-w-[280px]"
        >
          See My Child's JoyBox
        </Button>
      </div>
    </div>
  );
};
