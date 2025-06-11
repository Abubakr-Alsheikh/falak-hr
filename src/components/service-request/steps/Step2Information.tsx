import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServiceFormData } from "@/pages/public/contact/sections/ServiceRequest";

interface Props {
  formData: ServiceFormData;
  onDataChange: (field: keyof ServiceFormData, value: string) => void;
}

export const Step2Information = ({ formData, onDataChange }: Props) => {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-sky-700">
        الخطوة الثانية: معلومات المنشأة والتواصل
      </h2>
      <div className="space-y-6">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="companyName">اسم الجهة/المنشأة</Label>
          <Input
            type="text"
            id="companyName"
            value={formData.companyName}
            onChange={(e) => onDataChange("companyName", e.target.value)}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="contactPerson">اسم المسؤول/المتصل</Label>
          <Input
            type="text"
            id="contactPerson"
            value={formData.contactPerson}
            onChange={(e) => onDataChange("contactPerson", e.target.value)}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => onDataChange("email", e.target.value)}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => onDataChange("phone", e.target.value)}
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="companyProfile">
            نبذة تعريفية عن المنشأة وأنشطتها
          </Label>
          <Textarea
            id="companyProfile"
            value={formData.companyProfile}
            onChange={(e) => onDataChange("companyProfile", e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};
