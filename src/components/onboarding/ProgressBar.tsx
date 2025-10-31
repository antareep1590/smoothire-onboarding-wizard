import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  steps: string[];
  children: React.ReactNode;
}

export const ProgressBar = ({ currentStep, steps, children }: ProgressBarProps) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Vertical Sidebar - Desktop */}
      <aside className="hidden lg:block lg:w-72 bg-[hsl(var(--progress-sidebar-bg))] border-r border-border relative">
        
        <div className="relative z-10 p-8 flex flex-col h-full">
          {/* Logo */}
          <div className="mb-16 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-lg font-bold text-background">S</span>
              </div>
              <h1 className="text-xl font-semibold text-foreground tracking-tight">Smoothire</h1>
            </div>
          </div>

          {/* Progress Steps */}
          <nav className="space-y-1 flex-1">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              
              return (
                <div
                  key={stepNumber}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-lg transition-all duration-200",
                    isCurrent && "bg-muted/60",
                    !isCurrent && "hover:bg-muted/30"
                  )}
                >
                  {/* Circle with number or checkmark */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 flex-shrink-0",
                      isCompleted && "bg-[hsl(var(--success))] text-white",
                      isCurrent && "bg-foreground text-background",
                      !isCompleted && !isCurrent && "bg-muted text-muted-foreground border border-border"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  
                  {/* Step name */}
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      isCurrent && "text-foreground",
                      isCompleted && "text-muted-foreground",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Horizontal Progress Bar */}
      <div className="lg:hidden bg-card border-b border-border py-4 px-4">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={stepNumber} className="flex items-center flex-1">
                <div className="flex flex-col items-center w-full">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                      isCompleted && "bg-[hsl(var(--success))] text-white",
                      isCurrent && "bg-foreground text-background",
                      !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-1 text-xs font-medium text-center hidden sm:block",
                      isCurrent && "text-foreground font-semibold",
                      isCompleted && "text-muted-foreground",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-1 rounded transition-all duration-300",
                      stepNumber < currentStep ? "bg-[hsl(var(--success))]" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[hsl(0,0%,98%)]">
        {children}
      </main>
    </div>
  );
};
