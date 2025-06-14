import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TrainerApplication,
  trainerApplicationSchema,
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

interface TrainerFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ onBack, onSuccess }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const form = useForm<TrainerApplication>({
    resolver: zodResolver(trainerApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      cityRegion: "",
      specialization: "",
      trainingPackageBrief: "",
      clientSegmentsBrief: "",
      serviceIdea: "",
      inquiriesNotes: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: TrainerApplication) => {
    setError(null);
    setSuccessMessage(null);
    try {
      const response = await subscriptionService.createTrainerApplication(data);
      setSuccessMessage(response.message || "تم إرسال طلبك بنجاح! شكراً لك.");
      form.reset();
      onSuccess();
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "حدث خطأ غير متوقع أثناء إرسال الطلب. يرجى المحاولة مرة أخرى."
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-4xl shadow-xl" dir="rtl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold md:text-4xl">
          نموذج تسجيل المدربين
        </CardTitle>
        <CardDescription>
          املأ البيانات التالية للانضمام كمدرب في أكاديمية فلك.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {successMessage && (
              <Alert
                variant="default"
                className="border-green-400 bg-green-100 text-green-700 dark:border-green-600 dark:bg-green-900/30 dark:text-green-300"
              >
                <AlertTitle>نجاح!</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
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
                placeholder="أحمد عبدالله"
              />
              <FormInputField
                control={form.control}
                name="email"
                label="البريد الإلكتروني"
                placeholder="name@example.com"
                type="email"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormInputField
                control={form.control}
                name="whatsappNumber"
                label="رقم الواتساب"
                placeholder="9665xxxxxxxx"
                type="tel"
              />
              <FormInputField
                control={form.control}
                name="cityRegion"
                label="المدينة أو المنطقة"
                placeholder="الرياض"
              />
            </div>

            <FormRadioGroupField
              control={form.control}
              name="gender"
              label="النوع"
              options={[
                { value: "ذكر", label: "ذكر" },
                { value: "أنثى", label: "أنثى" },
              ]}
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
            <FormRadioGroupField
              control={form.control}
              name="registrationType"
              label="هل أنت مسجل كفرد أم تمثل شركة؟"
              options={[
                { value: "فرد", label: "فرد" },
                { value: "شركة", label: "شركة" },
              ]}
            />

            <FormTextareaField
              control={form.control}
              name="specialization"
              label="التخصص"
            />
            <FormTextareaField
              control={form.control}
              name="trainingPackageBrief"
              label="نبذة عن حقيبتك التدريبية أو الإرشادية"
            />
            <FormTextareaField
              control={form.control}
              name="clientSegmentsBrief"
              label="نبذة عن شرائح العملاء"
            />
            <FormTextareaField
              control={form.control}
              name="serviceIdea"
              label="فكرة الخدمة التي ترغب في تقديمها"
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
              className="w-48 bg-[#800020] text-white hover:bg-[#6e001c]"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default TrainerForm;
