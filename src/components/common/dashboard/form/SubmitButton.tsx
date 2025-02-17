import React from "react";
import { FaSpinner } from "react-icons/fa";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isUpdate?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isUpdate = false,
}) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
  >
    {isSubmitting ? (
      <>
        <FaSpinner className="mr-2 animate-spin" />
        جاري الإرسال...
      </>
    ) : (
      <>{isUpdate ? "تحديث الشركة" : "إضافة شركة جديدة"}</>
    )}
  </button>
);