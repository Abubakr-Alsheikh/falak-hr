"use client";

import React, { useState } from "react";
import { z, ZodObject } from "zod";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

import { ServiceRequestStepper } from "@/components/service-request/ServiceRequestStepper";
import { Step1RequestType } from "@/components/service-request/steps/Step1RequestType";
import { Step2Information } from "@/components/service-request/steps/Step2Information";
import { Step3Attachments } from "@/components/service-request/steps/Step3Attachments";
import { Step4Review } from "@/components/service-request/steps/Step4Review";
import { ServiceRequestSuccess } from "@/components/service-request/ServiceRequestSuccess";

import {
  serviceRequestObjectSchema,
  step3ValidationSchema,
  serviceRequestFinalSchema,
  ServiceRequestData,
} from "@/lib/validations/serviceRequestSchema";
import { submitServiceRequest } from "@/services/serviceRequestApi";

const steps = [
  { id: 1, title: "نوع الطلب" },
  { id: 2, title: "المعلومات" },
  { id: 3, title: "المرفقات" },
  { id: 4, title: "المراجعة" },
];

type FormErrors = z.ZodFormattedError<ServiceRequestData> | null;

interface ServiceRequestFormProps {
  initialServiceTitle?: string;
  initialServiceDescription?: string;
  onFormSubmitSuccess?: () => void; // Callback to run on success (e.g., close a dialog)
}

export const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({
  initialServiceTitle,
  initialServiceDescription,
  onFormSubmitSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ServiceRequestData>>({
    // Pre-populate formData with initial values from props
    serviceTitle: initialServiceTitle,
    serviceDescription: initialServiceDescription,
  });
  const [errors, setErrors] = useState<FormErrors>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDataChange = <T extends keyof ServiceRequestData>(
    field: T,
    value: ServiceRequestData[T]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value as any }));
    if (errors?.[field]) {
      setErrors((prev) => {
        if (!prev) return null;
        const newErrors = { ...prev };
        delete (newErrors as any)[field];
        if (Object.keys(newErrors).length <= 1 && newErrors._errors)
          return null;
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    let partialSchema: ZodObject<any> | z.ZodEffects<any>;
    switch (step) {
      case 1:
        partialSchema = serviceRequestObjectSchema.pick({ requestType: true });
        break;
      case 2:
        partialSchema = serviceRequestObjectSchema.pick({
          companyName: true,
          contactPerson: true,
          email: true,
          phone: true,
        });
        break;
      case 3:
        partialSchema = step3ValidationSchema;
        break;
      case 4:
        partialSchema = serviceRequestObjectSchema.pick({ agreement: true });
        break;
      default:
        return true;
    }
    const result = partialSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      return false;
    }
    setErrors(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setErrors(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const result = serviceRequestFinalSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    setIsSubmitting(true);
    try {
      await submitServiceRequest(result.data);
      setIsSubmitted(true);
      // If a success callback is provided, call it.
      if (onFormSubmitSuccess) {
        // We might want a short delay to show the success message before closing the dialog
        setTimeout(() => {
          onFormSubmitSuccess();
        }, 2000);
      }
    } catch (error: any) {
      let errorMessage = "فشل الإرسال. حدث خطأ غير متوقع.";
      if (error && error.errors) {
        errorMessage = Object.values(error.errors).join(" ");
      } else if (error && error.message) {
        errorMessage = error.message;
      }
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const props = { onDataChange: handleDataChange as any, formData, errors };
    switch (currentStep) {
      case 1:
        return <Step1RequestType {...props} />;
      case 2:
        return <Step2Information {...props} />;
      case 3:
        return <Step3Attachments {...props} />;
      case 4:
        // Pass the service title to the review step if it exists
        return <Step4Review {...props} serviceTitle={formData.serviceTitle} />;
      default:
        return null;
    }
  };

  return (
    <>
      {isSubmitted ? (
        <ServiceRequestSuccess />
      ) : (
        <>
          <ServiceRequestStepper steps={steps} currentStep={currentStep} />

          {submitError && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>فشل إرسال الطلب</AlertTitle>
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="min-h-[300px]">{renderStepContent()}</div>

            <div className="mt-10 flex justify-between">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  disabled={isSubmitting}
                >
                  السابق
                </Button>
              ) : (
                <div />
              )}

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  التالي
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "جار الإرسال..." : "إرسال الطلب"}
                </Button>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
};
