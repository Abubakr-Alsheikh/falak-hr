import { z } from "zod";

// Zod schema for Trainer Application validation
export const trainerApplicationSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم الكامل مطلوب." }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح." }),
  whatsappNumber: z.string().min(9, { message: "رقم الواتساب مطلوب." }),
  ageCategory: z.enum(
    ["أقل من 18 سنة", "18 إلى 30", "30 إلى 45", "أكبر من 45"],
    { required_error: "الفئة العمرية مطلوبة." }
  ),
  nationality: z.enum(["سعودي", "مقيم"], { required_error: "الجنسية مطلوبة." }),
  cityRegion: z.string().min(2, { message: "المدينة أو المنطقة مطلوبة." }),
  gender: z.enum(["ذكر", "أنثى"], { required_error: "النوع مطلوب." }),
  educationalDegree: z.enum(
    [
      "ابتدائي",
      "متوسط",
      "ثانوي",
      "دبلوم",
      "بكالوريوس",
      "ماجستير",
      "دكتوراه",
      "بروفيسور",
      "أخرى",
    ],
    { required_error: "الدرجة العلمية مطلوبة." }
  ),
  registrationType: z.enum(["فرد", "شركة"], {
    required_error: "نوع التسجيل مطلوب.",
  }),
  specialization: z.string().min(10, { message: "التخصص مطلوب." }),
  trainingPackageBrief: z
    .string()
    .min(20, { message: "نبذة عن الحقيبة التدريبية مطلوبة." }),
  clientSegmentsBrief: z
    .string()
    .min(20, { message: "نبذة عن شرائح العملاء مطلوبة." }),
  serviceIdea: z.string().min(20, { message: "فكرة الخدمة مطلوبة." }),
  howHeard: z.enum(
    ["وسائل التواصل الاجتماعي", "صديق", "بحث على الإنترنت", "أخرى"],
    { required_error: "يرجى تحديد كيف سمعت عنا." }
  ),
  receiveNotifications: z.enum(["نعم", "لا"], {
    required_error: "يرجى تحديد رغبتك في تلقي الإشعارات.",
  }),
  inquiriesNotes: z.string().optional(),
});

// Zod schema for Trainee Application validation
export const traineeApplicationSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم الكامل مطلوب." }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح." }),
  whatsappNumber: z.string().min(9, { message: "رقم الواتساب مطلوب." }),
  ageCategory: z.enum(
    ["أقل من 18 سنة", "18 إلى 30", "30 إلى 45", "أكبر من 45"],
    { required_error: "الفئة العمرية مطلوبة." }
  ),
  nationality: z.enum(["سعودي", "مقيم"], { required_error: "الجنسية مطلوبة." }),
  skillsToDevelop: z
    .string()
    .min(10, { message: "المهارات المراد تطويرها مطلوبة." }),
  howHeard: z.enum(
    ["وسائل التواصل الاجتماعي", "صديق", "بحث على الإنترنت", "أخرى"],
    { required_error: "يرجى تحديد كيف سمعت عنا." }
  ),
  receiveNotifications: z.enum(["نعم", "لا"], {
    required_error: "يرجى تحديد رغبتك في تلقي الإشعارات.",
  }),
  inquiriesNotes: z.string().optional(),
});

export const jobSeekerApplicationSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم الكامل مطلوب." }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح." }),
  whatsappNumber: z.string().min(9, { message: "رقم الواتساب مطلوب." }),
  ageCategory: z.enum(
    ["أقل من 18 سنة", "18 إلى 30", "30 إلى 45", "أكبر من 45"],
    { required_error: "الفئة العمرية مطلوبة." }
  ),
  nationality: z.enum(["سعودي", "مقيم"], { required_error: "الجنسية مطلوبة." }),
  cityRegion: z.string().min(2, { message: "المدينة أو المنطقة مطلوبة." }),
  educationalDegree: z.enum(
    [
      "ابتدائي",
      "متوسط",
      "ثانوي",
      "دبلوم",
      "بكالوريوس",
      "ماجستير",
      "دكتوراه",
      "بروفيسور",
      "أخرى",
    ],
    { required_error: "الدرجة العلمية مطلوبة." }
  ),
  specialization: z.string().min(3, { message: "التخصص مطلوب." }),
  yearsOfExperience: z.coerce
    .number()
    .min(0, { message: "عدد سنوات الخبرة يجب أن يكون 0 أو أكثر." }),
  desiredWorkField: z.string().min(3, { message: "مجال العمل المرغوب مطلوب." }),
  cvLink: z
    .string()
    .url({ message: "الرجاء إدخال رابط صحيح." })
    .optional()
    .or(z.literal("")),
  howHeard: z.enum(
    ["وسائل التواصل الاجتماعي", "صديق", "بحث على الإنترنت", "أخرى"],
    { required_error: "يرجى تحديد كيف سمعت عنا." }
  ),
  receiveNotifications: z.enum(["نعم", "لا"], {
    required_error: "يرجى تحديد رغبتك في تلقي الإشعارات.",
  }),
  inquiriesNotes: z.string().optional(),
});

// TypeScript types derived from Zod schemas
export type TrainerApplication = z.infer<typeof trainerApplicationSchema>;
export type TraineeApplication = z.infer<typeof traineeApplicationSchema>;
export type JobSeekerApplication = z.infer<typeof jobSeekerApplicationSchema>;

// Generic API response type
export interface SuccessResponse {
  message: string;
}
