import React from "react";
import { FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Company } from "@/types/models";

interface ReadCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
}

const ReadCompanyModal: React.FC<ReadCompanyModalProps> = ({
  isOpen,
  onClose,
  company,
  onEdit,
  onDelete,
}) => {
  if (!isOpen || !company) return null;

  return (
    <div
      dir="rtl"
      id="readCompanyModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-40 flex h-full max-h-full w-full items-center justify-center bg-black bg-opacity-50 md:inset-0"
    >
      <div className="relative max-h-full w-full max-w-xl p-4">
        <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
          <div className="mb-4 flex justify-between rounded-t sm:mb-5">
            <div className="text-lg text-gray-900 dark:text-white md:text-xl">
              <h3 className="font-semibold">{company.name}</h3>
            </div>
            <div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <FaTimes className="h-5 w-5" />
                <span className="sr-only">إغلاق النافذة</span>
              </button>
            </div>
          </div>
          <dl>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              العنوان
            </dt>
            <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
              {company.address}
            </dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              البريد الإلكتروني للتواصل
            </dt>
            <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
              {company.contact_email}
            </dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              رقم الهاتف للتواصل
            </dt>
            <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
              {company.contact_phone}
            </dd>
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              الشركة الأم
            </dt>
            <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
              {company.parent_company || "غير متوفر"}
            </dd>
          </dl>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onDelete(company)}
              className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              <span className="ml-2">حذف</span>
              <FaTrashAlt className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                onClick={() => onEdit(company)}
                className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <span className="ml-2">تعديل</span>
                <FaEdit className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadCompanyModal;
