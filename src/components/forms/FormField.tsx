import React from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  children,
}) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id} className={error ? "text-destructive" : ""}>
        {label}
      </Label>
      {children}
      {error && (
        <p className="mt-1 text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
};
