import React from "react";
import { FaTimes, FaCheck, FaBan } from "react-icons/fa";

interface DeleteCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteCompanyModal: React.FC<DeleteCompanyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      dir="rtl"
      id="deleteCompanyModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 flex h-full max-h-full w-full items-center justify-center bg-black bg-opacity-50 md:inset-0"
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800 sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <FaTimes className="h-5 w-5" />
            <span className="sr-only">إغلاق النافذة</span>
          </button>
          <FaBan className="mx-auto mb-3.5 h-11 w-11 text-gray-400 dark:text-gray-500" />
          <p className="mb-4 text-gray-500 dark:text-gray-300">
            هل أنت متأكد أنك تريد حذف هذه الشركة؟
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              لا، إلغاء
            </button>
            <button
              onClick={onConfirm}
              type="submit"
              className="flex items-center rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <span className="ml-1">نعم، أنا متأكد</span>
              <FaCheck className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCompanyModal;
