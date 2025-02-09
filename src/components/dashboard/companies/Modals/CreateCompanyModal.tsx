import { Company } from "@/types/models";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import { companyService } from "@api/companyService";
import { DebounceInput } from "react-debounce-input";
import { useAuth } from "@contexts/AuthContext";
import { AxiosError } from "axios";

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
  const [parentCompanySearch, setParentCompanySearch] = useState("");
  const [parentCompany, setParentCompany] = useState<Company | null>(null);
  const [parentCompanyOptions, setParentCompanyOptions] = useState<Company[]>(
    []
  );
  const [loadingParentCompanies, setLoadingParentCompanies] = useState(false);
  const [parentCompanyDropdownVisible, setParentCompanyDropdownVisible] =
    useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<DebounceInput>(null);
  const { logout } = useAuth();

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
    setParentCompany(null);
    setParentCompanyDropdownVisible(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({}); // Clear previous errors
    try {
      const newCompany = {
        name,
        address,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        parent_company: parentCompany ? parentCompany.id : null,
      };
      await companyService.createCompany(newCompany); // Await the API call
      onCreate(newCompany);

      // Reset form fields *only after successful creation*
      setName("");
      setAddress("");
      setContactEmail("");
      setContactPhone("");
      setParentCompanySearch("");
      setParentCompany(null);
      setParentCompanyOptions([]);
      onClose(); // Close the modal *only after successful creation*
    } catch (error: any) {
      if (error.message === "Session expired. Please log in again.") {
        logout();
        return; // Prevent further error handling if session expired
      }
      if (error instanceof AxiosError && error.response) {
        // Handle Axios errors (including validation errors from the backend)
        const errorData = error.response.data;
        if (errorData && typeof errorData === "object") {
          setErrors(errorData); // Set the errors from the response
        } else {
          // Handle non-validation related errors (e.g., network errors)
          setErrors({
            general: [error.message || "An unexpected error occurred."],
          });
        }
      } else {
        // Handle other types of errors
        setErrors({
          general: [error.message || "An unexpected error occurred."],
        });
      }
      console.error("Error creating company:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
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

  if (!isOpen) return null;
  return (
    <div
      dir="rtl"
      id="createCompanyModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 flex h-full max-h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-50 md:inset-0"
      ref={modalRef}
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
                  onClick={() => setParentCompanyDropdownVisible(true)}
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
