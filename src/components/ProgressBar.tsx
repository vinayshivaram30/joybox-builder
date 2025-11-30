interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
        <span className="text-xs sm:text-sm font-medium text-muted-foreground">
          Question {currentStep} of {totalSteps}
        </span>
        <span className="text-xs sm:text-sm font-bold text-primary font-heading">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2.5 sm:h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
