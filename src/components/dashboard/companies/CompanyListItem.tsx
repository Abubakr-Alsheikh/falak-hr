import React from "react";
import { Company } from "@/types/models";
import CompanyActionsDropdown from "./CompanyActionsDropdown";

interface CompanyListItemProps {
  company: Company;
  onEdit: (company: Company) => void;
  onView: (company: Company) => void;
  onDelete: (company: Company) => void;
}

const CompanyListItem: React.FC<CompanyListItemProps> = ({
  company,
  onEdit,
  onView,
  onDelete,
}) => {
  return (
    <tr className="border-b dark:border-gray-700">
      <th
        scope="row"
        className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
      >
        {company.name}
      </th>
      <td className="px-4 py-3">{company.address}</td>
      <td className="px-4 py-3">{company.contact_email}</td>
      <td className="px-4 py-3">{company.contact_phone}</td>
      <td className="relative flex items-center justify-start px-4 py-3">
        <CompanyActionsDropdown
          company={company}
          onEdit={onEdit}
          onView={onView}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};

export default CompanyListItem;
