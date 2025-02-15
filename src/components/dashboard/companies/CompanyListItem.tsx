import React, { useState } from "react";
import { Company } from "@/types/models";
import ActionsDropdown from "@/components/common/dashboard/page/ActionsDropdown";
import SubCompanyList from "./SubCompanyList";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

interface CompanyListItemProps {
  company: Company;
  onEdit: (company: Company) => void;
  onView: (company: Company) => void;
  onDelete: (company: Company) => void;
  level?: number;
}

const CompanyListItem: React.FC<CompanyListItemProps> = ({
  company,
  onEdit,
  onView,
  onDelete,
  level = 0,
}) => {
  const [showSubCompanies, setShowSubCompanies] = useState(false);
  const hasSubCompanies =
    company.sub_companies && company.sub_companies.length > 0;

  const toggleSubCompanies = () => {
    setShowSubCompanies(!showSubCompanies);
  };

  const indentStyle = {
    paddingRight: `${level * 10}px`,
  };

  // Define actions for the dropdown
  const actions = [
    {
      label: "معاينة",
      icon: <FaEye className="h-4 w-4" />,
      onClick: () => onView(company),
    },
    {
      label: "تعديل",
      icon: <FaEdit className="h-4 w-4" />,
      onClick: () => onEdit(company),
    },
    {
      label: "حذف",
      icon: <FaTrashAlt className="h-4 w-4" />,
      onClick: () => onDelete(company),
      className: "text-red-500 dark:text-red-400",
    },
  ];

  return (
    <>
      <tr className="border-b dark:border-gray-700">
        <th
          scope="row"
          className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
          style={indentStyle}
        >
          <div className="mr-2 flex items-center">
            {hasSubCompanies && (
              <button
                onClick={toggleSubCompanies}
                className="ml-2 rounded-md bg-gray-200 p-1 focus:outline-none"
                aria-label={showSubCompanies ? "Collapse" : "Expand"}
              >
                {showSubCompanies ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                )}
              </button>
            )}
            {company.name}
          </div>
        </th>
        <td className="px-4 py-3">{company.address}</td>
        <td className="px-4 py-3">{company.contact_email}</td>
        <td className="px-4 py-3">{company.contact_phone}</td>
        <td className="relative flex items-center justify-start px-4 py-3">
          {/* Use the generic ActionsDropdown */}
          <ActionsDropdown actions={actions} />
        </td>
      </tr>
      {/* Sub-company List (Accordion) */}
      {hasSubCompanies && showSubCompanies && company.sub_companies && (
        <tr>
          <td colSpan={5} className="p-0">
            <SubCompanyList
              companies={company.sub_companies}
              onEdit={onEdit}
              onView={onView}
              onDelete={onDelete}
              level={level + 1}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default CompanyListItem;
