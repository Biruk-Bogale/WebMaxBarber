interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="mb-10 overflow-x-auto">
      <div className="flex min-w-max items-center justify-center">
        {steps.map((step, index) => {
          const active = currentStep >= step.number;

          const completed = currentStep > step.number;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition ${
                    active
                      ? "bg-barber-black text-white"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {completed ? "✓" : step.number}
                </div>

                <span
                  className={`hidden text-xs font-semibold sm:block ${
                    active ? "text-barber-black" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-3 h-px w-8 sm:w-12 ${
                    currentStep > step.number ? "bg-barber-gold" : "bg-border"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
