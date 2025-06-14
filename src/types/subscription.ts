import { z } from "zod";

// Zod schema for Trainer Application validation
export const trainerApplicationSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "الاسم الكامل مطلوب ويجب ألا يقل عن 3 أحرف." }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح. يرجى إدخال بريد إلكتروني صحيح.",
  }),
  whatsappNumber: z.string().min(9, {
    message: "رقم الواتساب مطلوب ويجب أن يتكون من 9 أرقام على الأقل.",
  }),
  ageCategory: z.enum(
    ["أقل من 18 سنة", "18 إلى 30", "30 إلى 45", "أكبر من 45"],
    { required_error: "يرجى تحديد الفئة العمرية." } // Improved
  ),
  nationality: z.enum(["سعودي", "مقيم"], {
    required_error: "يرجى تحديد الجنسية.",
  }), // Improved
  cityRegion: z.string().min(2, { message: "اسم المدينة أو المنطقة مطلوب." }), // Improved
  gender: z.enum(["ذكر", "أنثى"], { required_error: "يرجى تحديد النوع." }), // Improved
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
    { required_error: "يرجى تحديد الدرجة العلمية." } // Improved
  ),
  registrationType: z.enum(["فرد", "شركة"], {
    required_error: "يرجى تحديد نوع التسجيل (فرد أو شركة).", // Improved
  }),
  specialization: z
    .string()
    .min(10, { message: "التخصص مطلوب ويجب أن لا يقل عن 10 أحرف." }), // Improved
  trainingPackageBrief: z.string().min(20, {
    message: "نبذة عن الحقيبة التدريبية مطلوبة ويجب أن لا تقل عن 20 حرفاً.",
  }), // Improved
  clientSegmentsBrief: z.string().min(20, {
    message: "نبذة عن شرائح العملاء مطلوبة ويجب أن لا تقل عن 20 حرفاً.",
  }), // Improved
  serviceIdea: z
    .string()
    .min(20, { message: "فكرة الخدمة مطلوبة ويجب أن لا تقل عن 20 حرفاً." }), // Improved
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
  fullName: z
    .string()
    .min(3, { message: "الاسم الكامل مطلوب ويجب ألا يقل عن 3 أحرف." }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح. يرجى إدخال بريد إلكتروني صحيح.",
  }),
  whatsappNumber: z.string().min(9, {
    message: "رقم الواتساب مطلوب ويجب أن يتكون من 9 أرقام على الأقل.",
  }),
  ageCategory: z.enum(
    ["أقل من 18 سنة", "18 إلى 30", "30 إلى 45", "أكبر من 45"],
    { required_error: "يرجى تحديد الفئة العمرية." }
  ),
  nationality: z.enum(["سعودي", "مقيم"], {
    required_error: "يرجى تحديد الجنسية.",
  }),
  skillsToDevelop: z.string().min(10, {
    message: "المهارات المراد تطويرها مطلوبة ويجب أن لا تقل عن 10 أحرف.",
  }), // Improved
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
  fullName: z
    .string()
    .min(3, { message: "الاسم الكامل مطلوب ويجب ألا يقل عن 3 أحرف." }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح. يرجى إدخال بريد إلكتروني صحيح.",
  }),
  whatsappNumber: z.string().min(9, {
    message: "رقم الواتساب مطلوب ويجب أن يتكون من 9 أرقام على الأقل.",
  }),
  ageCategory: z.enum(
    ["أقل من 18 سنة", "18 إلى 30", "30 إلى 45", "أكبر من 45"],
    { required_error: "يرجى تحديد الفئة العمرية." }
  ),
  nationality: z.enum(["سعودي", "مقيم"], {
    required_error: "يرجى تحديد الجنسية.",
  }),
  cityRegion: z.string().min(2, { message: "اسم المدينة أو المنطقة مطلوب." }),
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
    { required_error: "يرجى تحديد الدرجة العلمية." }
  ),
  specialization: z.string().min(3, {
    message: "التخصص / مجال الخبرة مطلوب ويجب أن لا يقل عن 3 أحرف.",
  }), // Improved
  yearsOfExperience: z.coerce
    .number({ invalid_type_error: "عدد سنوات الخبرة يجب أن يكون رقماً." }) // Added specific message for type
    .min(0, {
      message: "عدد سنوات الخبرة يجب أن يكون رقماً صحيحاً لا يقل عن 0.",
    }), // Improved
  desiredWorkField: z
    .string()
    .min(3, { message: "مجال العمل المرغوب مطلوب ويجب أن لا يقل عن 3 أحرف." }), // Improved
  cvLink: z
    .string()
    .url({
      message:
        "رابط السيرة الذاتية غير صالح. يرجى إدخال رابط صحيح (مثال: https://...). ",
    }) // Improved
    .optional()
    .or(z.literal("")), // Allows empty string for optional URL
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
