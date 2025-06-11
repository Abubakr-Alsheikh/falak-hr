import { ServiceFormData } from "@/pages/public/contact/sections/ServiceRequest";
import { FileInput } from "../FileInput";

interface Props {
  formData: ServiceFormData;
  onDataChange: (
    field: "licenses" | "managers" | "balance",
    value: File | null
  ) => void;
}

export const Step3Attachments = ({ formData, onDataChange }: Props) => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-sky-700">
        الخطوة الثالثة: رفع المرفقات
      </h2>
      <div className="space-y-8">
        <FileInput
          label="1. إرفاق التراخيص اللازمة"
          onFileSelect={(file) => onDataChange("licenses", file)}
        />
        <FileInput
          label="2. بيانات المدراء وتخصصاتهم"
          onFileSelect={(file) => onDataChange("managers", file)}
        />
        {/* Conditionally render the balance upload based on request type */}
        {formData.requestType !== "modify_data" && (
          <FileInput
            label="3. مستند الرصيد الافتتاحي"
            onFileSelect={(file) => onDataChange("balance", file)}
          />
        )}
      </div>
    </div>
  );
};
