// src/pages/dashboard/InquiriesPage.tsx
import React, { useState, useCallback } from "react";
import useInquiries from "@hooks/useInquiries";
import { ContactMessage } from "@/api/inquiryService"; // Import type
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import InquiryListHeader from "@components/dashboard/inquiries/InquiryListHeader";
import List from "@/components/common/dashboard/page/List";

const InquiriesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const {
    inquiries,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshInquiries,
  } = useInquiries({ page: currentPage, search: localSearchQuery });

  // Debounce function
  const debounce = (func: (query: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (query: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(query);
      }, delay);
    };
  };
  const handleSearchChange = useCallback(
    debounce((query: string) => {
      setCurrentPage(1);
      setLocalSearchQuery(query);
    }, 500),
    []
  );

  const handleLocalSearchChange = (query: string) => {
    setLocalSearchQuery(query);
    handleSearchChange(query);
  };

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

  const renderRow = (inquiry: ContactMessage) => (
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

  // Error Handling Display
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error}</p>
        <button onClick={refreshInquiries} className="text-blue-500">
          إعادة التحميل
        </button>
      </div>
    );
  }
  return (
    <section
      className="bg-gray-50 p-3 antialiased dark:bg-gray-900 sm:p-5"
      dir="rtl"
    >
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <InquiryListHeader
            onSearchChange={handleLocalSearchChange}
            searchQuery={localSearchQuery}
          />
          <List
            items={inquiries}
            totalCount={totalCount}
            currentPage={currentPage}
            itemsPerPage={DEFAULT_PAGE_SIZE}
            onPageChange={handlePageChange}
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
            renderHeader={renderHeader}
            renderRow={renderRow}
            isLoading={loading}
            noDataMessage="لا يوجد رسائل."
          />
        </div>
      </div>
    </section>
  );
};

export default InquiriesPage;
