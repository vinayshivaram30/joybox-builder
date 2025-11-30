import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import { PersonalityResultData } from "@/components/PersonalityResult";
import { PersonalityId } from "@/data/quizData";
import { useToast } from "@/hooks/use-toast";

interface PDFReportGeneratorProps {
  personalityResult: PersonalityResultData & { id?: string };
  scores: Record<PersonalityId, number>;
  childAge?: string;
  parentName?: string;
}

const PERSONALITY_TIPS: Record<string, { development: string[]; activities: string[] }> = {
  "The Curious Builder": {
    development: [
      "Spatial reasoning and problem-solving skills",
      "Fine motor skills through construction play",
      "Understanding cause and effect relationships",
    ],
    activities: [
      "Build a fort using pillows and blankets",
      "Create towers with different materials (blocks, cups, etc.)",
      "Sort and organize toys by size, color, or shape",
    ],
  },
  "The Imaginative Storyteller": {
    development: [
      "Language and vocabulary expansion",
      "Creative thinking and emotional expression",
      "Social skills through role-play scenarios",
    ],
    activities: [
      "Create puppet shows with homemade puppets",
      "Act out favorite stories with props",
      "Draw pictures and tell stories about them",
    ],
  },
  "The Active Explorer": {
    development: [
      "Gross motor skills and coordination",
      "Physical fitness and body awareness",
      "Confidence through physical challenges",
    ],
    activities: [
      "Obstacle course in the living room or backyard",
      "Dance parties with different music styles",
      "Outdoor scavenger hunts",
    ],
  },
  "The Problem Solver": {
    development: [
      "Critical thinking and logical reasoning",
      "Patience and persistence",
      "Pattern recognition skills",
    ],
    activities: [
      "Age-appropriate puzzles with increasing difficulty",
      "Simple science experiments (e.g., sink or float)",
      "Memory matching games",
    ],
  },
  "The Social Connector": {
    development: [
      "Communication and social skills",
      "Empathy and emotional intelligence",
      "Teamwork and cooperation",
    ],
    activities: [
      "Organize playdates with structured group games",
      "Practice taking turns in board games",
      "Role-play different social scenarios",
    ],
  },
  "The Sensory Seeker": {
    development: [
      "Sensory integration and body awareness",
      "Fine motor skills through tactile play",
      "Emotional regulation through sensory input",
    ],
    activities: [
      "Create sensory bins with rice, pasta, or sand",
      "Play with playdough, slime, or kinetic sand",
      "Water play activities in the bath or outdoors",
    ],
  },
  "The Tiny Engineer": {
    development: [
      "STEM skills and mechanical understanding",
      "Attention to detail and focus",
      "Systematic thinking and planning",
    ],
    activities: [
      "Take apart safe household items (old remotes, etc.)",
      "Build simple machines with gears and levers",
      "Conduct engineering challenges (e.g., tallest tower)",
    ],
  },
  "The Creative Maker": {
    development: [
      "Artistic expression and creativity",
      "Fine motor skills through crafting",
      "Self-confidence through creation",
    ],
    activities: [
      "Open-ended art projects with mixed materials",
      "DIY craft projects from recyclables",
      "Create gifts for family members",
    ],
  },
  "The Quiet Thinker": {
    development: [
      "Focus and concentration abilities",
      "Independent learning skills",
      "Mindfulness and self-regulation",
    ],
    activities: [
      "Quiet reading time in a cozy corner",
      "Simple meditation or breathing exercises",
      "Individual puzzles and matching games",
    ],
  },
  "The Curious Explorer": {
    development: [
      "Discovery and investigation skills",
      "Adaptability and flexibility",
      "Confidence in trying new things",
    ],
    activities: [
      "Nature walks with observation tasks",
      "Explore new places (museums, parks, etc.)",
      "Try new activities or hobbies regularly",
    ],
  },
};

export const PDFReportGenerator = ({ 
  personalityResult, 
  scores, 
  childAge,
  parentName 
}: PDFReportGeneratorProps) => {
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPos = margin;

      // Header
      doc.setFillColor(139, 92, 246); // primary color
      doc.rect(0, 0, pageWidth, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("ToyLuv Personality Report", pageWidth / 2, 25, { align: "center" });

      yPos = 55;

      // Personality Type
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(`${personalityResult.emoji} ${personalityResult.title}`, margin, yPos);
      yPos += 15;

      // Description
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const descLines = doc.splitTextToSize(personalityResult.description, pageWidth - 2 * margin);
      doc.text(descLines, margin, yPos);
      yPos += descLines.length * 7 + 10;

      // Parent Info (if available)
      if (parentName) {
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Prepared for: ${parentName}`, margin, yPos);
        yPos += 5;
      }
      if (childAge) {
        doc.text(`Child's Age: ${childAge}`, margin, yPos);
        yPos += 5;
      }
      doc.text(`Report Date: ${new Date().toLocaleDateString()}`, margin, yPos);
      yPos += 15;

      // Personality Scores
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("Personality Score Breakdown", margin, yPos);
      yPos += 10;

      const sortedScores = Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      sortedScores.forEach(([id, score], index) => {
        const personalityName = id.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        doc.text(`${index + 1}. ${personalityName}: ${score.toFixed(1)} points`, margin + 5, yPos);
        yPos += 7;
      });
      yPos += 10;

      // Toy Categories
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Perfect Toy Matches", margin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      personalityResult.toyCategories.forEach((category) => {
        doc.text(`${category.icon} ${category.name}`, margin + 5, yPos);
        yPos += 7;
      });
      yPos += 10;

      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = margin;
      }

      // Development Tips
      const tips = PERSONALITY_TIPS[personalityResult.title] || PERSONALITY_TIPS["The Social Connector"];
      
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Development Focus Areas", margin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      tips.development.forEach((tip, index) => {
        const tipLines = doc.splitTextToSize(`${index + 1}. ${tip}`, pageWidth - 2 * margin - 10);
        doc.text(tipLines, margin + 5, yPos);
        yPos += tipLines.length * 7;
      });
      yPos += 10;

      // Activity Suggestions
      if (yPos > 230) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Play Activity Suggestions", margin, yPos);
      yPos += 10;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      tips.activities.forEach((activity, index) => {
        const activityLines = doc.splitTextToSize(`${index + 1}. ${activity}`, pageWidth - 2 * margin - 10);
        doc.text(activityLines, margin + 5, yPos);
        yPos += activityLines.length * 7;
      });
      yPos += 15;

      // Footer
      if (yPos > 260) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "italic");
      const footerText = doc.splitTextToSize(
        "This report is based on your quiz responses and provides general guidance. Every child is unique and may display traits from multiple personality types. Use this as a starting point to understand your child's play preferences.",
        pageWidth - 2 * margin
      );
      doc.text(footerText, margin, yPos);

      // Save PDF
      const fileName = `ToyLuv_${personalityResult.title.replace(/\s+/g, "_")}_Report.pdf`;
      doc.save(fileName);

      toast({
        title: "Report downloaded!",
        description: "Your personalized PDF report has been saved.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating report",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={generatePDF}
      disabled={generating}
      className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] h-12 sm:h-14 text-sm sm:text-base gap-2"
    >
      {generating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="hidden xs:inline">Generating PDF...</span>
          <span className="xs:hidden">...</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          <span className="hidden xs:inline">Download Full Report</span>
          <span className="xs:hidden">PDF</span>
        </>
      )}
    </Button>
  );
};
