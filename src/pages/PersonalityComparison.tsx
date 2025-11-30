import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, Calendar } from "lucide-react";
import { PersonalityId, PERSONALITIES } from "@/data/quizData";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface QuizResult {
  id: string;
  personality_type: string;
  created_at: string;
  answers: any;
  child_age: string | null;
}

const PERSONALITY_LABELS: Record<PersonalityId, string> = {
  curious_builder: "Curious Builder",
  imaginative_storyteller: "Imaginative Storyteller",
  active_explorer: "Active Explorer",
  problem_solver: "Problem Solver",
  social_connector: "Social Connector",
  sensory_seeker: "Sensory Seeker",
  tiny_engineer: "Tiny Engineer",
  creative_maker: "Creative Maker",
  quiet_thinker: "Quiet Thinker",
  curious_explorer: "Curious Explorer",
};

export default function PersonalityComparison() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadQuizResults();
  }, [user, navigate]);

  const loadQuizResults = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error("Error loading quiz results:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedResults((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rid) => rid !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const getPersonalityId = (personalityType: string): PersonalityId => {
    const normalized = personalityType.toLowerCase().replace(/^the\s+/, "").replace(/\s+/g, "_");
    return normalized as PersonalityId;
  };

  // Create comparison data for radar chart
  const comparisonData = selectedResults.length > 0 ? (() => {
    const data: any[] = [];
    const personalityTypes = Object.keys(PERSONALITY_LABELS) as PersonalityId[];

    personalityTypes.forEach((type) => {
      const entry: any = {
        personality: PERSONALITY_LABELS[type],
      };

      selectedResults.forEach((resultId, index) => {
        const result = results.find((r) => r.id === resultId);
        if (result) {
          const personalityId = getPersonalityId(result.personality_type);
          entry[`quiz${index + 1}`] = personalityId === type ? 10 : 0;
        }
      });

      data.push(entry);
    });

    return data;
  })() : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-3">
              Personality Comparison
            </h1>
            <p className="text-lg text-muted-foreground">
              Compare quiz results to see how your child's personality has evolved over time
            </p>
          </div>

          {results.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-3">No Quiz Results Yet</h3>
              <p className="text-muted-foreground mb-6">
                Take the personality quiz to start tracking your child's development
              </p>
              <Button onClick={() => navigate("/")} variant="cta" size="lg">
                Take Quiz Now
              </Button>
            </Card>
          ) : results.length === 1 ? (
            <Card className="p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold mb-3">One Result Available</h3>
              <p className="text-muted-foreground mb-6">
                Take the quiz again to compare results and track changes over time
              </p>
              <Button onClick={() => navigate("/")} variant="cta" size="lg">
                Retake Quiz
              </Button>
            </Card>
          ) : (
            <>
              {/* Quiz Results Selection */}
              <Card className="p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Select Results to Compare (up to 3)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.map((result) => {
                    const isSelected = selectedResults.includes(result.id);
                    const personalityId = getPersonalityId(result.personality_type);
                    const personality = PERSONALITIES[personalityId];

                    return (
                      <Card
                        key={result.id}
                        className={`p-4 cursor-pointer transition-all ${
                          isSelected
                            ? "border-2 border-primary bg-primary/5"
                            : "border border-border hover:border-primary/50"
                        }`}
                        onClick={() => toggleSelection(result.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-3xl">{personality?.emoji || "🎯"}</div>
                          {isSelected && (
                            <Badge variant="default" className="ml-2">
                              Selected
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {result.personality_type}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(result.created_at).toLocaleDateString()}
                        </div>
                        {result.child_age && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Age: {result.child_age}
                          </p>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </Card>

              {/* Comparison Chart */}
              {selectedResults.length >= 2 && (
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold">Personality Evolution</h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Radar Chart */}
                    <div>
                      <ResponsiveContainer width="100%" height={400}>
                        <RadarChart data={comparisonData}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis
                            dataKey="personality"
                            tick={{ fill: "hsl(var(--foreground))", fontSize: 11 }}
                          />
                          {selectedResults.map((_, index) => (
                            <Radar
                              key={index}
                              name={`Quiz ${index + 1}`}
                              dataKey={`quiz${index + 1}`}
                              stroke={`hsl(${(index * 120) % 360}, 70%, 50%)`}
                              fill={`hsl(${(index * 120) % 360}, 70%, 50%)`}
                              fillOpacity={0.3}
                            />
                          ))}
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Comparison Details</h4>
                      {selectedResults.map((resultId, index) => {
                        const result = results.find((r) => r.id === resultId);
                        if (!result) return null;

                        const personalityId = getPersonalityId(result.personality_type);
                        const personality = PERSONALITIES[personalityId];

                        return (
                          <Card key={result.id} className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="text-2xl">{personality?.emoji || "🎯"}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-foreground">
                                    Quiz {index + 1}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(result.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-foreground mb-1">
                                  {result.personality_type}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {personality?.description || ""}
                                </p>
                              </div>
                            </div>
                          </Card>
                        );
                      })}

                      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                        <h5 className="font-semibold text-sm mb-2">💡 Insights</h5>
                        <p className="text-sm text-muted-foreground">
                          {selectedResults.length === 2
                            ? "Comparing two quiz results helps you understand how your child's interests are developing."
                            : "Comparing three results gives a comprehensive view of personality evolution over time."}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
