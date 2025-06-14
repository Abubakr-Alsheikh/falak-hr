import { useState, useEffect, useCallback } from "react";
import applicationService, {
  ResourceType,
} from "@/services/applicationService";
import {
  AnyApplicationResponse,
  PaginatedResponse,
} from "@/types/subscription";
import { useAuth } from "@contexts/AuthContext";

interface UseApplicationsProps {
  resource: ResourceType;
  page: number;
  search: string;
}

const useApplications = ({ resource, page, search }: UseApplicationsProps) => {
  const [applications, setApplications] = useState<AnyApplicationResponse[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, search };
      let response: PaginatedResponse<AnyApplicationResponse>;

      switch (resource) {
        case "trainers":
          response = await applicationService.getTrainerApplications(params);
          break;
        case "trainees":
          response = await applicationService.getTraineeApplications(params);
          break;
        case "job-seekers":
          response = await applicationService.getJobSeekerApplications(params);
          break;
        default:
          throw new Error("Invalid resource type specified.");
      }

      setApplications(response.results); // Set the array from the 'results' key
      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
      }
      setError(err.message || "Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  }, [resource, page, search, logout]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshApplications: fetchApplications,
  };
};

export default useApplications;
