import { useState, useEffect, useCallback } from "react";
import { companyService } from "@api/companyService";
import { Company } from "@/types/models";
import { PaginatedResponse, DEFAULT_PAGE_SIZE } from "@utils/pagination";
import { useAuth } from "@contexts/AuthContext";

interface UseCompaniesProps {
  page?: number;
  pageSize?: number;
  search?: string;
  ordering?: string;
  contact_email?: string;
  address?: string;
  parent_company?: number;
}
const useCompanies = ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
  ordering = "",
  contact_email = "",
  address = "",
  parent_company,
}: UseCompaniesProps = {}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const { logout } = useAuth();

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        page_size: pageSize,
        search,
        ordering,
        contact_email,
        address,
        parent_company,
      };
      const response: PaginatedResponse<Company> =
        await companyService.getCompanies(params);
      setCompanies(response.results);
      setTotalCount(response.count);
      setNextPageUrl(response.next);
      setPreviousPageUrl(response.previous);
    } catch (err: any) {
      if (err.message === "Session expired. Please log in again.") {
        logout();
      }
      setError(err.message || "Failed to fetch companies.");
    } finally {
      setLoading(false);
    }
  }, [
    page,
    pageSize,
    search,
    ordering,
    contact_email,
    address,
    parent_company,
    logout,
  ]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const refreshCompanies = useCallback(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    error,
    totalCount,
    nextPageUrl,
    previousPageUrl,
    refreshCompanies,
  };
};

export default useCompanies;
