import { z } from "zod";

// --- Constants and Error Messages (remain the same) ---
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
  invalidEmail: "الرجاء إدخال بريد إلكتروني صحيح.",
  fileTooLarge: `يجب أن يكون حجم الملف أصغر من 5 ميجابايت.`,
  invalidFileType: "نوع الملف غير مدعوم. (PDF, DOCX, JPG, PNG)",
  agreementRequired: "يجب الموافقة على اتفاقية الخدمة للمتابعة.",
  balanceRequired: "مستند الرصيد الافتتاحي مطلوب لهذا النوع من الطلبات.",
};

const fileSchema = z
  .instanceof(File, { message: errorMessages.required })
  .refine((file) => file.size <= MAX_FILE_SIZE, errorMessages.fileTooLarge)
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    errorMessages.invalidFileType
  )
  .nullable()
  .optional();

export const serviceRequestObjectSchema = z.object({
  // --- NEW FIELDS ---
  // These will hold the data from the feature card that was clicked.
  serviceTitle: z.string().optional(),
  serviceDescription: z.string().optional(),
  // --- END NEW FIELDS ---
  requestType: z.enum(["main_facility", "branch_facility", "modify_data"], {
    errorMap: () => ({ message: "الرجاء اختيار نوع الطلب." }),
  }),
  companyName: z.string().min(1, errorMessages.required),
  contactPerson: z.string().min(1, errorMessages.required),
  email: z.string().email(errorMessages.invalidEmail),
  phone: z.string().min(9, "الرجاء إدخال رقم هاتف صحيح."),
  companyProfile: z.string().optional(),
  licenses: fileSchema,
  managers: fileSchema,
  balance: fileSchema,
  agreement: z.literal(true, {
    errorMap: () => ({ message: errorMessages.agreementRequired }),
  }),
});

// --- THE FIX: Create a dedicated schema for Step 3 validation ---
// This schema knows about the conditional requirement of the 'balance' field.
export const step3ValidationSchema = serviceRequestObjectSchema
  .pick({
    requestType: true, // We need requestType to make the conditional check
    licenses: true,
    managers: true,
    balance: true,
  })
  .refine(
    (data) => {
      // If the request type requires a balance sheet, then the balance field must have a file.
      if (data.requestType && data.requestType !== "modify_data") {
        return !!data.balance;
      }
      // Otherwise, we don't care about the balance field.
      return true;
    },
    {
      // This message will be shown if the refine check fails.
      message: errorMessages.balanceRequired,
      path: ["balance"], // Attach the error specifically to the 'balance' field.
    }
  );

// The final schema for the entire form submission remains the same.
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
