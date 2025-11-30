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
    <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto animate-slide-in">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
        {question.question}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {question.answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => onAnswer(answer.id, answer.value)}
            className={`
              relative h-auto py-8 px-8 
              flex flex-col items-center justify-center gap-4
              rounded-[32px] 
              bg-[#FFF5E6] hover:bg-[#FFE8CC]
              border-2 transition-all duration-200
              ${selectedAnswer === answer.id 
                ? 'border-primary shadow-lg scale-[1.02]' 
                : 'border-[#FFE8CC] hover:border-[#FFD9A6] shadow-sm'
              }
            `}
          >
            <span className="text-5xl md:text-6xl">{answer.icon}</span>
            <span className="text-base md:text-lg font-semibold text-center text-foreground leading-snug">
              {answer.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
