import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TraineeApplication,
  traineeApplicationSchema,
} from "@/types/subscription";
import subscriptionService from "@/api/subscriptionService";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FormInputField,
  FormTextareaField,
  FormRadioGroupField,
} from "./FormElements";
import { ArrowLeft } from "lucide-react";
import SuccessDialog from "@/components/common/SuccessDialog"; // Import the new dialog

interface TraineeFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const TraineeForm: React.FC<TraineeFormProps> = ({ onBack, onSuccess }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false); // New state for dialog

  const form = useForm<TraineeApplication>({
    resolver: zodResolver(traineeApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      skillsToDevelop: "",
      inquiriesNotes: "",
      // Ensure all required enum fields have an initial value
      ageCategory: undefined,
      nationality: undefined,
      howHeard: undefined,
      receiveNotifications: undefined,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: TraineeApplication) => {
    setError(null);
    try {
      await subscriptionService.createTraineeApplication(data);
      setShowSuccessDialog(true); // Show success dialog
      form.reset(); // Reset form fields
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "خطأ غير متوقع. يرجى المحاولة مرة أخرى. او إعادة تحديث الصفحة, وفي حال استمرار المشكلة, يرجى التواصل مع الدعم."
      );
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    onSuccess(); // Trigger the parent's onSuccess to navigate back
  };

  return (
    <Card className="mx-auto w-full max-w-4xl shadow-xl" dir="rtl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold md:text-4xl">
          نموذج تسجيل المتدربين
        </CardTitle>
        <CardDescription>
          املأ البيانات التالية للانضمام كمتدرب في أكاديمية فلك.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Removed inline success alert */}
            {error && (
              <Alert variant="destructive">
                <AlertTitle>خطأ</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <FormInputField
                control={form.control}
                name="fullName"
                label="اسمك الكامل"
                placeholder="سارة محمد"
              />
              <FormInputField
                control={form.control}
                name="email"
                label="البريد الإلكتروني"
                placeholder="name@example.com"
                type="email"
              />
            </div>

            <FormInputField
              control={form.control}
              name="whatsappNumber"
              label="رقم الواتساب"
              placeholder="9665xxxxxxxx"
              type="tel"
            />

            <FormRadioGroupField
              control={form.control}
              name="ageCategory"
              label="الفئة العمرية"
              options={[
                { value: "أقل من 18 سنة", label: "أقل من 18" },
                { value: "18 إلى 30", label: "18-30" },
                { value: "30 إلى 45", label: "30-45" },
                { value: "أكبر من 45", label: "أكبر من 45" },
              ]}
            />
            <FormRadioGroupField
              control={form.control}
              name="nationality"
              label="الجنسية"
              options={[
                { value: "سعودي", label: "سعودي" },
                { value: "مقيم", label: "مقيم" },
              ]}
            />

            <FormTextareaField
              control={form.control}
              name="skillsToDevelop"
              label="ما هي المهارات التي ترغب في تطويرها؟"
            />

            <FormRadioGroupField
              control={form.control}
              name="howHeard"
              label="كيف سمعت عنا؟"
              options={[
                { value: "وسائل التواصل الاجتماعي", label: "وسائل التواصل" },
                { value: "صديق", label: "صديق" },
                { value: "بحث على الإنترنت", label: "بحث على الإنترنت" },
                { value: "أخرى", label: "أخرى" },
              ]}
            />
            <FormRadioGroupField
              control={form.control}
              name="receiveNotifications"
              label="هل ترغب في تلقي إشعارات عن الدورات المستقبلية؟"
              options={[
                { value: "نعم", label: "نعم" },
                { value: "لا", label: "لا" },
              ]}
            />

            <FormTextareaField
              control={form.control}
              name="inquiriesNotes"
              label="هل لديك أي استفسارات أو ملاحظات؟ (اختياري)"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeft className="ml-2 h-4 w-4" /> عودة
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-48 bg-[#DAA520] text-white hover:bg-[#b8860b]"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {/* Success Dialog */}
      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        title="تم الإرسال بنجاح!"
        message="شكراً لتقديم طلبك، سنتواصل معك قريباً لمعالجة طلب الانضمام كمتدرب."
      />
    </Card>
  );
};

export default TraineeForm;
