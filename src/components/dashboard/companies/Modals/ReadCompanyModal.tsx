import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { companyService } from "@/api/companyService";
import { useAuth } from "@contexts/AuthContext";
import { Company } from "@/types/company";
import Modal from "@/components/common/dashboard/page/Modal"; // Import the Modal

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
  const [parentCompanyName, setParentCompanyName] = useState<string | null>(
    null
  );
  const { logout } = useAuth();

  useEffect(() => {
    const fetchParentCompanyName = async () => {
      if (company && company.parent_company) {
        try {
          const parentCompany = await companyService.getCompanyById(
            company.parent_company
          );
          setParentCompanyName(parentCompany.name);
        } catch (error: any) {
          if (error.message === "Session expired. Please log in again.") {
            logout();
            return;
          }
          console.error("Error fetching parent company name:", error);
          setParentCompanyName("خطأ في تحميل الاسم"); // Arabic error message
        }
      } else {
        setParentCompanyName(null);
      }
    };

    if (isOpen && company) {
      fetchParentCompanyName();
    }
  }, [isOpen, company, logout]);

  if (!isOpen || !company) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={company.name}>
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
          {parentCompanyName !== null ? parentCompanyName : "غير متوفر"}
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
    </Modal>
  );
};

export default ReadCompanyModal;
