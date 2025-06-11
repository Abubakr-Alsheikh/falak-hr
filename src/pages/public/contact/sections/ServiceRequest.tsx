"use client"; // Required for components with hooks

import React, { useState } from "react";
import { ServiceRequestStepper } from "@/components/service-request/ServiceRequestStepper";
import { Step1RequestType } from "@/components/service-request/steps/Step1RequestType";
import { Step2Information } from "@/components/service-request/steps/Step2Information";
import { Step3Attachments } from "@/components/service-request/steps/Step3Attachments";
import { Step4Review } from "@/components/service-request/steps/Step4Review";
import { ServiceRequestSuccess } from "@/components/service-request/ServiceRequestSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/animations/FadeIn";

// Define the structure for our form data with TypeScript
export type RequestType =
  | "main_facility"
  | "branch_facility"
  | "modify_data"
  | "";

export interface ServiceFormData {
  requestType: RequestType;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  companyProfile: string;
  licenses: File | null;
  managers: File | null;
  balance: File | null;
  agreement: boolean;
}

// Define the steps for our form wizard
const steps = [
  { id: 1, title: "نوع الطلب" },
  { id: 2, title: "المعلومات" },
  { id: 3, title: "المرفقات" },
  { id: 4, title: "المراجعة" },
];

const ServiceRequestPage = () => {
  // State management using React Hooks
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
    requestType: "",
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    companyProfile: "",
    licenses: null,
    managers: null,
    balance: null,
    agreement: false,
  });

  // Handler to update form data. Using a generic approach for scalability.
  const handleDataChange = <T extends keyof ServiceFormData>(
    field: T,
    value: ServiceFormData[T]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Navigation handlers
  const handleNext = () => {
    // Add validation before proceeding if needed
    if (currentStep === 1 && !formData.requestType) {
      // Here you could trigger a toast notification for a better UX
      alert("الرجاء اختيار نوع الطلب للمتابعة.");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
  };

  // Helper to render the current step's component
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1RequestType
            formData={formData}
            onDataChange={handleDataChange}
          />
        );
      case 2:
        return (
          <Step2Information
            formData={formData}
            onDataChange={handleDataChange}
          />
        );
      case 3:
        return (
          <Step3Attachments
            formData={formData}
            onDataChange={handleDataChange}
          />
        );
      case 4:
        return (
          <Step4Review formData={formData} onDataChange={handleDataChange} />
        );
      default:
        return null;
    }
  };

  // The main layout rendering
  return (
    <FadeIn direction="up">
      <div className="container mx-auto mb-8 max-w-4xl p-4" dir="rtl">
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
                <ServiceRequestStepper
                  steps={steps}
                  currentStep={currentStep}
                />
                <form onSubmit={handleSubmit} className="mt-10">
                  {renderStepContent()}

                  {/* Navigation Buttons */}
                  <div className="mt-10 flex justify-between">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                      >
                        السابق
                      </Button>
                    ) : (
                      <div />
                    )}{" "}
                    {/* Empty div for alignment */}
                    {currentStep < steps.length ? (
                      <Button type="button" onClick={handleNext}>
                        التالي
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!formData.agreement}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        إرسال الطلب
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </FadeIn>
  );
};

export default ServiceRequestPage;
