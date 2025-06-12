import { useState, useEffect, useCallback } from "react";
import { serviceRequestService } from "@/services/serviceRequestApi";
import { ServiceRequest } from "@/types/serviceRequest";
import { DEFAULT_PAGE_SIZE } from "@/utils/pagination"; // Assuming this constant exists

interface UseServiceRequestsProps {
  page: number;
  ordering?: string;
  search?: string;
}

export const useServiceRequests = ({
  page,
  ordering = "",
  search = "",
}: UseServiceRequestsProps) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);

  const fetchServiceRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceRequestService.getServiceRequests({
        page,
        page_size: DEFAULT_PAGE_SIZE,
        ordering,
        search,
      });
      setRequests(data.results);
      setTotalCount(data.count);
      setNextPageUrl(data.next);
      setPreviousPageUrl(data.previous);
    } catch (err) {
      setError("Failed to fetch service requests. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, ordering, search]);

  useEffect(() => {
    fetchServiceRequests();
  }, [fetchServiceRequests]);

  const refreshRequests = useCallback(() => {
    fetchServiceRequests();
  }, [fetchServiceRequests]);

  return {
    requests,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshRequests,
  };
};
