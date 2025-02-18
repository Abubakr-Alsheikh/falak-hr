import { useState, useEffect, useCallback } from "react";
import { projectService, GetProjectsParams } from "@api/projectService";
import { DEFAULT_PAGE_SIZE } from "@utils/pagination";
import { useAuth } from "@contexts/AuthContext";
import { Project } from "@/types/project";

interface UseProjectsProps {
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
  company?: number; // Add company filter
}

const useProjects = ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
  ordering = "-created_at", // Default ordering
  company, // Company ID for filtering
}: UseProjectsProps = {}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: GetProjectsParams = {
        page,
        page_size: pageSize,
        search,
        ordering,
        company, // Pass the company filter
      };
      const response = await projectService.getProjects(params);
      setProjects(response.results);
      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
    } catch (err: any) {
      if (err.message === "Session expired. Please log in again.") {
        logout();
      }
      setError(err.message || "Failed to fetch projects.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, ordering, company, logout]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const refreshProjects = useCallback(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshProjects,
  };
};

export default useProjects;
