import { useState, useEffect, useCallback } from "react";
import subscriptionService, {
  GetSubscriptionRequestsParams,
} from "@api/subscriptionService";
import { SubscriptionResponse } from "@/types/subscription";
import { PaginatedResponse } from "@utils/pagination";
import { useAuth } from "@contexts/AuthContext";

interface UseSubscriptionsProps {
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
  is_processed?: boolean;
}

const useSubscriptions = ({
  page = 1,
  pageSize = 10,
  search = "",
  ordering = "",
  is_processed,
}: UseSubscriptionsProps = {}) => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: GetSubscriptionRequestsParams = {
        page,
        page_size: pageSize,
        search,
        ordering,
        is_processed,
      };

      const response: PaginatedResponse<SubscriptionResponse> =
        await subscriptionService.getSubscriptionRequests(params);

      setSubscriptions(response.results);
      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
    } catch (err: any) {
      if (err.message === "Session expired. Please log in again.") {
        logout();
      }
      setError(err.message || "Failed to fetch subscriptions.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, ordering, is_processed, logout]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const refreshSubscriptions = useCallback(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return {
    subscriptions,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshSubscriptions,
  };
};

export default useSubscriptions;
