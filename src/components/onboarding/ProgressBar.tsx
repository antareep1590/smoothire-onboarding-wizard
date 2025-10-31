import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const ProgressBar = ({ currentStep, totalSteps, steps }: ProgressBarProps) => {
  return (
    <div className="w-full bg-card shadow-soft border-b border-border py-6">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={stepNumber} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                      isCompleted && "bg-success text-success-foreground",
                      isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium text-center hidden sm:block transition-colors duration-300",
                      isCurrent && "text-primary font-semibold",
                      isCompleted && "text-success",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step}
                  </span>
                </div>
                {index < totalSteps - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-1 mx-2 rounded transition-all duration-300",
                      stepNumber < currentStep ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
