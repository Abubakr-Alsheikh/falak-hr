import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export const ServiceRequestSuccess = () => {
  return (
    <Alert
      variant="default"
      className="bg-green-50 border-green-200 text-green-800"
    >
      <CheckCircle2 className="h-5 w-5 text-green-600" />
      <AlertTitle className="font-bold text-xl">
        تم استلام طلبكم بنجاح!
      </AlertTitle>
      <AlertDescription className="mt-2">
        شكراً لتقديم طلبكم. سنتواصل معكم في أقرب وقت ممكن.
      </AlertDescription>
    </Alert>
  );
};
