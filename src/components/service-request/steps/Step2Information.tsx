import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/forms/FormField";
import { ServiceRequestData } from "@/lib/validations/serviceRequestSchema";

interface Props {
  formData: Partial<ServiceRequestData>;
  onDataChange: (field: keyof ServiceRequestData, value: string) => void;
  errors: z.ZodFormattedError<ServiceRequestData> | null;
}

export const Step2Information = ({ formData, onDataChange, errors }: Props) => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-sky-700">
        الخطوة الثانية: معلومات المنشأة والتواصل
      </h2>
      <div className="space-y-4">
        <FormField
          id="companyName"
          label="اسم الجهة/المنشأة"
          error={errors?.companyName?._errors[0]}
        >
          <Input
            id="companyName"
            value={formData.companyName ?? ""}
            onChange={(e) => onDataChange("companyName", e.target.value)}
          />
        </FormField>

        <FormField
          id="contactPerson"
          label="اسم المسؤول/المتصل"
          error={errors?.contactPerson?._errors[0]}
        >
          <Input
            id="contactPerson"
            value={formData.contactPerson ?? ""}
            onChange={(e) => onDataChange("contactPerson", e.target.value)}
          />
        </FormField>

        <FormField
          id="email"
          label="البريد الإلكتروني"
          error={errors?.email?._errors[0]}
        >
          <Input
            type="email"
            id="email"
            value={formData.email ?? ""}
            onChange={(e) => onDataChange("email", e.target.value)}
          />
        </FormField>

        <FormField
          id="phone"
          label="رقم الهاتف"
          error={errors?.phone?._errors[0]}
        >
          <Input
            type="tel"
            id="phone"
            value={formData.phone ?? ""}
            onChange={(e) => onDataChange("phone", e.target.value)}
          />
        </FormField>

        <FormField
          id="companyProfile"
          label="نبذة تعريفية عن المنشأة وأنشطتها"
          error={errors?.companyProfile?._errors[0]}
        >
          <Textarea
            id="companyProfile"
            value={formData.companyProfile ?? ""}
            onChange={(e) => onDataChange("companyProfile", e.target.value)}
            rows={4}
          />
        </FormField>
      </div>
    </div>
  );
};
