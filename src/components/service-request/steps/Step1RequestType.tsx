import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  RequestType,
  ServiceFormData,
} from "@/pages/public/contact/sections/ServiceRequest";

interface Props {
  formData: ServiceFormData;
  onDataChange: <T extends keyof ServiceFormData>(
    field: T,
    value: ServiceFormData[T]
  ) => void;
}

const requestTypes = [
  { value: "main_facility", label: "فتح ملف منشأة رئيسية", icon: "🏢" },
  { value: "branch_facility", label: "فتح ملف منشأة فرعية", icon: "🏬" },
  { value: "modify_data", label: "تعديل بيانات منشأة", icon: "✏️" },
] as const;

export const Step1RequestType = ({ formData, onDataChange }: Props) => {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-sky-700">
        الخطوة الأولى: تحديد نوع الطلب
      </h2>
      <p className="mb-8 text-muted-foreground">
        يرجى اختيار نوع الخدمة التي ترغب بطلبها للبدء.
      </p>

      <RadioGroup
        value={formData.requestType}
        onValueChange={(value: RequestType) =>
          onDataChange("requestType", value)
        }
        className="grid grid-cols-1 gap-6 text-center md:grid-cols-3"
      >
        {requestTypes.map((type) => (
          <Label
            key={type.value}
            htmlFor={type.value}
            className={cn(
              "p-6 rounded-lg cursor-pointer bg-slate-50 hover:bg-white transition-all duration-200 ease-in-out border-2",
              formData.requestType === type.value
                ? "border-sky-600 shadow-md transform -translate-y-1"
                : "border-transparent"
            )}
          >
            <RadioGroupItem
              value={type.value}
              id={type.value}
              className="sr-only"
            />
            <div className="mb-3 text-5xl">{type.icon}</div>
            <h3 className="text-lg font-bold">{type.label}</h3>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
};
