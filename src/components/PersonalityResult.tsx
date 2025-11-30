import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PersonalityScoreChart } from "@/components/PersonalityScoreChart";
import { PDFReportGenerator } from "@/components/PDFReportGenerator";
import { SocialShareCard } from "@/components/SocialShareCard";
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { PersonalityId } from "@/data/quizData";
import { PersonalityResultData } from "@/types/personality";

export type { PersonalityResultData };

interface PersonalityResultProps {
  result: PersonalityResultData & { scores: Record<PersonalityId, number>; id: PersonalityId };
  onContinue: () => void;
  onRetake?: () => void;
  childAge?: string;
  parentName?: string;
}

export const PersonalityResult = ({ result, onContinue, onRetake, childAge, parentName }: PersonalityResultProps) => {
  const [showRetakeDialog, setShowRetakeDialog] = useState(false);

  const handleRetakeClick = () => {
    if (onRetake) {
      setShowRetakeDialog(true);
    }
  };

  const handleConfirmRetake = () => {
    setShowRetakeDialog(false);
    onRetake?.();
  };

  return (
    <div className="max-w-5xl mx-auto animate-confetti space-y-8">
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

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            variant="cta"
            size="lg"
            onClick={onContinue}
            className="w-full md:w-auto min-w-[280px]"
          >
            See My Child's JoyBox
          </Button>
          
          <PDFReportGenerator
            personalityResult={result}
            scores={result.scores}
            childAge={childAge}
            parentName={parentName}
          />
          
          {onRetake && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleRetakeClick}
              className="w-full md:w-auto min-w-[200px]"
            >
              Retake Quiz
            </Button>
          )}
        </div>
      </div>

      {/* Score Breakdown */}
      {result.scores && result.id && (
        <PersonalityScoreChart scores={result.scores} topPersonality={result.id} />
      )}

      {/* Social Share Card */}
      <div className="glass-card p-8">
        <SocialShareCard 
          result={result} 
          childAge={childAge}
          parentName={parentName}
        />
        <div className="mt-6">
          <SocialShareButtons 
            personalityTitle={result.title}
            shareUrl="https://toyluv.app/quiz"
          />
        </div>
      </div>

      <AlertDialog open={showRetakeDialog} onOpenChange={setShowRetakeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Retake Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear your current results and take you back to the first question. 
              Your personality type and answers will be lost. Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRetake}>
              Yes, Retake Quiz
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
