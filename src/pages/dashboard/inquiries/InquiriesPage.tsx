import React, { useState, useCallback } from "react";
import useInquiries from "@hooks/useInquiries";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import { GetContactMessage } from "@/api/inquiryService";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import Table from "@/components/common/dashboard/page/Table";
import Pagination from "@/components/common/dashboard/page/Pagination";
import TableHeader from "@/components/common/dashboard/page/TableHeader";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";

const InquiriesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    inquiries,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshInquiries,
  } = useInquiries({ page: currentPage, search: searchQuery });

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderHeader = () => (
    <>
      <th scope="col" className="px-4 py-4">
        الاسم
      </th>
      <th scope="col" className="px-4 py-3">
        البريد الإلكتروني
      </th>
      <th scope="col" className="px-4 py-3">
        رقم الهاتف
      </th>
      <th scope="col" className="px-4 py-3">
        الرسالة
      </th>
      <th scope="col" className="px-4 py-3">
        تاريخ الإنشاء
      </th>
    </>
  );

  const renderRow = (inquiry: GetContactMessage) => (
    <tr className="border-b dark:border-gray-700" key={inquiry.id}>
      <td className="px-4 py-3">{inquiry.name}</td>
      <td className="px-4 py-3">{inquiry.email}</td>
      <td className="px-4 py-3">{inquiry.phone}</td>
      <td className="px-4 py-3">{inquiry.message}</td>
      <td className="px-4 py-3">
        {format(new Date(inquiry.created_at), "dd/MM/yyyy HH:mm", {
          locale: ar,
        })}
      </td>
    </tr>
  );

  if (error) {
    <ErrorDisplay message={error} onRetry={refreshInquiries} />;
  }

  return (
    <section
      className="bg-gray-50 p-3 antialiased dark:bg-gray-900 sm:p-5"
      dir="rtl"
    >
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <TableHeader
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            title="الاستفسارات"
          />
          <Table
            items={inquiries}
            renderHeader={renderHeader}
            renderRow={renderRow}
            isLoading={loading}
            noDataMessage="لا يوجد رسائل."
            colSpan={5}
          />
          <Pagination
            totalCount={totalCount}
            currentPage={currentPage}
            itemsPerPage={DEFAULT_PAGE_SIZE}
            onPageChange={handlePageChange}
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
          />
        </div>
      </div>
    </section>
  );
};

export default InquiriesPage;
