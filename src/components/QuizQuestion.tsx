import { Button } from "@/components/ui/button";

export interface QuizAnswer {
  id: string;
  text: string;
  icon: string;
  value: string;
}

export interface QuizQuestionData {
  id: string;
  question: string;
  answers: QuizAnswer[];
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  selectedAnswer: string | null;
  onAnswer: (answerId: string, value: string) => void;
}

export const QuizQuestion = ({ question, selectedAnswer, onAnswer }: QuizQuestionProps) => {
  return (
    <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 max-w-4xl mx-auto animate-slide-in">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6 sm:mb-8 md:mb-12 text-center px-2">
        {question.question}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => onAnswer(answer.id, answer.value)}
            className={`
              relative h-auto py-6 sm:py-7 md:py-8 px-4 sm:px-6 md:px-8 
              flex flex-col items-center justify-center gap-3 sm:gap-4
              rounded-2xl sm:rounded-3xl md:rounded-[32px] 
              bg-[#FFF5E6] hover:bg-[#FFE8CC]
              border-2 transition-all duration-200
              touch-manipulation active:scale-[0.98]
              ${selectedAnswer === answer.id 
                ? 'border-primary shadow-lg scale-[1.02]' 
                : 'border-[#FFE8CC] hover:border-[#FFD9A6] shadow-sm'
              }
            `}
          >
            <span className="text-4xl sm:text-5xl md:text-6xl">{answer.icon}</span>
            <span className="text-sm sm:text-base md:text-lg font-semibold text-center text-foreground leading-snug">
              {answer.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
