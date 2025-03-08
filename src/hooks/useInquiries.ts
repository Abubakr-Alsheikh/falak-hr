import { useState, useEffect, useCallback } from "react";
import { GetContactMessage, inquiryService } from "@api/inquiryService";
import { PaginatedResponse, DEFAULT_PAGE_SIZE } from "@/utils/pagination";
import { useAuth } from "@/contexts/AuthContext";
import { Inquiry } from "@/types/inquiry";

interface UseInquiriesProps {
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
}

const useInquiries = ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
  ordering = "",
}: UseInquiriesProps = {}) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: PaginatedResponse<GetContactMessage> =
        await inquiryService.getInquiries(page, pageSize, search, ordering);

      // Check if response.results exists before mapping
      if (Array.isArray(response.results)) {
        const mappedInquiries: Inquiry[] = response.results.map(
          (res) =>
            ({
              id: res.id,
              name: res.name,
              email: res.email,
              phone: res.phone,
              message: res.message,
              created_at: res.created_at,
            } as Inquiry)
        );
        setInquiries(mappedInquiries);
      } else {
        // Handle the case where response.results is not an array
        console.error(
          "API response did not contain a 'results' array:",
          response
        );
        setError("Unexpected API response format.");
        setInquiries([]); // Set inquiries to an empty array to avoid further errors
      }

      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
    } catch (err: any) {
      if (err.message === "Session expired. Please log in again.") {
        logout();
      }
      setError(err.message || "An error occurred while fetching inquiries.");
      setInquiries([]); // Set to empty array on error as well
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, ordering, logout]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const refreshInquiries = useCallback(() => {
    fetchInquiries();
  }, [fetchInquiries]);

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
