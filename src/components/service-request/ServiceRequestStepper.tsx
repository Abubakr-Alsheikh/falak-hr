import { cn } from "@/lib/utils";
import React from "react";

interface StepperProps {
  steps: { id: number; title: string }[];
  currentStep: number;
}

export const ServiceRequestStepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center text-center sm:flex-row">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold transition-all duration-300",
                currentStep > step.id
                  ? "bg-sky-800 border-sky-800 text-white" // Completed
                  : currentStep === step.id
                  ? "bg-sky-600 border-sky-600 text-white" // Active
                  : "bg-background border-slate-300 text-slate-500" // Inactive
              )}
            >
              {step.id}
            </div>
            <span
              className={cn(
                "mt-2 text-sm sm:mt-0 sm:mr-3",
                currentStep >= step.id
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-auto border-t-2 transition-all duration-300 mx-2",
                currentStep > step.id ? "border-sky-800" : "border-slate-300"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
