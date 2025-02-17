import React, { useState, useEffect, useCallback } from "react";
import { DebounceInput } from "react-debounce-input";
import { FaSpinner } from "react-icons/fa";
import { companyService } from "@api/companyService";
import { Company } from "@/types/company";

interface ParentCompanySelectProps {
  initialParentCompanyId?: number | null;
  onSelect: (company: Company | null) => void; // Allow null for clearing
  setFieldValue: (field: string, value: any) => void;
  errors?: string;
  touched?: boolean;
}

export const ParentCompanySelect: React.FC<ParentCompanySelectProps> = ({
  initialParentCompanyId,
  onSelect,
  setFieldValue,
  errors,
  touched,
}) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Initialize parent company name
  useEffect(() => {
    const initialize = async () => {
      if (initialParentCompanyId) {
        try {
          const company = await companyService.getCompanyById(
            initialParentCompanyId
          );
          setSearch(company.name);
          setIsValid(true); // Initial value is considered valid.
        } catch (e) {
          console.error("Error fetching initial parent company:", e);
          setSearch("");
          setIsValid(null); // Reset validity if initial fetch fails.
        }
      } else {
        setSearch("");
        setIsValid(null);
      }
    };

    initialize();
  }, [initialParentCompanyId]);

  // Fetch parent companies based on search query
  const fetchCompanies = useCallback(async (searchQuery: string) => {
    if (!searchQuery) {
      setOptions([]);
      setLoading(false);
      setIsValid(null); // Empty search, reset validity
      return;
    }

    setLoading(true);
    try {
      const params = { search: searchQuery, page_size: 5 };
      const response = await companyService.getCompanies(params);
      setOptions(response.results);
      const exactMatch = response.results.find(
        (company) => company.name.toLowerCase() === searchQuery.toLowerCase()
      );
      setIsValid(!!exactMatch); // Set validity based on exact match
    } catch (error) {
      console.error("Error fetching parent companies:", error);
      setIsValid(false); // Consider invalid on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to debounce fetching parent companies
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (search) {
        fetchCompanies(search);
      }
    }, 300);

    return () => clearTimeout(timerId);
  }, [search, fetchCompanies]);

  const handleSelect = (company: Company) => {
    setSearch(company.name);
    onSelect(company);
    setDropdownVisible(false);
    setIsValid(true); // Selected from options, so it's valid
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    setFieldValue("parent_company", null); // Clear Formik field
    onSelect(null); // Very important: Clear the selected company in the parent.
    setDropdownVisible(true);

    if (!newSearchValue) {
      setIsValid(null); // Reset to neutral state if input is cleared
    }
  };

  return (
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
        value={search}
        onChange={handleChange}
        onBlur={() => {
          setTimeout(() => setDropdownVisible(false), 100);
        }}
        onClick={() => setDropdownVisible(true)}
        className={`block w-full rounded-lg border ${
          (errors && touched) || (!isValid && search)
            ? "border-red-500"
            : "border-gray-300"
        } bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
        placeholder="ابحث عن الشركة الأم"
      />
      {/* Custom Validation Message */}
      {!isValid && search && (
        <p className="mt-1 text-sm text-red-500">
          Please select a valid parent company from the list.
        </p>
      )}

      {/* Dropdown */}
      {dropdownVisible && (
        <div className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center p-2">
              <FaSpinner className="animate-spin" />
              جاري التحميل...
            </div>
          ) : options.length > 0 ? (
            options.map((company) => (
              <div
                key={company.id}
                onClick={() => handleSelect(company)}
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
  );
};
