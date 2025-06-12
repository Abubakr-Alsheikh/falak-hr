"use client";

import React, { useState } from "react";
import { z, ZodObject } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const ServiceRequestPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<ServiceRequestData>>({});
  const [errors, setErrors] = useState<FormErrors>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDataChange = <T extends keyof ServiceRequestData>(
    field: T,
    value: ServiceRequestData[T]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // When the user types, clear the specific error for that field.
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
      // If validation fails, set the errors and stop.
      setErrors(result.error.format());
      return false;
    }

    // --- THE FIX ---
    // If validation succeeds, clear all errors and proceed.
    // This removes the code that was causing the crash.
    setErrors(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    // Also clear errors when going back for a clean slate.
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
        return <Step4Review {...props} />;
      default:
        return null;
    }
  };

  // The JSX remains identical
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8" dir="rtl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-sky-800 md:text-4xl">
          استمارة طلب الخدمات
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          نظام تفاعلي لتقديم طلباتكم بكل سهولة ويسر
        </p>
      </header>

      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-10">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRequestPage;
