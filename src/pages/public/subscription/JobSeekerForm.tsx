import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  JobSeekerApplication,
  jobSeekerApplicationSchema,
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

interface JobSeekerFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const JobSeekerForm: React.FC<JobSeekerFormProps> = ({ onBack, onSuccess }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false); // New state for dialog

  const form = useForm<JobSeekerApplication>({
    resolver: zodResolver(jobSeekerApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      cityRegion: "",
      specialization: "",
      yearsOfExperience: 0,
      desiredWorkField: "",
      cvLink: "",
      inquiriesNotes: "",
      // Ensure all required enum fields have an initial value
      ageCategory: undefined,
      nationality: undefined,
      educationalDegree: undefined,
      howHeard: undefined,
      receiveNotifications: undefined,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: JobSeekerApplication) => {
    setError(null);
    try {
      await subscriptionService.createJobSeekerApplication(data);
      setShowSuccessDialog(true); // Show success dialog
      form.reset(); // Reset form fields
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
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
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 p-4 text-5xl dark:bg-red-900/20">
          💼
        </div>
        <CardTitle className="text-3xl font-bold md:text-4xl">
          نموذج تسجيل باحث عن عمل
        </CardTitle>
        <CardDescription>
          املأ البيانات التالية للانضمام إلى فريق فلك كباحث عن عمل.
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
              />
              <FormInputField
                control={form.control}
                name="email"
                label="البريد الإلكتروني"
                type="email"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormInputField
                control={form.control}
                name="whatsappNumber"
                label="رقم الواتساب"
                type="tel"
              />
              <FormInputField
                control={form.control}
                name="cityRegion"
                label="المدينة أو المنطقة"
              />
            </div>

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
            <FormRadioGroupField
              control={form.control}
              name="educationalDegree"
              label="الدرجة العلمية"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
              options={[
                { value: "ابتدائي", label: "ابتدائي" },
                { value: "متوسط", label: "متوسط" },
                { value: "ثانوي", label: "ثانوي" },
                { value: "دبلوم", label: "دبلوم" },
                { value: "بكالوريوس", label: "بكالوريوس" },
                { value: "ماجستير", label: "ماجستير" },
                { value: "دكتوراه", label: "دكتوراه" },
                { value: "بروفيسور", label: "بروفيسور" },
                { value: "أخرى", label: "أخرى" },
              ]}
            />

            <FormTextareaField
              control={form.control}
              name="specialization"
              label="التخصص / مجال الخبرة"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormInputField
                control={form.control}
                name="yearsOfExperience"
                label="عدد سنوات الخبرة"
                type="number"
              />
              <FormInputField
                control={form.control}
                name="desiredWorkField"
                label="مجال العمل عن بعد الذي ترغب فيه"
              />
            </div>
            <FormInputField
              control={form.control}
              name="cvLink"
              label="رابط سيرتك الذاتية (اختياري)"
              placeholder="https://drive.google.com/..."
              type="url"
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
              label="هل ترغب في تلقي إشعارات بالفرص المستقبلية؟"
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
              className="w-48 bg-[#800020] text-white hover:bg-[#6e001c]"
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
        message="شكراً لتقديم طلبك، سنتواصل معك قريباً بخصوص فرص العمل المتاحة."
      />
    </Card>
  );
};

export default JobSeekerForm;
