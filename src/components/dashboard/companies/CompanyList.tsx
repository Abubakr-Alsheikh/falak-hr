import React from "react";
import { Company } from "@/types/models";
import CompanyListItem from "./CompanyListItem";
import CompanyListPagination from "./CompanyListPagination";

interface CompanyListProps {
  companies: Company[];
  searchQuery: string;
  totalCount: number;
  currentPage: number;
  companiesPerPage: number;
  onPageChange: (pageNumber: number) => void;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  onEdit: (company: Company) => void;
  onView: (company: Company) => void;
  onDelete: (company: Company) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  searchQuery,
  totalCount,
  currentPage,
  companiesPerPage,
  onPageChange,
  nextPageUrl,
  previousPageUrl,
  onEdit,
  onView,
  onDelete,
}) => {
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-4">
                اسم الشركة
              </th>
              <th scope="col" className="px-4 py-3">
                العنوان
              </th>
              <th scope="col" className="px-4 py-3">
                البريد الإلكتروني للتواصل
              </th>
              <th scope="col" className="px-4 py-3">
                رقم الهاتف للتواصل
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">الإجراءات</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <CompanyListItem
                key={company.id}
                company={company}
                onEdit={onEdit}
                onView={onView}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      <CompanyListPagination
        totalCount={totalCount}
        currentPage={currentPage}
        companiesPerPage={companiesPerPage}
        onPageChange={onPageChange}
        nextPageUrl={nextPageUrl}
        previousPageUrl={previousPageUrl}
      />
    </>
  );
};

export default CompanyList;
