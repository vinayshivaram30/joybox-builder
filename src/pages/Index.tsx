import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/components/QuizQuestion";
import { ProgressBar } from "@/components/ProgressBar";
import { PersonalityResult } from "@/components/PersonalityResult";
import { SignupForm } from "@/components/SignupForm";
import { JoyBoxPreview } from "@/components/JoyBoxPreview";
import { quizQuestions, calculatePersonality } from "@/data/quizData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-toys.jpg";

type FlowStep = "hero" | "quiz" | "result" | "signup" | "preview";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<FlowStep>("hero");
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [personalityResult, setPersonalityResult] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSignupSubmit = async (data: { name: string; email: string; phone: string; pincode: string }) => {
    setIsSaving(true);
    
    try {
      // Save quiz results to database
      const { error } = await supabase.from("quiz_results").insert({
        personality_type: personalityResult.title,
        answers: answers,
        parent_name: data.name,
        whatsapp_number: data.phone,
        pincode: data.pincode,
        child_age: null, // Can be added to the form later
        user_id: user?.id || null,
      });

      if (error) throw error;

      // Send personalized email with toy recommendations
      try {
        await supabase.functions.invoke('send-quiz-email', {
          body: {
            parentName: data.name,
            email: data.email,
            personalityType: personalityResult.title,
            childAge: 'Not specified',
          },
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Don't fail the whole process if email fails
      }

      setUserData(data);
      setCurrentStep("preview");
      
      toast({
        title: "Quiz saved successfully!",
        description: "Your personalized JoyBox is ready. Check your email for recommendations!",
      });

      // If user is logged in, redirect to dashboard after preview
      if (user) {
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.error("Error saving quiz results:", error);
      toast({
        title: "Error saving quiz",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetQuiz = () => {
    sessionStorage.removeItem("toyLuvQuiz");
    setCurrentStep("hero");
    setQuizStep(0);
    setAnswers({});
    setSelectedAnswer(null);
    setPersonalityResult(null);
    setUserData(null);
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
          <div className="max-w-2xl mx-auto mb-4 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetQuiz}
              className="text-muted-foreground hover:text-foreground"
            >
              Reset Quiz
            </Button>
          </div>
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
          <SignupForm onSubmit={handleSignupSubmit} isLoading={isSaving} />
        </div>
      )}

      {/* JoyBox Preview Section */}
      {currentStep === "preview" && personalityResult && (
        <div className="container mx-auto px-4 py-12 md:py-20">
          <JoyBoxPreview
            personalityType={personalityResult.title}
            childAge={userData?.childAge}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
