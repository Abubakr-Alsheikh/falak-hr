import { z } from "zod";

// --- Constants and Error Messages ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const errorMessages = {
  required: "هذا الحقل مطلوب.",
  invalidEmail: "الرجاء إدخال بريد إلكتروني صحيح وصالح.",
  fileRequired: "الرجاء تحميل الملف المطلوب.",
  fileTooLarge: `يجب أن يكون حجم الملف أقل من 5 ميجابايت.`,
  invalidFileType:
    "نوع الملف غير مدعوم. الأنواع المدعومة: PDF, DOCX, JPG, PNG.",
  agreementRequired: "يجب الموافقة على اتفاقية الخدمة للمتابعة.",
  balanceRequired: "مستند الرصيد الافتتاحي مطلوب لهذا النوع من الطلبات.",
  invalidPhone: "الرجاء إدخال رقم هاتف صحيح يتكون من 9 أرقام على الأقل.",
  invalidNumber: "يجب أن يكون هذا الحقل رقماً.", // New specific message for invalid number type
};

// File schema already handles `undefined` with `instanceof(File, { message: errorMessages.fileRequired })`
const fileSchema = z
  .instanceof(File, { message: errorMessages.fileRequired })
  .refine((file) => file.size <= MAX_FILE_SIZE, errorMessages.fileTooLarge)
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    errorMessages.invalidFileType
  )
  .nullable()
  .optional();

export const serviceRequestObjectSchema = z.object({
  // --- NEW FIELDS ---
  serviceTitle: z.string().optional(),
  serviceDescription: z.string().optional(),
  // --- END NEW FIELDS ---
  requestType: z.enum(["main_facility", "branch_facility", "modify_data"], {
    errorMap: () => ({ message: "الرجاء اختيار نوع الطلب من القائمة." }),
  }),
  // Added required_error to z.string() for undefined values
  companyName: z
    .string({ required_error: errorMessages.required })
    .min(1, errorMessages.required),
  contactPerson: z
    .string({ required_error: errorMessages.required })
    .min(1, errorMessages.required),
  email: z
    .string({ required_error: errorMessages.required })
    .email(errorMessages.invalidEmail),
  phone: z
    .string({ required_error: errorMessages.required })
    .min(9, errorMessages.invalidPhone),
  companyProfile: z.string().optional(),
  licenses: fileSchema,
  managers: fileSchema,
  balance: fileSchema,
  agreement: z.literal(true, {
    errorMap: () => ({ message: errorMessages.agreementRequired }),
  }),
});

// --- THE FIX: Create a dedicated schema for Step 3 validation ---
export const step3ValidationSchema = serviceRequestObjectSchema
  .pick({
    requestType: true,
    licenses: true,
    managers: true,
    balance: true,
  })
  .refine(
    (data) => {
      if (data.requestType && data.requestType !== "modify_data") {
        return !!data.balance;
      }
      return true;
    },
    {
      message: errorMessages.balanceRequired,
      path: ["balance"],
    }
  );

// The final schema for the entire form submission remains the same,
// ensuring the conditional validation applies at the final submission stage as well.
export const serviceRequestFinalSchema = serviceRequestObjectSchema.refine(
  (data) => {
    if (data.requestType !== "modify_data") {
      return !!data.balance;
    }
    return true;
  },
  {
    message: errorMessages.balanceRequired,
    path: ["balance"],
  }
);

export type ServiceRequestData = z.infer<typeof serviceRequestFinalSchema>;
