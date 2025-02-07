import { Company } from "@/types/models";
import React, { useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

interface CreateCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (company: Omit<Company, "id">) => void;
}

const CreateCompanyModal: React.FC<CreateCompanyModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [parentCompany, setParentCompany] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate({
      name,
      address,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      parent_company: parentCompany,
    });
    // Reset form fields
    setName("");
    setAddress("");
    setContactEmail("");
    setContactPhone("");
    setParentCompany(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      dir="rtl"
      id="createCompanyModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 flex h-full max-h-full w-full items-center justify-center bg-black bg-opacity-50 md:inset-0"
    >
      <div className="relative max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
          <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 dark:border-gray-600 sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              إضافة شركة
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  اسم الشركة
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="أدخل اسم الشركة"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  العنوان
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="عنوان الشركة"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contactEmail"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  البريد الإلكتروني للتواصل
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  id="contactEmail"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contactPhone"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  رقم الهاتف للتواصل
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  id="contactPhone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="+1234567890"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="parentCompany"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  الشركة الأم (اختياري)
                </label>
                <input
                  type="number"
                  name="parentCompany"
                  id="parentCompany"
                  value={parentCompany || ""}
                  onChange={(e) =>
                    setParentCompany(
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="معرف الشركة الأم"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <span className="ml-2">إضافة شركة جديدة</span>
              <FaSave className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyModal;
