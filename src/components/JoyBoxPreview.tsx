import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { getRecommendedToys, RecommendedToy } from "@/lib/toyRecommendations";
import { Loader2 } from "lucide-react";
import { ToyRating } from "@/components/ToyRating";
import { supabase } from "@/integrations/supabase/client";
import { personalityTypes, PersonalityId } from "@/data/quizData";
import WaitlistDialog from "@/components/WaitlistDialog";
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

interface JoyBoxPreviewProps {
  personalityType: string;
  childAge?: string;
  onRetakeQuiz?: () => void;
}

export const JoyBoxPreview = ({ personalityType, childAge, onRetakeQuiz }: JoyBoxPreviewProps) => {
  const navigate = useNavigate();
  const [toys, setToys] = useState<RecommendedToy[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState<Record<string, { average: number; count: number }>>({});
  const [showRetakeDialog, setShowRetakeDialog] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    loadRecommendedToys();
  }, [personalityType, childAge]);

  const loadRecommendedToys = async () => {
    setLoading(true);
    const recommendations = await getRecommendedToys(personalityType, childAge);
    setToys(recommendations);
    
    // Load ratings for all toys
    if (recommendations.length > 0) {
      const { data } = await supabase
        .from('toy_ratings_summary')
        .select('id, average_rating, review_count')
        .in('id', recommendations.map(t => t.id));
      
      if (data) {
        const ratingsMap: Record<string, { average: number; count: number }> = {};
        data.forEach(r => {
          ratingsMap[r.id!] = {
            average: r.average_rating || 0,
            count: Number(r.review_count) || 0
          };
        });
        setRatings(ratingsMap);
      }
    }
    
    setLoading(false);
  };

  const totalValue = toys.reduce((sum, toy) => sum + (toy.price || 0), 0);
  
  // Get personality insights
  const getPersonalityKey = (type: string): PersonalityId => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('builder') && !lowerType.includes('curious')) return 'curious_builder';
    if (lowerType.includes('tiny') && lowerType.includes('engineer')) return 'tiny_engineer';
    if (lowerType.includes('creative') && lowerType.includes('maker')) return 'creative_maker';
    if (lowerType.includes('story') || lowerType.includes('imagination')) return 'imaginative_storyteller';
    if (lowerType.includes('active') && lowerType.includes('explorer')) return 'active_explorer';
    if (lowerType.includes('curious') && lowerType.includes('explorer')) return 'curious_explorer';
    if (lowerType.includes('problem') && lowerType.includes('solver')) return 'problem_solver';
    if (lowerType.includes('sensory') && lowerType.includes('seeker')) return 'sensory_seeker';
    if (lowerType.includes('quiet') && lowerType.includes('thinker')) return 'quiet_thinker';
    if (lowerType.includes('social') && lowerType.includes('connector')) return 'social_connector';
    return 'social_connector';
  };
  
  const personalityKey = getPersonalityKey(personalityType);
  const personalityData = personalityTypes[personalityKey] || personalityTypes.social_connector;

  const handleRetakeClick = () => {
    setShowRetakeDialog(true);
  };

  const handleConfirmRetake = () => {
    setShowRetakeDialog(false);
    if (onRetakeQuiz) {
      onRetakeQuiz();
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading your personalized JoyBox...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto animate-slide-in px-4 sm:px-6">
      <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-2 sm:mb-3">
            Your Child's Personalized JoyBox
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Curated for <span className="font-semibold text-primary">{personalityType}</span> personality
          </p>
        </div>

        {toys.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {toys.map((toy) => (
                <Link
                  key={toy.id}
                  to={`/toys/${toy.id}`}
                  className="bg-card rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/10 hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  <div className="h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                    {toy.image_url ? (
                      <img
                        src={toy.image_url}
                        alt={toy.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <p className="text-4xl sm:text-5xl">🎁</p>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 line-clamp-2">{toy.name}</h4>
                    {ratings[toy.id] && ratings[toy.id].count > 0 && (
                      <div className="mb-2">
                        <ToyRating 
                          rating={ratings[toy.id].average} 
                          reviewCount={ratings[toy.id].count}
                          size="sm"
                        />
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                      {toy.description || "Perfect for your child"}
                    </p>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-muted-foreground">{toy.age_group}</span>
                      {toy.price && (
                        <span className="font-semibold text-primary">₹{toy.price}</span>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {toy.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalValue > 0 && (
              <div className="bg-accent/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-accent/20 mb-6 sm:mb-8">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-base sm:text-lg">Estimated Box Value:</span>
                  <span className="text-xl sm:text-2xl font-bold text-accent">₹{totalValue.toFixed(0)}+</span>
                </div>
              </div>
            )}

            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto">
                <Button
                  variant="cta"
                  size="lg"
                  className="w-full min-h-[48px]"
                  onClick={() => setWaitlistOpen(true)}
                >
                  Join Waitlist
                </Button>
                {onRetakeQuiz && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full min-h-[48px]"
                    onClick={handleRetakeClick}
                  >
                    Retake Quiz
                  </Button>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground px-4">
                No commitment • Cancel anytime • Free delivery in Bengaluru
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-8 py-8">
            {/* Personality Insights Section */}
            <div className="text-center space-y-6">
              <div className="text-8xl mb-4 animate-bounce">
                {personalityData.emoji}
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-foreground">
                  {personalityData.title}
                </h3>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {personalityData.description}
                </p>
              </div>
            </div>

            {/* Play Style Categories */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border-2 border-primary/10">
              <h4 className="text-xl font-semibold mb-6 text-center text-foreground">
                Perfect Toy Matches for Your Child
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {personalityData.toyCategories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg"
                  >
                    <div className="text-5xl mb-3 text-center">{category.icon}</div>
                    <p className="font-semibold text-center text-foreground">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-6 pt-4">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  Ready to Start Your Child's Play Journey?
                </p>
                <p className="text-muted-foreground">
                  Subscribe now to get curated toys delivered to your doorstep
                </p>
              </div>
              
              <div className="flex flex-col gap-3 sm:gap-4 max-w-md mx-auto">
                <Button
                  variant="cta"
                  size="lg"
                  className="w-full min-h-[48px]"
                  onClick={() => setWaitlistOpen(true)}
                >
                  Join Waitlist
                </Button>
                {onRetakeQuiz && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full min-h-[48px]"
                    onClick={handleRetakeClick}
                  >
                    Retake Quiz
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <AlertDialog open={showRetakeDialog} onOpenChange={setShowRetakeDialog}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">Retake Quiz?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base">
              This will reset your current quiz results and personality type. You'll need to answer all questions again to get a new personalized JoyBox.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel className="w-full sm:w-auto min-h-[44px]">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRetake} className="w-full sm:w-auto min-h-[44px]">
              Yes, Retake Quiz
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <WaitlistDialog 
        open={waitlistOpen} 
        onOpenChange={setWaitlistOpen}
        defaultPersonalityType={personalityType}
      />
    </div>
  );
};
