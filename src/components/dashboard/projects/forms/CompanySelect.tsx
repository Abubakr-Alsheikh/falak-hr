import React, { useState, useEffect, useCallback } from "react";
import { companyService, GetCompaniesParams } from "@/api/companyService";
import { Company } from "@/types/company";
import { SelectField } from "@/components/common/dashboard/form/SelectField";
import { useFormikContext } from "formik";

interface CompanySelectProps {
  initialCompanyId?: number;
  disabled?: boolean;
  name: string;
}

export const CompanySelect: React.FC<CompanySelectProps> = ({
  initialCompanyId,
  disabled = false,
  name,
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const { setFieldValue, errors, touched, values } = useFormikContext<any>();

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const params: GetCompaniesParams = { parent_company: undefined };
      const response = await companyService.getCompanies(params);
      setCompanies(response.results);

      if (!initialCompanyId && response.results.length > 0) {
        setFieldValue(name, response.results[0].id);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  }, [initialCompanyId, name, setFieldValue]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const companyOptions = companies.map((company) => ({
    value: String(company.id),
    label: company.name,
  }));

  return (
    <SelectField
      name={name}
      label="الشركة"
      options={[{ value: "", label: "اختر شركة" }, ...companyOptions]}
      errors={errors[name] as string}
      touched={!!touched[name]} // Convert to boolean
      value={values[name] ? String(values[name]) : ""}
      disabled={disabled || loading}
    />
  );
};
