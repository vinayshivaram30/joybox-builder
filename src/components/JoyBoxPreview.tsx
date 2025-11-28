import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { getRecommendedToys, RecommendedToy } from "@/lib/toyRecommendations";
import { Loader2 } from "lucide-react";
import { ToyRating } from "@/components/ToyRating";
import { supabase } from "@/integrations/supabase/client";
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
    <div className="max-w-6xl mx-auto animate-slide-in">
      <div className="glass-card p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Your Child's Personalized JoyBox
          </h2>
          <p className="text-lg text-muted-foreground">
            Curated for <span className="font-semibold text-primary">{personalityType}</span> personality
          </p>
        </div>

        {toys.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl text-muted-foreground mb-4">
              No toys available for your personality type yet.
            </p>
            <p className="text-muted-foreground mb-6">
              Check back soon as we add more toys to our inventory!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {onRetakeQuiz && (
                <Button onClick={onRetakeQuiz} variant="outline" size="lg">
                  Retake Quiz
                </Button>
              )}
              <Button onClick={() => navigate("/pricing")} variant="cta" size="lg">
                View Our Plans
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {toys.map((toy) => (
                <Link
                  key={toy.id}
                  to={`/toys/${toy.id}`}
                  className="bg-card rounded-2xl overflow-hidden border-2 border-primary/10 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  {toy.image_url ? (
                    <div className="h-48 overflow-hidden bg-muted">
                      <img
                        src={toy.image_url}
                        alt={toy.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <p className="text-5xl">🎁</p>
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{toy.name}</h4>
                    {ratings[toy.id] && ratings[toy.id].count > 0 && (
                      <div className="mb-2">
                        <ToyRating 
                          rating={ratings[toy.id].average} 
                          reviewCount={ratings[toy.id].count}
                          size="sm"
                        />
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {toy.description || "Perfect for your child"}
                    </p>
                    <div className="flex justify-between items-center text-sm">
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
              <div className="bg-accent/10 rounded-2xl p-6 border-2 border-accent/20 mb-8">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-lg">Estimated Box Value:</span>
                  <span className="text-2xl font-bold text-accent">₹{totalValue.toFixed(0)}+</span>
                </div>
              </div>
            )}

            <div className="text-center space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  variant="cta"
                  size="lg"
                  className="w-full md:w-auto min-w-[300px]"
                  onClick={() => navigate("/pricing")}
                >
                  Start My Subscription
                </Button>
                {onRetakeQuiz && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleRetakeClick}
                  >
                    Retake Quiz
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                No commitment • Cancel anytime • Free delivery in Bengaluru
              </p>
            </div>
          </>
        )}
      </div>

      <AlertDialog open={showRetakeDialog} onOpenChange={setShowRetakeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Retake Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset your current quiz results and personality type. You'll need to answer all questions again to get a new personalized JoyBox.
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
