import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <Alert variant="destructive" className="mx-auto max-w-lg">
      {" "}
      {/* Use Shadcn's Alert component */}
      <AlertCircle className="h-4 w-4" /> {/* Icon for visual cue */}
      <AlertTitle>خطأ</AlertTitle> {/* Consistent Arabic title */}
      <AlertDescription>
        {message}
        {onRetry && (
          <div className="mt-4">
            <Button variant="outline" size="sm" onClick={onRetry}>
              إعادة التحميل
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorDisplay;
