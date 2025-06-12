import { z } from "zod";
import { ServiceRequestData } from "@/lib/validations/serviceRequestSchema";
import { FileInput } from "../FileInput";

interface Props {
  formData: Partial<ServiceRequestData>;
  onDataChange: (
    field: "licenses" | "managers" | "balance",
    value: File | null
  ) => void;
  errors: z.ZodFormattedError<ServiceRequestData> | null;
}

export const Step3Attachments = ({ formData, onDataChange, errors }: Props) => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-sky-700">
        الخطوة الثالثة: رفع المرفقات
      </h2>
      <div className="space-y-6">
        <FileInput
          id="licenses"
          label="1. إرفاق التراخيص اللازمة"
          file={formData.licenses}
          onFileSelect={(file) => onDataChange("licenses", file)}
          error={errors?.licenses?._errors[0]}
        />
        <FileInput
          id="managers"
          label="2. بيانات المدراء وتخصصاتهم"
          file={formData.managers}
          onFileSelect={(file) => onDataChange("managers", file)}
          error={errors?.managers?._errors[0]}
        />
        {formData.requestType !== "modify_data" && (
          <FileInput
            id="balance"
            label="3. مستند الرصيد الافتتاحي"
            file={formData.balance}
            onFileSelect={(file) => onDataChange("balance", file)}
            error={errors?.balance?._errors[0]}
          />
        )}
      </div>
    </div>
  );
};
