import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Company } from "@/types/models";
import { DebounceInput } from "react-debounce-input";
import { companyService } from "@api/companyService";
import { FaSpinner } from "react-icons/fa";

interface CompanyFormProps {
  initialValues: {
    name: string;
    address: string;
    contact_email: string;
    contact_phone: string;
    parent_company: number | null; // number or null
  };
  onSubmit: (values: any, actions: FormikHelpers<any>) => Promise<void>;
  validationSchema: Yup.ObjectSchema<any>;
  isUpdate?: boolean;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  isUpdate = false,
}) => {
  const [parentCompanySearch, setParentCompanySearch] = useState("");
  const [parentCompanyOptions, setParentCompanyOptions] = useState<Company[]>(
    []
  );
  const [loadingParentCompanies, setLoadingParentCompanies] = useState(false);
  const [parentCompanyDropdownVisible, setParentCompanyDropdownVisible] =
    useState(false);
  const [isParentCompanyValid, setIsParentCompanyValid] = useState<boolean | null>(null);

  useEffect(() => {
    const initializeParentCompanyName = async () => {
      if (isUpdate && initialValues.parent_company) {
        try {
          const company = await companyService.getCompanyById(initialValues.parent_company);
          setParentCompanySearch(company.name);
        } catch (e) {
          console.log(e);
          setParentCompanySearch(""); // Handle error, set to empty string
        }
      } else {
        setParentCompanySearch(""); // Set empty for create and when no parent company
      }
    };

    initializeParentCompanyName();

  }, [isUpdate, initialValues.parent_company]);

  const fetchParentCompanies = useCallback(async (searchQuery: string) => {
    if (!searchQuery) {
      setParentCompanyOptions([]);
      setLoadingParentCompanies(false);
      setIsParentCompanyValid(null); // Reset validity
      return;
    }

    setLoadingParentCompanies(true);
    try {
      const params = { search: searchQuery, page_size: 5 };
      const response = await companyService.getCompanies(params);
      setParentCompanyOptions(response.results);

      // Check if the search term exactly matches a company name
      const exactMatch = response.results.find(
        (company) => company.name.toLowerCase() === searchQuery.toLowerCase()
      );
      setIsParentCompanyValid(!!exactMatch); // Set validity based on exact match
    } catch (error) {
      console.error("Error fetching parent companies:", error);
      setIsParentCompanyValid(false); // Assume invalid on error
    } finally {
      setLoadingParentCompanies(false);
    }
  }, []);

    // Effect to debounce fetching parent companies
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (parentCompanySearch) {
                fetchParentCompanies(parentCompanySearch);
            }
        }, 300);

        return () => clearTimeout(timerId);
    }, [parentCompanySearch, fetchParentCompanies]);

  const handleSelectParentCompany = (company: Company, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue("parent_company", company.id); // set the id and not the object
    setParentCompanySearch(company.name);
    setParentCompanyDropdownVisible(false);
    setIsParentCompanyValid(true);
  };

  const handleParentCompanyInputChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    setParentCompanySearch(e.target.value);
    setFieldValue("parent_company", null); // Clear parent company when input changes
    setParentCompanyDropdownVisible(true);
    if (!e.target.value) {
      setIsParentCompanyValid(null); // Empty input, reset validity
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <Form>
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                اسم الشركة
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className={`block w-full rounded-lg border ${
                  errors.name && touched.name ? "border-red-500" : "border-gray-300"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                placeholder="أدخل اسم الشركة"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Address Input */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                العنوان
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className={`block w-full rounded-lg border ${
                  errors.address && touched.address
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                placeholder="عنوان الشركة"
              />
              <ErrorMessage
                name="address"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Contact Email Input */}
            <div>
              <label
                htmlFor="contact_email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                البريد الإلكتروني للتواصل
              </label>
              <Field
                type="email"
                id="contact_email"
                name="contact_email"
                className={`block w-full rounded-lg border ${
                  errors.contact_email && touched.contact_email
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                placeholder="email@example.com"
              />
              <ErrorMessage
                name="contact_email"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Contact Phone Input */}
            <div>
              <label
                htmlFor="contact_phone"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                رقم الهاتف للتواصل
              </label>
              <Field
                type="tel"
                id="contact_phone"
                name="contact_phone"
                className={`block w-full rounded-lg border ${
                  errors.contact_phone && touched.contact_phone
                    ? "border-red-500"
                    : "border-gray-300"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                placeholder="+1234567890"
              />
              <ErrorMessage
                name="contact_phone"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            {/* Parent Company Input and Dropdown */}
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
                id="parentCompanySearch"
                value={parentCompanySearch}
                onChange={(e) => handleParentCompanyInputChange(e, setFieldValue)}
                onBlur={() => {
                  setTimeout(() => setParentCompanyDropdownVisible(false), 100);
                }}
                onClick={() => setParentCompanyDropdownVisible(true)}
                className={`block w-full rounded-lg border ${
                    errors.parent_company ||
                        (!isParentCompanyValid && parentCompanySearch)
                        ? "border-red-500"
                        : "border-gray-300"
                } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                placeholder="ابحث عن الشركة الأم"
              />
              <ErrorMessage
                name="parent_company"
                component="p"
                className="mt-1 text-sm text-red-500"
              />
                 {/* Parent Company Validation Message */}
                 {!isParentCompanyValid && parentCompanySearch && (
                    <p className="mt-1 text-sm text-red-500">
                        Please select a valid parent company from the list.
                    </p>
                )}
              {/* Parent Company Dropdown */}
              {parentCompanyDropdownVisible && (
                <div className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
                  {loadingParentCompanies ? (
                    <div className="flex items-center justify-center p-2">
                      <FaSpinner className="animate-spin" />
                      جاري التحميل...
                    </div>
                  ) : parentCompanyOptions.length > 0 ? (
                    parentCompanyOptions.map((company) => (
                      <div
                        key={company.id}
                        onClick={() => handleSelectParentCompany(company, setFieldValue)}
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

          {/* Submit Button */}
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
              <>
                {isUpdate ? "تحديث الشركة" : "إضافة شركة جديدة"}
              </>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyForm;