import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { UserProfile } from "@/types/user";
import { companyService } from "@api/companyService";
import { useAuth } from "@contexts/AuthContext";
import Modal from "@/components/common/dashboard/page/Modal";

interface ReadUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onEdit: (user: UserProfile) => void;
  onDelete: (user: UserProfile) => void;
}

const ReadUserModal: React.FC<ReadUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onEdit,
  onDelete,
}) => {
  const [companyName, setCompanyName] = useState<string | null>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchCompanyName = async () => {
      if (user) {
        try {
          const company = await companyService.getCompanyById(user.company);
          setCompanyName(company.name);
        } catch (error: any) {
          if (error.response && error.response.status === 401) {
            logout();
          }
          console.error("Error fetching company name:", error);
          setCompanyName("Error loading name");
        }
      } else {
        setCompanyName(null);
      }
    };

    if (isOpen && user) {
      fetchCompanyName();
    }
  }, [isOpen, user, logout]);

  if (!isOpen || !user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user.user.username}
      showCloseButton={true}
    >
      <div className="p-6">
        <dl>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            الاسم الأول
          </dt>
          <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
            {user.user.first_name || "غير متاح"}
          </dd>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            اسم العائلة
          </dt>
          <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
            {user.user.last_name || "غير متاح"}
          </dd>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            البريد الإلكتروني
          </dt>
          <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
            {user.user.email}
          </dd>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            الشركة
          </dt>
          <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
            {companyName !== null ? companyName : "جاري التحميل..."}
          </dd>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            الدور
          </dt>
          <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
            {user.role}
          </dd>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            القسم
          </dt>
          <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
            {user.department || "غير متاح"}
          </dd>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            المسمى الوظيفي
          </dt>
          <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
            {user.job_title || "غير متاح"}
          </dd>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            رقم الهاتف
          </dt>
          <dd className="mb-4 font-light text-gray-500 dark:text-gray-400 sm:mb-5">
            {user.phone_number || "غير متاح"}
          </dd>
        </dl>
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onDelete(user)}
            className="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <FaTrashAlt className="mr-2 h-5 w-5" />
            حذف
          </button>
          <button
            type="button"
            onClick={() => onEdit(user)}
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <FaEdit className="mr-2 h-5 w-5" />
            تعديل
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReadUserModal;
