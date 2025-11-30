import { PersonalityId } from "@/data/quizData";
import { Card } from "@/components/ui/card";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface PersonalityScoreChartProps {
  scores: Record<PersonalityId, number>;
  topPersonality: PersonalityId;
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

export const PersonalityScoreChart = ({ scores, topPersonality }: PersonalityScoreChartProps) => {
  const chartData = Object.entries(scores).map(([id, score]) => ({
    personality: PERSONALITY_LABELS[id as PersonalityId],
    score: Number(score.toFixed(1)),
    isTop: id === topPersonality,
  }));

  // Sort by score descending
  chartData.sort((a, b) => b.score - a.score);

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10">
      <h3 className="text-xl font-heading font-semibold mb-4 text-center text-foreground">
        Personality Score Breakdown
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        See how your child scored across all personality types
      </p>
      
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="personality" 
            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 'auto']}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
          />
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

      <div className="mt-6 space-y-2">
        <p className="text-sm font-semibold text-foreground">Top 3 Personality Types:</p>
        {chartData.slice(0, 3).map((item, index) => (
          <div
            key={item.personality}
            className="flex items-center justify-between p-3 rounded-lg bg-card/80 border border-border/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-primary">#{index + 1}</span>
              <span className="font-medium text-foreground">{item.personality}</span>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              {item.score} points
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};
