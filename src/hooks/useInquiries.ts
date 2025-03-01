import { useState, useEffect, useCallback } from "react";
import { GetContactMessage, inquiryService } from "@api/inquiryService";
import { PaginatedResponse } from "@/utils/pagination";

interface UseInquiriesProps {
  page: number;
  search?: string;
}

const useInquiries = ({ page, search = "" }: UseInquiriesProps) => {
  const [inquiries, setInquiries] = useState<GetContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: PaginatedResponse<GetContactMessage> =
        await inquiryService.getInquiries(page, search);
      setInquiries(response.results);
      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching inquiries.");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const refreshInquiries = () => {
    fetchInquiries();
  };

  return {
    inquiries,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshInquiries,
  };
};

export default useInquiries;
