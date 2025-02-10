import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaTimes, FaSave, FaTrashAlt } from "react-icons/fa";
import { Company } from "@/types/models";
import { companyService } from "@api/companyService";
import { DebounceInput } from "react-debounce-input";
import { AxiosError } from "axios";
import { useAuth } from "@contexts/AuthContext";

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
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [parentCompanySearch, setParentCompanySearch] = useState("");
  const [parentCompany, setParentCompany] = useState<Company | null>(null);
  const [parentCompanyOptions, setParentCompanyOptions] = useState<Company[]>([]);
  const [loadingParentCompanies, setLoadingParentCompanies] = useState(false);
  const [parentCompanyDropdownVisible, setParentCompanyDropdownVisible] =
    useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<DebounceInput>(null); // Correct ref type
    const { logout } = useAuth();

  // Fetch and set initial values when the modal opens or the company changes
  useEffect(() => {
    if (company) {
      setName(company.name);
      setAddress(company.address);
      setContactEmail(company.contact_email);
      setContactPhone(company.contact_phone);
      if (company.parent_company) {
        // If there's a parent company, we need to fetch its details to display the name
        fetchParentCompanyDetails(company.parent_company);
      } else {
        setParentCompany(null);
        setParentCompanySearch("");
      }
    }
  }, [company]);

    const fetchParentCompanyDetails = async (parentId: number) => {
    try {
      const parentCompanyData = await companyService.getCompanyById(parentId);
      setParentCompany(parentCompanyData);
      setParentCompanySearch(parentCompanyData.name);
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
        return;
      }
      console.error("Error fetching parent company details:", error);
      setErrors({
        parent_company: ["Failed to load parent company details."],
      });
    }
  };

  const fetchParentCompanies = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery) {
        setParentCompanyOptions([]);
        setLoadingParentCompanies(false);
        return;
      }

      setLoadingParentCompanies(true);
      try {
        const params = { search: searchQuery, page_size: 5 };
        const response = await companyService.getCompanies(params);
        setParentCompanyOptions(response.results);
      } catch (error: any) {
        if (error.message === "Session expired. Please log in again.") {
          logout();
        }
        console.error("Error fetching parent companies:", error);
        // Optionally set an error state to display to the user
      } finally {
        setLoadingParentCompanies(false);
      }
    },
    [logout]
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchParentCompanies(parentCompanySearch);
    }, 300);

    return () => clearTimeout(timerId);
  }, [parentCompanySearch, fetchParentCompanies]);

  const handleSelectParentCompany = (company: Company) => {
    setParentCompany(company);
    setParentCompanySearch(company.name);
    setParentCompanyDropdownVisible(false);
  };

   const handleParentCompanyInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParentCompanySearch(e.target.value);
    setParentCompany(null); // Clear the selected parent company
    setParentCompanyDropdownVisible(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors

    if (!company) return; // Ensure company is not null

    try {
      const updatedCompany: Company = {
        ...company,
        name,
        address,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        parent_company: parentCompany ? parentCompany.id : null, // Use ID or null
      };

      await companyService.updateCompany(company.id, updatedCompany);
      onUpdate(updatedCompany); // Pass the updated company data
      onClose(); // Close after successful update
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
          logout();
          return; // Prevent further error handling if session expired
      }
      if (error instanceof AxiosError && error.response) {
        const errorData = error.response.data;
        if (errorData && typeof errorData === "object") {
          setErrors(errorData);
        } else {
          setErrors({ general: [error.message || "An unexpected error occurred."] });
        }
      } else {
        setErrors({ general: [error.message || "An unexpected error occurred."] });
      }
      console.error("Error updating company:", error);
    }
  };

  const handleDelete = () => {
    if (company) {
      onDelete(company);
    }
  };
    // Click-outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setParentCompanyDropdownVisible(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

  if (!isOpen || !company) return null;

  return (
    <div
      dir="rtl"
      id="updateCompanyModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 flex h-full max-h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-50 md:inset-0" // Added overflow-y-auto
      ref={modalRef}
    >
      <div className="relative max-h-full w-full max-w-2xl p-4">
        <div className="relative rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
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
                  className={`block w-full rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                  placeholder="أدخل اسم الشركة"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.join(", ")}
                  </p>
                )}
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
                  className={`block w-full rounded-lg border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                  placeholder="عنوان الشركة"
                  required
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.address.join(", ")}
                  </p>
                )}
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
                  className={`block w-full rounded-lg border ${
                    errors.contact_email ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                  placeholder="email@example.com"
                  required
                />
                {errors.contact_email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.contact_email.join(", ")}
                  </p>
                )}
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
                  className={`block w-full rounded-lg border ${
                    errors.contact_phone ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                  placeholder="+1234567890"
                  required
                />
                {errors.contact_phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.contact_phone.join(", ")}
                  </p>
                )}
              </div>
              <div className="relative col-span-2">
                <label
                  htmlFor="parentCompanySearch"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  الشركة الأم (اختياري)
                </label>
                <DebounceInput
                  minLength={0}
                  debounceTimeout={300}
                  type="text"
                  name="parentCompanySearch"
                  id="parentCompanySearch"
                  value={parentCompanySearch}
                  onChange={handleParentCompanyInputChange}
                  onBlur={() => {
                    setTimeout(
                      () => setParentCompanyDropdownVisible(false),
                      100
                    );
                  }}
                  onClick={() => setParentCompanyDropdownVisible(true)} // Show on click
                  className={`block w-full rounded-lg border ${
                    errors.parent_company ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                  placeholder="ابحث عن الشركة الأم"
                  ref={inputRef}
                />
                {errors.parent_company && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.parent_company.join(", ")}
                  </p>
                )}

                {parentCompanyDropdownVisible && (
                  <div className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
                    {loadingParentCompanies ? (
                      <div className="p-2">...جاري التحميل</div>
                    ) : parentCompanyOptions.length > 0 ? (
                      parentCompanyOptions.map((company) => (
                        <div
                          key={company.id}
                          onClick={() => handleSelectParentCompany(company)}
                          className="cursor-pointer p-2 hover:bg-gray-100"
                        >
                          {company.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2">لا توجد نتائج</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {errors.general && (
              <div className="mb-4 mt-4 rounded-md border border-red-500 bg-red-100 p-3 text-red-700">
                {errors.general.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <span className="ml-2">تحديث الشركة</span>
                <FaSave className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center rounded-lg border border-red-600 px-5 py-2.5 text-center text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
              >
                <span className="ml-2">حذف</span>
                <FaTrashAlt className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCompanyModal;