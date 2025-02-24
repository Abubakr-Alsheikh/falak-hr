import React from "react";
import CompanyListItem from "./CompanyListItem";
import { Company } from "@/types/company";

interface SubCompanyListProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onView: (company: Company) => void;
  onDelete: (company: Company) => void;
  level: number;
}

const SubCompanyList: React.FC<SubCompanyListProps> = ({
  companies,
  onEdit,
  onView,
  onDelete,
  level,
}) => {
  return (
    <table className="w-full">
      <tbody>
        {companies.map((subCompany) => (
          <CompanyListItem
            key={subCompany.id}
            company={subCompany}
            onEdit={onEdit}
            onView={onView}
            onDelete={onDelete}
            level={level}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SubCompanyList;
