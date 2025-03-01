import React, { useState } from "react";
import { SubscriptionResponse } from "@/types/subscription";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import Table from "@/components/common/dashboard/page/Table";
import Pagination from "@/components/common/dashboard/page/Pagination";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import useSubscriptions from "@/hooks/useSubscriptions";
import TableHeader from "@/components/common/dashboard/page/TableHeader";
import ErrorDisplay from "@/components/common/dashboard/page/ErrorDisplay";

const SubscriptionRequestsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    subscriptions,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshSubscriptions,
  } = useSubscriptions({ page: currentPage, search: searchQuery });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
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
        نوع المستخدم
      </th>
      <th scope="col" className="px-4 py-3">
        نوع الاشتراك
      </th>
      <th scope="col" className="px-4 py-3">
        تاريخ الطلب
      </th>
      <th scope="col" className="px-4 py-3">
        الحالة
      </th>
    </>
  );

  const renderRow = (request: SubscriptionResponse) => (
    <tr className="border-b dark:border-gray-700" key={request.id}>
      <td className="px-4 py-3">
        {request.first_name} {request.last_name}
      </td>
      <td className="px-4 py-3">{request.email}</td>
      <td className="px-4 py-3">{request.user_type_display}</td>
      <td className="px-4 py-3">{request.subscription_type_display}</td>
      <td className="px-4 py-3">
        {format(new Date(request.request_date), "dd/MM/yyyy HH:mm", {
          locale: ar,
        })}
      </td>
      <td className="px-4 py-3">
        {request.is_processed ? "تمت معالجته" : "قيد الانتظار"}
      </td>
    </tr>
  );

  if (error) {
    <ErrorDisplay message={error} onRetry={refreshSubscriptions} />;
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
            title="طلبات الاشتراك"
          />
          <Table
            items={subscriptions}
            renderHeader={renderHeader}
            renderRow={renderRow}
            isLoading={loading}
            noDataMessage="لا توجد طلبات اشتراك."
            colSpan={6}
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

export default SubscriptionRequestsPage;
