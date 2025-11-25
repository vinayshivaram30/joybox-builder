import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/components/QuizQuestion";
import { ProgressBar } from "@/components/ProgressBar";
import { PersonalityResult } from "@/components/PersonalityResult";
import { SignupForm } from "@/components/SignupForm";
import { JoyBoxPreview } from "@/components/JoyBoxPreview";
import { quizQuestions, calculatePersonality } from "@/data/quizData";
import heroImage from "@/assets/hero-toys.jpg";
import toyBlocks from "@/assets/toy-blocks.jpg";
import toyCraft from "@/assets/toy-craft.jpg";
import toyPuzzle from "@/assets/toy-puzzle.jpg";

type FlowStep = "hero" | "quiz" | "result" | "signup" | "preview";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("hero");
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [personalityResult, setPersonalityResult] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  // Load state from session storage
  useEffect(() => {
    const saved = sessionStorage.getItem("toyLuvQuiz");
    if (saved) {
      const data = JSON.parse(saved);
      setCurrentStep(data.currentStep);
      setQuizStep(data.quizStep || 0);
      setAnswers(data.answers || {});
      setPersonalityResult(data.personalityResult);
      setUserData(data.userData);
    }
  }, []);

  // Save state to session storage
  useEffect(() => {
    sessionStorage.setItem(
      "toyLuvQuiz",
      JSON.stringify({
        currentStep,
        quizStep,
        answers,
        personalityResult,
        userData,
      })
    );
  }, [currentStep, quizStep, answers, personalityResult, userData]);

  const handleStartQuiz = () => {
    setCurrentStep("quiz");
  };

  const handleAnswer = (answerId: string, value: string) => {
    setSelectedAnswer(answerId);
    const questionId = quizQuestions[quizStep].id;
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Auto-advance after a brief delay
    setTimeout(() => {
      if (quizStep < quizQuestions.length - 1) {
        setQuizStep(quizStep + 1);
        setSelectedAnswer(null);
      } else {
        // Quiz complete - calculate result
        const result = calculatePersonality(newAnswers);
        setPersonalityResult(result);
        setCurrentStep("result");
      }
    }, 300);
  };

  const handleContinueToSignup = () => {
    setCurrentStep("signup");
  };

  const handleSignupSubmit = (data: any) => {
    setUserData(data);
    setCurrentStep("preview");
  };

  const getToysByPersonality = () => {
    // Return toy images based on personality type
    return [
      { name: "Building Blocks Set", image: toyBlocks, age: "Ages 3+" },
      { name: "Creative Craft Kit", image: toyCraft, age: "Ages 4+" },
      { name: "Educational Puzzle", image: toyPuzzle, age: "Ages 3+" },
    ];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {currentStep === "hero" && (
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Colorful toy box with educational toys"
                className="w-full h-auto"
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Find Your Child's Toy Personality in{" "}
              <span className="text-primary">60 Seconds</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Fun quiz. No payment needed.
            </p>
            <p className="text-lg text-muted-foreground mb-10">
              Personalised JoyBox preview included.
            </p>

            <Button
              variant="cta"
              size="lg"
              onClick={handleStartQuiz}
              className="text-xl px-12 h-16"
            >
              Start the Quiz ✨
            </Button>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span>Takes 60 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <span>Personalized results</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                <span>Bengaluru delivery</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {currentStep === "quiz" && (
        <div className="container mx-auto px-4 py-12 md:py-20">
          <ProgressBar
            currentStep={quizStep + 1}
            totalSteps={quizQuestions.length}
          />
          <QuizQuestion
            question={quizQuestions[quizStep]}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {/* Result Section */}
      {currentStep === "result" && personalityResult && (
        <div className="container mx-auto px-4 py-12 md:py-20">
          <PersonalityResult
            result={personalityResult}
            onContinue={handleContinueToSignup}
          />
        </div>
      )}

      {/* Signup Section */}
      {currentStep === "signup" && (
        <div className="container mx-auto px-4 py-12 md:py-20">
          <SignupForm onSubmit={handleSignupSubmit} />
        </div>
      )}

      {/* JoyBox Preview Section */}
      {currentStep === "preview" && personalityResult && (
        <div className="container mx-auto px-4 py-12 md:py-20">
          <JoyBoxPreview
            toys={getToysByPersonality()}
            personalityType={personalityResult.title}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
