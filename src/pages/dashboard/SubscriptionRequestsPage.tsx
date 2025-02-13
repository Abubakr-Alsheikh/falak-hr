import React, { useState, useEffect } from 'react';
import subscriptionService from '@api/subscriptionService';
import { SubscriptionResponse } from '@/types/subscription';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import List from "@/components/common/dashboard/page/List"; // Assuming you have the List comp.
import LoadingScreen from '@components/common/LoadingScreen'; // Assuming

const SubscriptionRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<SubscriptionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Add totalCount state
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null); // Add nextPageUrl
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null); // Add previousPageUrl


   useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await subscriptionService.getSubscriptionRequests();
                // Assuming your backend returns the data in the format {data: [...], count: x, next: y, previous: z }
                setRequests(response.data); // Access the actual array of requests
                setTotalCount(response.count || response.data.length); // Set from response
                setNextPageUrl(response.next);
                setPreviousPageUrl(response.previous);
            } catch (err:any) {
                setError(err.response?.data?.message || 'Failed to fetch requests.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, [currentPage]); // Add currentPage as dependency


  const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);  // Update the current page
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
      <td className="px-4 py-3">{request.first_name} {request.last_name}</td>
      <td className="px-4 py-3">{request.email}</td>
      <td className="px-4 py-3">{request.user_type_display}</td>
      <td className="px-4 py-3">{request.subscription_type_display}</td>
      <td className="px-4 py-3">
        {format(new Date(request.request_date), "dd/MM/yyyy HH:mm", {
          locale: ar,
        })}
      </td>
        <td className="px-4 py-3">
        {request.is_processed ? 'تمت معالجته' : 'قيد الانتظار'}
      </td>
    </tr>
  );


    if (isLoading) {
        return <LoadingScreen />; // Show while loading
    }

    if (error) {
      return (
          <div className="p-4 text-center text-red-500">
              <p>Error: {error}</p>
              {/* You might want a "Retry" button here */}
          </div>
      );
    }

  return (
    <section className="bg-gray-50 p-3 antialiased dark:bg-gray-900 sm:p-5" dir="rtl">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          {/* Consider a title like:  <h2 className="p-4 text-lg font-semibold">Subscription Requests</h2> */}
          <List
            items={requests}
            totalCount={totalCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
            renderHeader={renderHeader}
            renderRow={renderRow}
            isLoading={isLoading}
            noDataMessage="لا توجد طلبات اشتراك."
            itemsPerPage={10} // Set this to your desired page size
          />
        </div>
      </div>
    </section>
  );
};

export default SubscriptionRequestsPage;