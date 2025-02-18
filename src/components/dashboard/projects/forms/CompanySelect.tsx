import React, { useState, useEffect } from "react";
import { companyService, GetCompaniesParams } from "@/api/companyService";
import { Company } from "@/types/company";
import { SelectField } from "@/components/common/dashboard/form/SelectField";

interface CompanySelectProps {
  initialCompanyId?: number;
  onSelect: (companyId: number | undefined) => void;
  errors?: string;
  touched?: boolean;
  disabled?: boolean;
}

export const CompanySelect: React.FC<CompanySelectProps> = ({
  initialCompanyId,
  errors,
  touched,
  disabled = false,
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        // Fetch *all* companies (no filtering).  Adjust if needed.
        const params: GetCompaniesParams = { parent_company: undefined }; // Top-level companies
        const response = await companyService.getCompanies(params);
        setCompanies(response.results);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const companyOptions = companies.map((company) => ({
    value: String(company.id), // String for SelectField
    label: company.name,
  }));

  return (
    <SelectField
      name="company"
      label="الشركة"
      options={[{ value: "", label: "اختر شركة" }, ...companyOptions]} // Add a default option
      errors={errors}
      touched={touched}
      value={initialCompanyId ? String(initialCompanyId) : ""}
      disabled={disabled || loading}
    />
  );
};
