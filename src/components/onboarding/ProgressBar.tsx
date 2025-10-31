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
      <aside className="hidden lg:block lg:w-80 bg-[hsl(var(--progress-sidebar-bg))] shadow-card relative overflow-hidden">
        {/* Subtle geometric background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        
        <div className="relative z-10 p-8 flex flex-col h-full">
          {/* Logo */}
          <div className="mb-12 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">S</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Smoothire</h1>
            </div>
          </div>

          {/* Progress Steps */}
          <nav className="space-y-2 flex-1">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              
              return (
                <div
                  key={stepNumber}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg transition-all duration-300",
                    isCurrent && "bg-primary/10 shadow-sm scale-105",
                    !isCurrent && "hover:bg-white/50"
                  )}
                >
                  {/* Circle with number or checkmark */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 flex-shrink-0",
                      isCompleted && "bg-[hsl(var(--progress-step-complete))] text-white",
                      isCurrent && "bg-[hsl(var(--progress-step-active))] text-white shadow-lg",
                      !isCompleted && !isCurrent && "bg-white text-[hsl(var(--progress-step-inactive))] border-2 border-border"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  
                  {/* Step name */}
                  <span
                    className={cn(
                      "text-base font-medium transition-colors duration-300",
                      isCurrent && "text-primary font-semibold",
                      isCompleted && "text-[hsl(var(--progress-step-complete))]",
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
      <div className="lg:hidden bg-card shadow-soft border-b border-border py-4 px-4">
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
                      isCompleted && "bg-[hsl(var(--progress-step-complete))] text-white",
                      isCurrent && "bg-[hsl(var(--progress-step-active))] text-white ring-4 ring-primary/20",
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
                      isCurrent && "text-primary font-semibold",
                      isCompleted && "text-[hsl(var(--progress-step-complete))]",
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
                      stepNumber < currentStep ? "bg-[hsl(var(--progress-step-complete))]" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};
