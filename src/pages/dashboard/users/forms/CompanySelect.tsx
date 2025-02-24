// src/components/common/dashboard/form/CompanySelect.tsx (Corrected Again!)
import React, { useState, useEffect } from "react";
import { companyService } from "@api/companyService";
import { Company } from "@/types/company";

interface CompanySelectProps {
  initialCompanyId?: number | null; // Allow null
  onSelect: (company: Company | null) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  errors?: any;
  touched?: any;
}

const CompanySelect: React.FC<CompanySelectProps> = ({
  initialCompanyId,
  onSelect,
  setFieldValue,
  errors,
  touched,
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState<
    number | null | undefined
  >(undefined); // Initialize as undefined
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const data = await companyService.getCompanies({});
        setCompanies(data.results);
      } catch (error) {
        console.error("Error fetching companies:", error);
        // Consider showing a user-friendly error message here.
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    // Correctly set the initial value ONLY on the first load.
    if (initialLoad) {
      setSelectedCompanyId(
        initialCompanyId === undefined ? null : initialCompanyId
      );
      // Set the initial Formik value, handling null/undefined correctly.
      setFieldValue(
        "company",
        initialCompanyId === undefined ? null : initialCompanyId,
        false
      ); //shouldValidate false
      setInitialLoad(false);
    }
    // Don't update Formik's state or internal state *again* if initialCompanyId changes
    // *after* the initial load. That should be handled by handleChange.
  }, [initialCompanyId, setFieldValue, initialLoad]); // Remove setSelectedCompanyId

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = event.target.value;
    const selectedId = companyId === "" ? null : parseInt(companyId, 10);

    setSelectedCompanyId(selectedId); // Update internal state
    setFieldValue("company", selectedId, true); // Update Formik, validate!

    const selectedCompany = companies.find((c) => c.id === selectedId) || null;
    onSelect(selectedCompany);
  };

  return (
    <div dir="rtl">
      <label
        htmlFor="company"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        الشركة
      </label>
      <select
        id="company"
        name="company"
        value={selectedCompanyId === null ? "" : selectedCompanyId}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        disabled={loading}
      >
        <option value="">اختر شركة</option> {/* Remove disabled attribute! */}
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
      {errors && touched && (
        <p className="mt-1 text-sm text-red-600">{errors}</p>
      )}
    </div>
  );
};

export default CompanySelect;
