import React, { useState, useEffect } from "react";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import * as Yup from "yup";
import { companyService } from "@api/companyService";
import CompanyForm from "../forms/CompanyForm";
import { Company } from "@/types/company";

interface UpdateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (company: Company) => void;
  onDelete: (company: Company) => void;
  company: Company | null;
}

const UpdateCompanyModal: React.FC<UpdateCompanyModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  company,
}) => {
  const [parentCompanyNumber, setParentCompanyNumber] = useState<number>();

  useEffect(() => {
    if (company && company.parent_company) {
      companyService
        .getCompanyById(company.parent_company)
        .then((parent) => {
          setParentCompanyNumber(parent.id);
        })
        .catch((error) => {
          console.error("Error fetching parent company Number:", error);
          setParentCompanyNumber(0); // Handle error gracefully
        });
    } else {
      setParentCompanyNumber(0);
    }
  }, [company]);

  if (!company) return null;

  const initialValues = {
    name: company.name,
    address: company.address,
    contact_email: company.contact_email,
    contact_phone: company.contact_phone,
    parent_company: company.parent_company || parentCompanyNumber || null, // It is a number or null
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم الشركة مطلوب"),
    address: Yup.string().required("العنوان مطلوب"),
    contact_email: Yup.string()
      .email("صيغة البريد الإلكتروني غير صحيحة")
      .required("البريد الإلكتروني مطلوب"),
    contact_phone: Yup.string().required("رقم الهاتف مطلوب"),
  });

  const handleSubmit = async (values: typeof initialValues, actions: any) => {
    // typeof initialValues
    try {
      const updatedCompany = {
        ...company,
        name: values.name,
        address: values.address,
        contact_email: values.contact_email,
        contact_phone: values.contact_phone,
        parent_company: values.parent_company, // directly pass the number
      };
      await companyService.updateCompany(company.id, updatedCompany);
      onUpdate(updatedCompany);
      actions.setSubmitting(false);
      onClose();
    } catch (error: any) {
      actions.setSubmitting(false);
      actions.setErrors(error.response?.data || { general: error.message });
    }
  };

  const handleDelete = () => {
    onDelete(company);
  };

  if (!isOpen) return null;

  return (
    <div
      dir="rtl"
      id="updateCompanyModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 flex h-full max-h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-50 md:inset-0"
    >
      <div className="relative max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
          {/* Header and Close Button */}
          <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              تعديل الشركة
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="mr-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <FaTimes className="h-5 w-5" />
              <span className="sr-only">إغلاق النافذة</span>
            </button>
          </div>

          {/* Company Form */}
          <CompanyForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            isUpdate={true}
          />

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center rounded-lg border border-red-600 px-5 py-2.5 text-center text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
            >
              <span className="ml-2">حذف</span>
              <FaTrashAlt className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCompanyModal;
