import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getRecommendedToys, RecommendedToy } from "@/lib/toyRecommendations";
import { Loader2 } from "lucide-react";

interface JoyBoxPreviewProps {
  personalityType: string;
  childAge?: string;
}

export const JoyBoxPreview = ({ personalityType, childAge }: JoyBoxPreviewProps) => {
  const navigate = useNavigate();
  const [toys, setToys] = useState<RecommendedToy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendedToys();
  }, [personalityType, childAge]);

  const loadRecommendedToys = async () => {
    setLoading(true);
    const recommendations = await getRecommendedToys(personalityType, childAge);
    setToys(recommendations);
    setLoading(false);
  };

  const totalValue = toys.reduce((sum, toy) => sum + (toy.price || 0), 0);

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
            <Button onClick={() => navigate("/pricing")} variant="cta">
              View Our Plans
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {toys.map((toy) => (
                <div
                  key={toy.id}
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
                </div>
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
              <Button
                variant="cta"
                size="lg"
                className="w-full md:w-auto min-w-[300px]"
                onClick={() => navigate("/pricing")}
              >
                Start My Subscription
              </Button>
              <p className="text-sm text-muted-foreground">
                No commitment • Cancel anytime • Free delivery in Bengaluru
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
