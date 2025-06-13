"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceRequestForm } from "@/components/service-request/ServiceRequestForm";

const ServiceRequestPage = () => {
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
          <ServiceRequestForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRequestPage;
