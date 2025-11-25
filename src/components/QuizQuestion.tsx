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
    <div className="glass-card p-8 max-w-2xl mx-auto animate-slide-in">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
        {question.question}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.answers.map((answer) => (
          <Button
            key={answer.id}
            variant="pill"
            size="lg"
            onClick={() => onAnswer(answer.id, answer.value)}
            className={`h-auto py-6 px-6 flex flex-col items-center gap-3 ${
              selectedAnswer === answer.id ? 'bg-accent border-accent ring-2 ring-accent ring-offset-2' : ''
            }`}
          >
            <span className="text-4xl">{answer.icon}</span>
            <span className="text-base font-semibold text-center">{answer.text}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
